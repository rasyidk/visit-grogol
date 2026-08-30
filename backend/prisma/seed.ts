import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { env } from '../src/config/env';

const prisma = new PrismaClient();

const img = (seed: string, w = 800, h = 600) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

async function main() {
  console.log('🌱 Seeding database...');

  // ── Admin users ───────────────────────────────────────────
  const passwordHash = await bcrypt.hash(env.seed.adminPassword, 10);
  await prisma.adminUser.upsert({
    where: { email: env.seed.adminEmail },
    update: {},
    create: {
      name: env.seed.adminName,
      email: env.seed.adminEmail,
      password: passwordHash,
      role: 'SUPERADMIN',
      avatar: img('admin-avatar', 200, 200),
    },
  });
  await prisma.adminUser.upsert({
    where: { email: 'editor@visitgrogol.id' },
    update: {},
    create: {
      name: 'Editor Konten',
      email: 'editor@visitgrogol.id',
      password: await bcrypt.hash('Editor@12345', 10),
      role: 'ADMIN',
    },
  });

  // ── Categories ────────────────────────────────────────────
  const categoryData = [
    { name: 'Alam', nameEn: 'Nature', icon: 'Mountain', color: '#1B7A3E', description: 'Keindahan alam pedesaan yang asri.', descriptionEn: 'The beautiful nature of the countryside.' },
    { name: 'Budaya', nameEn: 'Culture', icon: 'Drama', color: '#B8860B', description: 'Warisan seni dan tradisi leluhur.', descriptionEn: 'Heritage of art and ancestral traditions.' },
    { name: 'Kuliner', nameEn: 'Culinary', icon: 'UtensilsCrossed', color: '#C2410C', description: 'Cita rasa khas desa wisata.', descriptionEn: 'Authentic taste of the tourism village.' },
    { name: 'Penginapan', nameEn: 'Accommodation', icon: 'BedDouble', color: '#0F766E', description: 'Akomodasi otentik dan nyaman.', descriptionEn: 'Authentic and comfortable accommodation.' },
    { name: 'Petualangan', nameEn: 'Adventure', icon: 'Compass', color: '#7C3AED', description: 'Aktivitas seru penuh tantangan.', descriptionEn: 'Exciting and challenging activities.' },
  ];
  const categories: Record<string, number> = {};
  for (const c of categoryData) {
    const cat = await prisma.kategori.upsert({
      where: { slug: slugify(c.name) },
      update: {},
      create: { ...c, slug: slugify(c.name) },
    });
    categories[c.name] = cat.id;
  }

  // ── Destinations ──────────────────────────────────────────
  const destinasi = [
    {
      title: 'Air Terjun Pelangi',
      titleEn: 'Rainbow Waterfall',
      kategori: 'Alam',
      excerpt: 'Air terjun tersembunyi dengan cahaya menembus rimbunnya lumut hijau.',
      excerptEn: 'Hidden waterfall with light piercing through lush green moss.',
      description: 'Air Terjun Pelangi menawarkan pengalaman visual dan spiritual yang tak terlupakan di tengah hutan lindung desa. Aliran air jernih jatuh dari ketinggian membelah tebing berlumut.',
      descriptionEn: 'Rainbow Waterfall offers an unforgettable visual and spiritual experience in the middle of the village protected forest. Clear water falls from a height splitting the mossy cliffs.',
      location: 'Kawasan Hutan Lindung, Desa Grogol',
      price: 25000,
      priceForeign: 75000,
      openHours: '08:00 - 17:00',
      rating: 4.8,
      facilities: ['Parkir', 'Toilet', 'Gazebo', 'Pemandu'],
      isFeatured: true,
    },
    {
      title: 'Sawah Terasering Panorama',
      titleEn: 'Panoramic Terraced Rice Fields',
      kategori: 'Alam',
      excerpt: 'Hamparan sawah bertingkat yang memukau, surga bagi fotografer.',
      excerptEn: 'Stunning terraced rice fields, a paradise for photographers.',
      description: 'Sawah terasering yang membentang hijau keemasan, sempurna untuk fotografi dan meditasi menyambut matahari terbit.',
      descriptionEn: 'Golden green terraced rice fields stretching out, perfect for photography and meditation welcoming the sunrise.',
      location: 'Lereng Bukit, Desa Grogol',
      price: 15000,
      priceForeign: 50000,
      openHours: '06:00 - 18:00',
      rating: 4.9,
      facilities: ['Fotografi', 'Meditasi', 'Spot Sunrise'],
      isFeatured: true,
    },
    {
      title: 'Danau Cermin',
      titleEn: 'Mirror Lake',
      kategori: 'Alam',
      excerpt: 'Area relaksasi & memancing dengan air setenang cermin.',
      excerptEn: 'Relaxation & fishing area with water as calm as a mirror.',
      description: 'Danau alami dengan permukaan bening memantulkan langit. Tempat sempurna untuk memancing dan bersantai.',
      descriptionEn: 'Natural lake with a clear surface reflecting the sky. Perfect place for fishing and relaxing.',
      location: 'Desa Grogol',
      price: 10000,
      priceForeign: 30000,
      openHours: '07:00 - 17:00',
      rating: 4.7,
      facilities: ['Memancing', 'Perahu', 'Kafe'],
      isFeatured: true,
    },
    {
      title: 'Vila Aruna Bamboo',
      titleEn: 'Aruna Bamboo Villa',
      kategori: 'Penginapan',
      excerpt: 'Pengalaman menginap mewah di tengah hutan bambu dengan fasilitas smart-home.',
      excerptEn: 'Luxury stay experience in the middle of a bamboo forest with smart-home facilities.',
      description: 'Vila eksklusif berbahan bambu dengan sentuhan modern, dikelilingi rimbunnya hutan bambu yang menenangkan.',
      descriptionEn: 'Exclusive bamboo villa with a modern touch, surrounded by a calming lush bamboo forest.',
      location: 'Desa Grogol',
      price: 1250000,
      priceForeign: 1250000,
      openHours: '24 Jam',
      rating: 4.9,
      facilities: ['WIFI', 'Pool', 'AC', 'Breakfast'],
      isFeatured: false,
    },
    {
      title: 'Joglo Heritage Suites',
      titleEn: 'Joglo Heritage Suites',
      kategori: 'Penginapan',
      excerpt: 'Arsitektur tradisional bertemu kemewahan kontemporer.',
      excerptEn: 'Traditional architecture meets contemporary luxury.',
      description: 'Joglo autentik yang direstorasi dengan cermat, menghadirkan kemewahan tanpa menghilangkan jiwa tradisional.',
      descriptionEn: 'Authentic Joglo carefully restored, presenting luxury without losing its traditional soul.',
      location: 'Desa Grogol',
      price: 850000,
      priceForeign: 850000,
      openHours: '24 Jam',
      rating: 4.8,
      facilities: ['WIFI', 'View', 'Coffee', 'Parking'],
      isFeatured: false,
    },
    {
      title: 'The Canopy Sanctuary',
      titleEn: 'The Canopy Sanctuary',
      kategori: 'Penginapan',
      excerpt: 'Eko-lodge eksklusif di atas kanopi hutan untuk ketenangan maksimal.',
      excerptEn: 'Exclusive eco-lodge above the forest canopy for maximum tranquility.',
      description: 'Eko-lodge yang bertengger di atas kanopi hutan, menawarkan koneksi mendalam dengan alam.',
      descriptionEn: 'Eco-lodge perched above the forest canopy, offering a deep connection with nature.',
      location: 'Desa Grogol',
      price: 1800000,
      priceForeign: 1800000,
      openHours: '24 Jam',
      rating: 5.0,
      facilities: ['Spa', 'Eco', 'Yoga', 'Security'],
      isFeatured: false,
    },
  ];

  for (const d of destinasi) {
    const { kategori, facilities, ...rest } = d;
    await prisma.destinasi.upsert({
      where: { slug: slugify(d.title) },
      update: {},
      create: {
        ...rest,
        slug: slugify(d.title),
        kategoriId: categories[kategori],
        thumbnail: img(slugify(d.title)),
        images: [img(`${slugify(d.title)}-1`), img(`${slugify(d.title)}-2`)] as Prisma.JsonArray,
        facilities: facilities as Prisma.JsonArray,
        views: Math.floor((d.rating || 4) * 120),
      },
    });
  }

  // ── Banners ───────────────────────────────────────────────
  const banners = [
    { title: 'Kembali ke Alam & Tradisi', titleEn: 'Back to Nature & Tradition', subtitle: 'Rasakan kemewahan dalam kesederhanaan.', subtitleEn: 'Experience luxury in simplicity.', ctaLabel: 'Jelajahi Atraksi', ctaLabelEn: 'Explore Attractions', position: 1 },
    { title: 'Warisan Kuliner yang Menggugah Selera', titleEn: 'Mouthwatering Culinary Heritage', subtitle: 'Cita rasa lokal turun-temurun.', subtitleEn: 'Local flavors passed down through generations.', ctaLabel: 'Lihat Kuliner', ctaLabelEn: 'See Culinary', position: 2 },
  ];
  for (const b of banners) {
    const existing = await prisma.banner.findFirst({ where: { title: b.title } });
    if (!existing) await prisma.banner.create({ data: { ...b, image: img(`banner-${b.position}`, 1600, 900) } });
  }

  // ── News ──────────────────────────────────────────────────
  const berita = [
    { title: 'Desa Grogol Raih Penghargaan Desa Wisata Berkelanjutan 2024', titleEn: 'Grogol Village Wins 2024 Sustainable Tourism Village Award', category: 'Prestasi', excerpt: 'Pengakuan atas komitmen menjaga kelestarian alam dan budaya.', excerptEn: 'Recognition of commitment to preserving nature and culture.' },
    { title: 'Panduan Lengkap Menikmati Sunrise di Sawah Terasering', titleEn: 'Complete Guide to Enjoying Sunrise at the Terraced Rice Fields', category: 'Tips', excerpt: 'Waktu terbaik dan spot foto favorit para wisatawan.', excerptEn: 'Best time and favorite photo spots for tourists.' },
    { title: 'Workshop Tenun Serat Alam Kini Terbuka untuk Umum', titleEn: 'Natural Fiber Weaving Workshop Now Open to Public', category: 'Aktivitas', excerpt: 'Belajar langsung dari para pengrajin lokal berpengalaman.', excerptEn: 'Learn directly from experienced local artisans.' },
  ];
  for (const n of berita) {
    await prisma.berita.upsert({
      where: { slug: slugify(n.title) },
      update: {},
      create: {
        ...n,
        slug: slugify(n.title),
        content: `<p>${n.excerpt}</p><p>Desa Grogol terus berinovasi dalam mengembangkan ekosistem pariwisata digital yang berkelanjutan.</p>`,
        contentEn: `<p>${n.excerptEn}</p><p>Grogol Village continues to innovate in developing a sustainable digital tourism ecosystem.</p>`,
        thumbnail: img(`berita-${slugify(n.title)}`),
        author: 'Tim Redaksi',
        isPublished: true,
        publishedAt: new Date('2024-06-01'),
        views: Math.floor(Math.random() * 500) + 50,
        tags: [n.category, 'Desa Wisata'] as Prisma.JsonArray,
      },
    });
  }

  // ── Events ────────────────────────────────────────────────
  const events = [
    { title: 'Festival Panen Raya', titleEn: 'Grand Harvest Festival', description: 'Syukuran akbar atas hasil bumi yang melimpah.', descriptionEn: 'Grand thanksgiving for the abundant harvest.', startDate: new Date('2024-05-15'), ticketPrice: 0, location: 'Balai Desa Grogol' },
    { title: 'Ritual Bersih Desa', titleEn: 'Village Cleansing Ritual', description: 'Momentum penyucian diri dan lingkungan secara kolektif.', descriptionEn: 'A collective self and environmental purification momentum.', startDate: new Date('2024-08-02'), ticketPrice: 50000, location: 'Sungai Desa Grogol' },
    { title: 'Pekan Batik & Tenun', titleEn: 'Batik & Weaving Week', description: 'Eksibisi karya-karya terbaik pengrajin lokal.', descriptionEn: 'Exhibition of the best works of local artisans.', startDate: new Date('2024-10-20'), ticketPrice: 25000, location: 'Sanggar Kriya Grogol' },
  ];
  for (const e of events) {
    await prisma.event.upsert({
      where: { slug: slugify(e.title) },
      update: {},
      create: { ...e, slug: slugify(e.title), thumbnail: img(`event-${slugify(e.title)}`), content: `<p>${e.description}</p>`, contentEn: `<p>${e.descriptionEn}</p>` },
    });
  }

  // ── Photo gallery ─────────────────────────────────────────
  const fotos = [
    { title: 'Tari Padi Hijau', titleEn: 'Green Rice Dance' },
    { title: 'Tenun Serat Alam', titleEn: 'Natural Fiber Weaving' },
    { title: 'Sego Wiwit Tradisional', titleEn: 'Traditional Sego Wiwit' },
    { title: 'Kopi Rempah', titleEn: 'Spiced Coffee' },
    { title: 'Sawah Terasering', titleEn: 'Terraced Rice Fields' },
    { title: 'Danau Cermin', titleEn: 'Mirror Lake' }
  ];
  for (let i = 0; i < fotos.length; i++) {
    const existing = await prisma.galeriFoto.findFirst({ where: { title: fotos[i].title } });
    if (!existing)
      await prisma.galeriFoto.create({
        data: { title: fotos[i].title, titleEn: fotos[i].titleEn, image: img(`galeri-${slugify(fotos[i].title)}`), category: i < 2 ? 'Budaya' : i < 4 ? 'Kuliner' : 'Alam', position: i },
      });
  }

  // ── Video gallery ─────────────────────────────────────────
  const videos = [
    { title: 'Pesona Desa Grogol dari Udara', titleEn: 'The Charm of Grogol Village from the Air', description: 'Video drone desa wisata', descriptionEn: 'Drone video of tourism village', videoUrl: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ' },
    { title: 'Proses Pembuatan Tenun Serat Alam', titleEn: 'The Making of Natural Fiber Weaving', description: 'Liputan UMKM', descriptionEn: 'SME coverage', videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4' },
  ];
  for (let i = 0; i < videos.length; i++) {
    const existing = await prisma.galeriVideo.findFirst({ where: { title: videos[i].title } });
    if (!existing)
      await prisma.galeriVideo.create({ data: { ...videos[i], thumbnail: img(`video-${i}`), position: i } });
  }

  // ── Testimonials ──────────────────────────────────────────
  const testimoni = [
    { name: 'Amanda Smith', role: 'Travel Blogger', roleEn: 'Travel Blogger', origin: 'Australia', message: 'Sebuah pengalaman yang menenangkan jiwa. Keramahtamahan warga desa dan udara pegunungan yang segar membuat saya ingin kembali lagi setiap tahun.', messageEn: 'A soul-soothing experience. The hospitality of the villagers and fresh mountain air make me want to return every year.', rating: 5 },
    { name: 'Irwan Hakim', role: 'Kolektor Seni', roleEn: 'Art Collector', origin: 'Jakarta', message: 'Produk UMKM-nya sangat berkualitas tinggi. Saya membawa pulang beberapa kain tenun dan kerajinan gerabah yang kini menjadi hiasan utama.', messageEn: 'Their SME products are of very high quality. I brought home some woven fabrics and pottery that are now main decorations.', rating: 5 },
    { name: 'Sari Dewi', role: 'Fotografer', roleEn: 'Photographer', origin: 'Bandung', message: 'Lanskap sawah teraseringnya luar biasa untuk fotografi. Momen sunrise-nya benar-benar magis!', messageEn: 'The terraced rice field landscape is extraordinary for photography. The sunrise moment is truly magical!', rating: 5 },
  ];
  for (let i = 0; i < testimoni.length; i++) {
    const existing = await prisma.testimoni.findFirst({ where: { name: testimoni[i].name } });
    if (!existing) await prisma.testimoni.create({ data: { ...testimoni[i], avatar: img(`avatar-${i}`, 100, 100), position: i } });
  }

  // ── Website profile (singleton) ───────────────────────────
  const profil = await prisma.profilWebsite.findFirst();
  if (!profil) {
    await prisma.profilWebsite.create({
      data: {
        siteName: 'VisitGrogol',
        siteNameEn: 'VisitGrogol',
        tagline: 'Kembali ke Alam & Tradisi',
        taglineEn: 'Back to Nature & Tradition',
        about: 'Mewujudkan ekosistem pariwisata digital yang berkelanjutan, menjaga warisan budaya, dan memberdayakan komunitas lokal.',
        aboutEn: 'Realizing a sustainable digital tourism ecosystem, preserving cultural heritage, and empowering local communities.',
        vision: 'Menjadi destinasi desa wisata premium yang mengedepankan keberlanjutan.',
        visionEn: 'To become a premium tourism village destination that prioritizes sustainability.',
        mission: 'Memberdayakan masyarakat lokal melalui pariwisata digital yang inklusif.',
        missionEn: 'Empowering local communities through inclusive digital tourism.',
        history: 'Didirikan pada abad ke-17 oleh pengembara dari pegunungan tengah, desa ini dibangun di atas filosofi Tri Hita Karana.',
        historyEn: 'Founded in the 17th century by wanderers from the central mountains, this village was built on the philosophy of Tri Hita Karana.',
        logo: img('logo', 200, 200),
        heroImage: img('hero-profil', 1600, 900),
      },
    });
  }

  // ── Contact (singleton) ───────────────────────────────────
  const kontak = await prisma.kontak.findFirst();
  if (!kontak) {
    await prisma.kontak.create({
      data: {
        address: 'Kabupaten Bogor, Jawa Barat',
        phone: '+62 21 1234 5678',
        whatsapp: '+62 812 3456 7890',
        email: 'halo@visitgrogol.id',
        latitude: -6.5971,
        longitude: 106.806,
        instagram: 'https://instagram.com/desawisata.official',
        facebook: 'https://facebook.com/visitgrogol',
        youtube: 'https://youtube.com/@visitgrogol',
      },
    });
  }

  // ── Sample reservations & subscribers ─────────────────────
  const resvCount = await prisma.reservasi.count();
  if (resvCount === 0) {
    await prisma.reservasi.createMany({
      data: [
        { name: 'Budi Santoso', email: 'budi@example.com', guests: 2, packageType: 'Paket Full Day Budaya', arrivalDate: new Date('2024-07-20'), status: 'PENDING' },
        { name: 'Maria Chen', email: 'maria@example.com', guests: 4, packageType: 'Paket Menginap 2 Hari', arrivalDate: new Date('2024-08-05'), status: 'CONFIRMED' },
      ],
    });
  }
  await prisma.newsletterSubscriber.upsert({
    where: { email: 'subscriber@example.com' },
    update: {},
    create: { email: 'subscriber@example.com' },
  });

  console.log('✅ Seed complete.');
  console.log(`   Admin login: ${env.seed.adminEmail} / ${env.seed.adminPassword}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
