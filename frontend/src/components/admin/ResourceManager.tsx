'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Plus, Search, Pencil, Trash2, ArrowUpDown } from 'lucide-react';
import { PageHeader, Pagination, StatusBadge, EmptyState } from './ui';
import { Modal } from './Modal';
import { ConfirmDialog } from './ConfirmDialog';
import { ResourceForm } from './ResourceForm';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Misc';
import { useResourceList, useResourceMutations, type ListParams } from '@/hooks/useResource';
import { formatDate, formatRupiah } from '@/lib/utils';
import type { ColumnConfig, ResourceConfig } from './resourceTypes';

type Row = Record<string, unknown> & { id: number };

function Cell({ col, row }: { col: ColumnConfig; row: Row }) {
  if (col.render) return <>{col.render(row)}</>;
  const value = row[col.key];
  switch (col.type) {
    case 'image':
      return value ? (
        <div className="relative h-11 w-16 overflow-hidden rounded-lg bg-black/5">
          <Image src={String(value)} alt="" fill className="object-cover" unoptimized />
        </div>
      ) : (
        <span className="text-ink-muted">—</span>
      );
    case 'boolean':
      return <StatusBadge active={Boolean(value)} labels={col.booleanLabels ?? ['Ya', 'Tidak']} />;
    case 'date':
      return <span className="text-ink-soft">{formatDate(value as string)}</span>;
    case 'price':
      return <span className="font-medium text-ink">{formatRupiah(Number(value))}</span>;
    case 'rating':
      return <span className="font-medium text-ink">⭐ {Number(value).toFixed(1)}</span>;
    case 'badge':
      return value ? (
        <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">{String(value)}</span>
      ) : (
        <span className="text-ink-muted">—</span>
      );
    default:
      return <span className="text-ink-soft">{value == null || value === '' ? '—' : String(value)}</span>;
  }
}

export function ResourceManager({ config }: { config: ResourceConfig }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debounced, setDebounced] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sort, setSort] = useState(config.defaultSort ?? { sortBy: 'createdAt', sortOrder: 'desc' as const });

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const [deleting, setDeleting] = useState<Row | null>(null);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(search);
      setPage(1);
    }, 350);
    return () => clearTimeout(t);
  }, [search]);

  const params: ListParams = {
    page,
    limit: 10,
    ...(debounced ? { search: debounced } : {}),
    ...filters,
    sortBy: sort.sortBy,
    sortOrder: sort.sortOrder,
  };

  const { data, isLoading, isError } = useResourceList<Row>(config.endpoint, params);
  const { create, update, remove } = useResourceMutations<Row>(config.endpoint, config.labelSingular);

  const rows = data?.data ?? [];
  const meta = data?.meta;

  const openCreate = () => {
    setEditing(null);
    setFormOpen(true);
  };
  const openEdit = (row: Row) => {
    setEditing(row);
    setFormOpen(true);
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (editing) await update.mutateAsync({ id: editing.id, body: values });
    else await create.mutateAsync(values);
    setFormOpen(false);
    setEditing(null);
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    await remove.mutateAsync(deleting.id);
    setDeleting(null);
  };

  return (
    <>
      <PageHeader
        title={config.label}
        description={config.description}
        action={
          !config.disableCreate && (
            <Button onClick={openCreate}>
              <Plus className="h-4 w-4" /> Tambah {config.labelSingular}
            </Button>
          )
        }
      />

      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        {config.searchable && (
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Cari ${config.labelSingular.toLowerCase()}…`}
              className="field-input pl-10"
            />
          </div>
        )}

        {config.filters?.map((filter) => (
          <select
            key={filter.key}
            value={filters[filter.key] ?? ''}
            onChange={(e) => {
              setFilters((prev) => ({ ...prev, [filter.key]: e.target.value }));
              setPage(1);
            }}
            className="field-input w-auto"
          >
            <option value="">{filter.label}: Semua</option>
            {filter.options.map((o) => (
              <option key={String(o.value)} value={String(o.value)}>
                {o.label}
              </option>
            ))}
          </select>
        ))}

        {config.sortOptions && (
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-ink-muted" />
            <select
              value={sort.sortBy}
              onChange={(e) => setSort((s) => ({ ...s, sortBy: e.target.value }))}
              className="field-input w-auto"
            >
              {config.sortOptions.map((o) => (
                <option key={String(o.value)} value={String(o.value)}>
                  {o.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setSort((s) => ({ ...s, sortOrder: s.sortOrder === 'asc' ? 'desc' : 'asc' }))}
              className="rounded-lg border border-black/10 px-3 py-2 text-sm text-ink-soft hover:bg-black/5"
            >
              {sort.sortOrder === 'asc' ? 'A→Z' : 'Z→A'}
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-card">
        <div className="scrollbar-thin overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-black/[0.02] text-xs uppercase tracking-wide text-ink-muted">
                {config.columns.map((col) => (
                  <th key={col.key} className="px-5 py-3 font-semibold">
                    {col.label}
                  </th>
                ))}
                <th className="px-5 py-3 text-right font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={config.columns.length + 1} className="py-16 text-center">
                    <Spinner className="h-7 w-7" />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={config.columns.length + 1} className="py-16 text-center text-sm text-red-600">
                    Gagal memuat data. Pastikan API berjalan.
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={config.columns.length + 1}>
                    <EmptyState message={`Belum ada ${config.labelSingular.toLowerCase()}.`} />
                  </td>
                </tr>
              ) : (
                rows.map((row) => (
                  <tr key={row.id} className="border-b border-black/5 transition hover:bg-brand-50/30">
                    {config.columns.map((col) => (
                      <td key={col.key} className={`px-5 py-3 ${col.className ?? ''}`}>
                        <Cell col={col} row={row} />
                      </td>
                    ))}
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        {!config.disableEdit && (
                          <button
                            onClick={() => openEdit(row)}
                            className="rounded-lg p-2 text-ink-soft transition hover:bg-brand-50 hover:text-brand-700"
                            aria-label="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          onClick={() => setDeleting(row)}
                          className="rounded-lg p-2 text-ink-soft transition hover:bg-red-50 hover:text-red-600"
                          aria-label="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {meta && (
          <Pagination page={meta.page} totalPages={meta.totalPages} total={meta.total} onPageChange={setPage} />
        )}
      </div>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title={`${editing ? 'Edit' : 'Tambah'} ${config.labelSingular}`}
        size="lg"
      >
        <ResourceForm
          config={config}
          record={editing ?? undefined}
          submitting={create.isPending || update.isPending}
          onSubmit={handleSubmit}
          onCancel={() => setFormOpen(false)}
        />
      </Modal>

      <ConfirmDialog
        open={!!deleting}
        loading={remove.isPending}
        message={`Yakin ingin menghapus "${String((deleting as Row)?.[config.columns[0]?.key] ?? '')}"? Tindakan ini tidak dapat dibatalkan.`}
        onConfirm={confirmDelete}
        onClose={() => setDeleting(null)}
      />
    </>
  );
}
