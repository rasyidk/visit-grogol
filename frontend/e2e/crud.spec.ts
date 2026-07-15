import { test, expect } from '@playwright/test';
import path from 'path';
import { login, unique } from './helpers';

test.beforeEach(async ({ page }) => {
  await login(page);
});

test('CRUD Destinasi — create, search, and delete', async ({ page }) => {
  const title = unique('E2E Destinasi');
  await page.goto('/admin/destinasi');
  await page.getByRole('button', { name: /Tambah Destinasi/i }).click();

  await page.getByLabel('Judul', { exact: false }).fill(title);
  await page.getByLabel('Kategori').selectOption({ index: 1 });
  await page.getByLabel('Lokasi').fill('Desa Grogol');
  await page.getByLabel('Deskripsi').fill('Deskripsi destinasi uji end-to-end yang cukup panjang.');
  await page.getByPlaceholder('https://…').first().fill('https://picsum.photos/seed/e2e/800/600');
  await page.getByRole('button', { name: 'Simpan' }).click();

  // Row appears after creation
  await expect(page.getByText(title)).toBeVisible();

  // Search finds it
  await page.getByPlaceholder(/Cari destinasi/i).fill(title);
  await expect(page.getByText(title)).toBeVisible();

  // Delete it
  await page.getByRole('row', { name: new RegExp(title) }).getByLabel('Hapus').click();
  await page.getByRole('button', { name: /Ya, Hapus/i }).click();
  await expect(page.getByText(title)).toHaveCount(0);
});

test('CRUD Berita — create and delete', async ({ page }) => {
  const title = unique('E2E Berita');
  await page.goto('/admin/berita');
  await page.getByRole('button', { name: /Tambah Berita/i }).click();

  await page.getByLabel('Judul', { exact: false }).fill(title);
  await page.getByLabel('Konten').fill('Isi berita end-to-end yang cukup panjang untuk lolos validasi.');
  await page.getByPlaceholder('https://…').first().fill('https://picsum.photos/seed/e2e-berita/800/600');
  await page.getByRole('button', { name: 'Simpan' }).click();

  await expect(page.getByText(title)).toBeVisible();
  await page.getByRole('row', { name: new RegExp(title) }).getByLabel('Hapus').click();
  await page.getByRole('button', { name: /Ya, Hapus/i }).click();
  await expect(page.getByText(title)).toHaveCount(0);
});

test('CRUD Event — create and delete', async ({ page }) => {
  const title = unique('E2E Event');
  await page.goto('/admin/event');
  await page.getByRole('button', { name: /Tambah Event/i }).click();

  await page.getByLabel('Judul', { exact: false }).fill(title);
  await page.getByLabel('Tanggal Mulai').fill('2024-12-01');
  await page.getByLabel('Deskripsi').fill('Deskripsi event end-to-end yang cukup panjang.');
  await page.getByPlaceholder('https://…').first().fill('https://picsum.photos/seed/e2e-event/800/600');
  await page.getByRole('button', { name: 'Simpan' }).click();

  await expect(page.getByText(title)).toBeVisible();
  await page.getByRole('row', { name: new RegExp(title) }).getByLabel('Hapus').click();
  await page.getByRole('button', { name: /Ya, Hapus/i }).click();
  await expect(page.getByText(title)).toHaveCount(0);
});

test('Upload gambar — file upload shows a preview and fills the URL', async ({ page }) => {
  await page.goto('/admin/galeri-foto');
  await page.getByRole('button', { name: /Tambah Foto/i }).click();

  const fileInput = page.locator('input[type="file"]').first();
  await fileInput.setInputFiles(path.join(__dirname, 'fixtures', 'sample.png'));

  // After a successful upload the manual URL field should hold an http(s) URL
  await expect(page.getByPlaceholder('https://…').first()).toHaveValue(/^https?:\/\//, { timeout: 15_000 });
});
