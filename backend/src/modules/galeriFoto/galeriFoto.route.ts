import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { createCrudService, PrismaDelegate } from '../../core/crudService';
import { createCrudRouter } from '../../core/crudRouter';
import { bodySchema, zInt, zOptionalString } from '../../utils/zodHelpers';

const createSchema = bodySchema({
  title: z.string().trim().min(2).max(180),
  titleEn: zOptionalString,
  image: z.string().trim().min(1),
  caption: zOptionalString,
  captionEn: zOptionalString,
  category: zOptionalString,
  position: zInt.min(0).optional(),
});

const updateSchema = bodySchema({
  title: z.string().trim().min(2).max(180).optional(),
  titleEn: zOptionalString,
  image: z.string().trim().min(1).optional(),
  caption: zOptionalString,
  captionEn: zOptionalString,
  category: zOptionalString,
  position: zInt.min(0).optional(),
});

const service = createCrudService(prisma.galeriFoto as unknown as PrismaDelegate, {
  resourceName: 'Galeri Foto',
  query: {
    searchable: ['title', 'caption', 'category'],
    sortable: ['title', 'position', 'createdAt'],
    filterable: { category: 'string' },
    defaultSort: { field: 'position', order: 'asc' },
  },
});

export default createCrudRouter({ service, resourceName: 'Galeri Foto', createSchema, updateSchema });
