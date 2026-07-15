import Image from 'next/image';
import Link from 'next/link';
import { RatingPill } from '@/components/ui/Misc';
import { FacilityIcon, facilityLabel } from './facilityIcon';
import { formatRupiah, truncate } from '@/lib/utils';
import type { Destinasi } from '@/lib/types';

export function AccommodationCard({ item }: { item: Destinasi }) {
  const facilities = (item.facilities ?? []).slice(0, 4);
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute right-4 top-4">
          <RatingPill value={item.rating} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug text-ink">{item.title}</h3>
          <div className="shrink-0 text-right">
            <p className="text-sm font-bold text-brand-700">{formatRupiah(item.price)}</p>
            <p className="text-[11px] text-ink-muted">/malam</p>
          </div>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-ink-muted">
          {truncate(item.excerpt || item.description, 90)}
        </p>

        {facilities.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-4 border-t border-black/5 pt-4">
            {facilities.map((f) => (
              <div key={f} className="flex flex-col items-center gap-1 text-ink-soft">
                <FacilityIcon name={f} className="h-5 w-5" />
                <span className="text-[10px] font-medium text-ink-muted">{facilityLabel(f)}</span>
              </div>
            ))}
          </div>
        )}

        <Link
          href="/kontak"
          className="mt-6 w-full rounded-full bg-sand py-3 text-center text-sm font-semibold text-brand-700 transition hover:bg-brand-600 hover:text-white"
        >
          Pesan Sekarang
        </Link>
      </div>
    </article>
  );
}
