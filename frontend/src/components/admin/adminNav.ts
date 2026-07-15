import {
  LayoutDashboard,
  MapPin,
  Tags,
  GalleryHorizontal,
  Newspaper,
  CalendarDays,
  Images,
  Video,
  MessageSquareQuote,
  Inbox,
  Mail,
  Building2,
  Phone,
  Users,
  type LucideIcon,
} from 'lucide-react';

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface AdminNavSection {
  title: string;
  items: AdminNavItem[];
}

export const ADMIN_NAV: AdminNavSection[] = [
  {
    title: 'Umum',
    items: [{ label: 'Dashboard', href: '/admin', icon: LayoutDashboard }],
  },
  {
    title: 'Konten',
    items: [
      { label: 'Destinasi', href: '/admin/destinasi', icon: MapPin },
      { label: 'Kategori', href: '/admin/kategori', icon: Tags },
      { label: 'Banner', href: '/admin/banner', icon: GalleryHorizontal },
      { label: 'Berita', href: '/admin/berita', icon: Newspaper },
      { label: 'Event', href: '/admin/event', icon: CalendarDays },
    ],
  },
  {
    title: 'Media',
    items: [
      { label: 'Galeri Foto', href: '/admin/galeri-foto', icon: Images },
      { label: 'Galeri Video', href: '/admin/galeri-video', icon: Video },
    ],
  },
  {
    title: 'Interaksi',
    items: [
      { label: 'Testimoni', href: '/admin/testimoni', icon: MessageSquareQuote },
      { label: 'Reservasi', href: '/admin/reservasi', icon: Inbox },
      { label: 'Newsletter', href: '/admin/newsletter', icon: Mail },
    ],
  },
  {
    title: 'Pengaturan',
    items: [
      { label: 'Profil Website', href: '/admin/profil', icon: Building2 },
      { label: 'Kontak', href: '/admin/kontak', icon: Phone },
      { label: 'Pengguna Admin', href: '/admin/pengguna', icon: Users },
    ],
  },
];
