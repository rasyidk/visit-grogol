import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { createCrudService, PrismaDelegate } from '../../core/crudService';
import { createCrudRouter } from '../../core/crudRouter';
import { bodySchema, zBool, zInt, zOptionalString } from '../../utils/zodHelpers';

const createSchema = bodySchema({
  title: z.string().trim().min(2).max(180),
  subtitle: zOptionalString,
  image: z.string().trim().min(1),
  link: zOptionalString,
  ctaLabel: zOptionalString,
  position: zInt.min(0).optional(),
  isActive: zBool.optional(),
});

const updateSchema = bodySchema({
  title: z.string().trim().min(2).max(180).optional(),
  subtitle: zOptionalString,
  image: z.string().trim().min(1).optional(),
  link: zOptionalString,
  ctaLabel: zOptionalString,
  position: zInt.min(0).optional(),
  isActive: zBool.optional(),
});

const service = createCrudService(prisma.banner as unknown as PrismaDelegate, {
  resourceName: 'Banner',
  query: {
    searchable: ['title', 'subtitle'],
    sortable: ['position', 'title', 'createdAt'],
    filterable: { isActive: 'boolean' },
    defaultSort: { field: 'position', order: 'asc' },
  },
});

export default createCrudRouter({ service, resourceName: 'Banner', createSchema, updateSchema });
