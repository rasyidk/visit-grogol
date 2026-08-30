import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { createCrudService, PrismaDelegate } from '../../core/crudService';
import { createCrudRouter } from '../../core/crudRouter';
import { bodySchema, zBool, zInt, zNumber, zOptionalString } from '../../utils/zodHelpers';
import { uniqueSlug } from '../../utils/slug';

const baseFields = {
  excerpt: zOptionalString,
  excerptEn: zOptionalString,
  content: zOptionalString,
  contentEn: zOptionalString,
  address: zOptionalString,
  latitude: zNumber.optional(),
  longitude: zNumber.optional(),
  price: zInt.min(0).optional(),
  priceForeign: zInt.min(0).optional(),
  openHours: zOptionalString,
  rating: zNumber.min(0).max(5).optional(),
  images: z.array(z.string()).optional(),
  facilities: z.array(z.string()).optional(),
  isFeatured: zBool.optional(),
  isPublished: zBool.optional(),
};

const createSchema = bodySchema({
  title: z.string().trim().min(3).max(180),
  titleEn: zOptionalString,
  description: z.string().trim().min(10),
  descriptionEn: zOptionalString,
  location: z.string().trim().min(2).max(180),
  thumbnail: z.string().trim().min(1),
  kategoriId: zInt.positive(),
  ...baseFields,
});

const updateSchema = bodySchema({
  title: z.string().trim().min(3).max(180).optional(),
  titleEn: zOptionalString,
  description: z.string().trim().min(10).optional(),
  descriptionEn: zOptionalString,
  location: z.string().trim().min(2).max(180).optional(),
  thumbnail: z.string().trim().min(1).optional(),
  kategoriId: zInt.positive().optional(),
  ...baseFields,
});

const service = createCrudService(prisma.destinasi as unknown as PrismaDelegate, {
  resourceName: 'Destinasi',
  include: { kategori: { select: { id: true, name: true, nameEn: true, slug: true } } },
  query: {
    searchable: ['title', 'description', 'location'],
    sortable: ['title', 'price', 'rating', 'views', 'createdAt', 'updatedAt'],
    filterable: { kategoriId: 'number', isFeatured: 'boolean', isPublished: 'boolean' },
    defaultSort: { field: 'createdAt', order: 'desc' },
  },
  async beforeCreate(data: Record<string, unknown>) {
    const slug = await uniqueSlug(String(data.title), (s) =>
      prisma.destinasi.findUnique({ where: { slug: s } }).then(Boolean)
    );
    return { ...data, slug };
  },
  async beforeUpdate(data: Record<string, unknown>, id) {
    if (data.title) {
      data.slug = await uniqueSlug(String(data.title), (s) =>
        prisma.destinasi.findFirst({ where: { slug: s, NOT: { id } } }).then(Boolean)
      );
    }
    return data;
  },
});

export default createCrudRouter({
  service,
  resourceName: 'Destinasi',
  createSchema,
  updateSchema,
  slugField: 'slug',
});
