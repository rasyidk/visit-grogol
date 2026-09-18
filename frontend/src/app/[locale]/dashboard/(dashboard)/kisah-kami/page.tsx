'use client';

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/ui';
import { Spinner } from '@/components/ui/Misc';
import { fetchOne, updateOne, getApiErrorMessage } from '@/lib/api';
import dynamic from 'next/dynamic';

const QuillEditor = dynamic(() => import('@/components/admin/QuillEditorWrapper'), { ssr: false });

type KisahKamiData = {
  content: {
    id: string;
    en: string;
  };
};

export default function KisahKamiCMSPage() {
  const qc = useQueryClient();
  const [activeLang, setActiveLang] = useState<'id' | 'en'>('id');
  
  // Local state to hold editor values since we're not using react-hook-form for this simple structure
  const [contentId, setContentId] = useState<string>('');
  const [contentEn, setContentEn] = useState<string>('');

  const { isLoading } = useQuery({
    queryKey: ['/page-content/kisah-kami'],
    queryFn: async () => {
      const res = await fetchOne<KisahKamiData>('/page-content/kisah-kami');
      if (res?.content) {
        setContentId(typeof res.content.id === 'string' ? res.content.id : '');
        setContentEn(typeof res.content.en === 'string' ? res.content.en : '');
      }
      return res;
    },
    staleTime: 0,
  });

  const save = useMutation({
    mutationFn: (body: any) => updateOne('/page-content/kisah-kami', body),
    onSuccess: () => {
      toast.success('Halaman Kisah Kami berhasil disimpan');
      qc.invalidateQueries({ queryKey: ['/page-content/kisah-kami'] });
    },
    onError: (e) => toast.error(getApiErrorMessage(e, 'Gagal menyimpan')),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="h-7 w-7" />
      </div>
    );
  }

  const onSubmit = () => {
    save.mutate({
      content: {
        id: contentId,
        en: contentEn,
      }
    });
  };

  return (
    <>
      <PageHeader title="Kisah Kami" description="Kelola konten halaman Kisah Kami" />
      <div className="max-w-5xl rounded-2xl bg-white p-6 shadow-card sm:p-8">
        
        {/* Language Tabs */}
        <div className="flex space-x-4 mb-8 border-b pb-4">
          <button
            onClick={() => setActiveLang('id')}
            className={`px-4 py-2 font-medium rounded-md transition-colors ${
              activeLang === 'id' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Bahasa Indonesia
          </button>
          <button
            onClick={() => setActiveLang('en')}
            className={`px-4 py-2 font-medium rounded-md transition-colors ${
              activeLang === 'en' ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            English
          </button>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-stone-700">Konten Halaman ({activeLang.toUpperCase()})</label>
            <div className="bg-white" style={{ minHeight: '400px' }}>
              {activeLang === 'id' ? (
                <QuillEditor value={contentId} onChange={setContentId} />
              ) : (
                <QuillEditor value={contentEn} onChange={setContentEn} />
              )}
            </div>
          </div>

          <div className="pt-6 border-t mt-8 flex justify-end">
            <button
              onClick={onSubmit}
              disabled={save.isPending}
              className="px-6 py-3 bg-brand-600 text-white font-medium rounded-xl hover:bg-brand-700 disabled:opacity-50"
            >
              {save.isPending ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>

      </div>
    </>
  );
}
