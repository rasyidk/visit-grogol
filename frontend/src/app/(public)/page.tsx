'use client';

import Image from 'next/image';
import { ArrowRight, Cloud, Wind, Eye, Droplets, Sun, Quote } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Badge } from '@/components/ui/Misc';
import { useProfil, useTestimoni } from '@/hooks/usePublicData';

const img = (s: string, w = 800, h = 600) => `https://picsum.photos/seed/${s}/${w}/${h}`;

const team = [
  { name: 'Bp. Dharmawan', role: 'Kepala Desa' },
  { name: 'Ibu Sari', role: 'Direktur BUMDes' },
  { name: 'Bli Putu', role: 'Ketua Adat & Budaya' },
  { name: 'Rian Wijaya', role: 'Koordinator Lingkungan' },
];

const products = [
  { name: 'Tenun Serat Alam', desc: 'Dibuat selama 30 hari menggunakan pewarna tumbuhan alami.', badge: 'Best Seller', span: true, seed: 'prod-tenun' },
  { name: 'Cokelat Arut', desc: 'Biji kakao pilihan dari kebun rakyat.', seed: 'prod-cokelat' },
  { name: 'Minyak Atsiri', desc: '', seed: 'prod-atsiri' },
  { name: 'Gerabah Kriya', desc: '', seed: 'prod-gerabah' },
];

export default function ProfilPage() {
  const { data: profil } = useProfil();
  const { data: testimoni } = useTestimoni();

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[70vh] w-full overflow-hidden">
        <Image src={profil.heroImage || img('profil-hero', 1920, 1080)} alt="Desa di balik awan" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/50 to-brand-950/80" />
        <div className="container-wide relative flex min-h-[70vh] flex-col justify-center pt-24 text-white">
          <Reveal>
            <Badge tone="neutral" className="mb-5 bg-white/15 text-white">Selamat Datang di Warisan Alam</Badge>
            <h1 className="max-w-2xl text-5xl font-extrabold leading-tight sm:text-6xl">Keajaiban Desa di Balik Awan</h1>
            <p className="mt-5 max-w-xl text-white/80">
              Temukan harmoni antara tradisi leluhur dan keindahan alam yang tak tersentuh di jantung nusantara.
            </p>
            <div className="glass-dark mt-8 flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm">
              <Cloud className="h-4 w-4" /> 24°C Gerimis Tipis
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sejarah */}
      <section className="section container-wide grid items-center gap-12 lg:grid-cols-2">
        <Reveal>
          <div className="relative mx-auto aspect-square max-w-md rounded-4xl bg-white p-6 shadow-soft rotate-[-2deg]">
            <div className="relative h-full w-full overflow-hidden rounded-2xl">
              <Image src={img('old-photo', 700, 700)} alt="Foto sejarah desa" fill className="object-cover grayscale" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="eyebrow mb-3">Sejarah &amp; Filosofi</p>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">Jejak Waktu di Tanah Pusaka</h2>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink-muted">
            <p>{profil.history || 'Didirikan pada abad ke-17 oleh pengembara dari pegunungan tengah, desa ini dibangun di atas filosofi Tri Hita Karana — keseimbangan antara manusia, alam, dan Sang Pencipta.'}</p>
            <p>Setiap sudut jalan dan arsitektur rumah panggung di sini menyimpan cerita tentang ketangguhan masyarakat dalam menjaga kemurnian budaya di tengah arus modernisasi.</p>
          </div>
          <button className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:gap-2.5 transition-all">
            Baca Selengkapnya <ArrowRight className="h-4 w-4" />
          </button>
        </Reveal>
      </section>

      {/* UMKM */}
      <section className="section bg-sand/60">
        <div className="container-wide">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <p className="eyebrow mb-3">Karya Lokal</p>
              <h2 className="text-3xl font-bold text-ink sm:text-4xl">Produk Unggulan UMKM</h2>
              <p className="mt-4 text-sm text-ink-muted">Setiap produk adalah hasil kurasi tangan-tangan terampil penduduk lokal yang menggunakan bahan baku alami dari sekitar desa.</p>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3 md:grid-rows-2">
            <Reveal className="md:row-span-2">
              <ProductCard p={products[0]} tall />
            </Reveal>
            <Reveal delay={0.1} className="md:col-span-2">
              <ProductCard p={products[1]} wide />
            </Reveal>
            <Reveal delay={0.15}>
              <ProductCard p={products[2]} />
            </Reveal>
            <Reveal delay={0.2}>
              <ProductCard p={products[3]} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section container-wide">
        <Reveal>
          <p className="eyebrow mb-3">Di Balik Layar</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="max-w-md text-3xl font-bold text-ink sm:text-4xl">Bertemu dengan Pengelola Kami</h2>
            <p className="max-w-sm text-sm text-ink-muted">Membangun ekosistem pariwisata berkelanjutan dengan memberdayakan talenta lokal.</p>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-2 gap-8 sm:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.08}>
              <div className="text-center">
                <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-full ring-4 ring-white shadow-soft">
                  <Image src={img(`team-${i}`, 200, 200)} alt={m.name} fill className="object-cover" />
                </div>
                <p className="mt-4 font-bold text-ink">{m.name}</p>
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">{m.role}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimoni + widgets */}
      <section className="section container-wide grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-2">Suara Pengunjung</p>
            <h2 className="text-3xl font-bold text-ink sm:text-4xl">Apa Kata Mereka?</h2>
          </Reveal>
          <div className="mt-8 space-y-5">
            {testimoni.slice(0, 3).map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <figure className="card relative p-6">
                  <Quote className="absolute right-6 top-6 h-8 w-8 text-brand-100" />
                  <blockquote className="text-sm italic leading-relaxed text-ink-soft">“{t.message}”</blockquote>
                  <figcaption className="mt-4 flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      {t.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ink">{t.name}</p>
                      <p className="text-xs text-ink-muted">{[t.role, t.origin].filter(Boolean).join(', ')}</p>
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.1}>
            <div className="card p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-ink-muted">Cuaca Realtime</p>
                  <p className="text-xs text-ink-muted">Update terakhir: 30 menit lalu</p>
                </div>
                <Sun className="h-8 w-8 text-gold-500" />
              </div>
              <p className="mt-4 text-5xl font-extrabold text-brand-700">24°<span className="text-2xl">C</span></p>
              <dl className="mt-5 space-y-3 text-sm">
                <WeatherRow icon={Droplets} label="Kelembapan" value="78%" />
                <WeatherRow icon={Wind} label="Kecepatan Angin" value="12 km/jam" />
                <WeatherRow icon={Eye} label="Visibilitas" value="Sangat Baik" />
              </dl>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="card p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink-muted">@desawisata.official</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src={img(`ig-${i}`, 200, 200)} alt="Instagram" fill className="object-cover" />
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-full bg-sand py-2.5 text-sm font-semibold text-brand-700 hover:bg-brand-50">
                Lihat Semua Feed
              </button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function WeatherRow({ icon: Icon, label, value }: { icon: typeof Wind; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-black/5 pb-2">
      <dt className="flex items-center gap-2 text-ink-muted"><Icon className="h-4 w-4" /> {label}</dt>
      <dd className="font-semibold text-ink">{value}</dd>
    </div>
  );
}

function ProductCard({
  p,
  tall,
  wide,
}: {
  p: { name: string; desc: string; badge?: string; seed: string };
  tall?: boolean;
  wide?: boolean;
}) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl ${tall ? 'h-full min-h-[300px]' : wide ? 'aspect-[2/1] md:h-full' : 'aspect-square md:h-full'}`}>
      <Image src={img(p.seed, 700, 700)} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute inset-x-5 bottom-5 text-white">
        {p.badge && <Badge tone="gold" className="mb-2 bg-gold-500 text-white">{p.badge}</Badge>}
        <h3 className="text-lg font-bold">{p.name}</h3>
        {p.desc && <p className="mt-1 text-xs text-white/80">{p.desc}</p>}
      </div>
    </div>
  );
}
