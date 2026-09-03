import axios, { AxiosError } from 'axios';
import type { ApiEnvelope, PaginationMeta } from './types';

const envUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
export const API_URL = envUrl.endsWith('/api') ? envUrl : `${envUrl}/api`;

export const tokenStore = {
  get: () => (typeof window !== 'undefined' ? localStorage.getItem('access_token') : null),
  set: (token: string) => typeof window !== 'undefined' && localStorage.setItem('access_token', token),
  clear: () => typeof window !== 'undefined' && localStorage.removeItem('access_token'),
};

export const api = axios.create({
  baseURL: API_URL,
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = tokenStore.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: unknown) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<ApiEnvelope<unknown>>) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt to refresh
        const res = await axios.post<{ access_token: string }>(`${API_URL}/refresh`, {}, {
          headers: {
            'Authorization': `Bearer ${tokenStore.get()}`,
            'Accept': 'application/json'
          }
        });
        
        const newToken = res.data.access_token;
        tokenStore.set(newToken);
        api.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        
        processQueue(null, newToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenStore.clear();
        
        if (typeof window !== 'undefined') {
          const path = window.location.pathname;
          if (path.startsWith('/dashboard') && !path.includes('/login')) {
            window.location.href = '/dashboard/login';
          }
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
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
