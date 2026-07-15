import { Page, expect } from '@playwright/test';

export const ADMIN_EMAIL = process.env.E2E_ADMIN_EMAIL || 'admin@visitgrogol.id';
export const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD || 'Admin@12345';

/** Log in through the admin login form and land on the dashboard. */
export async function login(page: Page) {
  await page.goto('/admin/login');
  await page.getByPlaceholder('admin@visitgrogol.id').fill(ADMIN_EMAIL);
  await page.getByPlaceholder('••••••••').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Masuk' }).click();
  await expect(page).toHaveURL(/\/admin$/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
}

/** Unique suffix so repeated runs don't collide on unique slugs. */
export function unique(prefix: string) {
  return `${prefix} ${Date.now().toString().slice(-6)}`;
}
