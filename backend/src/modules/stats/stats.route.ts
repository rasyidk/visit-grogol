import { Router, Request, Response } from 'express';
import { prisma } from '../../config/prisma';
import { authenticate } from '../../middleware/auth';
import { asyncHandler } from '../../utils/asyncHandler';
import { sendSuccess } from '../../utils/apiResponse';

const router = Router();

router.get(
  '/',
  authenticate,
  asyncHandler(async (_req: Request, res: Response) => {
    const [
      destinasi,
      kategori,
      berita,
      event,
      galeriFoto,
      galeriVideo,
      testimoni,
      banner,
      reservasi,
      subscribers,
      admins,
      pendingReservasi,
      featuredDestinasi,
    ] = await Promise.all([
      prisma.destinasi.count(),
      prisma.kategori.count(),
      prisma.berita.count(),
      prisma.event.count(),
      prisma.galeriFoto.count(),
      prisma.galeriVideo.count(),
      prisma.testimoni.count(),
      prisma.banner.count(),
      prisma.reservasi.count(),
      prisma.newsletterSubscriber.count(),
      prisma.adminUser.count(),
      prisma.reservasi.count({ where: { status: 'PENDING' } }),
      prisma.destinasi.count({ where: { isFeatured: true } }),
    ]);

    const [topDestinasi, latestReservasi, upcomingEvents] = await Promise.all([
      prisma.destinasi.findMany({
        orderBy: { views: 'desc' },
        take: 5,
        select: { id: true, title: true, views: true, rating: true, thumbnail: true },
      }),
      prisma.reservasi.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
      prisma.event.findMany({
        where: { startDate: { gte: new Date('2024-01-01') } },
        orderBy: { startDate: 'asc' },
        take: 5,
        select: { id: true, title: true, startDate: true, thumbnail: true },
      }),
    ]);

    sendSuccess(
      res,
      {
        counts: {
          destinasi,
          kategori,
          berita,
          event,
          galeriFoto,
          galeriVideo,
          testimoni,
          banner,
          reservasi,
          subscribers,
          admins,
          pendingReservasi,
          featuredDestinasi,
        },
        topDestinasi,
        latestReservasi,
        upcomingEvents,
      },
      'Dashboard statistics'
    );
  })
);

export default router;
