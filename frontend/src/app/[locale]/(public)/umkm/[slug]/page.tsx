'use client';

import React from 'react';
import { useUmkmDetail } from '@/hooks/usePublicData';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function UmkmDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const { data: umkm, isLoading, isError } = useUmkmDetail(params.slug);
  const isEn = params.locale === 'en';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-ink-soft">Loading...</p>
      </div>
    );
  }

  if (isError || !umkm) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-ink">UMKM tidak ditemukan</h1>
        <Link href="/umkm" className="btn btn-brand">
          Kembali ke List UMKM
        </Link>
      </div>
    );
  }

  const displayTitle = isEn ? (umkm.titleEn || umkm.title_en || umkm.title) : umkm.title;
  const displayContent = isEn ? (umkm.contentEn || umkm.content_en || umkm.content) : umkm.content;

  return (
    <article className="min-h-screen pb-20 pt-28 bg-white">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="container-wide mb-12">
        <Link 
          href="/umkm"
          className="inline-flex items-center text-sm font-medium text-ink-soft hover:text-brand-600 transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {isEn ? "Back to UMKM" : "Kembali ke UMKM"}
        </Link>
        <div className="max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-ink mb-6"
          >
            {displayTitle}
          </motion.h1>
        </div>
      </header>

      {/* ── Main Media ────────────────────────────────────── */}
      {umkm.thumbnail && (
        <section className="container-wide mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-video w-full overflow-hidden rounded-3xl"
          >
            <Image
              src={umkm.thumbnail}
              alt={displayTitle}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </section>
      )}

      {/* ── Gallery Slider ────────────────────────────────── */}
      {umkm.is_gallery_active && umkm.images && umkm.images.length > 0 && (
        <GallerySlider images={umkm.images} title={displayTitle} isEn={isEn} />
      )}

      {/* ── Content ───────────────────────────────────────── */}
      <section className="container-wide mb-16 mt-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg prose-brand max-w-none text-ink-soft mx-auto"
            dangerouslySetInnerHTML={{ __html: displayContent || '' }}
          />
        </div>
      </section>
    </article>
  );
}

function GallerySlider({ images, title, isEn }: { images: string[]; title: string; isEn: boolean }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="mt-8 mb-12">
      <div className="container-wide relative group">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full relative"
        >
          <button
            onClick={() => scroll('left')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-ink p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Geser Kiri"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] scroll-smooth"
          >
            {images.map((img, i) => (
              <div key={i} className="relative shrink-0 w-[50vw] sm:w-56 md:w-72 aspect-[4/3] overflow-hidden rounded-2xl bg-black/5 snap-center">
                <Image src={img} alt={`${title} - Foto ${i + 1}`} fill className="object-cover transition-transform duration-500 hover:scale-105" />
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-ink p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            aria-label="Geser Kanan"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
