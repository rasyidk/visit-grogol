import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { env } from './config/env';
import { prisma } from './config/prisma';
import { apiRouter } from './routes';
import { errorHandler, notFoundHandler } from './middleware/error';
import { sendSuccess } from './utils/apiResponse';

export function createApp(): Application {
  const app = express();

  app.set('trust proxy', 1);
  app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
  app.use(compression());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  if (!env.isTest) app.use(morgan(env.isProd ? 'combined' : 'dev'));

  // Rate limit the auth surface to slow brute-force attempts.
  app.use(
    `${env.apiPrefix}/auth`,
    rateLimit({ windowMs: 15 * 60 * 1000, max: 100, standardHeaders: true, legacyHeaders: false })
  );

  // Static file serving for uploaded media.
  // Di production (Hostinger), web server (LiteSpeed) yang harus menyajikan file ini, bukan Express.
  if (!env.isProd) {
    app.use(
      `/${env.upload.dir}`,
      express.static(path.resolve(process.cwd(), env.upload.dir), { maxAge: '7d' })
    );
  }

  // Health check (includes Database check)
  app.get('/health', async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      sendSuccess(res, { status: 'ok', db: 'connected', uptime: process.uptime(), env: env.nodeEnv }, 'Healthy');
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Database connection failed',
        data: { status: 'error', db: 'disconnected', error: error?.message, uptime: process.uptime(), env: env.nodeEnv }
      });
    }
  });

  // Root route
  app.get('/', (_req, res) => {
    sendSuccess(res, { 
      name: 'VisitGrogol API', 
      version: '1.0.0',
      docs: `${env.apiPrefix}` 
    }, 'Welcome to VisitGrogol API');
  });

  // API
  app.use(env.apiPrefix, apiRouter);

  // 404 + error handling (must be last)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
