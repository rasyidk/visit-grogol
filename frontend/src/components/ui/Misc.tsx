import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Badge({
  children,
  className,
  tone = 'brand',
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'brand' | 'gold' | 'neutral' | 'dark';
}) {
  const tones = {
    brand: 'bg-brand-50 text-brand-700',
    gold: 'bg-gold-500/15 text-gold-600',
    neutral: 'bg-black/5 text-ink-soft',
    dark: 'bg-brand-800 text-white',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function RatingPill({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-brand-700 px-2.5 py-1 text-xs font-bold text-white shadow-soft">
      <Star className="h-3 w-3 fill-current" />
      {value.toFixed(1)}
    </span>
  );
}

export function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-block h-5 w-5 animate-spin rounded-full border-2 border-brand-600 border-t-transparent',
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl font-bold text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-ink-muted">{description}</p>}
    </div>
  );
}
