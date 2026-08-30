import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { createCrudService, PrismaDelegate } from '../../core/crudService';
import { createCrudRouter } from '../../core/crudRouter';
import { bodySchema, zInt, zOptionalString } from '../../utils/zodHelpers';

const createSchema = bodySchema({
  title: z.string().trim().min(2).max(180),
  titleEn: zOptionalString,
  videoUrl: z.string().trim().url('videoUrl must be a valid URL').max(400),
  thumbnail: zOptionalString,
  description: zOptionalString,
  descriptionEn: zOptionalString,
  position: zInt.min(0).optional(),
});

const updateSchema = bodySchema({
  title: z.string().trim().min(2).max(180).optional(),
  titleEn: zOptionalString,
  videoUrl: z.string().trim().url().max(400).optional(),
  thumbnail: zOptionalString,
  description: zOptionalString,
  descriptionEn: zOptionalString,
  position: zInt.min(0).optional(),
});

const service = createCrudService(prisma.galeriVideo as unknown as PrismaDelegate, {
  resourceName: 'Galeri Video',
  query: {
    searchable: ['title', 'description'],
    sortable: ['title', 'position', 'createdAt'],
    defaultSort: { field: 'position', order: 'asc' },
  },
});

export default createCrudRouter({ service, resourceName: 'Galeri Video', createSchema, updateSchema });
