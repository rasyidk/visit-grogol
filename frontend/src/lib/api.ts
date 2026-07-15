import axios, { AxiosError } from 'axios';
import type { ApiEnvelope, PaginationMeta } from './types';

export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

const TOKEN_KEY = 'vg_token';

export const tokenStore = {
  get: () => (typeof window === 'undefined' ? null : localStorage.getItem(TOKEN_KEY)),
  set: (t: string) => localStorage.setItem(TOKEN_KEY, t),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// Attach the bearer token on every request when present.
api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token && config.headers) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Normalise errors and auto-logout on 401 in the admin area.
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError<ApiEnvelope<unknown>>) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/admin') && !path.includes('/login')) {
        tokenStore.clear();
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

/** Extract a human-friendly message from an Axios error. */
export function getApiErrorMessage(error: unknown, fallback = 'Terjadi kesalahan'): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiEnvelope<unknown> | undefined;
    if (data?.errors) {
      const first = Object.values(data.errors)[0];
      if (Array.isArray(first) && first[0]) return first[0];
    }
    return data?.message || error.message || fallback;
  }
  return fallback;
}

// ── Thin typed helpers ───────────────────────────────────────
export async function fetchList<T>(
  path: string,
  params?: Record<string, unknown>
): Promise<{ data: T[]; meta?: PaginationMeta }> {
  const res = await api.get<ApiEnvelope<T[]>>(path, { params });
  return { data: res.data.data, meta: res.data.meta };
}

export async function fetchOne<T>(path: string): Promise<T> {
  const res = await api.get<ApiEnvelope<T>>(path);
  return res.data.data;
}

export async function createOne<T>(path: string, body: unknown): Promise<T> {
  const res = await api.post<ApiEnvelope<T>>(path, body);
  return res.data.data;
}

export async function updateOne<T>(path: string, body: unknown): Promise<T> {
  const res = await api.put<ApiEnvelope<T>>(path, body);
  return res.data.data;
}

export async function deleteOne(path: string): Promise<void> {
  await api.delete(path);
}

export async function uploadFile(file: File): Promise<{ url: string; filename: string }> {
  const form = new FormData();
  form.append('file', file);
  const res = await api.post<ApiEnvelope<{ url: string; filename: string }>>('/upload', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data.data;
}
