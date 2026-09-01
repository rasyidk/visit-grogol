import { createApp } from './app';
import { env } from './config/env';
import { prisma } from './config/prisma';

async function bootstrap() {
  const app = createApp();

  const server = app.listen(env.port, () => {
    // eslint-disable-next-line no-console
    console.log(`🌿 VisitGrogol API running on http://localhost:${env.port}${env.apiPrefix}`);
  });

  // WAKTU TIMEOUT: Mencegah server menahan idle connection terlalu lama
  // yang bisa menghabiskan Entry Processes (EP) di shared hosting
  server.keepAliveTimeout = 5000;
  server.headersTimeout = 6000;

  const shutdown = async (signal: string) => {
    // eslint-disable-next-line no-console
    console.log(`\n${signal} received. Shutting down gracefully...`);
    
    // Fallback timeout jika proses penutupan menggantung
    const forceExit = setTimeout(() => {
      console.error('Proses shutdown terlalu lama, mematikan secara paksa.');
      process.exit(1);
    }, 10000);

    server.close(async () => {
      await prisma.$disconnect();
      clearTimeout(forceExit);
      process.exit(0);
    });
  };

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Fatal boot error', err);
  process.exit(1);
});
