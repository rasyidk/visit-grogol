'use client';

import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createOne, deleteOne, fetchList, updateOne, getApiErrorMessage } from '@/lib/api';

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: unknown;
}

/** Paginated list query for an admin resource endpoint. */
export function useResourceList<T>(endpoint: string, params: ListParams) {
  return useQuery({
    queryKey: [endpoint, params],
    queryFn: () => fetchList<T>(endpoint, params),
    placeholderData: keepPreviousData,
  });
}

/** Create / update / delete mutations wired to toasts + cache invalidation. */
export function useResourceMutations<T>(endpoint: string, labelSingular: string) {
  const qc = useQueryClient();
  const invalidate = () => qc.invalidateQueries({ queryKey: [endpoint] });

  const create = useMutation({
    mutationFn: (body: Partial<T>) => createOne<T>(endpoint, body),
    onSuccess: () => {
      toast.success(`${labelSingular} berhasil ditambahkan`);
      invalidate();
    },
    onError: (e) => toast.error(getApiErrorMessage(e, `Gagal menambah ${labelSingular}`)),
  });

  const update = useMutation({
    mutationFn: ({ id, body }: { id: number; body: Partial<T> }) => updateOne<T>(`${endpoint}/${id}`, body),
    onSuccess: () => {
      toast.success(`${labelSingular} berhasil diperbarui`);
      invalidate();
    },
    onError: (e) => toast.error(getApiErrorMessage(e, `Gagal memperbarui ${labelSingular}`)),
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteOne(`${endpoint}/${id}`),
    onSuccess: () => {
      toast.success(`${labelSingular} berhasil dihapus`);
      invalidate();
    },
    onError: (e) => toast.error(getApiErrorMessage(e, `Gagal menghapus ${labelSingular}`)),
  });

  return { create, update, remove };
}
