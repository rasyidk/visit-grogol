# VisitGrogol — Backend REST API

Express.js + TypeScript + Prisma (MySQL). Modular, JWT-secured, fully validated.

## Struktur

```
backend/
├── prisma/
│   ├── schema.prisma        # 15 model + relasi, index, fulltext, timestamps
│   └── seed.ts              # data contoh
├── src/
│   ├── config/              # env, prisma client
│   ├── core/                # generic CRUD engine (service/controller/router) + singleton router
│   ├── middleware/          # auth, error, upload (multer), validate (zod)
│   ├── modules/             # per-resource: auth, destinasi, kategori, banner, ...
│   ├── routes/              # aggregator
│   ├── utils/               # jwt, password, ApiError, apiResponse, slug, queryFeatures
│   ├── app.ts               # express app (helmet, cors, compression, rate-limit)
│   └── server.ts            # bootstrap
└── tests/                   # jest + supertest (unit & integration, prisma mocked)
```

Setiap resource CRUD dibangun dari **satu engine generik** (`core/crudService`, `core/crudController`,
`core/crudRouter`) yang dikonfigurasi per-modul — DRY, konsisten, dan mudah diuji.

## Menjalankan

```bash
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
npm run dev            # http://localhost:4000/api/v1
```

Script lain: `npm run build`, `npm start`, `npm run prisma:studio`, `npm run db:reset`, `npm test`, `npm run test:coverage`.

## Autentikasi

JWT dikirim via header `Authorization: Bearer <token>` **atau** cookie `access_token`.
Endpoint tulis (POST/PUT/PATCH/DELETE) memerlukan role `ADMIN`/`SUPERADMIN`;
manajemen `admin-users` khusus `SUPERADMIN`.

## Format Response

```jsonc
// sukses
{ "success": true, "message": "…", "data": … , "meta": { "page":1, "limit":10, "total":42, "totalPages":5, "hasNext":true, "hasPrev":false } }
// error
{ "success": false, "message": "…", "errors": { "field": ["pesan"] } }
```

## Query untuk endpoint list

`?page=1&limit=10&search=kata&sortBy=createdAt&sortOrder=desc` + filter spesifik
(mis. `?isPublished=true&kategoriId=2`). Field search/sort/filter di-whitelist per resource.

## Ringkasan Endpoint (`/api/v1`)

| Method | Path | Akses | Keterangan |
| ------ | ---- | ----- | ---------- |
| POST | `/auth/login` | publik | login, mengembalikan token + user |
| POST | `/auth/logout` | publik | hapus cookie |
| GET | `/auth/me` | auth | user saat ini |
| POST | `/auth/change-password` | auth | ubah password |
| GET | `/stats` | auth | statistik dashboard |
| POST | `/upload` · `/upload/multiple` | admin | upload gambar/video (field `file`/`files`) |
| GET/POST/PUT/PATCH/DELETE | `/destinasi` | GET publik · tulis admin | + `GET /destinasi/slug/:slug` |
| … | `/kategori`, `/banner`, `/berita`, `/event`, `/galeri-foto`, `/galeri-video`, `/testimoni` | idem | CRUD standar (berita/event/kategori punya `/slug/:slug`) |
| GET/PUT | `/profil`, `/kontak` | GET publik · PUT admin | resource tunggal (singleton) |
| GET/POST/PUT/DELETE | `/admin-users` | SUPERADMIN | password otomatis di-hash, tak pernah dikembalikan |
| POST | `/reservasi` | publik | submit form reservasi |
| GET/PATCH/DELETE | `/reservasi`, `/reservasi/:id/status` | admin | kelola reservasi |
| POST | `/newsletter` | publik | subscribe (idempotent) |
| GET/DELETE | `/newsletter` | admin | kelola subscriber |
| GET | `/health` | publik | health check |

### Contoh

```bash
# login
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@visitgrogol.id","password":"Admin@12345"}'

# list destinasi (publik)
curl 'http://localhost:4000/api/v1/destinasi?limit=6&isFeatured=true'

# create destinasi (perlu token)
curl -X POST http://localhost:4000/api/v1/destinasi \
  -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
  -d '{"title":"Danau Cermin","description":"…","location":"Desa Grogol","thumbnail":"https://…","kategoriId":1}'
```

## Testing

Test menggunakan **mock Prisma** (`jest-mock-extended`) sehingga berjalan tanpa MySQL:

```bash
npm run test:coverage
```

Mencakup unit test (util & service) dan integration test (endpoint: sukses, validasi 422,
auth 401, forbidden 403, not-found 404, konflik 409). Coverage ≥ 80% (statements/lines/functions).
