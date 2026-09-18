export type HeaderHeroPage = 'home' | 'wisata' | 'budaya';

export type PageHeroContent = {
  background: string;
  title: { id: string; en: string };
  description: { id: string; en: string };
};

export type HeaderHeroContent = Record<HeaderHeroPage, PageHeroContent>;

export const DEFAULT_HEADER_HERO: HeaderHeroContent = {
  home: {
    background: '/HeroBanner.jpg',
    title: { id: 'Di sini, Budaya Terus Hidup', en: 'Where Culture Comes Alive' },
    description: {
      id: 'Rasakan denyut kehidupan pedesaan, tempat tradisi leluhur, cita rasa lokal, dan kisah-kisah masyarakat terus mengalir dari generasi ke generasi di jantung Gunungkidul.',
      en: 'Experience the rhythm of rural life, where ancestral traditions, local flavors, and living culture come together in the heart of Gunungkidul.',
    },
  },
  wisata: {
    background: '',
    title: { id: 'Kembali ke Alam & Tradisi', en: 'Back to Nature & Tradition' },
    description: {
      id: 'Rasakan kemewahan dalam kesederhanaan. Jelajahi keindahan pedesaan yang memadukan kenyamanan modern dengan kearifan lokal yang autentik.',
      en: 'Experience luxury in simplicity. Explore the beauty of the countryside that blends modern comfort with authentic local wisdom.',
    },
  },
  budaya: {
    background: '',
    title: { id: 'Budaya & Tradisi', en: 'Culture & Tradition' },
    description: {
      id: 'Menyelami kedalaman filosofi hidup masyarakat desa melalui seni yang melampaui waktu dan tradisi yang menyatukan jiwa dengan alam.',
      en: 'Delve into the depth of village philosophy through timeless arts and traditions that unite soul and nature.',
    },
  },
};
