import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email('Valid email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
  }),
});

export type LoginInput = z.infer<typeof loginSchema>['body'];
