import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { Badge, SectionHeading } from '@/components/ui/Misc';

export const metadata = { title: 'Kuliner' };

const img = (s: string, w = 800, h = 600) => `https://picsum.photos/seed/${s}/${w}/${h}`;

const places = [
  { name: 'Omah Rempah', badge: 'Legendaris', since: 'Berdiri Sejak 1974', desc: 'Bermula dari dapur kecil di sudut desa, Omah Rempah menjaga tradisi menggunakan tungku kayu bakar untuk mempertahankan aroma autentik.', img: img('omah-rempah') },
  { name: 'Warung Sawah Merapi', badge: 'Modern Twist', since: 'Ikon Kuliner Lereng', desc: 'Terkenal dengan hidangan bebek panggangnya, warung ini menjadi saksi bisu perkembangan ekonomi desa dari sektor kuliner.', img: img('warung-sawah') },
  { name: 'Teras Langit', badge: 'Pemandangan Terbaik', since: 'Sentuhan Kontemporer', desc: 'Menyajikan menu fusion yang menggabungkan teknik masak modern dengan bahan organik dari kebun warga sendiri.', img: img('teras-langit') },
];

const menus = [
  { name: 'Kopi Rempah', desc: 'Paduan biji kopi lokal dengan cengkeh dan kayu manis pilihan.', price: 'IDR 35k' },
  { name: 'Nasi Bakar Biru', desc: 'Nasi uduk bunga telang dengan isian ayam suwir kemangi.', price: 'IDR 55k' },
  { name: 'Sate Maranggi', desc: 'Daging sapi empuk dengan bumbu rendaman khas legendaris.', price: 'IDR 75k' },
  { name: 'Es Dawet Ayuu', desc: 'Santan segar dengan gula aren murni dan nangka manis.', price: 'IDR 28k' },
];

export default function KulinerPage() {
  return (
    <>
      <section className="container-wide pt-32 text-center sm:pt-40">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Cita Rasa Lokal"
            title="Warisan Kuliner yang Menggugah Selera."
            description="Temukan rahasia dapur leluhur melalui hidangan khas yang diolah dengan rempah pilihan dan cinta dari masyarakat lokal."
          />
        </Reveal>
      </section>

      {/* Showcase bento */}
      <section className="container-wide mt-12">
        <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
          <Reveal className="md:col-span-2 md:row-span-2">
            <div className="group relative h-full min-h-[360px] overflow-hidden rounded-3xl">
              <Image src={img('sego-wiwit', 1000, 800)} alt="Sego Wiwit Tradisional" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute inset-x-6 bottom-6 text-white">
                <h3 className="text-2xl font-bold">Sego Wiwit Tradisional</h3>
                <p className="mt-1 text-sm text-white/80">Hidangan syukur para petani saat masa panen tiba.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-square overflow-hidden rounded-3xl md:aspect-auto md:h-full">
              <Image src={img('kuah-panas', 600, 600)} alt="Sajian hangat" fill className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative aspect-square overflow-hidden rounded-3xl md:aspect-auto md:h-full">
              <Image src={img('jajanan-pasar', 600, 600)} alt="Jajanan pasar" fill className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tempat Makan Pilihan */}
      <section className="section bg-sand/60">
        <div className="container-wide">
          <div className="flex items-end justify-between gap-6">
            <Reveal>
              <SectionHeading title="Tempat Makan Pilihan" description="Kami mengurasi warung dan restoran terbaik yang menjaga keaslian resep turun-temurun selama puluhan tahun." />
            </Reveal>
            <div className="hidden gap-2 sm:flex">
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-soft shadow-card hover:bg-brand-50" aria-label="Sebelumnya"><ChevronLeft className="h-5 w-5" /></button>
              <button className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-soft shadow-card hover:bg-brand-50" aria-label="Berikutnya"><ChevronRight className="h-5 w-5" /></button>
            </div>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {places.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article className="overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                    <Image src={p.img} alt={p.name} fill className="object-cover" />
                    <div className="absolute left-4 top-4"><Badge tone="dark">{p.badge}</Badge></div>
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-ink">{p.name}</h3>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-600">{p.since}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{p.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Signature */}
      <section className="section container-wide text-center">
        <Reveal>
          <h2 className="text-3xl font-bold text-ink sm:text-4xl">Menu Signature</h2>
          <p className="mt-3 text-sm text-ink-muted">Pilihan kurasi rasa paling autentik untuk Anda</p>
        </Reveal>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {menus.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.06}>
              <div className="card flex h-full flex-col items-center p-6 text-center">
                <div className="relative h-24 w-24 overflow-hidden rounded-full shadow-soft">
                  <Image src={img(`menu-${m.name}`, 200, 200)} alt={m.name} fill className="object-cover" />
                </div>
                <h3 className="mt-5 font-bold text-ink">{m.name}</h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-muted">{m.desc}</p>
                <p className="mt-4 font-bold text-brand-700">{m.price}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section container-wide">
        <Reveal>
          <div className="rounded-4xl bg-brand-gradient px-6 py-16 text-center text-white shadow-soft">
            <h2 className="text-3xl font-bold sm:text-4xl">Siap Menjelajah Rasa?</h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-white/80">
              Jadikan perjalanan Anda lebih berkesan dengan reservasi paket kuliner eksklusif di desa kami.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/kontak" className="btn bg-white text-brand-700 hover:bg-brand-50">Pesan Meja Sekarang</Link>
              <Link href="/kontak" className="btn border border-white/40 text-white hover:bg-white/10">Lihat Peta Kuliner</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
