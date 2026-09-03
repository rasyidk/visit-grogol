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
        <div className="grid lg:grid-cols-2 gap-8 items-end">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-bold text-ink tracking-tight leading-[1.1]">
              {isEn ? "Local" : "Karya Lokal,"} <br />
              <span className="text-brand-600 font-serif italic">{isEn ? "Craftsmanship." : "Cita Rasa Global."}</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-ink-soft max-w-lg leading-relaxed lg:justify-self-end lg:text-right pb-2">
              {isEn 
                ? "Discover unique products and authentic crafts directly from the hands of our village artisans. Support local micro-enterprises." 
                : "Temukan produk unik dan kerajinan autentik langsung dari tangan pengrajin desa kami. Dukung usaha mikro lokal untuk terus berkarya."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Katalog Kreatif (Masonry) */}
      <section className="section py-16 bg-white">
        <div className="container-wide">
          {isLoading ? (
            <div className="text-center py-10 text-ink-muted">Loading...</div>
          ) : !umkmList || umkmList.length === 0 ? (
            <div className="text-center py-10 text-ink-muted">Belum ada data UMKM.</div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
              {umkmList.map((umkm, i) => {
                const displayTitle = isEn ? (umkm.titleEn || umkm.title_en || umkm.title) : umkm.title;
                const displayDesc = isEn ? (umkm.contentEn || umkm.content_en || umkm.content) : umkm.content;
                const excerpt = displayDesc ? displayDesc.replace(/<[^>]+>/g, '').substring(0, 120) + '...' : '';
                
                // Variasi aspect ratio untuk memberikan efek masonry yang natural
                const isTall = i % 3 === 0;

                return (
                  <Reveal key={umkm.id} delay={i * 0.1} className="break-inside-avoid">
                    <Link href={`/umkm/${umkm.slug}`} className="group block w-full overflow-hidden bg-sand/30 rounded-3xl shadow-sm hover:shadow-card transition-all duration-300 transform hover:-translate-y-1">
                      <div className={`relative w-full overflow-hidden ${isTall ? 'aspect-[3/4]' : 'aspect-square'}`}>
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
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-ink group-hover:text-brand-600 transition-colors">{displayTitle}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted">{excerpt}</p>
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
