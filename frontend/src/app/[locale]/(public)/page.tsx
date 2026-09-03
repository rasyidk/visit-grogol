'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { CultureCorridor } from '@/components/home/CultureCorridor';
import { EditorialHero } from '@/components/home/EditorialHero';
import { TestimonialShowcase } from '@/components/home/TestimonialShowcase';
import { GsapMagnetic } from '@/components/ui/GsapMagnetic';
import { useProfil, useTestimoni } from '@/hooks/usePublicData';
import { useTranslations, useLocale } from 'next-intl';

const img = (s: string, w = 800, h = 600) => `https://picsum.photos/seed/${s}/${w}/${h}`;

export default function ProfilPage() {
  const { data: profil } = useProfil();
  const { data: testimoni } = useTestimoni();
  const tHero = useTranslations('Hero');
  const locale = useLocale();

  const isEn = locale === 'en';
  const getHref = (path: string) => (locale === 'id' ? path : `/${locale}${path}`);


  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <Image src={profil.heroImage || img('profil-hero', 1920, 1080)} alt="Desa di balik awan" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/50 via-brand-950/60 to-brand-950/80" />
        <div className="container-wide relative z-10 flex min-h-screen flex-col items-center justify-center pt-16 pb-28 text-center text-white">
          <Reveal>
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <h1 className="max-w-3xl text-5xl font-display font-bold leading-[1.1] sm:text-6xl lg:text-7xl tracking-tight text-white">
                {tHero('title')}
              </h1>
              <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 font-normal leading-relaxed">
                {tHero('subtitle')}
              </p>
              <div className="mt-9 flex justify-center">
                <GsapMagnetic strength={0.4}>
                  <Link
                    href={getHref('/wisata')}
                    className="btn-primary inline-flex items-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-bold shadow-soft hover:shadow-xl transition-all duration-200 active:scale-95"
                  >
                    <span>{isEn ? 'Explore Destinations' : 'Jelajahi Wisata'}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </GsapMagnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Editorial Hero */}
      <EditorialHero isEn={isEn} />

      {/* Lorong Budaya (Animated Scroll Perspective Corridor) */}
      <CultureCorridor />


      {/* Testimoni & Guestbook */}
      <TestimonialShowcase isEn={isEn} items={testimoni} />
    </>
  );
}
