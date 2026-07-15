import { prismaMock } from '../helpers/prismaMock';
import request from 'supertest';
import { createApp } from '@/app';
import { superadminToken, bearer } from '../helpers/token';

const app = createApp();
const base = '/api/v1/destinasi';

const sample = {
  id: 1,
  title: 'Danau Cermin',
  slug: 'danau-cermin',
  description: 'Danau alami yang tenang.',
  location: 'Desa Grogol',
  thumbnail: 'https://img/x.jpg',
  kategoriId: 1,
  price: 10000,
  rating: 4.7,
  isPublished: true,
};

describe('GET /destinasi (public)', () => {
  it('returns a paginated list', async () => {
    prismaMock.destinasi.findMany.mockResolvedValue([sample] as never);
    prismaMock.destinasi.count.mockResolvedValue(1 as never);

    const res = await request(app).get(`${base}?page=1&limit=10`);
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(1);
    expect(res.body.meta).toMatchObject({ total: 1, page: 1 });
  });

  it('supports search queries', async () => {
    prismaMock.destinasi.findMany.mockResolvedValue([] as never);
    prismaMock.destinasi.count.mockResolvedValue(0 as never);
    const res = await request(app).get(`${base}?search=danau`);
    expect(res.status).toBe(200);
    expect(prismaMock.destinasi.findMany).toHaveBeenCalled();
  });
});

describe('GET /destinasi/:id', () => {
  it('returns a single destinasi', async () => {
    prismaMock.destinasi.findUnique.mockResolvedValue(sample as never);
    const res = await request(app).get(`${base}/1`);
    expect(res.status).toBe(200);
    expect(res.body.data.slug).toBe('danau-cermin');
  });

  it('returns 404 when not found', async () => {
    prismaMock.destinasi.findUnique.mockResolvedValue(null as never);
    const res = await request(app).get(`${base}/999`);
    expect(res.status).toBe(404);
  });

  it('returns 400 for an invalid id', async () => {
    const res = await request(app).get(`${base}/abc`);
    expect(res.status).toBe(400);
  });
});

describe('POST /destinasi (protected)', () => {
  it('rejects unauthenticated requests', async () => {
    const res = await request(app).post(base).send(sample);
    expect(res.status).toBe(401);
  });

  it('rejects invalid payloads with 422', async () => {
    const res = await request(app)
      .post(base)
      .set('Authorization', bearer(superadminToken()))
      .send({ title: 'x' }); // too short + missing required
    expect(res.status).toBe(422);
    expect(res.body.errors).toBeDefined();
  });

  it('creates a destinasi with valid data', async () => {
    prismaMock.destinasi.findUnique.mockResolvedValue(null as never); // slug uniqueness check
    prismaMock.destinasi.create.mockResolvedValue({ ...sample } as never);

    const res = await request(app)
      .post(base)
      .set('Authorization', bearer(superadminToken()))
      .send({
        title: 'Danau Cermin',
        description: 'Danau alami yang tenang dan asri.',
        location: 'Desa Grogol',
        thumbnail: 'https://img/x.jpg',
        kategoriId: 1,
      });

    expect(res.status).toBe(201);
    expect(prismaMock.destinasi.create).toHaveBeenCalled();
    expect(res.body.data.slug).toBe('danau-cermin');
  });
});

describe('DELETE /destinasi/:id (protected)', () => {
  it('deletes an existing destinasi', async () => {
    prismaMock.destinasi.findUnique.mockResolvedValue(sample as never);
    prismaMock.destinasi.delete.mockResolvedValue(sample as never);
    const res = await request(app).delete(`${base}/1`).set('Authorization', bearer(superadminToken()));
    expect(res.status).toBe(200);
    expect(prismaMock.destinasi.delete).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('returns 404 when deleting a missing record', async () => {
    prismaMock.destinasi.findUnique.mockResolvedValue(null as never);
    const res = await request(app).delete(`${base}/5`).set('Authorization', bearer(superadminToken()));
    expect(res.status).toBe(404);
  });
});
