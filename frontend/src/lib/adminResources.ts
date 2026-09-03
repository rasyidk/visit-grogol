import type { ResourceConfig } from '@/components/admin/resourceTypes';

const boolFilter = (label: string, key: string) => ({
  key,
  label,
  options: [
    { label: 'Ya', value: 'true' },
    { label: 'Tidak', value: 'false' },
  ],
});

export const destinasiConfig: ResourceConfig = {
  key: 'destinasi',
  endpoint: '/destinasi',
  label: 'Destinasi Wisata',
  labelSingular: 'Destinasi',
  description: 'Kelola daftar destinasi & atraksi wisata desa.',
  searchable: true,
  filters: [boolFilter('Unggulan', 'isFeatured'), boolFilter('Publikasi', 'isPublished')],
  sortOptions: [
    { label: 'Terbaru', value: 'createdAt' },
    { label: 'Judul', value: 'title' },
    { label: 'Harga', value: 'price' },
    { label: 'Rating', value: 'rating' },
    { label: 'Dilihat', value: 'views' },
  ],
  defaultSort: { sortBy: 'createdAt', sortOrder: 'desc' },
  columns: [
    { key: 'thumbnail', label: 'Foto', type: 'image' },
    { key: 'title', label: 'Judul' },
    { key: 'location', label: 'Lokasi' },
    { key: 'price', label: 'Harga', type: 'price' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'isFeatured', label: 'Unggulan', type: 'boolean' },
    { key: 'isPublished', label: 'Publikasi', type: 'boolean', booleanLabels: ['Terbit', 'Draft'] },
  ],
  fields: [
    { name: 'title', label: 'Judul (ID)', type: 'text', required: true, colSpan: 1 },
    { name: 'titleEn', label: 'Judul (EN)', type: 'text', colSpan: 1 },
    { name: 'kategoriId', label: 'Kategori', type: 'select', required: true, optionsEndpoint: '/kategori', colSpan: 1 },
    { name: 'location', label: 'Lokasi', type: 'text', required: true, colSpan: 1 },
    { name: 'excerpt', label: 'Ringkasan (ID)', type: 'text', colSpan: 1 },
    { name: 'excerptEn', label: 'Ringkasan (EN)', type: 'text', colSpan: 1 },
    { name: 'description', label: 'Deskripsi (ID)', type: 'textarea', required: true, colSpan: 1 },
    { name: 'descriptionEn', label: 'Deskripsi (EN)', type: 'textarea', colSpan: 1 },
    { name: 'content', label: 'Konten (ID)', type: 'textarea', colSpan: 1 },
    { name: 'contentEn', label: 'Konten (EN)', type: 'textarea', colSpan: 1 },
    { name: 'thumbnail', label: 'Gambar Utama', type: 'image', required: true, colSpan: 2 },
    { name: 'price', label: 'Harga Domestik (Rp)', type: 'number', min: 0, colSpan: 1 },
    { name: 'priceForeign', label: 'Harga Mancanegara (Rp)', type: 'number', min: 0, colSpan: 1 },
    { name: 'rating', label: 'Rating (0-5)', type: 'number', min: 0, max: 5, colSpan: 1 },
    { name: 'openHours', label: 'Jam Operasional', type: 'text', placeholder: '08:00 - 17:00', colSpan: 1 },
    {
      name: 'facilities',
      label: 'Fasilitas',
      type: 'checkbox_group',
      colSpan: 2,
      options: [
        { label: 'WiFi', value: 'wifi' },
        { label: 'Kolam Renang', value: 'pool' },
        { label: 'AC', value: 'ac' },
        { label: 'Sarapan', value: 'breakfast' },
        { label: 'Pemandangan', value: 'view' },
        { label: 'Pembuat Kopi/Teh', value: 'coffee' },
        { label: 'Area Parkir', value: 'parking' },
        { label: 'Spa', value: 'spa' },
        { label: 'Eco-friendly', value: 'eco' },
        { label: 'Area Yoga', value: 'yoga' },
        { label: 'Keamanan 24 Jam', value: 'security' },
      ],
    },
    { name: 'isFeatured', label: 'Jadikan Unggulan', type: 'switch' },
    { name: 'isPublished', label: 'Publikasikan', type: 'switch', defaultValue: true },
  ],
};

export const kategoriConfig: ResourceConfig = {
  key: 'kategori',
  endpoint: '/kategori',
  label: 'Kategori Destinasi',
  labelSingular: 'Kategori',
  searchable: true,
  sortOptions: [
    { label: 'Nama', value: 'name' },
    { label: 'Terbaru', value: 'createdAt' },
  ],
  defaultSort: { sortBy: 'name', sortOrder: 'asc' },
  columns: [
    { key: 'name', label: 'Nama' },
    { key: 'slug', label: 'Slug', type: 'badge' },
    { key: 'icon', label: 'Ikon' },
    { key: 'description', label: 'Deskripsi' },
  ],
  fields: [
    { name: 'name', label: 'Nama Kategori (ID)', type: 'text', required: true, colSpan: 1 },
    { name: 'nameEn', label: 'Nama Kategori (EN)', type: 'text', colSpan: 1 },
    { name: 'icon', label: 'Nama Ikon (lucide)', type: 'text', placeholder: 'Mountain', colSpan: 1 },
    { name: 'color', label: 'Warna (hex)', type: 'text', placeholder: '#1b7a3e', colSpan: 1 },
    { name: 'description', label: 'Deskripsi (ID)', type: 'textarea', colSpan: 1 },
    { name: 'descriptionEn', label: 'Deskripsi (EN)', type: 'textarea', colSpan: 1 },
  ],
};

export const bannerConfig: ResourceConfig = {
  key: 'banner',
  endpoint: '/banner',
  label: 'Banner',
  labelSingular: 'Banner',
  searchable: true,
  filters: [boolFilter('Aktif', 'isActive')],
  sortOptions: [
    { label: 'Posisi', value: 'position' },
    { label: 'Judul', value: 'title' },
  ],
  defaultSort: { sortBy: 'position', sortOrder: 'asc' },
  columns: [
    { key: 'image', label: 'Gambar', type: 'image' },
    { key: 'title', label: 'Judul' },
    { key: 'position', label: 'Posisi' },
    { key: 'isActive', label: 'Status', type: 'boolean' },
  ],
  fields: [
    { name: 'title', label: 'Judul (ID)', type: 'text', required: true, colSpan: 1 },
    { name: 'titleEn', label: 'Judul (EN)', type: 'text', colSpan: 1 },
    { name: 'subtitle', label: 'Subjudul (ID)', type: 'text', colSpan: 1 },
    { name: 'subtitleEn', label: 'Subjudul (EN)', type: 'text', colSpan: 1 },
    { name: 'image', label: 'Gambar Banner', type: 'image', required: true, colSpan: 2 },
    { name: 'ctaLabel', label: 'Teks Tombol (ID)', type: 'text', colSpan: 1 },
    { name: 'ctaLabelEn', label: 'Teks Tombol (EN)', type: 'text', colSpan: 1 },
    { name: 'link', label: 'Link Tombol', type: 'text', colSpan: 2 },
    { name: 'position', label: 'Posisi', type: 'number', min: 0, colSpan: 1 },
    { name: 'isActive', label: 'Aktifkan', type: 'switch', defaultValue: true },
  ],
};

export const beritaConfig: ResourceConfig = {
  key: 'berita',
  endpoint: '/berita',
  label: 'Berita',
  labelSingular: 'Berita',
  searchable: true,
  filters: [boolFilter('Publikasi', 'isPublished')],
  sortOptions: [
    { label: 'Terbaru', value: 'createdAt' },
    { label: 'Judul', value: 'title' },
    { label: 'Dilihat', value: 'views' },
  ],
  defaultSort: { sortBy: 'createdAt', sortOrder: 'desc' },
  columns: [
    { key: 'thumbnail', label: 'Foto', type: 'image' },
    { key: 'title', label: 'Judul' },
    { key: 'category', label: 'Kategori', type: 'badge' },
    { key: 'author', label: 'Penulis' },
    { key: 'isPublished', label: 'Status', type: 'boolean', booleanLabels: ['Terbit', 'Draft'] },
  ],
  fields: [
    { name: 'title', label: 'Judul (ID)', type: 'text', required: true, colSpan: 1 },
    { name: 'titleEn', label: 'Judul (EN)', type: 'text', colSpan: 1 },
    { name: 'category', label: 'Kategori', type: 'text', colSpan: 1 },
    { name: 'author', label: 'Penulis', type: 'text', colSpan: 1 },
    { name: 'excerpt', label: 'Ringkasan (ID)', type: 'textarea', colSpan: 1 },
    { name: 'excerptEn', label: 'Ringkasan (EN)', type: 'textarea', colSpan: 1 },
    { name: 'content', label: 'Konten (ID)', type: 'textarea', required: true, colSpan: 1 },
    { name: 'contentEn', label: 'Konten (EN)', type: 'textarea', colSpan: 1 },
    { name: 'thumbnail', label: 'Gambar', type: 'image', required: true, colSpan: 2 },
    { name: 'tags', label: 'Tags', type: 'tags', colSpan: 2 },
    { name: 'isPublished', label: 'Publikasikan', type: 'switch' },
  ],
};

export const eventConfig: ResourceConfig = {
  key: 'event',
  endpoint: '/event',
  label: 'Event',
  labelSingular: 'Event',
  searchable: true,
  filters: [boolFilter('Publikasi', 'isPublished')],
  sortOptions: [
    { label: 'Tanggal Mulai', value: 'startDate' },
    { label: 'Judul', value: 'title' },
  ],
  defaultSort: { sortBy: 'startDate', sortOrder: 'asc' },
  columns: [
    { key: 'thumbnail', label: 'Foto', type: 'image' },
    { key: 'title', label: 'Judul' },
    { key: 'location', label: 'Lokasi' },
    { key: 'startDate', label: 'Mulai', type: 'date' },
    { key: 'ticketPrice', label: 'Tiket', type: 'price' },
    { key: 'isPublished', label: 'Status', type: 'boolean', booleanLabels: ['Terbit', 'Draft'] },
  ],
  fields: [
    { name: 'title', label: 'Judul (ID)', type: 'text', required: true, colSpan: 1 },
    { name: 'titleEn', label: 'Judul (EN)', type: 'text', colSpan: 1 },
    { name: 'location', label: 'Lokasi', type: 'text', colSpan: 1 },
    { name: 'ticketPrice', label: 'Harga Tiket (Rp)', type: 'number', min: 0, colSpan: 1 },
    { name: 'startDate', label: 'Tanggal Mulai', type: 'date', required: true, colSpan: 1 },
    { name: 'endDate', label: 'Tanggal Selesai', type: 'date', colSpan: 1 },
    { name: 'description', label: 'Deskripsi (ID)', type: 'textarea', required: true, colSpan: 1 },
    { name: 'descriptionEn', label: 'Deskripsi (EN)', type: 'textarea', colSpan: 1 },
    { name: 'content', label: 'Konten (ID)', type: 'textarea', colSpan: 1 },
    { name: 'contentEn', label: 'Konten (EN)', type: 'textarea', colSpan: 1 },
    { name: 'thumbnail', label: 'Gambar', type: 'image', required: true, colSpan: 2 },
    { name: 'isPublished', label: 'Publikasikan', type: 'switch', defaultValue: true },
  ],
};

export const galeriFotoConfig: ResourceConfig = {
  key: 'galeri-foto',
  endpoint: '/galeri-foto',
  label: 'Galeri Foto',
  labelSingular: 'Foto',
  searchable: true,
  sortOptions: [
    { label: 'Posisi', value: 'position' },
    { label: 'Judul', value: 'title' },
  ],
  defaultSort: { sortBy: 'position', sortOrder: 'asc' },
  columns: [
    { key: 'image', label: 'Gambar', type: 'image' },
    { key: 'title', label: 'Judul' },
    { key: 'category', label: 'Kategori', type: 'badge' },
    { key: 'caption', label: 'Caption' },
  ],
  fields: [
    { name: 'title', label: 'Judul (ID)', type: 'text', required: true, colSpan: 1 },
    { name: 'titleEn', label: 'Judul (EN)', type: 'text', colSpan: 1 },
    { name: 'category', label: 'Kategori', type: 'text', colSpan: 2 },
    { name: 'image', label: 'Gambar', type: 'image', required: true, colSpan: 2 },
    { name: 'caption', label: 'Caption (ID)', type: 'text', colSpan: 1 },
    { name: 'captionEn', label: 'Caption (EN)', type: 'text', colSpan: 1 },
    { name: 'position', label: 'Posisi', type: 'number', min: 0, colSpan: 2 },
  ],
};

export const galeriVideoConfig: ResourceConfig = {
  key: 'galeri-video',
  endpoint: '/galeri-video',
  label: 'Galeri Video',
  labelSingular: 'Video',
  searchable: true,
  sortOptions: [
    { label: 'Posisi', value: 'position' },
    { label: 'Judul', value: 'title' },
  ],
  defaultSort: { sortBy: 'position', sortOrder: 'asc' },
  columns: [
    { key: 'thumbnail', label: 'Thumbnail', type: 'image' },
    { key: 'title', label: 'Judul' },
    { key: 'videoUrl', label: 'URL Video' },
  ],
  fields: [
    { name: 'title', label: 'Judul (ID)', type: 'text', required: true, colSpan: 1 },
    { name: 'titleEn', label: 'Judul (EN)', type: 'text', colSpan: 1 },
    { name: 'videoUrl', label: 'URL Video (YouTube)', type: 'text', required: true, colSpan: 2 },
    { name: 'thumbnail', label: 'Thumbnail', type: 'image', colSpan: 2 },
    { name: 'description', label: 'Deskripsi (ID)', type: 'textarea', colSpan: 1 },
    { name: 'descriptionEn', label: 'Deskripsi (EN)', type: 'textarea', colSpan: 1 },
    { name: 'position', label: 'Posisi', type: 'number', min: 0, colSpan: 2 },
  ],
};

export const testimoniConfig: ResourceConfig = {
  key: 'testimoni',
  endpoint: '/testimoni',
  label: 'Testimoni',
  labelSingular: 'Testimoni',
  searchable: true,
  filters: [boolFilter('Disetujui', 'isApproved')],
  sortOptions: [
    { label: 'Posisi', value: 'position' },
    { label: 'Nama', value: 'name' },
    { label: 'Rating', value: 'rating' },
  ],
  defaultSort: { sortBy: 'position', sortOrder: 'asc' },
  columns: [
    { key: 'avatar', label: 'Foto', type: 'image' },
    { key: 'name', label: 'Nama' },
    { key: 'origin', label: 'Asal' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'isApproved', label: 'Status', type: 'boolean', booleanLabels: ['Tampil', 'Pending'] },
  ],
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true, colSpan: 1 },
    { name: 'origin', label: 'Asal', type: 'text', colSpan: 1 },
    { name: 'role', label: 'Peran (ID)', type: 'text', colSpan: 1 },
    { name: 'roleEn', label: 'Peran (EN)', type: 'text', colSpan: 1 },
    { name: 'rating', label: 'Rating (1-5)', type: 'number', min: 1, max: 5, defaultValue: 5, colSpan: 2 },
    { name: 'avatar', label: 'Foto', type: 'image', colSpan: 2 },
    { name: 'message', label: 'Pesan (ID)', type: 'textarea', required: true, colSpan: 1 },
    { name: 'messageEn', label: 'Pesan (EN)', type: 'textarea', colSpan: 1 },
    { name: 'isApproved', label: 'Tampilkan di website', type: 'switch', defaultValue: true },
  ],
};

export const reservasiConfig: ResourceConfig = {
  key: 'reservasi',
  endpoint: '/reservasi',
  label: 'Reservasi',
  labelSingular: 'Reservasi',
  description: 'Permintaan booking dari formulir kontak.',
  searchable: true,
  disableCreate: true,
  disableEdit: true,
  filters: [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Pending', value: 'PENDING' },
        { label: 'Confirmed', value: 'CONFIRMED' },
        { label: 'Cancelled', value: 'CANCELLED' },
      ],
    },
  ],
  sortOptions: [{ label: 'Terbaru', value: 'createdAt' }],
  defaultSort: { sortBy: 'createdAt', sortOrder: 'desc' },
  columns: [
    { key: 'name', label: 'Nama' },
    { key: 'email', label: 'Email' },
    { key: 'guests', label: 'Tamu' },
    { key: 'packageType', label: 'Paket', type: 'badge' },
    { key: 'arrivalDate', label: 'Kedatangan', type: 'date' },
    { key: 'status', label: 'Status', type: 'badge' },
  ],
  fields: [],
};

export const newsletterConfig: ResourceConfig = {
  key: 'newsletter',
  endpoint: '/newsletter',
  label: 'Newsletter',
  labelSingular: 'Subscriber',
  description: 'Daftar email yang berlangganan.',
  disableCreate: true,
  disableEdit: true,
  columns: [
    { key: 'email', label: 'Email' },
    { key: 'createdAt', label: 'Berlangganan', type: 'date' },
  ],
  fields: [],
};

export const penggunaConfig: ResourceConfig = {
  key: 'pengguna',
  endpoint: '/admin-users',
  label: 'Pengguna Admin',
  labelSingular: 'Pengguna',
  searchable: true,
  filters: [
    {
      key: 'role',
      label: 'Role',
      options: [
        { label: 'Admin', value: 'ADMIN' },
        { label: 'Superadmin', value: 'SUPERADMIN' },
      ],
    },
  ],
  sortOptions: [
    { label: 'Terbaru', value: 'createdAt' },
    { label: 'Nama', value: 'name' },
  ],
  defaultSort: { sortBy: 'createdAt', sortOrder: 'desc' },
  columns: [
    { key: 'name', label: 'Nama' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', type: 'badge' },
    { key: 'isActive', label: 'Status', type: 'boolean', booleanLabels: ['AKTIF', 'TIDAK AKTIF'] },
  ],
  fields: [
    { name: 'name', label: 'Nama', type: 'text', required: true, colSpan: 1 },
    { name: 'email', label: 'Email', type: 'text', required: true, colSpan: 1 },
    { name: 'password', label: 'Password', type: 'text', help: 'Min 8 karakter. Kosongkan saat edit untuk tidak mengubah.', colSpan: 1 },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      colSpan: 1,
      options: [
        { label: 'Admin', value: 'ADMIN' },
        { label: 'Superadmin', value: 'SUPERADMIN' },
      ],
    },
    { name: 'isActive', label: 'Akun Aktif', type: 'switch', defaultValue: true },
  ],
};
