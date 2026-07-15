import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';

export function PageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        {description && <p className="mt-1 text-sm text-ink-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ active, labels = ['Aktif', 'Nonaktif'] }: { active: boolean; labels?: [string, string] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
        active ? 'bg-brand-50 text-brand-700' : 'bg-black/5 text-ink-muted'
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', active ? 'bg-brand-500' : 'bg-ink-muted')} />
      {active ? labels[0] : labels[1]}
    </span>
  );
}

export function EmptyState({ message = 'Belum ada data' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-muted">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5">
        <Inbox className="h-7 w-7" />
      </span>
      <p className="text-sm">{message}</p>
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  total,
  onPage,
}: {
  page: number;
  totalPages: number;
  total: number;
  onPage: (p: number) => void;
}) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between border-t border-black/5 px-5 py-4 text-sm">
      <p className="text-ink-muted">
        Halaman <span className="font-semibold text-ink">{page}</span> dari {totalPages} · {total} data
      </p>
      <div className="flex gap-2">
        <button
          disabled={page <= 1}
          onClick={() => onPage(page - 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-ink-soft transition hover:bg-black/5 disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          disabled={page >= totalPages}
          onClick={() => onPage(page + 1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-ink-soft transition hover:bg-black/5 disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
