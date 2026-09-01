'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLocale } from 'next-intl';

const img = (s: string, w = 600, h = 420) => `https://picsum.photos/seed/${s}/${w}/${h}`;

// Ring 1 (Outer ring - responsive positioning for both mobile and desktop)
const RING_OUTER = [
  { id: '1', title: 'Tari Reog', seed: 'budaya-reog-cor', x: -28, y: -24, xM: -32, yM: -26, rot: -6, aspect: 'w-28 sm:w-40 md:w-52 aspect-[16/10]' },
  { id: '2', title: 'Kirab Budaya', seed: 'budaya-kirab-cor', x: -9, y: -28, xM: -10, yM: -32, rot: 4, aspect: 'w-26 sm:w-36 md:w-48 aspect-[16/11]' },
  { id: '3', title: 'Sorak Warga', seed: 'budaya-warga-cor', x: 9, y: -28, xM: 10, yM: -32, rot: -3, aspect: 'w-26 sm:w-36 md:w-48 aspect-[16/10]' },
  { id: '4', title: 'Pentas Seni', seed: 'budaya-pentas-cor', x: 28, y: -22, xM: 32, yM: -24, rot: 6, aspect: 'w-28 sm:w-40 md:w-52 aspect-[16/11]' },
  { id: '5', title: 'Pendopo Adat', seed: 'budaya-pendopo-cor', x: -32, y: 1, xM: -35, yM: 0, rot: -4, aspect: 'w-28 sm:w-40 md:w-52 aspect-[16/10]' },
  { id: '6', title: 'Sesepuh Desa', seed: 'budaya-sesepuh-cor', x: 32, y: 1, xM: 35, yM: 0, rot: 5, aspect: 'w-28 sm:w-40 md:w-52 aspect-[16/10]' },
  { id: '7', title: 'Gejlog Lesung', seed: 'budaya-gejlog-cor', x: -24, y: 24, xM: -30, yM: 26, rot: 5, aspect: 'w-28 sm:w-40 md:w-50 aspect-[16/10]' },
  { id: '8', title: 'Prajurit Bregada', seed: 'budaya-bregada-cor', x: 0, y: 28, xM: 0, yM: 32, rot: -2, aspect: 'w-30 sm:w-44 md:w-56 aspect-[16/10]' },
  { id: '9', title: 'Upacara Rasulan', seed: 'budaya-rasulan-cor', x: 24, y: 24, xM: 30, yM: 26, rot: -5, aspect: 'w-28 sm:w-40 md:w-50 aspect-[16/10]' },
];

// Ring 2 (Inner ring - emerges cleanly from center)
const RING_INNER = [
  { id: 'i1', title: 'Gamelan Karawitan', seed: 'budaya-gamelan-inn', x: -16, y: -15, xM: -18, yM: -16, rot: 3, aspect: 'w-24 sm:w-32 md:w-42 aspect-[16/10]' },
  { id: 'i2', title: 'Dolanan Anak', seed: 'budaya-dolanan-inn', x: 16, y: -15, xM: 18, yM: -16, rot: -4, aspect: 'w-24 sm:w-32 md:w-42 aspect-[16/10]' },
  { id: 'i3', title: 'Sedekahan Bumi', seed: 'budaya-sedekah-inn', x: -16, y: 15, xM: -18, yM: 16, rot: -3, aspect: 'w-24 sm:w-32 md:w-42 aspect-[16/10]' },
  { id: 'i4', title: 'Ritual Gumbregan', seed: 'budaya-gumbregan-inn', x: 16, y: 15, xM: 18, yM: 16, rot: 4, aspect: 'w-24 sm:w-32 md:w-42 aspect-[16/10]' },
];

export function CultureCorridor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const isEn = locale === 'en';
  const getHref = (path: string) => (locale === 'id' ? path : `/${locale}${path}`);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Fast, responsive spring physics (no laggy delay)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.1,
    restDelta: 0.001,
  });

  // Outer Layer Zoom Out & Dissolve
  const scaleOuter = useTransform(smoothProgress, [0, 0.65], [1, 2.6]);
  const opacityOuter = useTransform(smoothProgress, [0, 0.45, 0.65], [1, 0.85, 0]);

  // Inner Layer Zoom In
  const scaleInner = useTransform(smoothProgress, [0.15, 0.7, 1], [0.4, 1.05, 2]);
  const opacityInner = useTransform(smoothProgress, [0.15, 0.35, 0.8, 1], [0, 1, 1, 0]);

  // Center Intro (Fades out quickly upon scrolling)
  const introScale = useTransform(smoothProgress, [0, 0.28], [1, 1.15]);
  const introOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const introPointerEvents = useTransform(smoothProgress, (p) => (p < 0.2 ? 'auto' : 'none'));

  // Center Climax CTA Card (Reveals smoothly at end)
  const centerScale = useTransform(smoothProgress, [0.6, 0.82, 1], [0.85, 1, 1]);
  const centerOpacity = useTransform(smoothProgress, [0.6, 0.78, 1], [0, 1, 1]);
  const centerPointerEvents = useTransform(smoothProgress, (p) => (p > 0.62 ? 'auto' : 'none'));

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-sand/30">
      {/* Sticky Fullscreen Tunnel Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        {/* Soft Background Canvas Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-sand/40 to-brand-100/40 pointer-events-none" />

        {/* Decorative subtle polygon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-25 pointer-events-none">
          <div className="w-[90vw] max-w-[1300px] aspect-square rounded-[40px] sm:rounded-[80px] bg-brand-100/50 rotate-45 transform scale-90" />
        </div>

        {/* ── LAYER 1: OUTER RING OF PHOTOS ──────────────── */}
        <motion.div
          style={{
            scale: scaleOuter,
            opacity: opacityOuter,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {RING_OUTER.map((item) => (
            <div
              key={item.id}
              style={{
                transform: `rotate(${item.rot}deg)`,
              }}
              className="absolute pointer-events-auto transition-transform hover:scale-105 duration-200 z-10"
            >
              <div
                style={{
                  transform: `translate(${item.x}vw, ${item.y}vh)`,
                }}
                className="hidden sm:block"
              >
                <CardFrame item={item} />
              </div>
              <div
                style={{
                  transform: `translate(${item.xM}vw, ${item.yM}vh)`,
                }}
                className="sm:hidden"
              >
                <CardFrame item={item} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── LAYER 2: INNER RING (DEEPER IN TUNNEL) ──────── */}
        <motion.div
          style={{
            scale: scaleInner,
            opacity: opacityInner,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          {RING_INNER.map((item) => (
            <div
              key={item.id}
              style={{
                transform: `rotate(${item.rot}deg)`,
              }}
              className="absolute pointer-events-auto transition-transform hover:scale-105 duration-200 z-15"
            >
              <div
                style={{
                  transform: `translate(${item.x}vw, ${item.y}vh)`,
                }}
                className="hidden sm:block"
              >
                <CardFrame item={item} />
              </div>
              <div
                style={{
                  transform: `translate(${item.xM}vw, ${item.yM}vh)`,
                }}
                className="sm:hidden"
              >
                <CardFrame item={item} />
              </div>
            </div>
          ))}
        </motion.div>

        {/* ── 1. INITIAL CENTER INTRO (Fills center hole at start) ── */}
        <motion.div
          style={{
            scale: introScale,
            opacity: introOpacity,
            pointerEvents: introPointerEvents,
            willChange: 'transform, opacity',
          }}
          className="absolute z-20 w-[90vw] max-w-sm sm:max-w-md md:max-w-lg px-2 sm:px-6 text-center"
        >
          <div className="rounded-3xl border border-black/5 bg-white/90 p-5 sm:p-7 md:p-8 backdrop-blur-md shadow-card">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-ink leading-tight">
              {isEn ? 'Living Cultural Heritage' : 'Warisan Budaya & Tradisi'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed line-clamp-2 sm:line-clamp-none">
              {isEn
                ? 'Centuries of rituals, sacred performances, and living ancestral arts.'
                : 'Harmoni upacara adat, kesenian rakyat, dan tradisi leluhur warga Desa Grogol.'}
            </p>
            <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] sm:text-xs font-semibold text-brand-700">
              <span>{isEn ? 'Scroll to explore' : 'Gulir untuk masuk lorong'}</span>
              <span className="animate-bounce font-bold">↓</span>
            </div>
          </div>
        </motion.div>

        {/* ── 2. FINAL CENTER TUNNEL CLIMAX & CTA (Revealed at end) ── */}
        <motion.div
          style={{
            scale: centerScale,
            opacity: centerOpacity,
            pointerEvents: centerPointerEvents,
            willChange: 'transform, opacity',
          }}
          className="absolute z-30 w-[92vw] max-w-sm sm:max-w-lg md:max-w-xl px-2 sm:px-6 text-center"
        >
          <div className="rounded-3xl border border-black/5 bg-white/95 p-6 sm:p-8 md:p-10 shadow-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink leading-tight">
              {isEn ? 'Explore Our Culture' : 'Lorong Budaya Desa'}
            </h2>
            <p className="mt-2.5 text-xs sm:text-sm md:text-base text-ink-muted leading-relaxed">
              {isEn
                ? 'Discover all traditional rituals, performances, and folk games preserved across generations.'
                : 'Temukan kisah lengkap upacara adat, seni pertunjukan, dan kearifan hidup warga Desa Grogol Kaloka.'}
            </p>
            <div className="mt-5 sm:mt-6 flex justify-center">
              <Link
                href={getHref('/budaya')}
                className="btn-primary inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full px-6 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold shadow-md hover:shadow-xl transition-all duration-200 active:scale-95 group"
              >
                <span>{isEn ? 'Explore All Traditions' : 'Jelajahi Seluruh Budaya'}</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CardFrame({
  item,
}: {
  item: {
    id: string;
    title: string;
    seed: string;
    aspect: string;
  };
}) {
  return (
    <div className={`${item.aspect} relative overflow-hidden rounded-xl sm:rounded-2xl border-2 sm:border-3 border-white bg-white shadow-md sm:shadow-lg`}>
      <Image
        src={img(item.seed, 450, 320)}
        alt={item.title}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 130px, 220px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <span className="absolute bottom-1.5 left-2 sm:bottom-2 sm:left-2.5 text-[9px] sm:text-xs font-bold text-white tracking-wide truncate max-w-[90%]">
        {item.title}
      </span>
    </div>
  );
}
