'use client';

import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Hero360 = dynamic(() => import('@/components/public/Hero360'), { ssr: false });
import { Play, Clock, Ticket, MapPin, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Reveal } from '@/components/ui/Reveal';
import { Newsletter } from '@/components/public/Newsletter';
import { Badge } from '@/components/ui/Misc';
import { useDestinasi } from '@/hooks/usePublicData';
import { formatRupiah } from '@/lib/utils';

export default function BerandaPage() {
  const { data: destinasi } = useDestinasi({ isFeatured: true, limit: 6 });
  const [a, b, c, d] = destinasi;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative min-h-[92vh] w-full overflow-hidden">
        <Hero360 />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/40 via-brand-950/30 to-brand-950/70 pointer-events-none" />

        <div className="container-wide relative flex min-h-[92vh] flex-col justify-center pb-16 pt-28 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl text-white"
          >
            <h1 className="text-5xl font-extrabold leading-[1.05] sm:text-6xl lg:text-7xl">
              Kembali ke
              <br />
              Alam &amp; Tradisi
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-white/80 sm:text-lg">
              Rasakan kemewahan dalam kesederhanaan. Jelajahi keindahan pedesaan yang memadukan
              kenyamanan modern dengan kearifan lokal yang autentik.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 pointer-events-auto">
              <Link href="/penginapan" className="btn bg-white text-brand-700 hover:bg-brand-50">
                Jelajahi Atraksi
              </Link>
              <button className="btn glass-dark text-white hover:bg-brand-900/60">
                <Play className="h-4 w-4 fill-current" />
                Tonton Video
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Featured destinations (bento) ────────────── */}
      <section className="section container-wide">
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
          <Reveal>
            <p className="eyebrow mb-3">Destinasi Unggulan</p>
            <h2 className="text-3xl font-bold leading-tight text-ink sm:text-4xl">
              Atraksi Terpilih untuk
              <br className="hidden sm:block" /> Perjalanan Anda
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-sm leading-relaxed text-ink-muted">
              Kurasi tempat-tempat terbaik yang menawarkan pengalaman visual dan spiritual yang tak
              terlupakan.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {/* Big feature (left, spans 2 rows) */}
          <BentoCard item={a} className="md:col-span-1 lg:row-span-2 lg:aspect-auto" tall />
          {/* Top right */}
          <BentoCard item={b} className="lg:col-span-2" showBadges />
          {/* Bottom row */}
          <BentoCard item={c} caption />
          <BentoCard item={d} />
        </div>
      </section>

      {/* ── Info cards ───────────────────────────────── */}
      <section className="bg-cream">
        <div className="container-wide grid gap-6 py-6 md:grid-cols-3">
          <Reveal>
            <div className="glass-strong h-full rounded-3xl p-8">
              <Clock className="h-7 w-7 text-brand-600" />
              <h3 className="mt-5 text-center text-lg font-bold text-ink">Jam Operasional</h3>
              <dl className="mt-5 space-y-3 text-sm">
                <Row k="Senin - Jumat" v="08:00 - 17:00" />
                <Row k="Sabtu - Minggu" v="07:00 - 19:00" />
              </dl>
              <p className="mt-5 text-center text-xs italic text-ink-muted">
                *Waktu terbaik berkunjung: 08:30 pagi
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full rounded-3xl bg-brand-gradient p-8 text-white shadow-soft">
              <Ticket className="h-7 w-7" />
              <h3 className="mt-5 text-lg font-semibold">Tiket Masuk</h3>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-white/70">Domestik</p>
                  <p className="text-2xl font-bold">
                    {formatRupiah(25000)} <span className="text-sm font-normal text-white/70">/ orang</span>
                  </p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-white/70">Mancanegara</p>
                  <p className="text-2xl font-bold">
                    {formatRupiah(75000)} <span className="text-sm font-normal text-white/70">/ orang</span>
                  </p>
                </div>
              </div>
              <Link href="/kontak" className="mt-6 block w-full rounded-full bg-white py-3 text-center text-sm font-semibold text-brand-700 hover:bg-brand-50">
                Beli Tiket Online
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass-strong flex h-full flex-col rounded-3xl p-8">
              <p className="flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                <MapPin className="h-4 w-4 text-brand-600" /> Kabupaten Bogor, Jawa Barat
              </p>
              <div className="my-5 flex-1 rounded-2xl bg-gradient-to-br from-brand-200 via-gold-400/40 to-brand-100" style={{ minHeight: 120 }} />
              <div className="text-center">
                <p className="font-semibold text-ink">Peta Lokasi</p>
                <p className="mt-1 text-xs text-ink-muted">Akses mudah hanya 2 jam dari pusat kota Jakarta.</p>
                <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline">
                  Buka di Google Maps <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────── */}
      <section className="section container-wide">
        <Reveal>
          <Newsletter />
        </Reveal>
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 pb-2 text-ink-soft">
      <dt>{k}</dt>
      <dd className="font-semibold text-ink">{v}</dd>
    </div>
  );
}

function BentoCard({
  item,
  className = '',
  tall = false,
  caption = false,
  showBadges = false,
}: {
  item?: { title: string; thumbnail: string; excerpt?: string | null; kategori?: { name: string }; facilities?: string[] | null };
  className?: string;
  tall?: boolean;
  caption?: boolean;
  showBadges?: boolean;
}) {
  if (!item) return null;
  return (
    <Reveal className={className}>
      <Link href="/penginapan" className={`group relative block overflow-hidden rounded-3xl ${tall ? 'h-full min-h-[320px]' : 'aspect-[4/3]'}`}>
        <Image src={item.thumbnail} alt={item.title} fill sizes="(max-width:768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        {showBadges && (
          <div className="absolute inset-x-5 bottom-5 text-white">
            <Badge tone="dark" className="mb-2">Alam</Badge>
            <h3 className="text-xl font-bold">{item.title}</h3>
            <div className="mt-2 flex gap-2">
              <Badge tone="neutral" className="bg-white/20 text-white">Fotografi</Badge>
              <Badge tone="neutral" className="bg-white/20 text-white">Meditasi</Badge>
            </div>
          </div>
        )}
        {caption && (
          <div className="glass absolute inset-x-4 bottom-4 rounded-2xl p-4">
            <p className="font-semibold text-ink">{item.title}</p>
            <p className="text-xs text-ink-muted">{item.excerpt || 'Area relaksasi & memancing'}</p>
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
