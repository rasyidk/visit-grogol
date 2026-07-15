'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_ITEMS } from './navItems';

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'glass-nav shadow-soft' : 'bg-transparent'
      )}
    >
      <nav className="container-wide flex h-16 items-center justify-between sm:h-20">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-brand-700">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-soft">
            <Leaf className="h-5 w-5" />
          </span>
          VisitGrogol
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'relative text-sm font-medium text-ink-soft transition-colors hover:text-brand-700',
                  isActive(item.href) && 'text-brand-700'
                )}
              >
                {item.label}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-brand-600" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link href="/kontak" className="btn-primary hidden sm:inline-flex">
            Booking Sekarang
          </Link>
          <button
            aria-label="Menu"
            className="rounded-xl p-2 text-ink hover:bg-black/5 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="glass-strong border-t border-white/40 lg:hidden">
          <ul className="container-wide flex flex-col gap-1 py-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive(item.href) ? 'bg-brand-50 text-brand-700' : 'text-ink-soft hover:bg-black/5'
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2">
              <Link href="/kontak" className="btn-primary w-full">
                Booking Sekarang
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
