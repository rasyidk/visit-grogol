'use client';

import { useEffect } from 'react';
import { ResourceForm } from '@/components/admin/ResourceForm';
import { kulinerConfig } from '@/lib/adminResources';
import { useResource, useResourceMutations } from '@/hooks/useResource';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function EditKulinerPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { data: kuliner, isLoading } = useResource(kulinerConfig.endpoint, params.id);
  const { updateResource } = useResourceMutations(kulinerConfig);

  const handleSubmit = async (data: any) => {
    await updateResource.mutateAsync({ id: params.id, data });
    router.push(kulinerConfig.endpoint);
  };

  if (isLoading) return <div className="p-8 text-center text-ink-soft">Memuat data...</div>;
  if (!kuliner) return <div className="p-8 text-center text-red-500">Data tidak ditemukan</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href={kulinerConfig.endpoint}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-soft shadow-sm transition-colors hover:bg-brand-50 hover:text-brand-600"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-ink">Edit {kulinerConfig.labelSingular}</h1>
          <p className="text-sm text-ink-muted">Perbarui informasi {kulinerConfig.labelSingular.toLowerCase()} ini.</p>
        </div>
      </div>

      <div className="card p-6">
        <ResourceForm
          config={kulinerConfig}
          initialData={kuliner}
          onSubmit={handleSubmit}
          isLoading={updateResource.isPending}
        />
      </div>
    </div>
  );
}
