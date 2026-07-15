import { Request } from 'express';

export interface ParsedQuery {
  page: number;
  limit: number;
  skip: number;
  search?: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  /** Raw filter values (already whitelisted by the caller). */
  rawFilters: Record<string, string>;
}

export interface QueryConfig {
  /** Fields allowed for full-text style `contains` search. */
  searchable?: string[];
  /** Fields allowed in `sortBy`. */
  sortable?: string[];
  /** Query params allowed as exact-match filters, with their casting. */
  filterable?: Record<string, 'string' | 'number' | 'boolean'>;
  defaultSort?: { field: string; order: 'asc' | 'desc' };
  maxLimit?: number;
}

const cast = (value: string, type: 'string' | 'number' | 'boolean') => {
  if (type === 'number') return Number(value);
  if (type === 'boolean') return value === 'true' || value === '1';
  return value;
};

/**
 * Parse `?page&limit&search&sortBy&sortOrder&<filters>` and build a
 * Prisma-compatible `where`/`orderBy`/pagination object. Only whitelisted
 * fields are honoured, preventing arbitrary-field injection.
 */
export function buildPrismaQuery(req: Request, config: QueryConfig) {
  const {
    searchable = [],
    sortable = [],
    filterable = {},
    defaultSort = { field: 'createdAt', order: 'desc' },
    maxLimit = 100,
  } = config;

  const q = req.query;
  const page = Math.max(1, parseInt((q.page as string) ?? '1', 10) || 1);
  const limit = Math.min(maxLimit, Math.max(1, parseInt((q.limit as string) ?? '10', 10) || 10));
  const skip = (page - 1) * limit;

  const search = typeof q.search === 'string' && q.search.trim() ? q.search.trim() : undefined;

  const requestedSort = (q.sortBy as string) ?? defaultSort.field;
  const sortBy = sortable.includes(requestedSort) ? requestedSort : defaultSort.field;
  const sortOrder: 'asc' | 'desc' = (q.sortOrder as string) === 'asc' ? 'asc' : 'desc';

  // Build AND conditions
  const and: Record<string, unknown>[] = [];

  // Exact filters
  for (const [key, type] of Object.entries(filterable)) {
    const value = q[key];
    if (typeof value === 'string' && value !== '') {
      and.push({ [key]: cast(value, type) });
    }
  }

  // Search across searchable fields
  if (search && searchable.length > 0) {
    and.push({
      OR: searchable.map((field) => ({
        [field]: { contains: search },
      })),
    });
  }

  const where = and.length > 0 ? { AND: and } : {};
  const orderBy = { [sortBy]: sortOrder };

  return { where, orderBy, skip, take: limit, page, limit };
}
