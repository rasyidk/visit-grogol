import { prisma } from '../../config/prisma';
import { ApiError } from '../../utils/ApiError';
import { comparePassword, hashPassword } from '../../utils/password';
import { signAccessToken, signRefreshToken } from '../../utils/jwt';

const publicUser = {
  id: true,
  name: true,
  email: true,
  role: true,
  avatar: true,
  isActive: true,
  lastLogin: true,
  createdAt: true,
} as const;

export const authService = {
  async login(email: string, password: string) {
    const user = await prisma.adminUser.findUnique({ where: { email } });
    if (!user || !user.isActive) throw ApiError.unauthorized('Invalid credentials');

    const ok = await comparePassword(password, user.password);
    if (!ok) throw ApiError.unauthorized('Invalid credentials');

    await prisma.adminUser.update({ where: { id: user.id }, data: { lastLogin: new Date() } });

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      accessToken: signAccessToken(payload),
      refreshToken: signRefreshToken(payload),
    };
  },

  async me(userId: number) {
    const user = await prisma.adminUser.findUnique({ where: { id: userId }, select: publicUser });
    if (!user) throw ApiError.notFound('User not found');
    return user;
  },

  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await prisma.adminUser.findUnique({ where: { id: userId } });
    if (!user) throw ApiError.notFound('User not found');

    const ok = await comparePassword(currentPassword, user.password);
    if (!ok) throw ApiError.badRequest('Current password is incorrect');

    await prisma.adminUser.update({
      where: { id: userId },
      data: { password: await hashPassword(newPassword) },
    });
    return { updated: true };
  },
};
