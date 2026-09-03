'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { useUmkm } from '@/hooks/usePublicData';
import { useTranslations, useLocale } from 'next-intl';

export default function UmkmPage() {
  const t = useTranslations('Umkm');
  const locale = useLocale();
  const isEn = locale === 'en';
  const { data: umkmList, isLoading } = useUmkm();

  return (
    <>
      {/* Header Etalase */}
      <section className="container-wide pt-32 pb-12 sm:pt-40 sm:pb-16 border-b border-black/5">
        <div className="max-w-4xl">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-bold text-ink tracking-tight leading-[1.1]">
              {isEn ? "Local Craftsmanship." : "Karya Lokal, Cita Rasa Global."}
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Katalog Kreatif (Grid) */}
      <section className="section py-16">
        <div className="container-wide">
          {isLoading ? (
            <div className="text-center py-10 text-ink-muted">Loading...</div>
          ) : !umkmList || umkmList.length === 0 ? (
            <div className="text-center py-10 text-ink-muted">Belum ada data UMKM.</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {umkmList.map((umkm, i) => {
                const displayTitle = isEn ? (umkm.titleEn || umkm.title_en || umkm.title) : umkm.title;
                const displayDesc = isEn ? (umkm.contentEn || umkm.content_en || umkm.content) : umkm.content;
                const excerpt = displayDesc ? displayDesc.replace(/<[^>]+>/g, '').substring(0, 120) + '...' : '';

                return (
                  <Reveal key={umkm.id} delay={i * 0.1} className="h-full flex">
                    <Link href={`/umkm/${umkm.slug}`} className="group flex flex-col w-full overflow-hidden bg-sand/30 rounded-3xl shadow-sm hover:shadow-card transition-all duration-300 transform hover:-translate-y-1">
                      <div className="relative w-full overflow-hidden aspect-[4/3] shrink-0">
                        <Image 
                          src={umkm.thumbnail || ''} 
                          alt={displayTitle} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                          <ArrowUpRight className="w-5 h-5 text-brand-600" />
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-2xl font-bold text-ink group-hover:text-brand-600 transition-colors">{displayTitle}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted flex-1">{excerpt}</p>
                      </div>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
