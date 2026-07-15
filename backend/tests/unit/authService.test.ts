import { prismaMock } from '../helpers/prismaMock';
import { authService } from '@/modules/auth/auth.service';
import { hashPassword } from '@/utils/password';

describe('authService.login', () => {
  it('returns tokens for valid credentials', async () => {
    const password = await hashPassword('Admin@12345');
    prismaMock.adminUser.findUnique.mockResolvedValue({
      id: 1,
      name: 'Super Admin',
      email: 'admin@visitgrogol.id',
      password,
      role: 'SUPERADMIN',
      avatar: null,
      isActive: true,
      lastLogin: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as never);
    prismaMock.adminUser.update.mockResolvedValue({} as never);

    const result = await authService.login('admin@visitgrogol.id', 'Admin@12345');
    expect(result.accessToken).toBeDefined();
    expect(result.user.email).toBe('admin@visitgrogol.id');
  });

  it('rejects an unknown user', async () => {
    prismaMock.adminUser.findUnique.mockResolvedValue(null as never);
    await expect(authService.login('ghost@x.id', 'whatever')).rejects.toMatchObject({
      statusCode: 401,
    });
  });

  it('rejects a wrong password', async () => {
    const password = await hashPassword('correct-password');
    prismaMock.adminUser.findUnique.mockResolvedValue({
      id: 1,
      email: 'admin@visitgrogol.id',
      password,
      role: 'ADMIN',
      isActive: true,
    } as never);
    await expect(authService.login('admin@visitgrogol.id', 'wrong')).rejects.toMatchObject({
      statusCode: 401,
    });
  });

  it('rejects an inactive account', async () => {
    prismaMock.adminUser.findUnique.mockResolvedValue({
      id: 1,
      email: 'x@x.id',
      password: 'hash',
      role: 'ADMIN',
      isActive: false,
    } as never);
    await expect(authService.login('x@x.id', 'whatever')).rejects.toMatchObject({ statusCode: 401 });
  });
});
