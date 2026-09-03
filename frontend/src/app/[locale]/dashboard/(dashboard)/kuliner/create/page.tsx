'use client';

import { ResourceForm } from '@/components/admin/ResourceForm';
import { kulinerConfig } from '@/lib/adminResources';
import { useResourceMutations } from '@/hooks/useResource';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateKulinerPage() {
  const router = useRouter();
  const { createResource } = useResourceMutations(kulinerConfig);

  const handleSubmit = async (data: any) => {
    await createResource.mutateAsync(data);
    router.push(kulinerConfig.endpoint);
  };

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
          <h1 className="text-2xl font-bold text-ink">Tambah {kulinerConfig.labelSingular}</h1>
          <p className="text-sm text-ink-muted">Buat entri {kulinerConfig.labelSingular.toLowerCase()} baru ke dalam sistem.</p>
        </div>
      </div>

      <div className="card p-6">
        <ResourceForm
          config={kulinerConfig}
          onSubmit={handleSubmit}
          isLoading={createResource.isPending}
        />
      </div>
    </div>
  );
}
