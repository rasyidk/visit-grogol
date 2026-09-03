'use client';

import React from 'react';
import { useWisataDetail } from '@/hooks/usePublicData';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WisataDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const { data: wisata, isLoading, isError } = useWisataDetail(params.slug);
  const isEn = params.locale === 'en';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-ink-soft">Loading...</p>
      </div>
    );
  }

  if (isError || !wisata) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-ink">Wisata tidak ditemukan</h1>
        <Link href="/wisata" className="btn btn-brand">
          Kembali ke List Wisata
        </Link>
      </div>
    );
  }

  const displayTitle = isEn ? (wisata.titleEn || wisata.title_en || wisata.title) : wisata.title;
  const displayContent = isEn ? (wisata.contentEn || wisata.content_en || wisata.content) : wisata.content;

  return (
    <article className="min-h-screen pb-20 pt-28">
      {/* ── Header ──────────────────────────────────────── */}
      <header className="container-wide mb-12">
        <Link href="/wisata" className="inline-flex items-center text-sm font-medium text-ink-muted hover:text-brand-600 transition-colors mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali ke List
        </Link>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-4xl md:text-5xl font-bold text-ink mb-6">{displayTitle}</h1>
        </motion.div>
      </header>

      {/* ── Featured Image ──────────────────────────────── */}
      {wisata.thumbnail && (
        <section className="container-wide mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden rounded-3xl bg-black/5"
          >
            <Image 
              src={wisata.thumbnail} 
              alt={displayTitle} 
              fill 
              className="object-cover" 
              priority
            />
          </motion.div>
        </section>
      )}

      {/* ── Photo Gallery ──────────────────────────────── */}
      {(wisata.isGalleryActive ?? wisata.is_gallery_active ?? true) && wisata.images && wisata.images.length > 0 && (
        <GallerySlider images={wisata.images} title={displayTitle} />
      )}

      {/* ── Content ─────────────────────────────────────── */}
      <section className="container-wide">
        <div className="mx-auto max-w-3xl">
          {displayContent ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg prose-brand max-w-none text-ink-soft mb-12"
              dangerouslySetInnerHTML={{ __html: displayContent }}
            />
          ) : (
            <p className="text-ink-muted italic mb-12">Konten belum tersedia.</p>
          )}

        </div>
      </section>
    </article>
  );
}

function GallerySlider({ images, title }: { images: string[]; title: string }) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="container-wide mb-12 relative group">
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

        {/* Horizontal scrollable container */}
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
    </section>
  );
}
