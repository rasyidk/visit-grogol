import {
  LayoutDashboard,
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
  Map,
  Flower2,
  type LucideIcon,
} from 'lucide-react';

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: string[];
}

export interface AdminNavSection {
  title: string;
  items: AdminNavItem[];
  roles?: string[];
}

export const ADMIN_NAV: AdminNavSection[] = [
  {
    title: 'Utama',
    items: [{ label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Manajemen Konten',
    items: [
      { label: 'Profil Desa', href: '/dashboard/profil', icon: Building2 },
      { label: 'Berita', href: '/dashboard/berita', icon: Newspaper },
      { label: 'Wisata', href: '/dashboard/wisata', icon: Map },
      { label: 'Budaya', href: '/dashboard/budaya', icon: Flower2 },
      { label: 'Event', href: '/dashboard/event', icon: CalendarDays },
      { label: 'Testimoni', href: '/dashboard/testimoni', icon: MessageSquareQuote },
    ],
  },
  {
    title: 'Sistem',
    roles: ['SUPERADMIN'],
    items: [
      { label: 'Manajemen Pengguna', href: '/dashboard/pengguna', icon: Users, roles: ['SUPERADMIN'] },
    ],
  },
];
