'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { api, fetchOne, tokenStore } from '@/lib/api';
import type { AdminUser } from '@/lib/types';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => await fetchOne<AdminUser>('/user'),
    retry: false,
    enabled: typeof window !== 'undefined' && !!tokenStore.get(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useAuthActions() {
  const router = useRouter();
  const qc = useQueryClient();

  const login = async (email: string, password: string) => {
    const res = await api.post<{ access_token: string; user: AdminUser }>('/login', {
      email,
      password,
    });
    tokenStore.set(res.data.access_token);
    qc.setQueryData(['me'], res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch {
      /* ignore network errors on logout */
    }
    tokenStore.clear();
    qc.clear();
    router.push('/dashboard/login');
  };

  return { login, logout };
}
