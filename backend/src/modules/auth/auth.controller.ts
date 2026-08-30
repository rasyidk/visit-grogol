import { Request, Response } from 'express';
import { authService } from './auth.service';
import { sendSuccess } from '../../utils/apiResponse';
import { env } from '../../config/env';

const cookieOpts = {
  httpOnly: true,
  secure: env.isProd,
  sameSite: (env.isProd ? 'none' : 'lax') as 'none' | 'lax',
  domain: env.isProd ? '.visitgrogolkaloka.com' : undefined,
  maxAge: 24 * 60 * 60 * 1000,
};

export const authController = {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.cookie('access_token', result.accessToken, cookieOpts);
    sendSuccess(res, result, 'Login successful');
  },

  async logout(_req: Request, res: Response) {
    res.clearCookie('access_token');
    sendSuccess(res, { loggedOut: true }, 'Logout successful');
  },

  async me(req: Request, res: Response) {
    const user = await authService.me(req.user!.sub);
    sendSuccess(res, user, 'Current user');
  },

  async changePassword(req: Request, res: Response) {
    const { currentPassword, newPassword } = req.body;
    const result = await authService.changePassword(req.user!.sub, currentPassword, newPassword);
    sendSuccess(res, result, 'Password changed');
  },
};
