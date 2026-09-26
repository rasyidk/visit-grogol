import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { createCrudService, PrismaDelegate } from '../../core/crudService';
import { createCrudRouter } from '../../core/crudRouter';
import { bodySchema, zBool, zInt, zOptionalString } from '../../utils/zodHelpers';

const platform = z.enum(['INSTAGRAM', 'TIKTOK', 'FACEBOOK']);

const createSchema = bodySchema({
  platform,
  name: z.string().trim().min(2).max(120),
  username: zOptionalString,
  url: z.string().trim().url().max(500),
  isActive: zBool.optional(),
  position: zInt.min(0).optional(),
});

const updateSchema = bodySchema({
  platform: platform.optional(),
  name: z.string().trim().min(2).max(120).optional(),
  username: zOptionalString,
  url: z.string().trim().url().max(500).optional(),
  isActive: zBool.optional(),
  position: zInt.min(0).optional(),
});

const service = createCrudService(prisma.socialMedia as unknown as PrismaDelegate, {
  resourceName: 'Media Sosial',
  query: {
    searchable: ['name', 'username', 'platform'],
    sortable: ['platform', 'name', 'position', 'createdAt'],
    filterable: { platform: 'string', isActive: 'boolean' },
    defaultSort: { field: 'position', order: 'asc' },
  },
});

export default createCrudRouter({ service, resourceName: 'Media Sosial', createSchema, updateSchema });
