import { test, expect } from '@playwright/test';

test.describe('Level 3: Full Application Flow', () => {

  test('Journey from home to menu detail', async ({ page }) => {

    // Go to homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Restaurant Order Management/i);

    await page.waitForLoadState('networkidle');


    // Navigate to menu page
    const menuLink = page.locator('a[href*="menu"], button:has-text("menu")').first();
    if (await menuLink.count() > 0) {
      await menuLink.click();
    } else {
      await page.goto('/menu');
    }


    // Wait for menu page
    await page.waitForSelector('text=Our Menu', { timeout: 10000 });


    // Check if menu items grid is visible
    await expect(page.locator('.grid')).toBeVisible();


    // Click on the first menu item
    const firstMenuItem = page.locator('a[href^="/menu/"]').first();
    await expect(firstMenuItem).toBeVisible();
    await firstMenuItem.click();


    // Verify we're on the menu detail page
    await page.waitForURL(/\/menu\/\d+/);


    // Confirm page content loaded
    await expect(page.locator('body')).toBeVisible();
  });
});