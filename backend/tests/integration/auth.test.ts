import { prismaMock } from '../helpers/prismaMock';
import request from 'supertest';
import { createApp } from '@/app';
import { hashPassword } from '@/utils/password';
import { superadminToken, bearer } from '../helpers/token';

const app = createApp();
const base = '/api/v1';

describe('POST /auth/login', () => {
  it('logs in with valid credentials', async () => {
    const password = await hashPassword('Admin@12345');
    prismaMock.adminUser.findUnique.mockResolvedValue({
      id: 1,
      name: 'Super Admin',
      email: 'admin@visitgrogol.id',
      password,
      role: 'SUPERADMIN',
      isActive: true,
    } as never);
    prismaMock.adminUser.update.mockResolvedValue({} as never);

    const res = await request(app)
      .post(`${base}/auth/login`)
      .send({ email: 'admin@visitgrogol.id', password: 'Admin@12345' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.accessToken).toBeDefined();
  });

  it('returns 401 for invalid credentials', async () => {
    prismaMock.adminUser.findUnique.mockResolvedValue(null as never);
    const res = await request(app)
      .post(`${base}/auth/login`)
      .send({ email: 'ghost@x.id', password: 'nope123' });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('returns 422 for invalid payload', async () => {
    const res = await request(app).post(`${base}/auth/login`).send({ email: 'not-an-email' });
    expect(res.status).toBe(422);
    expect(res.body.errors).toBeDefined();
  });
});

describe('GET /auth/me', () => {
  it('rejects requests without a token', async () => {
    const res = await request(app).get(`${base}/auth/me`);
    expect(res.status).toBe(401);
  });

  it('returns the current user with a valid token', async () => {
    prismaMock.adminUser.findUnique.mockResolvedValue({
      id: 1,
      name: 'Super Admin',
      email: 'admin@visitgrogol.id',
      role: 'SUPERADMIN',
    } as never);
    const res = await request(app).get(`${base}/auth/me`).set('Authorization', bearer(superadminToken()));
    expect(res.status).toBe(200);
    expect(res.body.data.email).toBe('admin@visitgrogol.id');
  });
});
