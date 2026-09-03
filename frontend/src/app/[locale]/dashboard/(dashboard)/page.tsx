'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Newspaper,
  CalendarDays,
  MessageSquareQuote,
  Inbox,
  Mail,
  Images,
  Users,
  TrendingUp,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { fetchOne } from '@/lib/api';
import { PageHeader } from '@/components/admin/ui';
import { Spinner } from '@/components/ui/Misc';
import { formatDate } from '@/lib/utils';
import type { DashboardStats } from '@/lib/types';

const cards = [
  { key: 'destinasi', label: 'Destinasi', icon: MapPin, color: 'bg-brand-600' },
  { key: 'berita', label: 'Berita', icon: Newspaper, color: 'bg-gold-500' },
  { key: 'event', label: 'Event', icon: CalendarDays, color: 'bg-emerald-600' },
  { key: 'testimoni', label: 'Testimoni', icon: MessageSquareQuote, color: 'bg-teal-600' },
  { key: 'galeriFoto', label: 'Galeri Foto', icon: Images, color: 'bg-indigo-500' },
  { key: 'reservasi', label: 'Reservasi', icon: Inbox, color: 'bg-orange-500' },
  { key: 'subscribers', label: 'Subscriber', icon: Mail, color: 'bg-rose-500' },
  { key: 'admins', label: 'Admin', icon: Users, color: 'bg-slate-600' },
];

export default function DashboardPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['stats'],
    queryFn: () => fetchOne<DashboardStats>('/stats'),
  });

  return (
    <>
      <PageHeader title="Dashboard" description="Ringkasan aktivitas dan statistik website." />

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Spinner className="h-8 w-8" />
        </div>
      ) : isError ? (
        <div className="rounded-2xl bg-white p-10 text-center text-sm text-red-600 shadow-card">
          Gagal memuat statistik. Pastikan backend API berjalan di <code>NEXT_PUBLIC_API_URL</code>.
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((c) => (
              <div key={c.key} className="rounded-2xl bg-white p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${c.color} text-white`}>
                    <c.icon className="h-5 w-5" />
                  </span>
                  <TrendingUp className="h-4 w-4 text-brand-400" />
                </div>
                <p className="mt-4 text-3xl font-extrabold text-ink">{data?.counts?.[c.key] ?? 0}</p>
                <p className="text-sm text-ink-muted">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {/* Top destinasi */}
            <div className="rounded-2xl bg-white p-6 shadow-card lg:col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-ink">Destinasi Terpopuler</h2>
                <Link href="/dashboard/destinasi" className="flex items-center gap-1 text-sm text-brand-700 hover:underline">
                  Kelola Destinasi <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <ul className="divide-y divide-black/5">
                {(data?.topDestinasi ?? []).map((d) => (
                  <li key={d.id} className="flex items-center gap-4 py-3">
                    <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-black/5">
                      {d.thumbnail && <Image src={d.thumbnail} alt="" fill className="object-cover" unoptimized />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-ink">{d.title}</p>
                      <p className="text-xs text-ink-muted">⭐ {d.rating.toFixed(1)}</p>
                    </div>
                    <span className="text-sm font-semibold text-brand-700">{d.views} views</span>
                  </li>
                ))}
                {(data?.topDestinasi?.length ?? 0) === 0 && <li className="py-6 text-center text-sm text-ink-muted">Belum ada data</li>}
              </ul>
            </div>

            {/* Latest reservasi */}
            <div className="rounded-2xl bg-white p-6 shadow-card">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-ink">Reservasi Terbaru</h2>
                <Link href="/dashboard/reservasi" className="text-sm text-brand-700 hover:underline">
                  Lihat Semua
                </Link>
              </div>
              <ul className="space-y-3">
                {(data?.latestReservasi ?? []).map((r) => (
                  <li key={r.id} className="rounded-xl bg-black/[0.02] p-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-ink">{r.name}</p>
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">{r.status}</span>
                    </div>
                    <p className="text-xs text-ink-muted">{r.packageType ?? '—'} · {formatDate(r.createdAt)}</p>
                  </li>
                ))}
                {(data?.latestReservasi?.length ?? 0) === 0 && <li className="py-6 text-center text-sm text-ink-muted">Belum ada reservasi</li>}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}
