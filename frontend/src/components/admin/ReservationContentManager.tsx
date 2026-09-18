'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Bus, Car, Plane, Plus, Save, Trash2, Train, Bike } from 'lucide-react';
import { toast } from 'sonner';
import { PageHeader } from './ui';
import { MediaUpload } from './MediaUpload';
import { Spinner } from '@/components/ui/Misc';
import { fetchOne, getApiErrorMessage, updateOne } from '@/lib/api';
import {
  DEFAULT_RESERVATION_CONTENT,
  normaliseReservationContent,
  type ReservationContent,
  type ReservationPackage,
  type ReservationTransport,
} from '@/lib/reservationContent';

const ICON_OPTIONS = [
  { value: 'train', label: 'Kereta / Transportasi Umum', icon: Train },
  { value: 'plane', label: 'Pesawat / Bandara', icon: Plane },
  { value: 'bike', label: 'Sepeda / Kendaraan', icon: Bike },
  { value: 'car', label: 'Mobil', icon: Car },
  { value: 'bus', label: 'Bus', icon: Bus },
] as const;

const newId = (prefix: string) => `${prefix}-${Date.now()}`;

export function ReservationContentManager() {
  const queryClient = useQueryClient();
  const [content, setContent] = useState<ReservationContent>(DEFAULT_RESERVATION_CONTENT);

  const { data, isLoading } = useQuery({
    queryKey: ['page-content', 'reservasi'],
    queryFn: () => fetchOne<{ content?: Partial<ReservationContent> }>('/page-content/reservasi'),
  });

  useEffect(() => {
    if (data?.content) setContent(normaliseReservationContent(data.content));
  }, [data]);

  const save = useMutation({
    mutationFn: (value: ReservationContent) => updateOne('/page-content/reservasi', { content: value }),
    onSuccess: () => {
      toast.success('Konten reservasi berhasil disimpan');
      queryClient.invalidateQueries({ queryKey: ['page-content', 'reservasi'] });
    },
    onError: (error) => toast.error(getApiErrorMessage(error, 'Gagal menyimpan konten reservasi')),
  });

  const updatePackage = (index: number, value: Partial<ReservationPackage>) => {
    setContent((current) => ({
      ...current,
      packages: current.packages.map((item, itemIndex) => itemIndex === index ? { ...item, ...value } : item),
    }));
  };

  const updatePackageLabel = (index: number, locale: 'id' | 'en', value: string) => {
    const item = content.packages[index];
    updatePackage(index, { label: { ...item.label, [locale]: value } });
  };

  const updateTransport = (index: number, value: Partial<ReservationTransport>) => {
    setContent((current) => ({
      ...current,
      transport: current.transport.map((item, itemIndex) => itemIndex === index ? { ...item, ...value } : item),
    }));
  };

  const updateTransportText = (
    index: number,
    field: 'title' | 'description',
    locale: 'id' | 'en',
    value: string
  ) => {
    const item = content.transport[index];
    updateTransport(index, { [field]: { ...item[field], [locale]: value } });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="h-7 w-7" />
      </div>
    );
  }

  return (
    <>
      <PageHeader
        title="Konten Reservasi"
        description="Kelola pilihan paket, peta lokasi, dan panduan transportasi pada halaman reservasi."
      />

      <div className="max-w-5xl space-y-6 pb-16">
        <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-ink">Paket yang Diminati</h2>
              <p className="mt-1 text-sm text-ink-muted">Pilihan ini akan tampil sebagai dropdown di form reservasi.</p>
            </div>
            <button
              type="button"
              onClick={() => setContent((current) => ({
                ...current,
                packages: [...current.packages, {
                  id: newId('package'),
                  label: { id: '', en: '' },
                }],
              }))}
              className="btn-primary shrink-0"
            >
              <Plus className="h-4 w-4" /> Tambah Paket
            </button>
          </div>

          <div className="space-y-4">
            {content.packages.map((item, index) => (
              <div key={item.id} className="rounded-xl border border-black/10 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">Paket {index + 1}</p>
                  <button
                    type="button"
                    onClick={() => setContent((current) => ({
                      ...current,
                      packages: current.packages.filter((_, itemIndex) => itemIndex !== index),
                    }))}
                    className="rounded-lg p-2 text-ink-muted hover:bg-red-50 hover:text-red-600"
                    aria-label={`Hapus paket ${index + 1}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="field-label">Nama Paket (ID)</span>
                    <input
                      value={item.label.id}
                      onChange={(event) => updatePackageLabel(index, 'id', event.target.value)}
                      className="field-input"
                      placeholder="Paket Full Day Budaya"
                    />
                  </label>
                  <label>
                    <span className="field-label">Nama Paket (EN)</span>
                    <input
                      value={item.label.en}
                      onChange={(event) => updatePackageLabel(index, 'en', event.target.value)}
                      className="field-input"
                      placeholder="Full Day Culture Package"
                    />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-ink">Peta Google Maps</h2>
            <p className="mt-1 text-sm text-ink-muted">Atur gambar yang tampil dan tautan menuju lokasi Google Maps.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <MediaUpload
              label="Gambar Peta / Lokasi"
              value={content.map.image}
              onChange={(image) => setContent((current) => ({ ...current, map: { ...current.map, image } }))}
            />
            <label>
              <span className="field-label">URL Google Maps</span>
              <input
                type="url"
                value={content.map.url}
                onChange={(event) => setContent((current) => ({ ...current, map: { ...current.map, url: event.target.value } }))}
                className="field-input"
                placeholder="https://maps.google.com/..."
              />
              <span className="mt-2 block text-xs text-ink-muted">Gunakan link berbagi Google Maps atau link lokasi langsung.</span>
            </label>
          </div>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-card sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-ink">Panduan Transportasi</h2>
              <p className="mt-1 text-sm text-ink-muted">Tambahkan informasi akses menuju Grogol untuk pengunjung.</p>
            </div>
            <button
              type="button"
              onClick={() => setContent((current) => ({
                ...current,
                transport: [...current.transport, {
                  id: newId('transport'),
                  icon: 'car',
                  title: { id: '', en: '' },
                  description: { id: '', en: '' },
                }],
              }))}
              className="btn-primary shrink-0"
            >
              <Plus className="h-4 w-4" /> Tambah Panduan
            </button>
          </div>

          <div className="space-y-5">
            {content.transport.map((item, index) => {
              const Icon = ICON_OPTIONS.find((option) => option.value === item.icon)?.icon ?? Car;

              return (
                <div key={item.id} className="rounded-xl border border-black/10 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                        <Icon className="h-4 w-4" />
                      </span>
                      <p className="text-sm font-semibold text-ink">Panduan {index + 1}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setContent((current) => ({
                        ...current,
                        transport: current.transport.filter((_, itemIndex) => itemIndex !== index),
                      }))}
                      className="rounded-lg p-2 text-ink-muted hover:bg-red-50 hover:text-red-600"
                      aria-label={`Hapus panduan ${index + 1}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label>
                      <span className="field-label">Ikon</span>
                      <select
                        value={item.icon}
                        onChange={(event) => updateTransport(index, { icon: event.target.value as ReservationTransport['icon'] })}
                        className="field-input"
                      >
                        {ICON_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    </label>
                    <div />
                    <label>
                      <span className="field-label">Judul (ID)</span>
                      <input value={item.title.id} onChange={(event) => updateTransportText(index, 'title', 'id', event.target.value)} className="field-input" />
                    </label>
                    <label>
                      <span className="field-label">Judul (EN)</span>
                      <input value={item.title.en} onChange={(event) => updateTransportText(index, 'title', 'en', event.target.value)} className="field-input" />
                    </label>
                    <label>
                      <span className="field-label">Deskripsi (ID)</span>
                      <textarea value={item.description.id} onChange={(event) => updateTransportText(index, 'description', 'id', event.target.value)} className="field-input min-h-24 resize-y" />
                    </label>
                    <label>
                      <span className="field-label">Deskripsi (EN)</span>
                      <textarea value={item.description.en} onChange={(event) => updateTransportText(index, 'description', 'en', event.target.value)} className="field-input min-h-24 resize-y" />
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => save.mutate(content)}
            disabled={save.isPending}
            className="btn-primary min-w-44 justify-center"
          >
            <Save className="h-4 w-4" /> {save.isPending ? 'Menyimpan…' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </>
  );
}
