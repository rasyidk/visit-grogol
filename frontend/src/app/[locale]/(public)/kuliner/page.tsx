'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/Misc';
import { useKuliner, useProfil } from '@/hooks/usePublicData';
import { useTranslations, useLocale } from 'next-intl';

export default function KulinerPage() {
  const t = useTranslations('Kuliner');
  const locale = useLocale();
  const isEn = locale === 'en';
  const { data: profil } = useProfil();
  const { data: kulinerList, isLoading } = useKuliner();

  return (
    <>
      {/* Editorial Header */}
      <section className="container-wide pt-32 pb-16 sm:pt-40 sm:pb-24">
        <div className="max-w-4xl">
          <Reveal>
            <h1 className="text-5xl md:text-7xl font-bold text-ink tracking-tight mb-6 leading-[1.1]">
              {isEn ? "Authentic Flavors." : "Cita Rasa Autentik."} <br className="hidden sm:block" />
              <span className="text-brand-600">{isEn ? "Culinary Heritage." : "Warisan Kuliner."}</span>
            </h1>
            <p className="text-lg md:text-2xl text-ink-soft max-w-2xl leading-relaxed">
              {isEn 
                ? "Explore the best eateries and traditional flavors passed down through generations in our village." 
                : "Jelajahi tempat makan terbaik dan cita rasa tradisional yang diwariskan turun-temurun di desa kami."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tempat Makan Pilihan (Dynamic List) */}
      <section className="section pt-16 pb-32">
        <div className="container-wide">
          {isLoading ? (
            <div className="text-center py-10 text-ink-muted">Loading...</div>
          ) : !kulinerList || kulinerList.length === 0 ? (
            <div className="text-center py-10 text-ink-muted">Belum ada data kuliner.</div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {kulinerList.map((kuliner, i) => {
                const displayTitle = isEn ? (kuliner.titleEn || kuliner.title_en || kuliner.title) : kuliner.title;
                const displayDesc = isEn ? (kuliner.contentEn || kuliner.content_en || kuliner.content) : kuliner.content;
                // create excerpt from html content
                const excerpt = displayDesc ? displayDesc.replace(/<[^>]+>/g, '').substring(0, 100) + '...' : '';

                return (
                  <Reveal key={kuliner.id} delay={i * 0.08} className="h-full flex">
                    <Link href={`/kuliner/${kuliner.slug}`} className="group flex flex-col w-full overflow-hidden bg-white rounded-3xl shadow-soft hover:shadow-card transition-shadow">
                      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                        <Image 
                          src={kuliner.thumbnail || ''} 
                          alt={displayTitle} 
                          fill 
                          className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-xl font-bold text-ink group-hover:text-brand-600 transition-colors">{displayTitle}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-muted flex-1">{excerpt}</p>
                        <div className="mt-5 flex items-center text-sm font-semibold text-brand-600">
                          {isEn ? "View Detail" : "Lihat Detail"} <ChevronRight className="ml-1 w-4 h-4" />
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
