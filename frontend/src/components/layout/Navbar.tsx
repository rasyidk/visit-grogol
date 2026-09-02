'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslations, useLocale } from 'next-intl';
import { LanguageSwitcher } from './LanguageSwitcher';

const NAV_KEYS = [
  { key: 'home', href: '/' },
  { key: 'story', href: '/kisah-kami' },
  { key: 'tourism', href: '/wisata' },
  { key: 'culture', href: '/budaya' },
  { key: 'culinary', href: '/kuliner' },
  { key: 'umkm', href: '/umkm' },
  { key: 'homestay', href: '/homestay' },
  { key: 'news', href: '/kabar-grogol' },
];

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations('Navigation');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const getHref = (href: string) => {
    if (locale === 'id') return href;
    return href === '/' ? `/${locale}` : `/${locale}${href}`;
  };

  const isActive = (href: string) => {
    const fullHref = getHref(href);
    if (href === '/') {
      return pathname === fullHref || pathname === `${fullHref}/`;
    }
    return pathname.startsWith(fullHref);
  };

  let cleanPath = pathname;
  if (locale !== 'id' && pathname.startsWith(`/${locale}`)) {
    cleanPath = pathname.replace(`/${locale}`, '') || '/';
  }
  const isDarkHero = ['/', '/wisata', '/budaya'].includes(cleanPath);
  const forceLightText = !scrolled && isDarkHero;

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass-nav shadow-soft' : 'bg-transparent'
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between sm:h-20">
        <Link href={getHref('/')} className={cn("flex items-center gap-3 text-xl font-extrabold", !forceLightText ? "text-brand-700" : "text-white")}>
          <Image src="/logo.png" alt="Desa Wisata Grogol Kaloka" width={40} height={40} className="rounded-full shadow-soft" />
          Visit Grogol Kaloka
        </Link>

        <ul className="hidden items-center gap-4 xl:gap-6 lg:flex">
          {NAV_KEYS.map((item) => (
            <li key={item.href}>
              <Link
                href={getHref(item.href)}
                className={cn(
                  'relative text-[13px] xl:text-sm font-semibold transition-colors whitespace-nowrap',
                  !forceLightText ? 'text-ink-soft hover:text-brand-700' : 'text-white/90 hover:text-white',
                  isActive(item.href) && (!forceLightText ? 'text-brand-700' : 'text-white')
                )}
              >
                {t(item.key)}
                {isActive(item.href) && (
                  <span className={cn("absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full", !forceLightText ? "bg-brand-600" : "bg-white")} />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LanguageSwitcher forceLightText={forceLightText} />
          <Link href={getHref('/reservasi')} className={cn("btn-primary hidden sm:inline-flex text-xs xl:text-sm px-4 xl:px-6", forceLightText && "bg-white text-brand-700 hover:bg-brand-50")}>
            {t('reservation')}
          </Link>
          <button
            aria-label="Menu"
            className={cn("rounded-xl p-2 transition-colors lg:hidden", !forceLightText ? "text-ink hover:bg-black/5" : "text-white hover:bg-white/10")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong border-t border-white/40 lg:hidden">
          <ul className="container-wide flex flex-col gap-1 py-4">
            {NAV_KEYS.map((item) => (
              <li key={item.href}>
                <Link
                  href={getHref(item.href)}
                  className={cn(
                    'block rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive(item.href) ? 'bg-brand-50 text-brand-700' : 'text-ink-soft hover:bg-black/5'
                  )}
                >
                  {t(item.key)}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link href={getHref('/reservasi')} className="btn-primary w-full text-center">
                {t('reservation')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
