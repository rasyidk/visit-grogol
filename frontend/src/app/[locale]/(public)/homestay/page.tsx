'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bed, MapPin } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { useHomestay } from '@/hooks/usePublicData';
import { useTranslations, useLocale } from 'next-intl';

export default function HomestayPage() {
  const t = useTranslations('Homestay');
  const locale = useLocale();
  const isEn = locale === 'en';
  const { data: homestays, isLoading } = useHomestay();

  return (
    <>
      {/* Header */}
      <section className="container-wide pt-32 pb-12 sm:pt-40 sm:pb-16 border-b border-black/5">
        <div className="max-w-4xl">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-bold text-ink tracking-tight leading-[1.1]">
              {isEn ? "Cozy Stays," : "Singgah Nyaman,"} <br />
              <span className="text-brand-600 font-serif italic">{isEn ? "Local Heart." : "Suasana Desa."}</span>
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Grid Homestay */}
      <section className="section py-16">
        <div className="container-wide">
          {isLoading ? (
            <div className="text-center py-10 text-ink-muted">Loading...</div>
          ) : !homestays || homestays.length === 0 ? (
            <div className="text-center py-10 text-ink-muted">Belum ada data Homestay.</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {homestays.map((homestay, i) => {
                const displayTitle = isEn ? (homestay.titleEn || homestay.title_en || homestay.title) : homestay.title;

                return (
                  <Reveal key={homestay.id} delay={i * 0.1} className="h-full flex">
                    <Link href={`/homestay/${homestay.slug}`} className="group flex flex-col w-full bg-white rounded-3xl shadow-sm hover:shadow-card transition-all duration-300 border border-black/5 overflow-hidden transform hover:-translate-y-1">
                      <div className="relative w-full aspect-[4/3] shrink-0 overflow-hidden">
                        <Image 
                          src={homestay.thumbnail || ''} 
                          alt={displayTitle} 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        {homestay.price && (
                          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-ink shadow-sm">
                            {homestay.price}
                          </div>
                        )}
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-2xl font-bold text-ink group-hover:text-brand-600 transition-colors mb-2">{displayTitle}</h3>
                        <div className="flex items-center text-ink-muted text-sm mt-auto pt-4 border-t border-black/5">
                          <Bed className="w-4 h-4 mr-2" />
                          <span>{isEn ? "View details" : "Lihat fasilitas"}</span>
                        </div>
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
