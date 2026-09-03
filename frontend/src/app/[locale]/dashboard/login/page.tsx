'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Leaf, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import { useAuthActions } from '@/hooks/useAuth';
import { getApiErrorMessage } from '@/lib/api';

const schema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
});
type Values = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthActions();
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });

  const onSubmit = async (values: Values) => {
    try {
      await login(values.email, values.password);
      toast.success('Selamat datang kembali!');
      router.push('/dashboard');
    } catch (err) {
      toast.error(getApiErrorMessage(err, 'Login gagal'));
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-950 p-4">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/admin-bg/1600/1000')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/80 to-brand-950/90" />

      <div className="glass-strong relative w-full max-w-md rounded-4xl p-8 sm:p-10">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-full shadow-soft bg-white">
            <img src="/logo.png" alt="Visit Grogol Kaloka" className="h-full w-full object-cover" />
          </span>
          <h1 className="mt-4 text-2xl font-bold text-ink">CMS Visit Grogol Kaloka</h1>
          <p className="mt-1 text-sm text-ink-muted">Masuk untuk mengelola konten website</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="field-label">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input className="field-input pl-10" {...register('email')} />
            </div>
            {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>

          <div>
            <label className="field-label">Password</label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
              <input
                type={show ? 'text' : 'password'}
                className="field-input pl-10 pr-10"
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink cursor-pointer z-10"
                aria-label="Toggle password"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
            {isSubmitting ? 'Memproses…' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  );
}
