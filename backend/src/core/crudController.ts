import { Request, Response } from 'express';
import { CrudService } from './crudService';
import { sendCreated, sendSuccess } from '../utils/apiResponse';
import { ApiError } from '../utils/ApiError';

function parseId(req: Request): number {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) throw ApiError.badRequest('Invalid id parameter');
  return id;
}

/** Build a set of REST handlers from a CRUD service. */
export function createCrudController<T>(service: CrudService<T>, resourceName: string) {
  return {
    list: async (req: Request, res: Response) => {
      const { data, meta } = await service.list(req);
      sendSuccess(res, data, `${resourceName} list retrieved`, 200, meta);
    },

    detail: async (req: Request, res: Response) => {
      const item = await service.findById(parseId(req));
      sendSuccess(res, item, `${resourceName} retrieved`);
    },

    create: async (req: Request, res: Response) => {
      const item = await service.create(req.body as T);
      sendCreated(res, item, `${resourceName} created`);
    },

    update: async (req: Request, res: Response) => {
      const item = await service.update(parseId(req), req.body as Partial<T>);
      sendSuccess(res, item, `${resourceName} updated`);
    },

    remove: async (req: Request, res: Response) => {
      await service.remove(parseId(req));
      sendSuccess(res, { id: parseId(req) }, `${resourceName} deleted`);
    },
  };
}
