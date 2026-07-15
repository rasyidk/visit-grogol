import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { createCrudService, PrismaDelegate } from '../../core/crudService';
import { createCrudRouter } from '../../core/crudRouter';
import { bodySchema, zOptionalString } from '../../utils/zodHelpers';
import { uniqueSlug } from '../../utils/slug';

const createSchema = bodySchema({
  name: z.string().trim().min(2).max(120),
  description: zOptionalString,
  icon: zOptionalString,
  color: zOptionalString,
});

const updateSchema = bodySchema({
  name: z.string().trim().min(2).max(120).optional(),
  description: zOptionalString,
  icon: zOptionalString,
  color: zOptionalString,
});

const service = createCrudService(prisma.kategori as unknown as PrismaDelegate, {
  resourceName: 'Kategori',
  query: {
    searchable: ['name', 'description'],
    sortable: ['name', 'createdAt', 'updatedAt'],
    defaultSort: { field: 'name', order: 'asc' },
  },
  async beforeCreate(data: Record<string, unknown>) {
    const slug = await uniqueSlug(String(data.name), (s) =>
      prisma.kategori.findUnique({ where: { slug: s } }).then(Boolean)
    );
    return { ...data, slug };
  },
  async beforeUpdate(data: Record<string, unknown>, id) {
    if (data.name) {
      data.slug = await uniqueSlug(String(data.name), (s) =>
        prisma.kategori.findFirst({ where: { slug: s, NOT: { id } } }).then(Boolean)
      );
    }
    return data;
  },
});

export default createCrudRouter({
  service,
  resourceName: 'Kategori',
  createSchema,
  updateSchema,
  slugField: 'slug',
});
