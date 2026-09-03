'use client';

import React from 'react';
import { useHomestayDetail } from '@/hooks/usePublicData';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, WalletCards } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomestayDetailPage({ params }: { params: { slug: string; locale: string } }) {
  const { data: homestay, isLoading, isError } = useHomestayDetail(params.slug);
  const isEn = params.locale === 'en';

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-ink-soft">Loading...</p>
      </div>
    );
  }

  if (isError || !homestay) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold text-ink">Homestay tidak ditemukan</h1>
        <Link href="/homestay" className="btn btn-brand">
          Kembali ke List Homestay
        </Link>
      </div>
    );
  }

  const displayTitle = isEn ? (homestay.titleEn || homestay.title_en || homestay.title) : homestay.title;
  // Parse facilities string into array (assuming it's comma separated)
  const facilitiesList = homestay.facilities ? homestay.facilities.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <article className="min-h-screen pb-20 pt-28 bg-white">
      {/* ── Header Back Link ────────────────────────────── */}
      <div className="container-wide mb-8">
        <Link 
          href="/homestay"
          className="inline-flex items-center text-sm font-medium text-ink-soft hover:text-brand-600 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {isEn ? "Back to Homestays" : "Kembali ke Homestay"}
        </Link>
      </div>

      {/* ── Main Media ────────────────────────────────────── */}
      {homestay.thumbnail && (
        <section className="container-wide">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-video w-full overflow-hidden rounded-3xl"
          >
            <Image
              src={homestay.thumbnail}
              alt={displayTitle}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </section>
      )}

      {/* ── Gallery Slider ────────────────────────────────── */}
      {homestay.is_gallery_active && homestay.images && homestay.images.length > 0 && (
        <GallerySlider images={homestay.images} title={displayTitle} />
      )}

      {/* ── Info & Facilities ─────────────────────────────── */}
      <section className="container-wide mt-12">
        <div className="mx-auto max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-sand/30 rounded-3xl p-8 md:p-12 border border-black/5"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-10 border-b border-black/5 pb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-ink mb-4">
                  {displayTitle}
                </h1>
                <div className="inline-flex items-center gap-2 bg-brand-50 text-brand-700 px-4 py-2 rounded-full font-bold text-lg">
                  <WalletCards className="w-5 h-5" />
                  {homestay.price || (isEn ? "Contact for price" : "Hubungi untuk harga")}
                </div>
              </div>
              <div className="shrink-0">
                <a href="#booking" className="btn btn-brand w-full md:w-auto text-center">
                  {isEn ? "Book Now" : "Pesan Sekarang"}
                </a>
              </div>
            </div>

            {facilitiesList.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-ink mb-6">
                  {isEn ? "Facilities" : "Fasilitas"}
                </h3>
                <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {facilitiesList.map((facility, i) => (
                    <li key={i} className="flex items-start text-ink-soft">
                      <CheckCircle2 className="w-5 h-5 text-brand-500 mr-3 shrink-0 mt-0.5" />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
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
    <section className="mt-8">
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
