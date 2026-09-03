'use client';

import { ResourceForm } from '@/components/admin/ResourceForm';
import { budayaConfig } from '@/lib/adminResources';
import { useResourceMutations } from '@/hooks/useResource';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateBudayaPage() {
  const router = useRouter();
  const { create } = useResourceMutations(budayaConfig.endpoint, budayaConfig.labelSingular);

  const handleSubmit = async (values: Record<string, unknown>) => {
    await create.mutateAsync(values);
    router.push('/dashboard/budaya');
  };

  return (
    <div className="max-w-4xl pb-16">
      <div className="mb-6 flex items-center gap-4">
        <Link 
          href="/dashboard/budaya" 
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-soft hover:bg-black/5"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-ink">Tambah {budayaConfig.labelSingular}</h1>
          <p className="text-sm text-ink-soft">Buat entri {budayaConfig.labelSingular.toLowerCase()} baru</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm border border-black/5">
        <ResourceForm 
          config={budayaConfig} 
          submitting={create.isPending}
          onSubmit={handleSubmit} 
          onCancel={() => router.push('/dashboard/budaya')} 
        />
      </div>
    </div>
  );
}
