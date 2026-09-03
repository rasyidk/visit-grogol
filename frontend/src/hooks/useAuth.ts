'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api, fetchOne, tokenStore } from '@/lib/api';
import type { AdminUser } from '@/lib/types';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: () => fetchOne<AdminUser>('/api/user'),
    retry: false,
    enabled: typeof window !== 'undefined' && !!tokenStore.get(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAuthActions() {
  const router = useRouter();
  const qc = useQueryClient();

  const login = async (email: string, password: string) => {
    const res = await api.post<{ access_token: string; user: AdminUser }>('/api/login', {
      email,
      password,
    });
    tokenStore.set(res.data.access_token);
    await qc.invalidateQueries({ queryKey: ['me'] });
    return res.data.user;
  };

  const logout = async () => {
    try {
      await api.post('/api/logout');
    } catch {
      /* ignore network errors on logout */
    }
    tokenStore.clear();
    qc.clear();
    router.push('/admin/login');
  };

  return { login, logout };
}
