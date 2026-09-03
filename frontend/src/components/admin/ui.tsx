import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';

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
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatusBadge({ active, labels = ['Aktif', 'Nonaktif'] }: { active: boolean; labels?: [string, string] }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider',
        active ? 'border-brand-200 bg-brand-50 text-brand-700' : 'border-black/5 bg-black/5 text-ink-muted'
      )}
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', active ? 'bg-brand-500' : 'bg-black/20')} />
      {active ? labels[0] : labels[1]}
    </span>
  );
}

export function EmptyState({ message = 'Belum ada data' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-black/5">
        <FolderOpen className="h-6 w-6 text-ink-muted" />
      </span>
      <p className="mt-4 text-sm font-medium text-ink-soft">{message}</p>
    </div>
  );
}

export function Pagination({
  page,
  totalPages,
  total,
  perPage = 10,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  total: number;
  perPage?: number;
  onPageChange: (p: number) => void;
}) {
  const safePage = page ?? 1;
  const safeTotal = total ?? 0;
  
  // Generate page numbers with ellipsis
  const pages: (number | string)[] = [];
  const maxVisible = 5;
  const tPages = Math.max(totalPages, 1);

  if (tPages <= maxVisible + 2) {
    for (let i = 1; i <= tPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (safePage <= 3) {
      pages.push(2, 3, 4, '...', tPages);
    } else if (safePage >= tPages - 2) {
      pages.push('...', tPages - 3, tPages - 2, tPages - 1, tPages);
    } else {
      pages.push('...', safePage - 1, safePage, safePage + 1, '...', tPages);
    }
  }

  return (
    <div className="flex items-center justify-between border-t border-black/5 bg-black/[0.02] px-5 py-4 text-sm">
      <p className="text-ink-soft">
        Menampilkan <span className="font-semibold text-ink">{(safePage - 1) * perPage + 1}</span> -{' '}
        <span className="font-semibold text-ink">{Math.min(safePage * perPage, safeTotal)}</span> dari{' '}
        <span className="font-semibold text-ink">{safeTotal}</span>
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(safePage - 1)}
          disabled={safePage === 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-ink-soft hover:bg-black/5 disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        {pages.map((p, idx) => (
          p === '...' ? (
            <span key={`ellipsis-${idx}`} className="flex h-9 w-9 items-center justify-center text-ink-muted">
              ...
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p as number)}
              className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm font-medium transition ${
                p === safePage
                  ? 'border-brand-200 bg-brand-50 text-brand-700'
                  : 'border-transparent text-ink-soft hover:bg-black/5'
              }`}
            >
              {p}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(safePage + 1)}
          disabled={safePage === totalPages}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-ink-soft hover:bg-black/5 disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
