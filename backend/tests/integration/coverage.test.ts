import { prismaMock } from '../helpers/prismaMock';
import request from 'supertest';
import { Prisma } from '@prisma/client';
import { createApp } from '@/app';
import { superadminToken, bearer } from '../helpers/token';
import { hashPassword } from '@/utils/password';

const app = createApp();
const base = '/api/v1';
const auth = () => bearer(superadminToken());

describe('Update flows (crudService.update + beforeUpdate)', () => {
  it('updates a destinasi and regenerates the slug from a new title', async () => {
    prismaMock.destinasi.findUnique.mockResolvedValue({ id: 1, title: 'Old' } as never);
    prismaMock.destinasi.findFirst.mockResolvedValue(null as never);
    prismaMock.destinasi.update.mockImplementation((((args: any) => Promise.resolve({ id: 1, ...args.data })) as never));
    const res = await request(app)
      .put(`${base}/destinasi/1`)
      .set('Authorization', auth())
      .send({ title: 'Danau Baru Indah' });
    expect(res.status).toBe(200);
    expect(res.body.data.slug).toBe('danau-baru-indah');
  });

  it('returns 404 when updating a missing destinasi', async () => {
    prismaMock.destinasi.findUnique.mockResolvedValue(null as never);
    const res = await request(app)
      .put(`${base}/destinasi/99`)
      .set('Authorization', auth())
      .send({ title: 'Whatever Name' });
    expect(res.status).toBe(404);
  });

  it('hashes the password when updating an admin user', async () => {
    prismaMock.adminUser.findUnique.mockResolvedValue({ id: 2 } as never);
    let capturedData: Record<string, unknown> = {};
    prismaMock.adminUser.update.mockImplementation((((args: any) => {
      capturedData = args.data;
      return Promise.resolve({ id: 2, name: 'Updated' });
    }) as never));
    const res = await request(app)
      .put(`${base}/admin-users/2`)
      .set('Authorization', auth())
      .send({ password: 'brand-new-password' });
    expect(res.status).toBe(200);
    expect(capturedData.password).not.toBe('brand-new-password'); // hashed
  });
});

describe('Auth change-password', () => {
  it('changes the password with a correct current password', async () => {
    const current = await hashPassword('current-pass');
    prismaMock.adminUser.findUnique.mockResolvedValue({ id: 1, password: current } as never);
    prismaMock.adminUser.update.mockResolvedValue({} as never);
    const res = await request(app)
      .post(`${base}/auth/change-password`)
      .set('Authorization', auth())
      .send({ currentPassword: 'current-pass', newPassword: 'new-password-123' });
    expect(res.status).toBe(200);
  });

  it('rejects a wrong current password', async () => {
    const current = await hashPassword('current-pass');
    prismaMock.adminUser.findUnique.mockResolvedValue({ id: 1, password: current } as never);
    const res = await request(app)
      .post(`${base}/auth/change-password`)
      .set('Authorization', auth())
      .send({ currentPassword: 'wrong-current', newPassword: 'new-password-123' });
    expect(res.status).toBe(400);
  });
});

describe('Error handler translates Prisma errors', () => {
  it('maps a P2002 unique violation to 409', async () => {
    prismaMock.kategori.findUnique.mockResolvedValue(null as never);
    prismaMock.kategori.create.mockRejectedValue(
      new Prisma.PrismaClientKnownRequestError('Unique constraint', {
        code: 'P2002',
        clientVersion: '5.22.0',
        meta: { target: ['slug'] },
      }) as never
    );
    const res = await request(app).post(`${base}/kategori`).set('Authorization', auth()).send({ name: 'Duplikat' });
    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('logs out and clears the cookie', async () => {
    const res = await request(app).post(`${base}/auth/logout`);
    expect(res.status).toBe(200);
    expect(res.body.data.loggedOut).toBe(true);
  });
});

describe('Reservasi delete', () => {
  it('deletes a reservation', async () => {
    prismaMock.reservasi.findUnique.mockResolvedValue({ id: 1 } as never);
    prismaMock.reservasi.delete.mockResolvedValue({ id: 1 } as never);
    const res = await request(app).delete(`${base}/reservasi/1`).set('Authorization', auth());
    expect(res.status).toBe(200);
  });
});
