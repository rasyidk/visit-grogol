// Shared API types — mirror the backend Prisma models.

export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
  errors?: Record<string, string[]>;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface Kategori {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  color?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Destinasi {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  description: string;
  content?: string | null;
  location: string;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  price: number;
  priceForeign: number;
  openHours?: string | null;
  rating: number;
  thumbnail: string;
  images?: string[] | null;
  facilities?: string[] | null;
  isFeatured: boolean;
  isPublished: boolean;
  views: number;
  kategoriId: number;
  kategori?: Pick<Kategori, 'id' | 'name' | 'slug'>;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle?: string | null;
  image: string;
  link?: string | null;
  ctaLabel?: string | null;
  position: number;
  isActive: boolean;
}

export interface Berita {
  id: number;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  thumbnail: string;
  author?: string | null;
  category?: string | null;
  tags?: string[] | null;
  isPublished: boolean;
  publishedAt?: string | null;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface EventItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  content?: string | null;
  thumbnail: string;
  location?: string | null;
  startDate: string;
  endDate?: string | null;
  ticketPrice: number;
  isPublished: boolean;
}

export interface GaleriFoto {
  id: number;
  title: string;
  image: string;
  caption?: string | null;
  category?: string | null;
  position: number;
}

export interface GaleriVideo {
  id: number;
  title: string;
  videoUrl: string;
  thumbnail?: string | null;
  description?: string | null;
  position: number;
}

export interface Testimoni {
  id: number;
  name: string;
  role?: string | null;
  origin?: string | null;
  avatar?: string | null;
  message: string;
  rating: number;
  isApproved: boolean;
  position: number;
}

export interface ProfilWebsite {
  id: number;
  siteName: string;
  tagline?: string | null;
  logo?: string | null;
  favicon?: string | null;
  about?: string | null;
  vision?: string | null;
  mission?: string | null;
  history?: string | null;
  heroImage?: string | null;
}

export interface Kontak {
  id: number;
  address?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  email?: string | null;
  mapEmbed?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
  youtube?: string | null;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'ADMIN' | 'SUPERADMIN';
  avatar?: string | null;
  isActive: boolean;
  lastLogin?: string | null;
  createdAt: string;
}

export interface Reservasi {
  id: number;
  name: string;
  email: string;
  arrivalDate?: string | null;
  guests: number;
  packageType?: string | null;
  note?: string | null;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}

export interface DashboardStats {
  counts: Record<string, number>;
  topDestinasi: Array<Pick<Destinasi, 'id' | 'title' | 'views' | 'rating' | 'thumbnail'>>;
  latestReservasi: Reservasi[];
  upcomingEvents: Array<Pick<EventItem, 'id' | 'title' | 'startDate' | 'thumbnail'>>;
}
