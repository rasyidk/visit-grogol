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
  nameEn?: string | null;
  slug: string;
  description?: string | null;
  descriptionEn?: string | null;
  icon?: string | null;
  color?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Destinasi {
  id: number;
  title: string;
  titleEn?: string | null;
  slug: string;
  excerpt?: string | null;
  excerptEn?: string | null;
  description: string;
  descriptionEn?: string | null;
  content?: string | null;
  contentEn?: string | null;
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
  titleEn?: string | null;
  subtitle?: string | null;
  subtitleEn?: string | null;
  image: string;
  link?: string | null;
  ctaLabel?: string | null;
  ctaLabelEn?: string | null;
  position: number;
  isActive: boolean;
}

export interface Berita {
  id: number;
  title: string;
  titleEn?: string | null;
  slug: string;
  excerpt?: string | null;
  excerptEn?: string | null;
  content: string;
  contentEn?: string | null;
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
  titleEn?: string | null;
  slug: string;
  description: string;
  descriptionEn?: string | null;
  content?: string | null;
  contentEn?: string | null;
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
  titleEn?: string | null;
  image: string;
  caption?: string | null;
  captionEn?: string | null;
  category?: string | null;
  position: number;
}

export interface GaleriVideo {
  id: number;
  title: string;
  titleEn?: string | null;
  videoUrl: string;
  thumbnail?: string | null;
  description?: string | null;
  descriptionEn?: string | null;
  position: number;
}

export interface Testimoni {
  id: number;
  name: string;
  role?: string | null;
  roleEn?: string | null;
  origin?: string | null;
  avatar?: string | null;
  message: string;
  messageEn?: string | null;
  rating: number;
  isApproved: boolean;
  position: number;
}

export interface ProfilWebsite {
  id: number;
  siteName: string;
  siteNameEn?: string | null;
  tagline?: string | null;
  taglineEn?: string | null;
  logo?: string | null;
  favicon?: string | null;
  about?: string | null;
  aboutEn?: string | null;
  vision?: string | null;
  visionEn?: string | null;
  mission?: string | null;
  missionEn?: string | null;
  history?: string | null;
  historyEn?: string | null;
  heroImage?: string | null;
  atraksiHeroImage?: string | null;
  budayaHeroImage?: string | null;
  kulinerHeroImage?: string | null;
  penginapanHeroImage?: string | null;
  kontakHeroImage?: string | null;
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
  topDestinasi: Array<Pick<Destinasi, 'id' | 'title' | 'titleEn' | 'titleEn' | 'views' | 'rating' | 'thumbnail'>>;
  latestReservasi: Reservasi[];
  upcomingEvents: Array<Pick<EventItem, 'id' | 'title' | 'titleEn' | 'titleEn' | 'startDate' | 'thumbnail'>>;
}

export interface Wisata {
  id: number;
  slug: string;
  title: string;
  titleEn?: string | null;
  title_en?: string | null;
  content?: string | null;
  contentEn?: string | null;
  content_en?: string | null;
  thumbnail?: string | null;
  images?: string[] | null;
  isActive?: boolean;
  is_active?: boolean;
  createdAt?: string;
  updatedAt?: string;
}
