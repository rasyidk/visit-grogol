'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, X } from 'lucide-react';
import { ADMIN_NAV } from './adminNav';
import { useCurrentUser } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const isActive = (href: string) => (href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href));

  // Filter sections and items based on role
  const filteredNav = ADMIN_NAV.map((section) => {
    // If section has role restriction and user doesn't have the role, hide entire section
    if (section.roles && (!user || !section.roles.includes(user.role))) return null;
    
    // Filter items inside section
    const items = section.items.filter(
      (item) => !item.roles || (user && item.roles.includes(user.role))
    );
    
    if (items.length === 0) return null;
    return { ...section, items };
  }).filter(Boolean) as typeof ADMIN_NAV;

  return (
    <>
      {open && <div className="fixed inset-0 z-30 bg-black/60 lg:hidden backdrop-blur-sm" onClick={onClose} />}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-black/5 bg-white transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-20 items-center justify-between px-6 border-b border-black/5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full shadow-soft bg-white">
              <img src="/logo.png" alt="CMS Visit Grogol" className="h-full w-full object-cover" />
            </span>
            <div className="font-bold tracking-tight text-ink">
              Grogol Kaloka
            </div>
          </Link>
          <button className="rounded-lg p-1.5 text-ink-muted hover:bg-black/5 lg:hidden" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="scrollbar-thin flex-1 space-y-6 overflow-y-auto px-4 py-6">
          {filteredNav.map((section) => (
            <div key={section.title}>
              <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">
                {section.title}
              </p>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300',
                        isActive(item.href)
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-ink-soft hover:bg-black/5 hover:text-ink'
                      )}
                    >
                      <item.icon className={cn(
                        "h-[18px] w-[18px] transition-colors",
                        isActive(item.href) ? "text-brand-600" : "text-ink-muted group-hover:text-ink-soft"
                      )} />
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
