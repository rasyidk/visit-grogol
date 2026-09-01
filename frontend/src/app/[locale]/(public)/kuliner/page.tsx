'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Badge, SectionHeading } from '@/components/ui/Misc';
import { useProfil } from '@/hooks/usePublicData';
import { useTranslations } from 'next-intl';

const img = (s: string, w = 800, h = 600) => `https://picsum.photos/seed/${s}/${w}/${h}`;

export default function KulinerPage() {
  const t = useTranslations('Kuliner');
  const { data: profil } = useProfil();

  const places = [
    { name: t('place1Name'), badge: t('place1Badge'), since: t('place1Since'), desc: t('place1Desc'), img: img('omah-rempah') },
    { name: t('place2Name'), badge: t('place2Badge'), since: t('place2Since'), desc: t('place2Desc'), img: img('warung-sawah') },
    { name: t('place3Name'), badge: t('place3Badge'), since: t('place3Since'), desc: t('place3Desc'), img: img('teras-langit') },
  ];

  const menus = [
    { name: t('menu1Name'), desc: t('menu1Desc'), price: 'IDR 35k' },
    { name: t('menu2Name'), desc: t('menu2Desc'), price: 'IDR 55k' },
    { name: t('menu3Name'), desc: t('menu3Desc'), price: 'IDR 75k' },
    { name: t('menu4Name'), desc: t('menu4Desc'), price: 'IDR 28k' },
  ];

  return (
    <>
      <section className="container-wide pt-32 text-center sm:pt-40">
        <Reveal>
          <SectionHeading
            align="center"
            title={t('heroTitle')}
            description={t('heroDesc')}
          />
        </Reveal>
      </section>

      {/* Showcase bento */}
      <section className="container-wide mt-12">
        <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="group relative h-full min-h-[360px] overflow-hidden rounded-3xl">
              <Image src={profil?.kulinerHeroImage || img('sego-wiwit', 1000, 800)} alt="Sego Wiwit Tradisional" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <h3 className="text-2xl font-bold">{t('bento1Title')}</h3>
                <p className="mt-1 text-sm text-white/80">{t('bento1Desc')}</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-square overflow-hidden rounded-3xl md:aspect-auto md:h-full">
              <Image src={img('kuah-panas', 600, 600)} alt={t('bento2Alt')} fill className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-square overflow-hidden rounded-3xl md:aspect-auto md:h-full">
              <Image src={img('jajanan-pasar', 600, 600)} alt={t('bento3Alt')} fill className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tempat Makan Pilihan */}
      <section className="section bg-sand/60">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <SectionHeading title={t('placesTitle')} description={t('placesDesc')} />
            </Reveal>
            <div className="hidden gap-2 sm:flex">
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-soft shadow-card hover:bg-brand-50" aria-label={t('placesPrev')}><ChevronLeft className="h-5 w-5" /></button>
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-soft shadow-card hover:bg-brand-50" aria-label={t('placesNext')}><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {places.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article className="overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                    <Image src={p.img} alt={p.name} fill className="object-cover" />
                    <div className="absolute left-4 top-4"><Badge tone="dark">{p.badge}</Badge></div>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink">{p.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-600">{p.since}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Signature */}
      <section className="section container-wide text-center">
        <Reveal>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">{t('menuTitle')}</h2>
          <p className="mt-3 text-sm text-ink-muted">{t('menuDesc')}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {menus.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <div className="card flex h-full flex-col items-center p-6 text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full shadow-soft">
                  <Image src={img(`menu-${m.name}`, 200, 200)} alt={m.name} fill className="object-cover" />
                </div>
                <h3 className="mt-5 font-bold text-ink">{m.name}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-muted">{m.desc}</p>
                <p className="mt-4 font-bold text-brand-700">{m.price}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section container-wide">
        <Reveal>
          <div className="rounded-4xl bg-brand-gradient px-6 py-16 text-center text-white shadow-soft">
            <h2 className="text-3xl font-bold sm:text-4xl">{t('ctaTitle')}</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/80">
              {t('ctaDesc')}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/kontak" className="btn bg-white text-brand-700 hover:bg-brand-50">{t('ctaBtn1')}</Link>
              <Link href="/kontak" className="btn border border-white/40 text-white hover:bg-white/10">{t('ctaBtn2')}</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
