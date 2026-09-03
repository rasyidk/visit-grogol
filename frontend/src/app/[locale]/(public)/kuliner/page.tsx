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
      {/* Creative Hero */}
      <section className="relative w-full overflow-hidden min-h-[50vh] flex flex-col justify-center items-center">
        {profil?.kulinerHeroImage ? (
          <Image
            src={profil.kulinerHeroImage}
            alt="Hero Kuliner"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Image
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1600&q=80"
            alt="Hero Kuliner Placeholder"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 to-brand-950/90 pointer-events-none" />
        
        <div className="container-wide relative z-10 text-center py-20 mt-16">
          <Reveal>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">
              {isEn ? "Culinary Delights" : "Ragam Kuliner"}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {isEn 
                ? "Explore the authentic flavors and best eateries in our village." 
                : "Jelajahi cita rasa otentik dan tempat makan terbaik di desa kami."}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Tempat Makan Pilihan (Dynamic List) */}
      <section className="section bg-sand/30 py-16">
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
