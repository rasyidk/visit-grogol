'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Hero360 = dynamic(() => import('@/components/public/Hero360'), { ssr: false });
import { ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Misc';
import { useBudaya, useProfil } from '@/hooks/usePublicData';
import { useTranslations, useLocale } from 'next-intl';

export default function BudayaPage() {
  const t = useTranslations('Budaya');
  const locale = useLocale();
  const isEn = locale === 'en';
  const { data: profil } = useProfil();
  const { data: budayaList } = useBudaya();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {profil?.budayaHeroImage ? (
          <Image
            src={profil.budayaHeroImage}
            alt="Hero Budaya"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Hero360 />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/60 to-brand-950/80 pointer-events-none" />
        <div className="container-wide relative flex min-h-screen flex-col justify-center pb-16 pt-24 text-white pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">
              {t('heroTitle')}
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/80">
              {t('heroDesc')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Dynamic Budaya List */}
      <section className="section container-wide py-16">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-ink mb-4">
              {isEn ? "Explore Grogol's Culture" : "Eksplorasi Budaya Grogol"}
            </h2>
            <p className="text-ink-soft text-lg">
              {isEn 
                ? "Discover the rich cultural heritage and traditions of Grogol village."
                : "Temukan kekayaan warisan budaya dan tradisi dari desa Grogol."}
            </p>
          </Reveal>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {budayaList?.map((budaya) => {
            const displayTitle = isEn ? (budaya.titleEn || budaya.title_en || budaya.title) : budaya.title;
            return (
              <BentoCard 
                key={budaya.id}
                item={{
                  slug: budaya.slug,
                  title: displayTitle,
                  thumbnail: budaya.thumbnail || '',
                }} 
                aspect="aspect-square md:aspect-[4/3]"
                caption 
              />
            );
          })}
        </div>
      </section>
    </>
  );
}

function BentoCard({
  item,
  className = '',
  tall = false,
  caption = false,
  showBadges = false,
  aspect = 'aspect-[4/3]',
}: {
  item?: { slug?: string; title: string; thumbnail: string; excerpt?: string | null; kategori?: { name: string }; facilities?: string[] | null };
  className?: string;
  tall?: boolean;
  caption?: boolean;
  showBadges?: boolean;
  aspect?: string;
}) {
  if (!item) return null;
  return (
    <Reveal className={`${className} ${tall ? 'h-full' : ''}`}>
      <Link href={`/budaya/${item.slug || ''}`} className={`group relative block overflow-hidden rounded-3xl ${tall ? 'h-full min-h-[320px]' : aspect}`}>
        <Image src={item.thumbnail} alt={item.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {caption && (
          <div className="glass absolute inset-x-4 bottom-4 rounded-2xl p-4">
            <p className="font-semibold text-ink">{item.title}</p>
          </div>
        )}
        {!showBadges && !caption && tall && (
          <div className="absolute inset-x-5 bottom-5 text-white">
            <h3 className="text-2xl font-bold">{item.title}</h3>
          </div>
        )}
      </Link>
    </Reveal>
  );
}
