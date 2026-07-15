import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { createCrudService, PrismaDelegate } from '../../core/crudService';
import { createCrudController } from '../../core/crudController';
import { asyncHandler } from '../../utils/asyncHandler';
import { validate } from '../../middleware/validate';
import { authenticate, authorize } from '../../middleware/auth';
import { sendCreated, sendSuccess } from '../../utils/apiResponse';
import { bodySchema, zDate, zInt, zOptionalString } from '../../utils/zodHelpers';

const createSchema = bodySchema({
  name: z.string().trim().min(2).max(140),
  email: z.string().trim().email(),
  arrivalDate: zDate.optional(),
  guests: zInt.min(1).max(500).optional(),
  packageType: zOptionalString,
  note: zOptionalString,
});

const statusSchema = z.object({
  body: z.object({ status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']) }),
});

const service = createCrudService(prisma.reservasi as unknown as PrismaDelegate, {
  resourceName: 'Reservasi',
  query: {
    searchable: ['name', 'email', 'packageType'],
    sortable: ['name', 'arrivalDate', 'createdAt'],
    filterable: { status: 'string' },
    defaultSort: { field: 'createdAt', order: 'desc' },
  },
});
const controller = createCrudController(service, 'Reservasi');
const guard = [authenticate, authorize('ADMIN', 'SUPERADMIN')];

const router = Router();

// Public submission (from the Kontak page reservation form)
router.post(
  '/',
  validate(createSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const created = await prisma.reservasi.create({ data: req.body });
    sendCreated(res, created, 'Reservation submitted');
  })
);

// Admin management
router.get('/', ...guard, asyncHandler(controller.list));
router.get('/:id', ...guard, asyncHandler(controller.detail));
router.patch(
  '/:id/status',
  ...guard,
  validate(statusSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const updated = await service.update(Number(req.params.id), req.body);
    sendSuccess(res, updated, 'Reservation status updated');
  })
);
router.delete('/:id', ...guard, asyncHandler(controller.remove));

export default router;
