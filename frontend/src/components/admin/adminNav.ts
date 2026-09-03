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
    title: 'Sistem',
    roles: ['SUPERADMIN'],
    items: [
      { label: 'Manajemen Pengguna', href: '/dashboard/pengguna', icon: Users, roles: ['SUPERADMIN'] },
    ],
  },
];
