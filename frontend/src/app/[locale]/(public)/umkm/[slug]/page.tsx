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

      {/* ── Content ───────────────────────────────────────── */}
      <section className="container-wide">
        <div className="mx-auto max-w-3xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg prose-brand max-w-none text-ink-soft"
            dangerouslySetInnerHTML={{ __html: displayContent || '' }}
          />
        </div>
      </section>

      {/* ── Gallery Slider ────────────────────────────────── */}
      {umkm.is_gallery_active && umkm.images && umkm.images.length > 0 && (
        <section className="mt-20 overflow-hidden bg-sand/30 py-16">
          <div className="container-wide mb-8">
            <h2 className="text-2xl font-bold text-ink">
              {isEn ? "Product Gallery" : "Galeri Produk"}
            </h2>
          </div>
          
          <div className="flex gap-4 px-4 md:px-8 overflow-x-auto snap-x snap-mandatory hide-scrollbar">
            {umkm.images.map((img, i) => (
              <div 
                key={i} 
                className="relative aspect-square w-72 shrink-0 snap-center overflow-hidden rounded-2xl md:w-96"
              >
                <Image
                  src={img}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
