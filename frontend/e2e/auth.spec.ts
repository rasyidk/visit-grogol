import { test, expect } from '@playwright/test';
import { login, ADMIN_EMAIL, ADMIN_PASSWORD } from './helpers';

test.describe('Admin authentication', () => {
  test('rejects invalid credentials', async ({ page }) => {
    await page.goto('/admin/login');
    await page.getByPlaceholder('admin@visitgrogol.id').fill('wrong@example.com');
    await page.getByPlaceholder('••••••••').fill('wrongpassword');
    await page.getByRole('button', { name: 'Masuk' }).click();
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('validates the email format', async ({ page }) => {
    await page.goto('/admin/login');
    await page.getByPlaceholder('admin@visitgrogol.id').fill('not-an-email');
    await page.getByPlaceholder('••••••••').fill('secret123');
    await page.getByRole('button', { name: 'Masuk' }).click();
    await expect(page.getByText(/Email tidak valid/i)).toBeVisible();
  });

  test('logs in and then logs out', async ({ page }) => {
    await page.goto('/admin/login');
    await page.getByPlaceholder('admin@visitgrogol.id').fill(ADMIN_EMAIL);
    await page.getByPlaceholder('••••••••').fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Masuk' }).click();
    await expect(page).toHaveURL(/\/admin$/);

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test('redirects unauthenticated users away from the dashboard', async ({ page }) => {
    await page.goto('/admin/destinasi');
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});
