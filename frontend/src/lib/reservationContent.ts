export type ReservationPackage = {
  id: string;
  label: { id: string; en: string };
};

export type ReservationTransport = {
  id: string;
  icon: 'train' | 'plane' | 'bike' | 'car' | 'bus';
  title: { id: string; en: string };
  description: { id: string; en: string };
};

export type ReservationContent = {
  packages: ReservationPackage[];
  map: {
    image: string;
    url: string;
  };
  transport: ReservationTransport[];
};

export const DEFAULT_RESERVATION_CONTENT: ReservationContent = {
  packages: [
    {
      id: 'full-day-budaya',
      label: { id: 'Paket Full Day Budaya', en: 'Full Day Culture Package' },
    },
    {
      id: 'dua-hari-satu-malam',
      label: { id: 'Paket 2 Hari 1 Malam', en: '2 Days 1 Night Package' },
    },
    {
      id: 'jelajah-kuliner',
      label: { id: 'Paket Jelajah Kuliner', en: 'Culinary Exploration Package' },
    },
    {
      id: 'petualangan-alam',
      label: { id: 'Paket Petualangan Alam', en: 'Nature Adventure Package' },
    },
  ],
  map: {
    image: '/Landscape.jpg',
    url: 'https://share.google/eotqkx4z0ixoviIr0',
  },
  transport: [
    {
      id: 'transportasi-umum',
      icon: 'train',
      title: { id: 'Transportasi Umum', en: 'Public Transportation' },
      description: {
        id: 'Naik taksi resmi atau shuttle desa selama 45 menit perjalanan.',
        en: 'Take an official taxi or village shuttle for a 45-minute journey.',
      },
    },
    {
      id: 'dari-bandara',
      icon: 'plane',
      title: { id: 'Dari Bandara', en: 'From the Airport' },
      description: {
        id: 'Layanan antar-jemput privat tersedia dengan konfirmasi 24 jam sebelumnya.',
        en: 'Private transfer service is available with 24-hour confirmation.',
      },
    },
    {
      id: 'sewa-kendaraan',
      icon: 'bike',
      title: { id: 'Sewa Kendaraan', en: 'Vehicle Rental' },
      description: {
        id: 'Parkir aman tersedia bagi tamu yang membawa kendaraan pribadi.',
        en: 'Secure parking is available for guests bringing private vehicles.',
      },
    },
  ],
};

export function normaliseReservationContent(value?: Partial<ReservationContent> | null): ReservationContent {
  return {
    packages: Array.isArray(value?.packages) && value.packages.length > 0
      ? value.packages.map((item, index) => ({
          id: item.id || `package-${index + 1}`,
          label: {
            id: item.label?.id || '',
            en: item.label?.en || item.label?.id || '',
          },
        }))
      : DEFAULT_RESERVATION_CONTENT.packages,
    map: {
      ...DEFAULT_RESERVATION_CONTENT.map,
      ...(value?.map ?? {}),
    },
    transport: Array.isArray(value?.transport) && value.transport.length > 0
      ? value.transport.map((item, index) => ({
          id: item.id || `transport-${index + 1}`,
          icon: item.icon || 'bike',
          title: {
            id: item.title?.id || '',
            en: item.title?.en || item.title?.id || '',
          },
          description: {
            id: item.description?.id || '',
            en: item.description?.en || item.description?.id || '',
          },
        }))
      : DEFAULT_RESERVATION_CONTENT.transport,
  };
}
