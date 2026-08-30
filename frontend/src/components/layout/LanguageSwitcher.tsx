'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { useState, useTransition } from 'react';

export function LanguageSwitcher({ forceLightText = false }: { forceLightText?: boolean }) {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const switchLocale = (newLocale: string) => {
    setOpen(false);
    startTransition(() => {
      let cleanPath = pathname;
      // Remove current locale prefix if it exists (e.g. /en)
      if (locale !== 'id' && pathname.startsWith(`/${locale}`)) {
        cleanPath = pathname.replace(`/${locale}`, '') || '/';
      }
      
      // Add new locale prefix if it's not the default locale
      const newPath = newLocale === 'id' 
        ? cleanPath 
        : `/${newLocale}${cleanPath === '/' ? '' : cleanPath}`;
        
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
      router.replace(newPath);
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
          !forceLightText ? 'text-ink-soft hover:bg-black/5 hover:text-brand-700' : 'text-white hover:bg-white/10'
        }`}
      >
        <Globe className="h-4 w-4" />
        <span className="uppercase">{locale}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-32 rounded-xl bg-white p-2 shadow-soft ring-1 ring-black/5">
          <button
            onClick={() => switchLocale('id')}
            disabled={isPending}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              locale === 'id' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-ink hover:bg-black/5'
            }`}
          >
            Indonesia
          </button>
          <button
            onClick={() => switchLocale('en')}
            disabled={isPending}
            className={`w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
              locale === 'en' ? 'bg-brand-50 text-brand-700 font-bold' : 'text-ink hover:bg-black/5'
            }`}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}
