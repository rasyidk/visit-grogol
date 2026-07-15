import { prismaMock } from '../helpers/prismaMock';
import request from 'supertest';
import { createApp } from '@/app';
import { superadminToken, adminToken, bearer } from '../helpers/token';

const app = createApp();
const base = '/api/v1';
const auth = () => bearer(superadminToken());

describe('Kategori CRUD', () => {
  it('creates a kategori and generates a slug', async () => {
    prismaMock.kategori.findUnique.mockResolvedValue(null as never);
    prismaMock.kategori.create.mockImplementation((((args: any) => Promise.resolve(args.data)) as never));
    const res = await request(app).post(`${base}/kategori`).set('Authorization', auth()).send({ name: 'Alam Liar' });
    expect(res.status).toBe(201);
    expect(res.body.data.slug).toBe('alam-liar');
  });

  it('updates a kategori', async () => {
    prismaMock.kategori.findUnique.mockResolvedValue({ id: 1, name: 'Alam' } as never);
    prismaMock.kategori.findFirst.mockResolvedValue(null as never);
    prismaMock.kategori.update.mockResolvedValue({ id: 1, name: 'Alam Asri', slug: 'alam-asri' } as never);
    const res = await request(app).put(`${base}/kategori/1`).set('Authorization', auth()).send({ name: 'Alam Asri' });
    expect(res.status).toBe(200);
    expect(res.body.data.slug).toBe('alam-asri');
  });

  it('looks up by slug', async () => {
    prismaMock.kategori.findFirst.mockResolvedValue({ id: 1, slug: 'alam' } as never);
    const res = await request(app).get(`${base}/kategori/slug/alam`);
    expect(res.status).toBe(200);
  });
});

describe('Berita & Event date handling', () => {
  it('creates berita and stamps publishedAt when published', async () => {
    prismaMock.berita.findUnique.mockResolvedValue(null as never);
    prismaMock.berita.create.mockImplementation((((args: any) => Promise.resolve(args.data)) as never));
    const res = await request(app)
      .post(`${base}/berita`)
      .set('Authorization', auth())
      .send({ title: 'Berita Uji Coba', content: 'Konten yang cukup panjang.', thumbnail: 'x.jpg', isPublished: true });
    expect(res.status).toBe(201);
    expect(res.body.data.publishedAt).toBeDefined();
  });

  it('creates an event with a start date', async () => {
    prismaMock.event.findUnique.mockResolvedValue(null as never);
    prismaMock.event.create.mockImplementation((((args: any) => Promise.resolve(args.data)) as never));
    const res = await request(app)
      .post(`${base}/event`)
      .set('Authorization', auth())
      .send({ title: 'Festival Uji', description: 'Deskripsi panjang event.', thumbnail: 'x.jpg', startDate: '2024-12-01' });
    expect(res.status).toBe(201);
    expect(res.body.data.slug).toBe('festival-uji');
  });
});

describe('Reservasi (public + admin)', () => {
  it('accepts a public reservation submission', async () => {
    prismaMock.reservasi.create.mockImplementation((((args: any) => Promise.resolve({ id: 1, ...args.data })) as never));
    const res = await request(app)
      .post(`${base}/reservasi`)
      .send({ name: 'Budi', email: 'budi@example.com', guests: 2, packageType: 'Full Day' });
    expect(res.status).toBe(201);
  });

  it('validates reservation email', async () => {
    const res = await request(app).post(`${base}/reservasi`).send({ name: 'Budi', email: 'bad' });
    expect(res.status).toBe(422);
  });

  it('lets an admin update reservation status', async () => {
    prismaMock.reservasi.findUnique.mockResolvedValue({ id: 1 } as never);
    prismaMock.reservasi.update.mockResolvedValue({ id: 1, status: 'CONFIRMED' } as never);
    const res = await request(app)
      .patch(`${base}/reservasi/1/status`)
      .set('Authorization', auth())
      .send({ status: 'CONFIRMED' });
    expect(res.status).toBe(200);
    expect(res.body.data.status).toBe('CONFIRMED');
  });
});

describe('Newsletter', () => {
  it('subscribes an email (idempotent upsert)', async () => {
    prismaMock.newsletterSubscriber.upsert.mockResolvedValue({ id: 1, email: 'a@b.co' } as never);
    const res = await request(app).post(`${base}/newsletter`).send({ email: 'a@b.co' });
    expect(res.status).toBe(201);
  });

  it('lists subscribers for admins', async () => {
    prismaMock.newsletterSubscriber.findMany.mockResolvedValue([{ id: 1, email: 'a@b.c' }] as never);
    prismaMock.newsletterSubscriber.count.mockResolvedValue(1 as never);
    const res = await request(app).get(`${base}/newsletter`).set('Authorization', auth());
    expect(res.status).toBe(200);
    expect(res.body.meta.total).toBe(1);
  });
});

describe('Singletons (profil & kontak)', () => {
  it('returns the profil, creating it if missing', async () => {
    prismaMock.profilWebsite.findFirst.mockResolvedValue(null as never);
    prismaMock.profilWebsite.create.mockResolvedValue({ id: 1, siteName: 'VisitGrogol' } as never);
    const res = await request(app).get(`${base}/profil`);
    expect(res.status).toBe(200);
    expect(res.body.data.siteName).toBe('VisitGrogol');
  });

  it('updates the kontak singleton', async () => {
    prismaMock.kontak.findFirst.mockResolvedValue({ id: 1 } as never);
    prismaMock.kontak.update.mockResolvedValue({ id: 1, whatsapp: '+62812' } as never);
    const res = await request(app).put(`${base}/kontak`).set('Authorization', auth()).send({ whatsapp: '+62812' });
    expect(res.status).toBe(200);
  });
});

describe('Authorization rules', () => {
  it('forbids a plain ADMIN from creating admin users (SUPERADMIN only)', async () => {
    const res = await request(app)
      .post(`${base}/admin-users`)
      .set('Authorization', bearer(adminToken()))
      .send({ name: 'X', email: 'x@x.id', password: 'password123' });
    expect(res.status).toBe(403);
  });

  it('allows SUPERADMIN to create an admin user (password hidden)', async () => {
    prismaMock.adminUser.create.mockResolvedValue({ id: 3, name: 'Xavier', email: 'x@x.id', role: 'ADMIN' } as never);
    const res = await request(app)
      .post(`${base}/admin-users`)
      .set('Authorization', auth())
      .send({ name: 'Xavier', email: 'x@x.id', password: 'password123' });
    expect(res.status).toBe(201);
    expect(res.body.data.password).toBeUndefined();
  });
});

describe('Stats & upload guards', () => {
  it('requires auth for stats', async () => {
    const res = await request(app).get(`${base}/stats`);
    expect(res.status).toBe(401);
  });

  it('returns dashboard stats for an authenticated admin', async () => {
    prismaMock.destinasi.count.mockResolvedValue(6 as never);
    prismaMock.kategori.count.mockResolvedValue(5 as never);
    prismaMock.berita.count.mockResolvedValue(3 as never);
    prismaMock.event.count.mockResolvedValue(3 as never);
    prismaMock.galeriFoto.count.mockResolvedValue(6 as never);
    prismaMock.galeriVideo.count.mockResolvedValue(2 as never);
    prismaMock.testimoni.count.mockResolvedValue(3 as never);
    prismaMock.banner.count.mockResolvedValue(2 as never);
    prismaMock.reservasi.count.mockResolvedValue(2 as never);
    prismaMock.newsletterSubscriber.count.mockResolvedValue(1 as never);
    prismaMock.adminUser.count.mockResolvedValue(2 as never);
    prismaMock.destinasi.findMany.mockResolvedValue([] as never);
    prismaMock.reservasi.findMany.mockResolvedValue([] as never);
    prismaMock.event.findMany.mockResolvedValue([] as never);
    const res = await request(app).get(`${base}/stats`).set('Authorization', auth());
    expect(res.status).toBe(200);
    expect(res.body.data.counts.destinasi).toBe(6);
  });

  it('rejects unauthenticated uploads', async () => {
    const res = await request(app).post(`${base}/upload`);
    expect(res.status).toBe(401);
  });
});

describe('404 + error envelope', () => {
  it('returns a consistent 404 for unknown routes', async () => {
    const res = await request(app).get(`${base}/does-not-exist`);
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
