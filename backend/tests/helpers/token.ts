import { signAccessToken } from '@/utils/jwt';

export const superadminToken = () =>
  signAccessToken({ sub: 1, email: 'admin@visitgrogol.id', role: 'SUPERADMIN' });

export const adminToken = () =>
  signAccessToken({ sub: 2, email: 'editor@visitgrogol.id', role: 'ADMIN' });

export const bearer = (token: string) => `Bearer ${token}`;
