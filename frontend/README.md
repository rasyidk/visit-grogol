# VisitGrogol — Frontend (Next.js)

Next.js 14 (App Router) + TypeScript + Tailwind CSS. Website publik _pixel-perfect_ + dashboard admin.

## Struktur

```
frontend/src/
├── app/
│   ├── (public)/            # layout publik (Navbar/Footer) + 6 halaman
│   │   ├── page.tsx         # Beranda / Atraksi
│   │   ├── budaya, kuliner, penginapan, kontak, profil/
│   └── admin/
│       ├── login/           # halaman login
│       └── (dashboard)/     # layout terproteksi + dashboard + 13 halaman CRUD
├── components/
│   ├── ui/                  # Button, Reveal, Misc (Badge, Rating, Spinner…)
│   ├── layout/              # Navbar, Footer
│   ├── public/              # Newsletter, AccommodationCard, facilityIcon
│   └── admin/               # ResourceManager, ResourceForm, Modal, ConfirmDialog, MediaUpload, Sidebar, Topbar
├── hooks/                   # usePublicData, useResource, useAuth
├── lib/                     # api (axios), types, utils, adminResources, singletonConfigs
└── providers/               # QueryProvider (TanStack Query + Toaster)
```

### Admin CRUD generik

Seluruh 13 layar admin digerakkan oleh **satu** `ResourceManager` + `ResourceForm`
yang dikonfigurasi lewat objek di `lib/adminResources.ts` (kolom tabel, field form,
filter, sort). Menambah resource baru = menambah satu config + satu file page tipis.

## Menjalankan

```bash
cp .env.example .env.local     # NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
npm install
npm run dev                    # http://localhost:3000
```

Build produksi: `npm run build && npm start`.

## Desain

Token desain (warna forest-green, tipografi Poppins/Inter, radius, shadow, utilitas
glassmorphism `.glass` / `.glass-strong` / `.glass-dark`) didefinisikan di
`tailwind.config.ts` dan `app/globals.css`. Animasi via Framer Motion (`Reveal`).

Halaman publik tetap tampil walau API belum berjalan berkat _fallback content_
di `hooks/usePublicData.ts`.

## Testing

```bash
npm test                # Jest + React Testing Library (komponen, form, interaksi)
npm run test:e2e        # Playwright (butuh backend berjalan & ter-seed)
```

E2E menguji: login admin, CRUD Destinasi/Berita/Event, upload gambar, pencarian, logout,
serta navigasi & form reservasi pada situs publik.
