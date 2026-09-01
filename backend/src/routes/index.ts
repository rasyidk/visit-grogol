import { Router } from 'express';
import { prisma } from '../config/prisma';
import authRoutes from '../modules/auth/auth.route';
import uploadRoutes from '../modules/upload/upload.route';
import statsRoutes from '../modules/stats/stats.route';
import kategoriRoutes from '../modules/kategori/kategori.route';
import destinasiRoutes from '../modules/destinasi/destinasi.route';
import bannerRoutes from '../modules/banner/banner.route';
import beritaRoutes from '../modules/berita/berita.route';
import eventRoutes from '../modules/event/event.route';
import galeriFotoRoutes from '../modules/galeriFoto/galeriFoto.route';
import galeriVideoRoutes from '../modules/galeriVideo/galeriVideo.route';
import testimoniRoutes from '../modules/testimoni/testimoni.route';
import profilRoutes from '../modules/profil/profil.route';
import kontakRoutes from '../modules/kontak/kontak.route';
import adminUserRoutes from '../modules/adminUser/adminUser.route';
import reservasiRoutes from '../modules/reservasi/reservasi.route';
import newsletterRoutes from '../modules/newsletter/newsletter.route';

export const apiRouter = Router();

apiRouter.get('/health', async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ success: true, message: 'Healthy', data: { status: 'ok', db: 'connected', uptime: process.uptime() } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: 'Database connection failed', data: { status: 'error', db: 'disconnected', error: error?.message, uptime: process.uptime() } });
  }
});

apiRouter.use('/auth', authRoutes);
apiRouter.use('/upload', uploadRoutes);
apiRouter.use('/stats', statsRoutes);
apiRouter.use('/kategori', kategoriRoutes);
apiRouter.use('/destinasi', destinasiRoutes);
apiRouter.use('/banner', bannerRoutes);
apiRouter.use('/berita', beritaRoutes);
apiRouter.use('/event', eventRoutes);
apiRouter.use('/galeri-foto', galeriFotoRoutes);
apiRouter.use('/galeri-video', galeriVideoRoutes);
apiRouter.use('/testimoni', testimoniRoutes);
apiRouter.use('/profil', profilRoutes);
apiRouter.use('/kontak', kontakRoutes);
apiRouter.use('/admin-users', adminUserRoutes);
apiRouter.use('/reservasi', reservasiRoutes);
apiRouter.use('/newsletter', newsletterRoutes);
