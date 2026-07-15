import { hashPassword, comparePassword } from '@/utils/password';
import { signAccessToken, verifyAccessToken } from '@/utils/jwt';
import { toSlug, uniqueSlug } from '@/utils/slug';
import { buildPaginationMeta } from '@/utils/apiResponse';
import { buildPrismaQuery } from '@/utils/queryFeatures';
import { ApiError } from '@/utils/ApiError';
import { Request } from 'express';

describe('password util', () => {
  it('hashes and verifies a correct password', async () => {
    const hash = await hashPassword('secret123');
    expect(hash).not.toBe('secret123');
    expect(await comparePassword('secret123', hash)).toBe(true);
  });

  it('rejects an incorrect password', async () => {
    const hash = await hashPassword('secret123');
    expect(await comparePassword('wrong', hash)).toBe(false);
  });
});

describe('jwt util', () => {
  it('signs and verifies a token round-trip', () => {
    const token = signAccessToken({ sub: 5, email: 'a@b.c', role: 'ADMIN' });
    const payload = verifyAccessToken(token);
    expect(payload.sub).toBe(5);
    expect(payload.role).toBe('ADMIN');
  });

  it('throws on a tampered token', () => {
    expect(() => verifyAccessToken('not.a.token')).toThrow();
  });
});

describe('slug util', () => {
  it('slugifies text', () => {
    expect(toSlug('Air Terjun Pelangi!')).toBe('air-terjun-pelangi');
  });

  it('generates a unique slug by suffixing on collision', async () => {
    const taken = new Set(['danau-cermin']);
    const slug = await uniqueSlug('Danau Cermin', async (s) => taken.has(s));
    expect(slug).toBe('danau-cermin-1');
  });
});

describe('pagination meta', () => {
  it('computes totals and flags correctly', () => {
    const meta = buildPaginationMeta(25, 2, 10);
    expect(meta).toMatchObject({ total: 25, totalPages: 3, page: 2, hasNext: true, hasPrev: true });
  });

  it('handles the first page', () => {
    const meta = buildPaginationMeta(5, 1, 10);
    expect(meta).toMatchObject({ totalPages: 1, hasNext: false, hasPrev: false });
  });
});

describe('ApiError factory', () => {
  it('creates typed errors with status codes', () => {
    expect(ApiError.notFound().statusCode).toBe(404);
    expect(ApiError.badRequest().statusCode).toBe(400);
    expect(ApiError.unauthorized().statusCode).toBe(401);
    expect(ApiError.forbidden().statusCode).toBe(403);
    expect(ApiError.conflict().statusCode).toBe(409);
  });
});

describe('buildPrismaQuery', () => {
  const makeReq = (query: Record<string, unknown>) => ({ query } as unknown as Request);

  it('applies defaults for pagination and sort', () => {
    const result = buildPrismaQuery(makeReq({}), {
      searchable: ['title'],
      sortable: ['title'],
      defaultSort: { field: 'createdAt', order: 'desc' },
    });
    expect(result.take).toBe(10);
    expect(result.skip).toBe(0);
    expect(result.orderBy).toEqual({ createdAt: 'desc' });
  });

  it('builds a search OR clause across searchable fields', () => {
    const result = buildPrismaQuery(makeReq({ search: 'danau', page: '2', limit: '5' }), {
      searchable: ['title', 'location'],
      sortable: ['title'],
    });
    expect(result.skip).toBe(5);
    expect(result.where).toEqual({
      AND: [{ OR: [{ title: { contains: 'danau' } }, { location: { contains: 'danau' } }] }],
    });
  });

  it('ignores non-whitelisted sort fields and applies filters', () => {
    const result = buildPrismaQuery(makeReq({ sortBy: 'hacker', isFeatured: 'true', sortOrder: 'asc' }), {
      sortable: ['title'],
      filterable: { isFeatured: 'boolean' },
      defaultSort: { field: 'createdAt', order: 'desc' },
    });
    expect(result.orderBy).toEqual({ createdAt: 'asc' });
    expect(result.where).toEqual({ AND: [{ isFeatured: true }] });
  });
});
