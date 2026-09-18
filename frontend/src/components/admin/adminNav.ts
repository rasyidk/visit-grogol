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
  Palmtree,
  Sparkles,
  Coffee,
  ShoppingBag,
  Home,
  PanelsTopLeft,
  type LucideIcon,
} from 'lucide-react';

export interface AdminNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  roles?: string[];
  children?: AdminNavItem[];
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
      { label: 'Berita', href: '/dashboard/berita', icon: Newspaper },
      { label: 'Kisah Kami', href: '/dashboard/kisah-kami', icon: Building2 },
      {
        label: 'Header & Hero',
        href: '/dashboard/header-hero',
        icon: PanelsTopLeft,
        children: [
          { label: 'Home', href: '/dashboard/header-hero?page=home', icon: Home },
          { label: 'Wisata', href: '/dashboard/header-hero?page=wisata', icon: Palmtree },
          { label: 'Budaya', href: '/dashboard/header-hero?page=budaya', icon: Sparkles },
          { label: 'Kuliner', href: '/dashboard/header-hero?page=kuliner', icon: Coffee },
          { label: 'UMKM', href: '/dashboard/header-hero?page=umkm', icon: ShoppingBag },
          { label: 'Homestay', href: '/dashboard/header-hero?page=homestay', icon: Home },
          { label: 'Kabar Grogol', href: '/dashboard/header-hero?page=kabar-grogol', icon: Newspaper },
        ],
      },
      { label: 'Atraksi Wisata', href: '/dashboard/wisata', icon: Palmtree },
      { label: 'Seni Budaya', href: '/dashboard/budaya', icon: Sparkles },
      { label: 'Kuliner', href: '/dashboard/kuliner', icon: Coffee },
      { label: 'UMKM', href: '/dashboard/umkm', icon: ShoppingBag },
      { label: 'Homestay', href: '/dashboard/homestay', icon: Home },
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
