'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, X } from 'lucide-react';
import { ADMIN_NAV } from './adminNav';
import { cn } from '@/lib/utils';

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === '/admin' ? pathname === '/admin' : pathname.startsWith(href));

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={onClose} />}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-black/5 bg-white transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-16 items-center justify-between px-6">
          <Link href="/admin" className="flex items-center gap-2 font-extrabold text-brand-700">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Leaf className="h-5 w-5" />
            </span>
            <div className="font-bold tracking-tight text-ink">
              Visit Grogol Kaloka
            </div>
          </Link>
          <button className="rounded-lg p-1.5 text-ink-muted hover:bg-black/5 lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 space-y-6 overflow-y-auto px-4 py-4">
          {ADMIN_NAV.map((section) => (
            <div key={section.title}>
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                {section.title}
              </p>
              <ul className="space-y-1">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                        isActive(item.href)
                          ? 'bg-brand-600 text-white shadow-soft'
                          : 'text-ink-soft hover:bg-brand-50 hover:text-brand-700'
                      )}
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
