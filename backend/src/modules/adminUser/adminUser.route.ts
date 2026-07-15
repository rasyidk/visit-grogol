import { z } from 'zod';
import { prisma } from '../../config/prisma';
import { createCrudService, PrismaDelegate } from '../../core/crudService';
import { createCrudRouter } from '../../core/crudRouter';
import { bodySchema, zBool, zOptionalString } from '../../utils/zodHelpers';
import { hashPassword } from '../../utils/password';

const safeSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  avatar: true,
  isActive: true,
  lastLogin: true,
  createdAt: true,
  updatedAt: true,
};

const createSchema = bodySchema({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['ADMIN', 'SUPERADMIN']).optional(),
  avatar: zOptionalString,
  isActive: zBool.optional(),
});

const updateSchema = bodySchema({
  name: z.string().trim().min(2).max(120).optional(),
  email: z.string().trim().email().optional(),
  password: z.string().min(8).optional(),
  role: z.enum(['ADMIN', 'SUPERADMIN']).optional(),
  avatar: zOptionalString,
  isActive: zBool.optional(),
});

const service = createCrudService(prisma.adminUser as unknown as PrismaDelegate, {
  resourceName: 'Pengguna Admin',
  select: safeSelect,
  query: {
    searchable: ['name', 'email'],
    sortable: ['name', 'email', 'role', 'createdAt'],
    filterable: { role: 'string', isActive: 'boolean' },
    defaultSort: { field: 'createdAt', order: 'desc' },
  },
  async beforeCreate(data: Record<string, unknown>) {
    return { ...data, password: await hashPassword(String(data.password)) };
  },
  async beforeUpdate(data: Record<string, unknown>) {
    if (data.password) data.password = await hashPassword(String(data.password));
    else delete data.password;
    return data;
  },
});

// User management is restricted to SUPERADMIN only.
export default createCrudRouter({
  service,
  resourceName: 'Pengguna Admin',
  createSchema,
  updateSchema,
  publicRead: false,
  writeRoles: ['SUPERADMIN'],
});
