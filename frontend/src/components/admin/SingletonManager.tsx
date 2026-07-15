'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PageHeader } from './ui';
import { ResourceForm } from './ResourceForm';
import { Spinner } from '@/components/ui/Misc';
import { fetchOne, updateOne, getApiErrorMessage } from '@/lib/api';
import type { ResourceConfig } from './resourceTypes';

/** Get/PUT single-record config resources (Profil Website, Kontak). */
export function SingletonManager({ config }: { config: ResourceConfig }) {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [config.endpoint],
    queryFn: () => fetchOne<Record<string, unknown>>(config.endpoint),
  });

  const save = useMutation({
    mutationFn: (body: Record<string, unknown>) => updateOne(config.endpoint, body),
    onSuccess: () => {
      toast.success(`${config.label} berhasil disimpan`);
      qc.invalidateQueries({ queryKey: [config.endpoint] });
    },
    onError: (e) => toast.error(getApiErrorMessage(e, 'Gagal menyimpan')),
  });

  return (
    <>
      <PageHeader title={config.label} description={config.description} />
      <div className="max-w-3xl rounded-2xl bg-white p-6 shadow-card sm:p-8">
        {isLoading ? (
          <div className="flex justify-center py-16">
            <Spinner className="h-7 w-7" />
          </div>
        ) : (
          <ResourceForm
            config={config}
            record={data ?? undefined}
            submitting={save.isPending}
            onSubmit={(values) => save.mutate(values)}
            onCancel={() => qc.invalidateQueries({ queryKey: [config.endpoint] })}
          />
        )}
      </div>
    </>
  );
}
