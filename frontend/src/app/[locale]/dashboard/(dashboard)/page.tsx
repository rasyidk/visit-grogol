'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import {
  MapPin,
  Newspaper,
  Music,
  Utensils,
  Store,
  Home,
  Inbox,
  Users,
  TrendingUp,
} from 'lucide-react';
import { fetchOne } from '@/lib/api';
import { PageHeader } from '@/components/admin/ui';
import { Spinner } from '@/components/ui/Misc';
import { formatDate } from '@/lib/utils';
import type { DashboardStats } from '@/lib/types';

const cards = [
  { key: 'wisata', label: 'Destinasi', icon: MapPin, color: 'bg-brand-600' },
  { key: 'budaya', label: 'Seni Budaya', icon: Music, color: 'bg-emerald-600' },
  { key: 'kuliner', label: 'Kuliner', icon: Utensils, color: 'bg-orange-500' },
  { key: 'umkm', label: 'UMKM', icon: Store, color: 'bg-indigo-500' },
  { key: 'homestay', label: 'Homestay', icon: Home, color: 'bg-teal-600' },
  { key: 'berita', label: 'Berita', icon: Newspaper, color: 'bg-gold-500' },
  { key: 'reservasi', label: 'Reservasi', icon: Inbox, color: 'bg-rose-500' },
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
              <div key={c.key} className="flex items-center gap-5 rounded-2xl bg-white p-6 shadow-card transition-all hover:shadow-lg">
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${c.color} text-white shadow-sm`}>
                  <c.icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="text-3xl font-extrabold text-ink leading-none tracking-tight">{data?.counts?.[c.key] ?? 0}</p>
                  <p className="mt-1.5 text-sm font-medium text-ink-muted">{c.label}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
