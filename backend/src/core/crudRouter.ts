import { Router } from 'express';
import { AnyZodObject, ZodEffects } from 'zod';
import { CrudService } from './crudService';
import { createCrudController } from './crudController';
import { asyncHandler } from '../utils/asyncHandler';
import { validate } from '../middleware/validate';
import { authenticate, authorize } from '../middleware/auth';
import { sendSuccess } from '../utils/apiResponse';
import { Request, Response } from 'express';

type Schema = AnyZodObject | ZodEffects<AnyZodObject>;

export interface CrudRouterConfig<T> {
  service: CrudService<T>;
  resourceName: string;
  createSchema: Schema;
  updateSchema: Schema;
  /** When true, GET (list/detail) endpoints require no auth. Default true. */
  publicRead?: boolean;
  /** Roles permitted to mutate. Default ['ADMIN','SUPERADMIN']. */
  writeRoles?: string[];
  /** Enable `GET /slug/:slug` lookup on this field. */
  slugField?: string;
}

export function createCrudRouter<T>(config: CrudRouterConfig<T>): Router {
  const {
    service,
    resourceName,
    createSchema,
    updateSchema,
    publicRead = true,
    writeRoles = ['ADMIN', 'SUPERADMIN'],
    slugField,
  } = config;

  const controller = createCrudController(service, resourceName);
  const router = Router();

  const readGuards = publicRead ? [] : [authenticate];
  const writeGuards = [authenticate, authorize(...writeRoles)];

  // Reads
  router.get('/', ...readGuards, asyncHandler(controller.list));

  if (slugField) {
    router.get(
      '/slug/:slug',
      ...readGuards,
      asyncHandler(async (req: Request, res: Response) => {
        const item = await service.findBy({ [slugField]: req.params.slug });
        sendSuccess(res, item, `${resourceName} retrieved`);
      })
    );
  }

  router.get('/:id', ...readGuards, asyncHandler(controller.detail));

  // Writes (protected)
  router.post('/', ...writeGuards, validate(createSchema), asyncHandler(controller.create));
  router.put('/:id', ...writeGuards, validate(updateSchema), asyncHandler(controller.update));
  router.patch('/:id', ...writeGuards, validate(updateSchema), asyncHandler(controller.update));
  router.delete('/:id', ...writeGuards, asyncHandler(controller.remove));

  return router;
}
