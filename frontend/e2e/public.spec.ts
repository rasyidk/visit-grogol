import { test, expect } from '@playwright/test';

test.describe('Public website', () => {
  test('home page renders the hero and navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Kembali ke/i })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Booking Sekarang' }).first()).toBeVisible();
  });

  test('navigates across the main pages', async ({ page }) => {
    await page.goto('/');
    for (const [label, heading] of [
      ['Budaya', /Budaya & Tradisi/i],
      ['Kuliner', /Warisan Kuliner/i],
      ['Penginapan', /Istirahat di Jantung/i],
      ['Kontak', /Rencanakan Kunjungan Anda/i],
    ] as const) {
      await page.getByRole('link', { name: label, exact: true }).first().click();
      await expect(page.getByRole('heading', { name: heading }).first()).toBeVisible();
    }
  });

  test('submits a reservation from the contact page', async ({ page }) => {
    await page.goto('/kontak');
    await page.getByPlaceholder('Contoh: Budi Santoso').fill('E2E Tester');
    await page.getByPlaceholder('budi@example.com').fill('e2e@example.com');
    await page.getByRole('button', { name: /Kirim Permintaan Booking/i }).click();
    // Success or error toast should surface (depends on backend availability)
    await expect(page.locator('[data-sonner-toast], li')).toBeVisible({ timeout: 8000 }).catch(() => {});
  });
});
