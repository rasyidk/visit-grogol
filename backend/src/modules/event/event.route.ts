import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { createCrudService, PrismaDelegate } from '../../core/crudService';
import { createCrudRouter } from '../../core/crudRouter';
import { bodySchema, zBool, zDate, zInt, zOptionalString } from '../../utils/zodHelpers';
import { uniqueSlug } from '../../utils/slug';

const createSchema = bodySchema({
  title: z.string().trim().min(3).max(200),
  titleEn: zOptionalString,
  description: z.string().trim().min(10),
  descriptionEn: zOptionalString,
  thumbnail: z.string().trim().min(1),
  startDate: zDate,
  content: zOptionalString,
  contentEn: zOptionalString,
  location: zOptionalString,
  endDate: zDate.optional(),
  ticketPrice: zInt.min(0).optional(),
  isPublished: zBool.optional(),
});

const updateSchema = bodySchema({
  title: z.string().trim().min(3).max(200).optional(),
  titleEn: zOptionalString,
  description: z.string().trim().min(10).optional(),
  descriptionEn: zOptionalString,
  thumbnail: z.string().trim().min(1).optional(),
  startDate: zDate.optional(),
  content: zOptionalString,
  contentEn: zOptionalString,
  location: zOptionalString,
  endDate: zDate.optional(),
  ticketPrice: zInt.min(0).optional(),
  isPublished: zBool.optional(),
});

const service = createCrudService(prisma.event as unknown as PrismaDelegate, {
  resourceName: 'Event',
  query: {
    searchable: ['title', 'description', 'location'],
    sortable: ['title', 'startDate', 'createdAt'],
    filterable: { isPublished: 'boolean' },
    defaultSort: { field: 'startDate', order: 'asc' },
  },
  async beforeCreate(data: Record<string, unknown>) {
    const slug = await uniqueSlug(String(data.title), (s) =>
      prisma.event.findUnique({ where: { slug: s } }).then(Boolean)
    );
    return { ...data, slug };
  },
  async beforeUpdate(data: Record<string, unknown>, id) {
    if (data.title) {
      data.slug = await uniqueSlug(String(data.title), (s) =>
        prisma.event.findFirst({ where: { slug: s, NOT: { id } } }).then(Boolean)
      );
    }
    return data;
  },
});

export default createCrudRouter({
  service,
  resourceName: 'Event',
  createSchema,
  updateSchema,
  slugField: 'slug',
});
