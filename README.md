# 🌿 VisitGrogol — Website Pariwisata Desa

Website pariwisata **desa wisata premium** dengan tema _forest-green luxury_ dan efek **glassmorphism**, lengkap dengan **dashboard admin** dan **REST API**.

Dibangun sesuai desain (6 halaman publik: Atraksi/Beranda, Budaya, Kuliner, Penginapan, Kontak, Profil) dengan implementasi _pixel-perfect_, responsif (desktop/tablet/mobile), dan pengambilan data sepenuhnya melalui REST API.

---

## 🧱 Arsitektur & Tech Stack

```
website-pariwisata/
├── backend/            # REST API — Express.js + TypeScript + Prisma + MySQL
├── frontend/           # Next.js (App Router) + TypeScript + Tailwind
├── docker-compose.yml  # MySQL + Adminer (opsional, untuk DB lokal)
└── README.md
```

| Layer      | Teknologi                                                                       |
| ---------- | ------------------------------------------------------------------------------- |
| Frontend   | Next.js 14 (App Router), TypeScript, Tailwind CSS, TanStack Query, Axios, React Hook Form, Zod, Framer Motion, Lucide, Sonner |
| Backend    | Express.js, TypeScript, Prisma ORM, JWT, Multer, Zod, Helmet, bcrypt            |
| Database   | MySQL 8                                                                          |
| Testing    | Jest, Supertest (backend) · Jest + React Testing Library (frontend) · Playwright (E2E) |

**Prinsip kode:** modular (routes/controllers/services/middleware/models), generik & DRY (CRUD engine tunggal), Clean Code, SOLID, validasi input, sanitasi, proteksi endpoint JWT.

---

## ✅ Prasyarat

- **Node.js ≥ 18** (direkomendasikan 20/22)
- **MySQL 8** — bisa pakai instalasi lokal **atau** Docker (`docker compose up -d`)
- npm

---

## 🚀 Menjalankan Proyek

### 1) Siapkan Database

**Opsi A — Docker (paling mudah):**

```bash
docker compose up -d          # MySQL di :3306, Adminer di :8080
```

**Opsi B — MySQL lokal:** buat database `visitgrogol` dan sesuaikan `DATABASE_URL`.

### 2) Backend

```bash
cd backend
cp .env.example .env          # sesuaikan DATABASE_URL & JWT_SECRET
npm install
npm run prisma:generate
npm run prisma:migrate        # buat skema tabel
npm run db:seed               # isi data contoh + akun admin
npm run dev                   # API → http://localhost:4000/api/v1
```

### 3) Frontend

```bash
cd frontend
cp .env.example .env.local    # NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
npm install
npm run dev                   # Web → http://localhost:3000
```

### 🔑 Akun Admin (dari seed)

| Role       | Email                     | Password       |
| ---------- | ------------------------- | -------------- |
| Superadmin | `admin@visitgrogol.id`    | `Admin@12345`  |
| Admin      | `editor@visitgrogol.id`   | `Editor@12345` |

Dashboard admin: **http://localhost:3000/admin**

---

## 🧪 Testing

### Backend (Jest + Supertest) — tanpa perlu DB (Prisma di-mock)

```bash
cd backend
npm test                # menjalankan seluruh unit & integration test
npm run test:coverage   # + laporan coverage (≥ 80% statements/lines/functions)
```

### Frontend (Jest + React Testing Library)

```bash
cd frontend
npm test
```

### End-to-End (Playwright)

> Prasyarat: backend berjalan & ter-seed, lalu:

```bash
cd frontend
npx playwright install    # sekali saja (unduh browser)
npm run test:e2e          # skenario: login, CRUD Destinasi/Berita/Event, upload, search, logout
```

---

## 🗂️ Dokumentasi Tambahan

- **API Reference & struktur backend** → [`backend/README.md`](backend/README.md)
- **Struktur & desain frontend** → [`frontend/README.md`](frontend/README.md)

---

## ✨ Fitur Dashboard Admin

Login/Logout JWT · Statistik · CRUD **Destinasi, Kategori, Banner, Berita, Event, Galeri Foto, Galeri Video, Testimoni, Profil Website, Kontak, Pengguna Admin** · manajemen **Reservasi** & **Newsletter** · upload + preview media · search, filter, sorting, pagination · konfirmasi hapus · toast notification pada tiap aksi CRUD.

---

## 🔒 Keamanan

Autentikasi JWT (Bearer/cookie), otorisasi berbasis role (ADMIN/SUPERADMIN), hashing bcrypt, validasi Zod di setiap endpoint, Helmet, CORS whitelist, rate limiting pada endpoint auth, dan whitelist field untuk filter/sort (mencegah injeksi field).
