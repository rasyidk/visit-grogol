import { Request } from 'express';
import { buildPrismaQuery, QueryConfig } from '../utils/queryFeatures';
import { buildPaginationMeta } from '../utils/apiResponse';
import { ApiError } from '../utils/ApiError';

/**
 * Minimal shape of a Prisma model delegate the generic service relies on.
 * Kept loose intentionally so any model can be plugged in.
 */
export interface PrismaDelegate {
  findMany(args?: unknown): Promise<unknown[]>;
  findUnique(args: unknown): Promise<unknown | null>;
  findFirst(args: unknown): Promise<unknown | null>;
  create(args: unknown): Promise<unknown>;
  update(args: unknown): Promise<unknown>;
  delete(args: unknown): Promise<unknown>;
  count(args?: unknown): Promise<number>;
}

export interface CrudServiceConfig<T = Record<string, unknown>> {
  /** Human readable resource name for error messages, e.g. "Destinasi". */
  resourceName: string;
  query: QueryConfig;
  /** Prisma `include` applied to list/detail reads. */
  include?: Record<string, unknown>;
  /** Prisma `select` applied to every read/write (e.g. to hide a password). Mutually exclusive with include. */
  select?: Record<string, unknown>;
  /** Extra static `where` merged into every list query (e.g. published only). */
  baseWhere?: Record<string, unknown>;
  /** Transform payload before create (e.g. slug generation). */
  beforeCreate?: (data: T) => Promise<T> | T;
  /** Transform payload before update. */
  beforeUpdate?: (data: Partial<T>, id: number) => Promise<Partial<T>> | Partial<T>;
}

export interface CrudService<T = Record<string, unknown>> {
  list(req: Request): Promise<{ data: unknown[]; meta: ReturnType<typeof buildPaginationMeta> }>;
  findById(id: number): Promise<unknown>;
  findBy(where: Record<string, unknown>): Promise<unknown>;
  create(data: T): Promise<unknown>;
  update(id: number, data: Partial<T>): Promise<unknown>;
  remove(id: number): Promise<unknown>;
}

export function createCrudService<T = Record<string, unknown>>(
  model: PrismaDelegate,
  config: CrudServiceConfig<T>
): CrudService<T> {
  const { resourceName, query, include, select, baseWhere = {}, beforeCreate, beforeUpdate } = config;

  // Prisma forbids passing both include and select in the same query.
  const projection = select ? { select } : include ? { include } : {};

  const notFound = () => ApiError.notFound(`${resourceName} not found`);

  return {
    async list(req) {
      const { where, orderBy, skip, take, page, limit } = buildPrismaQuery(req, query);
      const mergedWhere =
        Object.keys(baseWhere).length > 0
          ? { AND: [baseWhere, where] }
          : where;

      const [items, total] = await Promise.all([
        model.findMany({ where: mergedWhere, orderBy, skip, take, ...projection }),
        model.count({ where: mergedWhere }),
      ]);

      return { data: items, meta: buildPaginationMeta(total, page, limit) };
    },

    async findById(id) {
      const item = await model.findUnique({ where: { id }, ...projection });
      if (!item) throw notFound();
      return item;
    },

    async findBy(where) {
      const item = await model.findFirst({ where, ...projection });
      if (!item) throw notFound();
      return item;
    },

    async create(data) {
      const payload = beforeCreate ? await beforeCreate(data) : data;
      return model.create({ data: payload as object, ...projection });
    },

    async update(id, data) {
      // Ensure it exists first for a clean 404 rather than P2025.
      const exists = await model.findUnique({ where: { id } });
      if (!exists) throw notFound();
      const payload = beforeUpdate ? await beforeUpdate(data, id) : data;
      return model.update({ where: { id }, data: payload as object, ...projection });
    },

    async remove(id) {
      const exists = await model.findUnique({ where: { id } });
      if (!exists) throw notFound();
      return model.delete({ where: { id } });
    },
  };
}
