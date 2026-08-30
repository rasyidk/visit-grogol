'use client';

import { useState } from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { AccommodationCard } from '@/components/public/AccommodationCard';
import { Newsletter } from '@/components/public/Newsletter';
import { useDestinasi } from '@/hooks/usePublicData';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

export default function PenginapanPage() {
  const t = useTranslations('Penginapan');
  const FILTERS = [t('filterAll'), t('filterVila'), t('filterRumah'), t('filterEko')];
  
  const [active, setActive] = useState(t('filterAll'));
  const { data } = useDestinasi({ limit: 12 });
  const lodging = data.filter((d) => d.kategoriId === 4 || d.price >= 500000);

  return (
    <>
      <section className="container-wide pt-32 sm:pt-40">
        <Reveal>
          <p className="eyebrow mb-4">{t('heroTag')}</p>
          <h1 className="max-w-2xl text-4xl font-extrabold leading-tight text-ink sm:text-5xl lg:text-6xl">
            {t('heroTitle1')} <span className="text-brand-600">{t('heroTitle2')}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted">
            {t('heroDesc')}
          </p>
        </Reveal>

        {/* Filter bar */}
        <Reveal delay={0.1}>
          <div className="glass-strong mt-10 flex flex-wrap items-center justify-between gap-4 rounded-full p-2 pl-3">
            <div className="flex flex-wrap gap-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={cn(
                    'rounded-full px-5 py-2 text-sm font-medium transition',
                    active === f ? 'bg-brand-600 text-white shadow-soft' : 'text-ink-soft hover:bg-black/5'
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm text-ink-soft">
              <SlidersHorizontal className="h-4 w-4" />
              {t('sortPopular')}
            </button>
          </div>
        </Reveal>
      </section>

      <section className="container-wide mt-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {lodging.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08} className="h-full">
              <AccommodationCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section container-wide">
        <Reveal>
          <Newsletter
            variant="green"
            title={t('newsletterTitle')}
            description={t('newsletterDesc')}
            cta={t('newsletterCta')}
          />
        </Reveal>
      </section>
    </>
  );
}
