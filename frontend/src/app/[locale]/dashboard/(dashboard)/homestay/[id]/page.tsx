'use client';

import { useEffect, useState } from 'react';
import { ResourceForm } from '@/components/admin/ResourceForm';
import { homestayConfig } from '@/lib/adminResources';
import { useResourceMutations } from '@/hooks/useResource';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { fetchOne } from '@/lib/api';
import type { Homestay } from '@/lib/types';
import { Spinner } from '@/components/ui/Misc';

export default function EditHomestayPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { update } = useResourceMutations(homestayConfig.endpoint, homestayConfig.labelSingular);
  const [record, setRecord] = useState<Homestay | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOne<Homestay>(`${homestayConfig.endpoint}/${params.id}`)
      .then(setRecord)
      .catch(() => router.push('/dashboard/homestay'))
      .finally(() => setLoading(false));
  }, [params.id, router]);

  const handleSubmit = async (values: Record<string, unknown>) => {
    await update.mutateAsync({ id: Number(params.id), body: values });
    router.push('/dashboard/homestay');
  };

  return (
    <div className="max-w-4xl pb-16">
      <div className="mb-6 flex items-center gap-4">
        <Link 
          href="/dashboard/homestay" 
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-soft hover:bg-black/5"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-ink">Edit {homestayConfig.labelSingular}</h1>
          <p className="text-sm text-ink-soft">Sunting entri {homestayConfig.labelSingular.toLowerCase()}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 md:p-8 shadow-sm border border-black/5 min-h-[400px] relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Spinner className="h-8 w-8 text-brand-600" />
          </div>
        ) : (
          <ResourceForm 
            config={homestayConfig} 
            record={record as any}
            submitting={update.isPending}
            onSubmit={handleSubmit} 
            onCancel={() => router.push('/dashboard/homestay')} 
          />
        )}
      </div>
    </div>
  );
}
