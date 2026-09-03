'use client';

import { ResourceForm } from '@/components/admin/ResourceForm';
import { beritaConfig } from '@/lib/adminResources';
import { useResourceMutations } from '@/hooks/useResource';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateBeritaPage() {
  const router = useRouter();
  const { create } = useResourceMutations(beritaConfig.endpoint, beritaConfig.labelSingular);

  const handleSubmit = async (values: Record<string, unknown>) => {
    await create.mutateAsync(values);
    router.push('/dashboard/berita');
  };

  return (
    <div className="max-w-4xl pb-16">
      <div className="mb-6 flex items-center gap-4">
        <Link 
          href="/dashboard/berita" 
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-soft hover:bg-black/5"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-ink">Tambah {beritaConfig.labelSingular}</h1>
          <p className="text-sm text-ink-soft">Buat {beritaConfig.labelSingular.toLowerCase()} baru</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm border border-black/5">
        <ResourceForm 
          config={beritaConfig} 
          submitting={create.isPending}
          onSubmit={handleSubmit} 
          onCancel={() => router.push('/dashboard/berita')} 
        />
      </div>
    </div>
  );
}
