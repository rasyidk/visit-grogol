'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Star, Quote, ChevronUp, ChevronDown } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

interface TestimonialItem {
  id: string | number;
  name: string;
  role?: string | null;
  roleEn?: string | null;
  origin?: string | null;
  message: string;
  messageEn?: string | null;
  rating?: number | null;
  date?: string;
  seed?: string | null;
}

interface TestimonialShowcaseProps {
  isEn: boolean;
  items: TestimonialItem[];
}

const img = (s: string, w = 300, h = 300) => `https://picsum.photos/seed/${s}/${w}/${h}`;

export function TestimonialShowcase({ isEn, items }: TestimonialShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Exactly 5 curated reviews starting from center
  const reviews: TestimonialItem[] = [
    {
      id: '1',
      name: 'Diana Johnston',
      role: 'Fotografer Alam',
      roleEn: 'Nature Photographer',
      origin: 'Bandung',
      date: '14 Agu, 2024',
      message:
        'Lanskap persawahan terasering di kala fajar benar-benar magis. Kabut yang turun perlahan di antara perbukitan memberikan pengalaman visual dan ketenangan batin yang luar biasa.',
      messageEn:
        'The terraced rice field landscape at dawn is truly magical. The gentle mountain mist floating across the hills provides an extraordinary visual experience and deep serenity.',
      rating: 4.9,
      seed: 'traveler-diana-j',
    },
    {
      id: '2',
      name: 'Lauren Contreras',
      role: 'Penulis & Pengembara',
      roleEn: 'Travel Essayist',
      origin: 'Melbourne, Australia',
      date: '29 Agu, 2024',
      message:
        'Bermalam di Joglo warga adalah puncak perjalanan kami di Jawa. Udara sejuk pegunungan, seduhan teh tubruk pagi hari, dan kehangatan sambutan keluarga desa tak akan pernah kami lupakan.',
      messageEn:
        'Staying at the traditional Joglo homestay was the highlight of our journey. The cool mountain air, morning herbal tea, and heartfelt local hospitality made us feel truly at home.',
      rating: 4.9,
      seed: 'traveler-lauren-c',
    },
    {
      id: '3',
      name: 'Edward Alexander',
      role: 'Kolektor Seni Kriya',
      roleEn: 'Art & Craft Collector',
      origin: 'Jakarta',
      date: '02 Sep, 2024',
      message:
        'Kualitas produk kriya anyaman serat alam dan gerabah lokal sangat berkelas. Saya membawa pulang beberapa kerajinan tenun tangan yang kini menjadi pajangan utama di galeri kami.',
      messageEn:
        'The quality of natural fiber woven crafts and local ceramics is exceptional. I brought home several handwoven textiles that now grace our main gallery.',
      rating: 4.9,
      seed: 'traveler-edward-a',
    },
    {
      id: '4',
      name: 'Kenji Takahashi',
      role: 'Peneliti Budaya',
      roleEn: 'Cultural Researcher',
      origin: 'Kyoto, Japan',
      date: '18 Sep, 2024',
      message:
        'Harmoni antara konservasi alam dan tradisi upacara adat warga sangat mengagumkan. Sebuah model desa wisata berbasis kearifan lokal yang patut dibanggakan.',
      messageEn:
        'The balance between nature conservation and ancestral village rituals is inspiring. A truly exemplary model of sustainable community-based cultural tourism.',
      rating: 5.0,
      seed: 'traveler-kenji-t',
    },
    {
      id: '5',
      name: 'Maya Puspita',
      role: 'Pecinta Kuliner Tradisi',
      roleEn: 'Culinary Enthusiast',
      origin: 'Surabaya',
      date: '25 Sep, 2024',
      message:
        'Cita rasa hidangan ndeso seperti sego liwet dan wedang rempah disajikan dengan ketulusan yang menyentuh hati. Pengalaman kuliner otentik yang wajib dicoba.',
      messageEn:
        'The authentic flavors of traditional village dishes and spiced herbal drinks served with genuine warmth touched our hearts. An unforgettable culinary voyage.',
      rating: 4.9,
      seed: 'traveler-maya-p',
    },
  ];

  // Always guarantee exactly 5 reviews
  const list: TestimonialItem[] = reviews.map((base, idx) => {
    if (items && items[idx]) {
      return {
        ...base,
        ...items[idx],
        date: base.date,
        seed: base.seed,
      };
    }
    return base;
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Fast, natural spring response for ultra-smooth rotation
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.1,
    restDelta: 0.0001,
  });

  // Active floating index continuously from 0 to 4 (5 reviews) based on scroll
  const activeFloat = useTransform(smoothProgress, [0, 1], [0, 4]);

  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const unsubscribe = activeFloat.on('change', (v) => {
      const normalized = Math.round(v);
      const modIndex = ((normalized % 5) + 5) % 5;
      setActiveIdx(modIndex);
    });
    return () => unsubscribe();
  }, [activeFloat]);

  const scrollToReview = (targetIndex: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const scrollDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (targetIndex / 4) * scrollDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative h-[220vh] bg-sand/20 border-t border-black/5">
      {/* Sticky Fullscreen Wheel Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center container-wide">
        <Reveal>
          <div className="max-w-2xl mb-6 sm:mb-10">
            <div className="h-1 w-12 bg-brand-700 rounded-full mb-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-ink">
              {isEn ? 'Customer Reviews' : 'Ulasan Pengunjung'}
            </h2>
          </div>
        </Reveal>

        {/* ── Continuous Scroll Wheel Stage ──────────────── */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[420px] select-none">
          {/* Left Side: Arc Track & Rotating Avatars */}
          <div className="lg:col-span-5 relative h-[360px] sm:h-[440px] flex items-center justify-start pl-2 sm:pl-8">
            {/* Curved Track Line SVG */}
            <svg
              className="absolute left-6 sm:left-14 top-0 h-full w-48 pointer-events-none text-brand-200/80"
              viewBox="0 0 160 440"
              fill="none"
            >
              <path
                d="M 12 20 Q 115 220 12 420"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>

            {/* 5 Avatars traveling along circular arc in continuous loop */}
            <div className="relative w-full h-full flex items-center">
              {list.map((item, i) => (
                <RotaryAvatar
                  key={item.id}
                  item={item}
                  index={i}
                  activeFloat={activeFloat}
                  isEn={isEn}
                  onClick={() => scrollToReview(i)}
                />
              ))}
            </div>

            {/* Up/Down Click Controls for Wheel */}
            <div className="absolute right-0 flex flex-col gap-2 z-30">
              <button
                onClick={() => scrollToReview(Math.max(0, activeIdx - 1))}
                disabled={activeIdx === 0}
                aria-label="Previous review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-ink hover:bg-brand-50 hover:text-brand-700 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronUp className="h-4 w-4" />
              </button>
              <button
                onClick={() => scrollToReview(Math.min(4, activeIdx + 1))}
                disabled={activeIdx === 4}
                aria-label="Next review"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-ink hover:bg-brand-50 hover:text-brand-700 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Side: Editorial Dynamic Quote Box */}
          <div className="lg:col-span-7 lg:pl-8 relative min-h-[220px] flex flex-col justify-center">
            {list.map((item, i) => {
              const isCurrent = i === activeIdx;
              return (
                <div
                  key={item.id}
                  className={`transition-all duration-500 transform ${
                    isCurrent
                      ? 'opacity-100 translate-y-0 relative pointer-events-auto'
                      : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
                  }`}
                >
                  <Quote className="h-10 w-10 text-brand-600/30 mb-3 -scale-x-100" />
                  
                  <p className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-ink leading-relaxed font-normal">
                    {(isEn && item.messageEn ? item.messageEn : item.message) || item.message}
                  </p>

                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-0.5 w-8 bg-brand-700" />
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-800">
                      {[isEn && item.roleEn ? item.roleEn : item.role, item.origin].filter(Boolean).join(', ')}
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Scroll Progress Indicator with Clickable Dots */}
            <div className="mt-8 flex items-center gap-2">
              {list.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToReview(i)}
                  aria-label={`Jump to review ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    i === activeIdx ? 'w-8 bg-brand-700' : 'w-2 bg-black/15 hover:bg-black/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RotaryAvatar({
  item,
  index,
  activeFloat,
  onClick,
}: {
  item: TestimonialItem;
  index: number;
  activeFloat: any;
  isEn: boolean;
  onClick: () => void;
}) {
  // Continuous circular modular wrap-around difference
  const getDiff = (cur: number) => {
    let diff = ((index - cur) % 5 + 5) % 5;
    if (diff > 2.5) diff -= 5;
    return diff;
  };

  const y = useTransform(activeFloat, (cur: number) => {
    const diff = getDiff(cur);
    const angleDeg = diff * 26;
    const rad = (angleDeg * Math.PI) / 180;
    return Math.sin(rad) * 210;
  });

  const x = useTransform(activeFloat, (cur: number) => {
    const diff = getDiff(cur);
    const angleDeg = diff * 26;
    const rad = (angleDeg * Math.PI) / 180;
    const isPeak = Math.abs(diff) < 0.5 ? (1 - Math.abs(diff) * 2) * 24 : 0;
    return (Math.cos(rad) - 1) * 75 + isPeak;
  });

  const scale = useTransform(activeFloat, (cur: number) => {
    const diff = Math.abs(getDiff(cur));
    if (diff < 0.5) return 1.15 - diff * 0.1;
    if (diff < 1.5) return 0.88 - (diff - 0.5) * 0.15;
    return Math.max(0.68 - (diff - 1.5) * 0.12, 0.5);
  });

  const opacity = useTransform(activeFloat, (cur: number) => {
    const diff = Math.abs(getDiff(cur));
    if (diff < 0.5) return 1;
    if (diff < 1.5) return 0.7 - (diff - 0.5) * 0.3;
    return Math.max(0.35 - (diff - 1.5) * 0.15, 0.15);
  });

  return (
    <motion.div
      style={{
        x,
        y,
        scale,
        opacity,
        willChange: 'transform, opacity',
      }}
      onClick={onClick}
      className="absolute left-6 sm:left-14 flex items-center gap-3.5 origin-left select-none cursor-pointer group pointer-events-auto"
    >
      {/* Avatar Circle with Dynamic Highlight */}
      <motion.div
        className="relative rounded-full transition-all duration-300 h-16 w-16 sm:h-20 sm:w-20 ring-2 sm:ring-4 ring-brand-700/80 shadow-xl p-1 bg-white flex-shrink-0 group-hover:scale-105"
      >
        <div className="relative h-full w-full overflow-hidden rounded-full">
          <Image
            src={img(item.seed || `rev-${index}`, 200, 200)}
            alt={item.name}
            fill
            className="object-cover"
            sizes="100px"
          />
        </div>
      </motion.div>

      {/* Name, Rating & Date */}
      <div className="whitespace-nowrap">
        <h3 className="font-bold text-ink text-sm sm:text-base leading-tight group-hover:text-brand-700 transition-colors">
          {item.name}
        </h3>
        <div className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-muted">
          <span className="flex items-center text-brand-700 font-bold">
            <Star className="h-3 w-3 fill-brand-700 text-brand-700 mr-0.5 inline" />
            {item.rating || '4.9'}
          </span>
          <span>•</span>
          <span>{item.date || 'Aug 2024'}</span>
        </div>
      </div>
    </motion.div>
  );
}
