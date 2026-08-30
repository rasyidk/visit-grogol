import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { createCrudService, PrismaDelegate } from '../../core/crudService';
import { createCrudRouter } from '../../core/crudRouter';
import { bodySchema, zBool, zDate, zOptionalString } from '../../utils/zodHelpers';
import { uniqueSlug } from '../../utils/slug';

const createSchema = bodySchema({
  title: z.string().trim().min(3).max(200),
  titleEn: zOptionalString,
  content: z.string().trim().min(10),
  contentEn: zOptionalString,
  thumbnail: z.string().trim().min(1),
  excerpt: zOptionalString,
  excerptEn: zOptionalString,
  author: zOptionalString,
  category: zOptionalString,
  tags: z.array(z.string()).optional(),
  isPublished: zBool.optional(),
  publishedAt: zDate.optional(),
});

const updateSchema = bodySchema({
  title: z.string().trim().min(3).max(200).optional(),
  titleEn: zOptionalString,
  content: z.string().trim().min(10).optional(),
  contentEn: zOptionalString,
  thumbnail: z.string().trim().min(1).optional(),
  excerpt: zOptionalString,
  excerptEn: zOptionalString,
  author: zOptionalString,
  category: zOptionalString,
  tags: z.array(z.string()).optional(),
  isPublished: zBool.optional(),
  publishedAt: zDate.optional(),
});

const service = createCrudService(prisma.berita as unknown as PrismaDelegate, {
  resourceName: 'Berita',
  query: {
    searchable: ['title', 'content', 'category'],
    sortable: ['title', 'views', 'publishedAt', 'createdAt'],
    filterable: { isPublished: 'boolean', category: 'string' },
    defaultSort: { field: 'createdAt', order: 'desc' },
  },
  async beforeCreate(data: Record<string, unknown>) {
    const slug = await uniqueSlug(String(data.title), (s) =>
      prisma.berita.findUnique({ where: { slug: s } }).then(Boolean)
    );
    if (data.isPublished && !data.publishedAt) data.publishedAt = new Date();
    return { ...data, slug };
  },
  async beforeUpdate(data: Record<string, unknown>, id) {
    if (data.title) {
      data.slug = await uniqueSlug(String(data.title), (s) =>
        prisma.berita.findFirst({ where: { slug: s, NOT: { id } } }).then(Boolean)
      );
    }
    if (data.isPublished && !data.publishedAt) data.publishedAt = new Date();
    return data;
  },
});

export default createCrudRouter({
  service,
  resourceName: 'Berita',
  createSchema,
  updateSchema,
  slugField: 'slug',
});
