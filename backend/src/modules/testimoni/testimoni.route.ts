import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { createCrudService, PrismaDelegate } from '../../core/crudService';
import { createCrudRouter } from '../../core/crudRouter';
import { bodySchema, zBool, zInt, zOptionalString } from '../../utils/zodHelpers';

const createSchema = bodySchema({
  name: z.string().trim().min(2).max(140),
  message: z.string().trim().min(5),
  role: zOptionalString,
  origin: zOptionalString,
  avatar: zOptionalString,
  rating: zInt.min(1).max(5).optional(),
  isApproved: zBool.optional(),
  position: zInt.min(0).optional(),
});

const updateSchema = bodySchema({
  name: z.string().trim().min(2).max(140).optional(),
  message: z.string().trim().min(5).optional(),
  role: zOptionalString,
  origin: zOptionalString,
  avatar: zOptionalString,
  rating: zInt.min(1).max(5).optional(),
  isApproved: zBool.optional(),
  position: zInt.min(0).optional(),
});

const service = createCrudService(prisma.testimoni as unknown as PrismaDelegate, {
  resourceName: 'Testimoni',
  query: {
    searchable: ['name', 'message', 'origin'],
    sortable: ['name', 'rating', 'position', 'createdAt'],
    filterable: { isApproved: 'boolean' },
    defaultSort: { field: 'position', order: 'asc' },
  },
});

export default createCrudRouter({ service, resourceName: 'Testimoni', createSchema, updateSchema });
