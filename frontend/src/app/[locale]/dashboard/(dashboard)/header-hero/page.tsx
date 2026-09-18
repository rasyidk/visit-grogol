'use client';

import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { PageHeader } from '@/components/admin/ui';
import { MediaUpload } from '@/components/admin/MediaUpload';
import { Spinner } from '@/components/ui/Misc';
import { fetchOne, getApiErrorMessage, updateOne } from '@/lib/api';
import {
  DEFAULT_HEADER_HERO,
  type HeaderHeroContent,
  type HeaderHeroPage,
  type PageHeroContent,
} from '@/lib/pageHero';

const PAGE_OPTIONS: Array<{ value: HeaderHeroPage; label: string }> = [
  { value: 'home', label: 'Home' },
  { value: 'wisata', label: 'Wisata' },
  { value: 'budaya', label: 'Budaya' },
];

function mergePage(defaults: PageHeroContent, value?: Partial<PageHeroContent>): PageHeroContent {
  return {
    ...defaults,
    ...value,
    title: { ...defaults.title, ...(value?.title ?? {}) },
    description: { ...defaults.description, ...(value?.description ?? {}) },
  };
}

function mergeContent(value?: Partial<HeaderHeroContent>): HeaderHeroContent {
  return {
    home: mergePage(DEFAULT_HEADER_HERO.home, value?.home),
    wisata: mergePage(DEFAULT_HEADER_HERO.wisata, value?.wisata),
    budaya: mergePage(DEFAULT_HEADER_HERO.budaya, value?.budaya),
  };
}

export default function HeaderHeroManagerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const requestedPage = searchParams.get('page') as HeaderHeroPage | null;
  const activePage: HeaderHeroPage = PAGE_OPTIONS.some((option) => option.value === requestedPage)
    ? requestedPage!
    : 'home';
  const [content, setContent] = useState<HeaderHeroContent>(DEFAULT_HEADER_HERO);

  const { data, isLoading } = useQuery({
    queryKey: ['page-content', 'header-hero'],
    queryFn: () => fetchOne<{ content?: Partial<HeaderHeroContent> }>('/page-content/header-hero'),
  });

  useEffect(() => {
    if (data?.content) setContent(mergeContent(data.content));
  }, [data]);

  const save = useMutation({
    mutationFn: (value: HeaderHeroContent) => updateOne('/page-content/header-hero', { content: value }),
    onSuccess: () => {
      toast.success('Header & hero berhasil disimpan');
      queryClient.invalidateQueries({ queryKey: ['page-content', 'header-hero'] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Gagal menyimpan header & hero')),
  });

  const page = useMemo(() => content[activePage], [activePage, content]);
  const updatePage = (changes: Partial<PageHeroContent>) => {
    setContent((current) => ({
      ...current,
      [activePage]: { ...current[activePage], ...changes },
    }));
  };

  if (isLoading) {
    return <div className="flex justify-center py-16"><Spinner className="h-7 w-7" /></div>;
  }

  return (
    <>
      <PageHeader
        title="Header & Hero"
        description="Kelola background, judul, dan deskripsi hero untuk halaman utama, wisata, dan budaya."
      />

      <div className="max-w-5xl space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <label className="field-label" htmlFor="hero-page">Pilih halaman</label>
          <select
            id="hero-page"
            className="field-input max-w-sm"
            value={activePage}
            onChange={(event) => router.replace(`?page=${event.target.value}`)}
          >
            {PAGE_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-ink">Hero {PAGE_OPTIONS.find((option) => option.value === activePage)?.label}</h2>
            <p className="mt-1 text-sm text-ink-muted">Konten ini tampil di area pembuka halaman publik.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <MediaUpload
              label="Background hero"
              value={page.background}
              onChange={(background) => updatePage({ background })}
            />
            <div className="space-y-5">
              <div>
                <label className="field-label" htmlFor="hero-title-id">Judul (Bahasa Indonesia)</label>
                <input
                  id="hero-title-id"
                  className="field-input"
                  value={page.title.id}
                  onChange={(event) => updatePage({ title: { ...page.title, id: event.target.value } })}
                />
              </div>
              <div>
                <label className="field-label" htmlFor="hero-title-en">Judul (English)</label>
                <input
                  id="hero-title-en"
                  className="field-input"
                  value={page.title.en}
                  onChange={(event) => updatePage({ title: { ...page.title, en: event.target.value } })}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="hero-description-id">Deskripsi (Bahasa Indonesia)</label>
              <textarea
                id="hero-description-id"
                rows={6}
                className="field-input resize-none"
                value={page.description.id}
                onChange={(event) => updatePage({ description: { ...page.description, id: event.target.value } })}
              />
            </div>
            <div>
              <label className="field-label" htmlFor="hero-description-en">Deskripsi (English)</label>
              <textarea
                id="hero-description-en"
                rows={6}
                className="field-input resize-none"
                value={page.description.en}
                onChange={(event) => updatePage({ description: { ...page.description, en: event.target.value } })}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end border-t border-black/10 pt-6">
            <button
              type="button"
              onClick={() => save.mutate(content)}
              disabled={save.isPending}
              className="rounded-xl bg-brand-600 px-6 py-3 font-medium text-white transition hover:bg-brand-700 disabled:opacity-50"
            >
              {save.isPending ? 'Menyimpan…' : 'Simpan Perubahan'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
