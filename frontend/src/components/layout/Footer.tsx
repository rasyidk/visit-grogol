'use client';

import Link from 'next/link';
import { Globe, Instagram, Facebook, Music2 } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import { useSocialMedia } from '@/hooks/usePublicData';
import type { SocialMedia } from '@/lib/types';

function SocialIcon({ platform }: { platform: SocialMedia['platform'] }) {
  if (platform === 'INSTAGRAM') return <Instagram className="h-4 w-4" />;
  if (platform === 'FACEBOOK') return <Facebook className="h-4 w-4" />;
  return <Music2 className="h-4 w-4" />;
}

export function Footer() {
  const t = useTranslations('Footer');
  const navT = useTranslations('Navigation');
  const commonT = useTranslations('Common');
  const locale = useLocale();
  const { data: socialMedia } = useSocialMedia();

  const getHref = (href: string) => {
    if (locale === 'id') return href;
    return href === '/' ? `/${locale}` : `/${locale}${href}`;
  };

  const columns = [
    {
      title: navT('tourism'),
      links: [
        { label: navT('home'), href: '/' },
        { label: navT('story'), href: '/kisah-kami' },
        { label: navT('tourism'), href: '/wisata' },
        { label: navT('culture'), href: '/budaya' },
        { label: navT('culinary'), href: '/kuliner' },
      ],
    },
    {
      title: t('links'),
      links: [
        { label: navT('umkm'), href: '/umkm' },
        { label: navT('homestay'), href: '/homestay' },
        { label: navT('news'), href: '/kabar-grogol' },
        { label: navT('reservation'), href: '/reservasi' },
      ],
    },
  ];

  return (
    <footer className="border-t border-black/5 bg-cream">
      <div className="container-wide grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:pr-8">
          <h3 className="text-2xl font-extrabold text-brand-700">Visit Grogol Kaloka</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            {t('about')}
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={getHref(link.href)} className="text-sm text-ink-muted transition-colors hover:text-brand-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink">
            {locale === 'en' ? 'Follow Us' : 'Ikuti Kami'}
          </h4>
          <div className="flex flex-wrap gap-3">
            {socialMedia.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-soft shadow-card transition hover:bg-brand-600 hover:text-white"
                aria-label={social.name}
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/5">
        <div className="container-wide flex flex-col items-center justify-between gap-4 py-6 text-sm text-ink-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Visit Grogol Kaloka. {t('rights')}</p>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>{commonT('language')}: {commonT(locale)}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
