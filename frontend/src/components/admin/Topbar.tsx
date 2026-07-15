'use client';

import { Menu, LogOut, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useCurrentUser, useAuthActions } from '@/hooks/useAuth';

export function Topbar({ onMenu }: { onMenu: () => void }) {
  const { data: user } = useCurrentUser();
  const { logout } = useAuthActions();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-black/5 bg-white/80 px-4 backdrop-blur-xl sm:px-6">
      <button className="rounded-lg p-2 text-ink-soft hover:bg-black/5 lg:hidden" onClick={onMenu} aria-label="Menu">
        <Menu className="h-5 w-5" />
      </button>

      <div className="ml-auto flex items-center gap-3">
        <Link
          href="/"
          target="_blank"
          className="hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm text-ink-soft hover:bg-black/5 sm:flex"
        >
          <ExternalLink className="h-4 w-4" /> Lihat Situs
        </Link>

        <div className="flex items-center gap-3 rounded-full bg-brand-50 py-1.5 pl-1.5 pr-4">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
            {(user?.name ?? 'A').charAt(0).toUpperCase()}
          </span>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold leading-tight text-ink">{user?.name ?? 'Admin'}</p>
            <p className="text-[10px] leading-tight text-ink-muted">{user?.role ?? ''}</p>
          </div>
        </div>

        <button
          onClick={() => logout()}
          className="flex h-9 w-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-red-50 hover:text-red-600"
          aria-label="Logout"
          title="Logout"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
