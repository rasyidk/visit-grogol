import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge conditional Tailwind class names, de-duplicating conflicts. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format an integer amount of IDR as "Rp 1.250.000". */
export function formatRupiah(value?: number | null): string {
  if (value == null) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
}

/** Format a date string as "15 Mei 2024". */
export function formatDate(input?: string | Date | null): string {
  if (!input) return '-';
  const d = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return '-';
  return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);
}

/** "15 Mei" short form used on event chips. */
export function formatDateShort(input?: string | Date | null): { day: string; month: string } {
  const d = input ? new Date(input) : new Date();
  return {
    day: new Intl.DateTimeFormat('id-ID', { day: '2-digit' }).format(d),
    month: new Intl.DateTimeFormat('id-ID', { month: 'short' }).format(d).toUpperCase(),
  };
}

export function truncate(text: string, length = 120): string {
  return text.length > length ? `${text.slice(0, length).trimEnd()}…` : text;
}

/** Best-effort thumbnail for a YouTube URL. */
export function youtubeThumb(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return match ? `https://i.ytimg.com/vi/${match[1]}/hqdefault.jpg` : null;
}

export function youtubeEmbed(url: string): string {
  const match = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}
