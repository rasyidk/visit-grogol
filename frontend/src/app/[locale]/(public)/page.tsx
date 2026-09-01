'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { CultureCorridor } from '@/components/home/CultureCorridor';
import { ManagersSection } from '@/components/home/ManagersSection';
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

  const team = [
    { name: 'Bp. Dharmawan', role: isEn ? 'Village Head' : 'Kepala Desa', seed: 'team-dharmawan-0' },
    { name: 'Ibu Sari', role: isEn ? 'BUMDes Director' : 'Direktur BUMDes', seed: 'team-sari-1' },
    { name: 'Bli Putu', role: isEn ? 'Head of Culture' : 'Ketua Adat & Budaya', seed: 'team-putu-2' },
    { name: 'Rian Wijaya', role: isEn ? 'Environment Coordinator' : 'Koordinator Lingkungan', seed: 'team-rian-3' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center">
        <Image src={profil.heroImage || img('profil-hero', 1920, 1080)} alt="Desa di balik awan" fill priority className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/50 via-brand-950/60 to-brand-950/80" />
        <div className="container-wide relative z-10 flex min-h-screen flex-col items-center justify-center pt-16 pb-28 text-center text-white">
          <Reveal>
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <h1 className="max-w-3xl text-5xl font-extrabold leading-[1.1] sm:text-6xl lg:text-7xl tracking-tight text-white">
                {tHero('title')}
              </h1>
              <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 font-normal leading-relaxed">
                {tHero('subtitle')}
              </p>
              <div className="mt-9 flex justify-center">
                <GsapMagnetic strength={0.4}>
                  <Link
                    href={getHref('/atraksi')}
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

      {/* Sejarah & Filosofi */}
      <section className="py-24 sm:py-32 bg-sand/30 border-t border-black/5">
        <div className="container-wide">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="relative overflow-hidden rounded-3xl border border-black/5 bg-white shadow-card">
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={img('cultural-heritage', 1000, 750)}
                      alt="Warisan Budaya Desa Grogol"
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">Warisan Abad XVII</p>
                      <p className="mt-1 text-sm text-white/90 font-medium">Harmoni Tradisi, Komunitas, & Alam Lestari</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6">
              <Reveal delay={0.1}>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink leading-[1.15]">
                  {isEn ? 'Traces of Time in Heritage Land' : 'Jejak Waktu di Tanah Pusaka'}
                </h2>
                
                <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft">
                  <p>
                    {(isEn ? profil.historyEn : profil.history) ||
                      'Didirikan pada abad ke-17 oleh pengembara dari pegunungan tengah, desa ini dibangun di atas filosofi Tri Hita Karana — keseimbangan harmonis antara manusia, alam sekitar, dan Sang Pencipta.'}
                  </p>
                  <p className="text-sm text-ink-muted leading-relaxed">
                    {isEn
                      ? 'Every pathway, terraced field, and traditional pavilion preserves stories passed down through generations, welcoming travelers to slow down and reconnect.'
                      : 'Setiap jengkal sawah terasering, mata air jernih, dan balai adat dirawat dengan penuh ketulusan, mengundang setiap pengunjung untuk merasakan ketenangan hidup yang sejati.'}
                  </p>
                </div>

                <div className="mt-8">
                  <Link
                    href={getHref('/budaya')}
                    className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-800 transition-colors group"
                  >
                    <span>{isEn ? 'Explore Cultural Heritage' : 'Pelajari Warisan Budaya'}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Lorong Budaya (Animated Scroll Perspective Corridor) */}
      <CultureCorridor />

      {/* Team / Managers with GSAP Physics */}
      <ManagersSection isEn={isEn} team={team} />

      {/* Testimoni & Guestbook */}
      <TestimonialShowcase isEn={isEn} items={testimoni} />
    </>
  );
}
