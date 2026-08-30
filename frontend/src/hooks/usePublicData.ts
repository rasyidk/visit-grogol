'use client';

import { useQuery } from '@tanstack/react-query';
import { useLocale } from 'next-intl';
import { fetchList, fetchOne } from '@/lib/api';
import type {
  Destinasi,
  Kategori,
  Berita,
  EventItem,
  Testimoni,
  GaleriFoto,
  GaleriVideo,
  ProfilWebsite,
  Kontak,
} from '@/lib/types';

/**
 * Public data hooks. Each returns API data when available and falls back to
 * curated seed-like content so the design always renders (resilient demo).
 */
function mapLocaleData<T>(data: T | T[], locale: string): any {
  if (locale !== 'en' || !data) return data;

  const mapItem = (item: any) => {
    const newItem = { ...item };
    for (const key of Object.keys(newItem)) {
      if (key.endsWith('En') && newItem[key]) {
        const originalKey = key.slice(0, -2);
        newItem[originalKey] = newItem[key];
      }
    }
    return newItem;
  };

  if (Array.isArray(data)) {
    return data.map(mapItem);
  }
  return mapItem(data);
}

function usePublic<T>(key: string[], path: string, params: Record<string, unknown>, fallback: T[]) {
  const locale = useLocale();
  const query = useQuery({
    queryKey: [...key, locale],
    queryFn: () => fetchList<T>(path, params),
  });
  const rawData = query.data?.data?.length ? query.data.data : fallback;
  const data = mapLocaleData(rawData, locale) as T[];
  return { ...query, data, meta: query.data?.meta };
}

export const useDestinasi = (params: Record<string, unknown> = {}) =>
  usePublic<Destinasi>(['destinasi', JSON.stringify(params)], '/destinasi', { limit: 12, ...params }, FALLBACK_DESTINASI);

export const useKategori = () =>
  usePublic<Kategori>(['kategori'], '/kategori', { limit: 50 }, FALLBACK_KATEGORI);

export const useBerita = (params: Record<string, unknown> = {}) =>
  usePublic<Berita>(['berita', JSON.stringify(params)], '/berita', { limit: 6, isPublished: true, ...params }, []);

export const useEvents = (params: Record<string, unknown> = {}) =>
  usePublic<EventItem>(['event', JSON.stringify(params)], '/event', { limit: 6, ...params }, FALLBACK_EVENTS);

export const useTestimoni = () =>
  usePublic<Testimoni>(['testimoni'], '/testimoni', { limit: 12, isApproved: true }, FALLBACK_TESTIMONI);

export const useGaleriFoto = () =>
  usePublic<GaleriFoto>(['galeri-foto'], '/galeri-foto', { limit: 24 }, []);

export const useGaleriVideo = () =>
  usePublic<GaleriVideo>(['galeri-video'], '/galeri-video', { limit: 12 }, []);

export function useProfil() {
  const locale = useLocale();
  const query = useQuery({ queryKey: ['profil', locale], queryFn: () => fetchOne<ProfilWebsite>('/profil') });
  const rawData = query.data ?? FALLBACK_PROFIL;
  const data = mapLocaleData(rawData, locale) as ProfilWebsite;
  return { ...query, data };
}

export function useKontak() {
  const locale = useLocale();
  const query = useQuery({ queryKey: ['kontak', locale], queryFn: () => fetchOne<Kontak>('/kontak') });
  const rawData = query.data ?? FALLBACK_KONTAK;
  const data = mapLocaleData(rawData, locale) as Kontak;
  return { ...query, data };
}

// ── Fallback content (mirrors the seed) ──────────────────────
const img = (s: string, w = 800, h = 600) => `https://picsum.photos/seed/${s}/${w}/${h}`;

export const FALLBACK_KATEGORI: Kategori[] = [
  { id: 1, name: 'Alam', slug: 'alam', icon: 'Mountain', color: '#1b7a3e', createdAt: '', updatedAt: '' },
  { id: 2, name: 'Budaya', slug: 'budaya', icon: 'Drama', color: '#b8860b', createdAt: '', updatedAt: '' },
  { id: 3, name: 'Kuliner', slug: 'kuliner', icon: 'Utensils', color: '#c2410c', createdAt: '', updatedAt: '' },
  { id: 4, name: 'Penginapan', slug: 'penginapan', icon: 'BedDouble', color: '#0f766e', createdAt: '', updatedAt: '' },
];

const mkDest = (
  id: number,
  title: string,
  kategoriId: number,
  extra: Partial<Destinasi> = {}
): Destinasi => ({
  id,
  title,
  slug: title.toLowerCase().replace(/\s+/g, '-'),
  description: 'Pengalaman visual dan spiritual yang tak terlupakan di jantung desa.',
  location: 'Desa Grogol',
  price: 25000,
  priceForeign: 75000,
  rating: 4.8,
  thumbnail: img(title.toLowerCase().replace(/\s+/g, '-')),
  images: [],
  facilities: ['WIFI', 'Parkir'],
  isFeatured: true,
  isPublished: true,
  views: 100,
  kategoriId,
  createdAt: '',
  updatedAt: '',
  ...extra,
});

export const FALLBACK_DESTINASI: Destinasi[] = [
  mkDest(1, 'Air Terjun Pelangi', 1, { excerpt: 'Air terjun tersembunyi dengan cahaya menembus lumut hijau.' }),
  mkDest(2, 'Sawah Terasering', 1, { rating: 4.9, facilities: ['Fotografi', 'Meditasi'] }),
  mkDest(3, 'Danau Cermin', 1, { rating: 4.7, excerpt: 'Area relaksasi & memancing.', price: 10000 }),
  mkDest(4, 'Vila Aruna Bamboo', 4, { price: 1250000, rating: 4.9, facilities: ['WIFI', 'Pool', 'AC', 'Breakfast'] }),
  mkDest(5, 'Joglo Heritage Suites', 4, { price: 850000, rating: 4.8, facilities: ['WIFI', 'View', 'Coffee', 'Parking'] }),
  mkDest(6, 'The Canopy Sanctuary', 4, { price: 1800000, rating: 5.0, facilities: ['Spa', 'Eco', 'Yoga', 'Security'] }),
];

export const FALLBACK_EVENTS: EventItem[] = [
  { id: 1, title: 'Festival Panen Raya', slug: 'festival-panen-raya', description: 'Syukuran akbar atas hasil bumi yang melimpah.', thumbnail: img('event-panen'), startDate: '2024-05-15', ticketPrice: 0, isPublished: true, location: 'Balai Desa' },
  { id: 2, title: 'Ritual Bersih Desa', slug: 'ritual-bersih-desa', description: 'Momentum penyucian diri dan lingkungan secara kolektif.', thumbnail: img('event-bersih'), startDate: '2024-08-02', ticketPrice: 50000, isPublished: true, location: 'Sungai Desa' },
  { id: 3, title: 'Pekan Batik & Tenun', slug: 'pekan-batik', description: 'Eksibisi karya terbaik pengrajin lokal.', thumbnail: img('event-batik'), startDate: '2024-10-20', ticketPrice: 25000, isPublished: true, location: 'Sanggar Kriya' },
];

export const FALLBACK_TESTIMONI: Testimoni[] = [
  { id: 1, name: 'Amanda Smith', role: 'Travel Blogger', origin: 'Australia', avatar: img('avatar-1', 100, 100), message: 'Sebuah pengalaman yang menenangkan jiwa. Keramahtamahan warga desa dan udara pegunungan yang segar membuat saya ingin kembali lagi setiap tahun.', rating: 5, isApproved: true, position: 0 },
  { id: 2, name: 'Irwan Hakim', role: 'Kolektor Seni', origin: 'Jakarta', avatar: img('avatar-2', 100, 100), message: 'Produk UMKM-nya sangat berkualitas tinggi. Saya membawa pulang beberapa kain tenun dan kerajinan gerabah yang kini menjadi hiasan utama.', rating: 5, isApproved: true, position: 1 },
];

export const FALLBACK_PROFIL: ProfilWebsite = {
  id: 1,
  siteName: 'Visit Grogol Kaloka',
  tagline: 'Kembali ke Alam & Tradisi',
  about: 'Mewujudkan ekosistem pariwisata digital yang berkelanjutan, menjaga warisan budaya, dan memberdayakan komunitas lokal.',
  vision: 'Menjadi destinasi desa wisata premium yang mengedepankan keberlanjutan.',
  mission: 'Memberdayakan masyarakat lokal melalui pariwisata digital yang inklusif.',
  history: 'Didirikan pada abad ke-17 oleh pengembara dari pegunungan tengah, desa ini dibangun di atas filosofi Tri Hita Karana.',
  logo: null,
  heroImage: img('hero-profil', 1600, 900),
  atraksiHeroImage: img('atraksi', 1600, 900),
  budayaHeroImage: img('budaya', 1600, 900),
  kulinerHeroImage: img('kuliner', 1600, 900),
  penginapanHeroImage: img('penginapan-hero', 1600, 900),
  kontakHeroImage: img('sunrise-hills', 1600, 800),
};

export const FALLBACK_KONTAK: Kontak = {
  id: 1,
  address: 'Kabupaten Bogor, Jawa Barat',
  phone: '+62 21 1234 5678',
  whatsapp: '+62 812 3456 7890',
  email: 'halo@visitgrogol.id',
  latitude: -6.5971,
  longitude: 106.806,
  instagram: 'https://instagram.com/desawisata.official',
  facebook: null,
  twitter: null,
  youtube: null,
  mapEmbed: null,
};
