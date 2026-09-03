'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Hero360 = dynamic(() => import('@/components/public/Hero360'), { ssr: false });
import { Play, Clock, Ticket, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';

import { Badge } from '@/components/ui/Misc';
import { useDestinasi, useProfil, useWisata } from '@/hooks/usePublicData';
import { formatRupiah } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';

export default function BerandaPage() {
  const t = useTranslations('Atraksi');
  const locale = useLocale();
  const isEn = locale === 'en';
  const { data: profil } = useProfil();
  const { data: wisataList } = useWisata();

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {profil?.atraksiHeroImage ? (
          <Image
            src={profil.atraksiHeroImage}
            alt="Hero"
            fill
            className="object-cover"
            priority
          />
        ) : (
          <Hero360 />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/40 via-brand-950/30 to-brand-950/70 pointer-events-none" />

        <div className="container-wide relative flex min-h-screen flex-col justify-center pb-16 pt-28 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl" dangerouslySetInnerHTML={{ __html: t('heroTitle').replace('&', '&amp;') }}>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
              {t('heroDesc')}
            </p>
          </motion.div>
        </div>
      </section>



      {/* ── Wisata Dynamic List ───────────────────────── */}
      <section className="section container-wide py-16">
        <div className="mb-12 max-w-2xl">
          <Reveal>
            <h2 className="text-3xl md:text-5xl font-bold text-ink mb-4">
              {isEn ? "Explore Grogol's Wonders" : "Eksplorasi Keajaiban Grogol"}
            </h2>
            <p className="text-ink-soft text-lg">
              {isEn 
                ? "Discover various fascinating tourist destinations that offer natural beauty, cultural richness, and unforgettable experiences."
                : "Temukan berbagai destinasi wisata menarik yang menyajikan keindahan alam, kekayaan budaya, dan pengalaman tak terlupakan."}
            </p>
          </Reveal>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {wisataList?.map((wisata) => {
            const displayTitle = isEn ? (wisata.titleEn || wisata.title_en || wisata.title) : wisata.title;
            return (
              <BentoCard 
                key={wisata.id}
                item={{
                  slug: wisata.slug,
                  title: displayTitle,
                  thumbnail: wisata.thumbnail || '',
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
      <Link href={`/wisata/${item.slug || ''}`} className={`group relative block overflow-hidden rounded-3xl ${tall ? 'h-full min-h-[320px]' : aspect}`}>
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

