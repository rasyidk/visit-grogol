import type { ResourceConfig } from '@/components/admin/resourceTypes';

export const profilConfig: ResourceConfig = {
  key: 'profil',
  endpoint: '/profil',
  label: 'Profil Website',
  labelSingular: 'Profil',
  description: 'Informasi umum, visi, misi, dan sejarah website.',
  singleton: true,
  columns: [],
  fields: [
    { name: 'siteName', label: 'Nama Situs', type: 'text', required: true, colSpan: 1 },
    { name: 'tagline', label: 'Tagline', type: 'text', colSpan: 1 },
    { name: 'logo', label: 'Logo', type: 'image', colSpan: 1 },
    { name: 'heroImage', label: 'Gambar Hero', type: 'image', colSpan: 1 },
    { name: 'about', label: 'Tentang', type: 'textarea', colSpan: 2 },
    { name: 'vision', label: 'Visi', type: 'textarea', colSpan: 1 },
    { name: 'mission', label: 'Misi', type: 'textarea', colSpan: 1 },
    { name: 'history', label: 'Sejarah', type: 'textarea', colSpan: 2 },
  ],
};

export const kontakConfig: ResourceConfig = {
  key: 'kontak',
  endpoint: '/kontak',
  label: 'Informasi Kontak',
  labelSingular: 'Kontak',
  description: 'Alamat, telepon, dan tautan media sosial.',
  singleton: true,
  columns: [],
  fields: [
    { name: 'address', label: 'Alamat', type: 'text', colSpan: 2 },
    { name: 'phone', label: 'Telepon', type: 'text', colSpan: 1 },
    { name: 'whatsapp', label: 'WhatsApp', type: 'text', colSpan: 1 },
    { name: 'email', label: 'Email', type: 'text', colSpan: 1 },
    { name: 'mapEmbed', label: 'Embed Peta (iframe src)', type: 'text', colSpan: 1 },
    { name: 'instagram', label: 'Instagram', type: 'text', colSpan: 1 },
    { name: 'facebook', label: 'Facebook', type: 'text', colSpan: 1 },
    { name: 'twitter', label: 'Twitter/X', type: 'text', colSpan: 1 },
    { name: 'youtube', label: 'YouTube', type: 'text', colSpan: 1 },
  ],
};
