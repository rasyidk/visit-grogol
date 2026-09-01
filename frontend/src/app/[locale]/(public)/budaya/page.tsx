'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowDown, Download, Sparkles, Users, Leaf } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Misc';
import { useEvents, useProfil } from '@/hooks/usePublicData';
import { formatDateShort } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const img = (s: string, w = 800, h = 600) => `https://picsum.photos/seed/${s}/${w}/${h}`;

export default function BudayaPage() {
  const t = useTranslations('Budaya');
  const { data: events } = useEvents({ limit: 3 });
  const { data: profil } = useProfil();

  const triHita = [
    { icon: Sparkles, title: t('triHita1Title'), desc: t('triHita1Desc') },
    { icon: Users, title: t('triHita2Title'), desc: t('triHita2Desc') },
    { icon: Leaf, title: t('triHita3Title'), desc: t('triHita3Desc') },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[80vh] w-full overflow-hidden">
        <Image src={profil?.budayaHeroImage || img('cultural-dance', 1920, 1080)} alt="Tari tradisional" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/60 to-brand-950/80" />
        <div className="container-wide relative flex min-h-[80vh] flex-col justify-center pt-24 text-white">
          <Reveal>
            <Badge tone="neutral" className="mb-5 bg-white/15 text-white">{t('heroTag')}</Badge>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight sm:text-6xl">{t('heroTitle')}</h1>
            <p className="mt-5 max-w-xl text-base text-white/80">
              {t('heroDesc')}
            </p>
            <button className="btn mt-8 w-fit bg-white text-brand-700 hover:bg-brand-50">
              {t('heroBtn')} <ArrowDown className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Tradisi Lisan */}
      <section className="section container-wide grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="relative aspect-[4/5] max-w-md overflow-hidden rounded-4xl shadow-soft rotate-[-2deg]">
              <Image src={img('elder-story', 800, 1000)} alt="Sesepuh bercerita" fill className="object-cover" />
              <div className="glass-strong absolute inset-x-4 bottom-4 rounded-2xl p-4">
                <p className="text-sm italic text-ink">{t('quote')}</p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{t('oralTitle')}</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted">
            <p>{t('oralDesc1')}</p>
            <p>{t('oralDesc2')}</p>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="card p-5">
              <Sparkles className="h-5 w-5 text-brand-600" />
              <p className="mt-3 font-semibold text-ink">{t('mythTitle')}</p>
              <p className="mt-1 text-xs text-ink-muted">{t('mythDesc')}</p>
            </div>
            <div className="card p-5">
              <Leaf className="h-5 w-5 text-brand-600" />
              <p className="mt-3 font-semibold text-ink">{t('wisdomTitle')}</p>
              <p className="mt-1 text-xs text-ink-muted">{t('wisdomDesc')}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Mahakarya */}
      <section className="section bg-sand/60">
        <div className="container-wide">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-lg text-ink-muted">{t('masterpieceDesc')}</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {[
              { title: t('danceTitle'), badge: t('danceBadge'), cta: t('danceCta'), desc: t('danceDesc'), img: img('tari-padi') },
              { title: t('weaveTitle'), badge: t('weaveBadge'), cta: t('weaveCta'), desc: t('weaveDesc'), img: img('tenun-serat') },
            ].map((m, i) => (
              <Reveal key={m.title} delay={i * 0.1}>
                <article>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-3xl">
                    <Image src={m.img} alt={m.title} fill className="object-cover" />
                    <div className="absolute right-4 top-4"><Badge tone="dark">{m.badge}</Badge></div>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{m.desc}</p>
                  <button className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:gap-2.5 transition-all">
                    {m.cta} <ArrowRight className="h-4 w-4" />
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Tri Hita Karana */}
      <section className="section container-wide">
        <Reveal>
          <div className="grid gap-8 overflow-hidden rounded-4xl bg-brand-gradient p-8 text-white shadow-soft lg:grid-cols-2 lg:p-12">
            <div>
              <h2 className="text-2xl font-bold sm:text-3xl">{t('triHitaTitle')}</h2>
              <p className="mt-3 text-sm text-white/80">
                {t('triHitaDesc')}
              </p>
              <ul className="mt-8 space-y-5">
                {triHita.map((t) => (
                  <li key={t.title} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <t.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold">{t.title}</p>
                      <p className="text-sm text-white/75">{t.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative min-h-[260px] overflow-hidden rounded-3xl">
              <Image src={img('festival-crowd', 800, 800)} alt="Perayaan desa" fill className="object-cover" />
            </div>
          </div>
        </Reveal>
      </section>

      {/* Festival Calendar */}
      <section className="section container-wide">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-ink sm:text-3xl">{t('calendarTitle')}</h2>
            </div>
            <button className="btn-outline">
              {t('calendarDownload')} <Download className="h-4 w-4" />
            </button>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {events.slice(0, 3).map((ev, i) => {
            const { day, month } = formatDateShort(ev.startDate);
            const highlight = i === 1;
            return (
              <Reveal key={ev.id} delay={i * 0.08}>
                <div className={`h-full rounded-3xl p-7 ${highlight ? 'bg-brand-gradient text-white shadow-soft' : 'card'}`}>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold">{day}</span>
                    <span className={`text-sm font-semibold ${highlight ? 'text-white/80' : 'text-brand-600'}`}>{month}</span>
                  </div>
                  <h3 className={`mt-4 text-lg font-bold ${highlight ? 'text-white' : 'text-ink'}`}>{ev.title}</h3>
                  <p className={`mt-2 text-sm ${highlight ? 'text-white/80' : 'text-ink-muted'}`}>{ev.description}</p>
                  {highlight ? (
                    <Link href="/kontak" className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-brand-700">{t('buyTicket')}</Link>
                  ) : (
                    <button className="mt-5 rounded-full border border-black/10 px-5 py-2 text-sm font-semibold text-ink-soft hover:bg-black/5">{t('learnMore')}</button>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
