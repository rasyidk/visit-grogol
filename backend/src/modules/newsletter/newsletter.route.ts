import { Router, Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { asyncHandler } from '../../utils/asyncHandler';
import { validate } from '../../middleware/validate';
import { authenticate, authorize } from '../../middleware/auth';
import { sendCreated, sendSuccess, buildPaginationMeta } from '../../utils/apiResponse';

const subscribeSchema = z.object({
  body: z.object({ email: z.string().trim().email() }),
});

const router = Router();
const guard = [authenticate, authorize('ADMIN', 'SUPERADMIN')];

// Public subscribe (idempotent)
router.post(
  '/',
  validate(subscribeSchema),
  asyncHandler(async (req: Request, res: Response) => {
    const { email } = req.body;
    const record = await prisma.newsletterSubscriber.upsert({
      where: { email },
      update: {},
      create: { email },
    });
    sendCreated(res, record, 'Subscribed successfully');
  })
);

// Admin list
router.get(
  '/',
  ...guard,
  asyncHandler(async (req: Request, res: Response) => {
    const page = Math.max(1, parseInt((req.query.page as string) ?? '1', 10));
    const limit = Math.min(100, Math.max(1, parseInt((req.query.limit as string) ?? '20', 10)));
    const [items, total] = await Promise.all([
      prisma.newsletterSubscriber.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.newsletterSubscriber.count(),
    ]);
    sendSuccess(res, items, 'Subscribers', 200, buildPaginationMeta(total, page, limit));
  })
);

router.delete(
  '/:id',
  ...guard,
  asyncHandler(async (req: Request, res: Response) => {
    await prisma.newsletterSubscriber.delete({ where: { id: Number(req.params.id) } });
    sendSuccess(res, { id: Number(req.params.id) }, 'Subscriber removed');
  })
);

export default router;
