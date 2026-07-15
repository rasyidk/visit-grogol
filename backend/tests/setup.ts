// Global test setup — ensures deterministic env for the JWT/utility layer.
process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = process.env.JWT_SECRET ?? 'test-secret';
process.env.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? 'test-refresh-secret';
process.env.DATABASE_URL = process.env.DATABASE_URL ?? 'mysql://root:root@localhost:3306/test';

jest.setTimeout(20000);
