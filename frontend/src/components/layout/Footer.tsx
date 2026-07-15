import Link from 'next/link';
import { Globe, Share2, AtSign, Instagram, Facebook, Youtube } from 'lucide-react';

const columns = [
  {
    title: 'Navigasi',
    links: [
      { label: 'Beranda', href: '/' },
      { label: 'Atraksi', href: '/atraksi' },
      { label: 'Budaya', href: '/budaya' },
      { label: 'Kuliner', href: '/kuliner' },
      { label: 'Penginapan', href: '/penginapan' },
    ],
  },
  {
    title: 'Bantuan',
    links: [
      { label: 'Kontak', href: '/kontak' },
      { label: 'Peta Situs', href: '/' },
      { label: 'Kebijakan Privasi', href: '#' },
      { label: 'Syarat & Ketentuan', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-black/5 bg-cream">
      <div className="container-wide grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:pr-8">
          <h3 className="text-2xl font-extrabold text-brand-700">DesaWisata</h3>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
            Mewujudkan ekosistem pariwisata digital yang berkelanjutan, menjaga warisan budaya, dan
            memberdayakan komunitas lokal.
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-ink-muted transition-colors hover:text-brand-700">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-ink">Ikuti Kami</h4>
          <div className="flex gap-3">
            {[Instagram, Facebook, Youtube, AtSign].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-soft shadow-card transition hover:bg-brand-600 hover:text-white"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/5">
        <div className="container-wide flex flex-col items-center justify-between gap-4 py-6 text-sm text-ink-muted sm:flex-row">
          <p>© 2024 Desa Wisata Digital. Crafted with luxury in mind.</p>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            <span>Bahasa Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
