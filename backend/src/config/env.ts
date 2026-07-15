import dotenv from 'dotenv';
import path from 'path';

// Load .env (and .env.test when running tests)
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });
// Fallback to default .env so tests still get shared vars
if (process.env.NODE_ENV === 'test') dotenv.config();

function required(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isProd: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  port: parseInt(process.env.PORT ?? '4000', 10),
  apiPrefix: process.env.API_PREFIX ?? '/api/v1',

  databaseUrl: required('DATABASE_URL', 'mysql://root:password@localhost:3306/visitgrogol'),

  jwt: {
    secret: required('JWT_SECRET', 'dev-secret-change-me'),
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
    refreshSecret: process.env.JWT_REFRESH_SECRET ?? 'dev-refresh-secret',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
  },

  corsOrigins: (process.env.CORS_ORIGINS ?? 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean),

  upload: {
    dir: process.env.UPLOAD_DIR ?? 'uploads',
    maxFileSizeMb: parseInt(process.env.MAX_FILE_SIZE_MB ?? '25', 10),
    publicBaseUrl: process.env.PUBLIC_BASE_URL ?? 'http://localhost:4000',
  },

  seed: {
    adminName: process.env.SEED_ADMIN_NAME ?? 'Super Admin',
    adminEmail: process.env.SEED_ADMIN_EMAIL ?? 'admin@visitgrogol.id',
    adminPassword: process.env.SEED_ADMIN_PASSWORD ?? 'Admin@12345',
  },
};
