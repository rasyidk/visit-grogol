import { Router, Request, Response } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate';
import { authenticate, authorize } from '../middleware/auth';
import { sendSuccess } from '../utils/apiResponse';

type Schema = AnyZodObject | ZodEffects<AnyZodObject>;

interface SingletonModel {
  findFirst(args?: unknown): Promise<unknown | null>;
  create(args: unknown): Promise<unknown>;
  update(args: unknown): Promise<unknown>;
}

/**
 * Router for single-row config resources (ProfilWebsite, Kontak).
 * `GET /` returns the record (created with defaults if missing).
 * `PUT /` upserts the single record.
 */
export function createSingletonRouter(
  model: SingletonModel,
  resourceName: string,
  updateSchema: Schema,
  defaults: Record<string, unknown> = {}
): Router {
  const router = Router();

  const getOrCreate = async () => {
    const existing = (await model.findFirst()) as { id: number } | null;
    if (existing) return existing;
    return (await model.create({ data: defaults })) as { id: number };
  };

  router.get(
    '/',
    asyncHandler(async (_req: Request, res: Response) => {
      const record = await getOrCreate();
      sendSuccess(res, record, `${resourceName} retrieved`);
    })
  );

  router.put(
    '/',
    authenticate,
    authorize('ADMIN', 'SUPERADMIN'),
    validate(updateSchema),
    asyncHandler(async (req: Request, res: Response) => {
      const record = await getOrCreate();
      const updated = await model.update({ where: { id: record.id }, data: req.body });
      sendSuccess(res, updated, `${resourceName} updated`);
    })
  );

  return router;
}
