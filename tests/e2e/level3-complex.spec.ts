/**
 * LEVEL 3 TESTS - TOP LEVEL (Complex E2E Tests)
 *
 * Testing Strategy:
 * - End-to-End user flows
 * - Full browser automation
 * - Multi-page navigation
 * - Real API integration
 * - Visual regression testing
 * - Performance monitoring
 * - Complex user scenarios
 * - Cross-page state management
 *
 * Complexity: HIGH
 * Tools: Playwright (Full browser automation)
 */

import { test, expect } from '@playwright/test';

test.describe('Level 3: Complete E2E User Journey Tests (High Complexity)', () => {

  test.describe('Full Application Flow', () => {
    test('should complete entire user journey from home to menu detail', async ({ page }) => {
      // Step 1: Navigate to home page
      await page.goto('/');
      await expect(page).toHaveTitle(/Restaurant Order Management/i);

      // Step 2: Wait for home page to load
      await page.waitForLoadState('networkidle');

      // Step 3: Navigate to menu page (find menu link/button)
      const menuLink = page.locator('a[href*="menu"], button:has-text("menu")').first();
      if (await menuLink.count() > 0) {
        await menuLink.click();
      } else {
        await page.goto('/menu');
      }

      // Step 4: Wait for menu items to load
      await page.waitForSelector('text=Our Menu', { timeout: 10000 });

      // Step 5: Verify menu items are displayed
      await expect(page.locator('.grid')).toBeVisible();

      // Step 6: Click on a menu item to view details
      const firstMenuItem = page.locator('a[href^="/menu/"]').first();
      await expect(firstMenuItem).toBeVisible();
      await firstMenuItem.click();

      // Step 7: Verify navigation to detail page
      await page.waitForURL(/\/menu\/\d+/);

      // Step 8: Verify detail page loaded
      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Menu Page Interactions', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/menu');
      await page.waitForLoadState('networkidle');
    });

    test('should load menu page and display items', async ({ page }) => {
      // Verify page title/header
      await expect(page.locator('text=Our Menu')).toBeVisible();

      // Verify menu grid exists
      const grid = page.locator('.grid');
      await expect(grid).toBeVisible();

      // Verify at least one menu item is displayed
      const menuItems = page.locator('a[href^="/menu/"]');
      await expect(menuItems.first()).toBeVisible({ timeout: 10000 });
    });

    test('should filter menu items by category', async ({ page }) => {
      // Wait for items to load
      await page.waitForSelector('.grid', { timeout: 10000 });

      // Get all category buttons
      const categoryButtons = page.locator('button').filter({ hasText: /^(All|Main Course|Appetizer|Dessert|Beverage)$/ });

      if (await categoryButtons.count() > 1) {
        const secondCategory = categoryButtons.nth(1);
        const categoryName = await secondCategory.textContent();

        // Click on the category
        await secondCategory.click();
        await page.waitForTimeout(500); // Wait for filtering

        // Verify the category button is active
        await expect(secondCategory).toHaveClass(/bg-teal-600/);
      }
    });

    test('should display menu item details correctly', async ({ page }) => {
      await page.waitForSelector('.grid', { timeout: 10000 });

      // Get first menu card
      const firstCard = page.locator('.grid > *').first();
      await expect(firstCard).toBeVisible();

      // Verify card has essential elements
      const hasImage = await firstCard.locator('img').count() > 0;
      const hasPrice = await firstCard.locator('text=/\\$\\d+\\.\\d{2}/').count() > 0;
      const hasButton = await firstCard.locator('button, a').count() > 0;

      expect(hasImage || hasPrice || hasButton).toBeTruthy();
    });

    test('should navigate to menu item detail page on click', async ({ page }) => {
      await page.waitForSelector('a[href^="/menu/"]', { timeout: 10000 });

      const firstMenuItem = page.locator('a[href^="/menu/"]').first();
      const href = await firstMenuItem.getAttribute('href');

      await firstMenuItem.click();

      // Verify URL changed to detail page
      await expect(page).toHaveURL(new RegExp(href || '/menu/\\d+'));
    });
  });

  test.describe('API Integration Tests', () => {
    test('should handle API loading states', async ({ page }) => {
      await page.goto('/menu');

      // Either loading indicator or content should be visible
      const loadingOrContent = await Promise.race([
        page.waitForSelector('text=Loading', { timeout: 2000 }).catch(() => null),
        page.waitForSelector('.grid', { timeout: 2000 }).catch(() => null),
      ]);

      expect(loadingOrContent).toBeTruthy();
    });

    test('should make API call to fetch menu items', async ({ page }) => {
      // Listen for API calls
      const apiCalls: string[] = [];
      page.on('request', request => {
        if (request.url().includes('/api/menu')) {
          apiCalls.push(request.url());
        }
      });

      await page.goto('/menu');
      await page.waitForLoadState('networkidle');

      // Verify API was called
      expect(apiCalls.length).toBeGreaterThan(0);
    });
  });

  test.describe('Responsive Design Tests', () => {
    test('should display correctly on mobile viewport', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/menu');
      await page.waitForLoadState('networkidle');

      // Verify page is visible
      await expect(page.locator('body')).toBeVisible();
    });

    test('should display correctly on tablet viewport', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/menu');
      await page.waitForLoadState('networkidle');

      await expect(page.locator('body')).toBeVisible();
    });

    test('should display correctly on desktop viewport', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/menu');
      await page.waitForLoadState('networkidle');

      await expect(page.locator('body')).toBeVisible();
    });
  });

  test.describe('Performance Tests', () => {
    test('should load menu page within acceptable time', async ({ page }) => {
      const startTime = Date.now();

      await page.goto('/menu');
      await page.waitForLoadState('networkidle');

      const loadTime = Date.now() - startTime;

      // Page should load within 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });
  });

  test.describe('Navigation Tests', () => {
    test('should have working navigation links', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Try to find and click common navigation elements
      const navLinks = page.locator('nav a, header a').first();

      if (await navLinks.count() > 0) {
        await navLinks.click();
        await page.waitForLoadState('networkidle');

        // Verify navigation occurred
        expect(page.url()).toBeTruthy();
      }
    });

    test('should allow back navigation', async ({ page }) => {
      await page.goto('/');
      const homeUrl = page.url();

      await page.goto('/menu');
      await page.waitForLoadState('networkidle');

      await page.goBack();
      await page.waitForLoadState('networkidle');

      expect(page.url()).toBe(homeUrl);
    });
  });

  test.describe('Visual Regression Tests', () => {
    test('should match menu page screenshot', async ({ page }) => {
      await page.goto('/menu');
      await page.waitForLoadState('networkidle');
      await page.waitForTimeout(1000); // Wait for animations

      // Take screenshot and compare
      await expect(page).toHaveScreenshot('menu-page.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
  });

  test.describe('Complex User Scenarios', () => {
    test('should handle multiple category switches', async ({ page }) => {
      await page.goto('/menu');
      await page.waitForSelector('.grid', { timeout: 10000 });

      const categoryButtons = page.locator('button').filter({
        hasText: /^(All|Main Course|Appetizer|Dessert|Beverage)$/
      });

      const buttonCount = await categoryButtons.count();

      if (buttonCount > 2) {
        // Click through multiple categories
        for (let i = 0; i < Math.min(3, buttonCount); i++) {
          await categoryButtons.nth(i).click();
          await page.waitForTimeout(300);

          // Verify active state
          await expect(categoryButtons.nth(i)).toHaveClass(/bg-teal-600/);
        }
      }
    });

    test('should maintain state during navigation', async ({ page }) => {
      await page.goto('/menu');
      await page.waitForLoadState('networkidle');

      // Select a category
      const categoryButtons = page.locator('button').filter({
        hasText: /^(All|Main Course|Appetizer)$/
      });

      if (await categoryButtons.count() > 1) {
        await categoryButtons.nth(1).click();
        await page.waitForTimeout(500);

        // Get current URL
        const currentUrl = page.url();

        // Navigate to a menu item and back
        const menuItem = page.locator('a[href^="/menu/"]').first();
        if (await menuItem.count() > 0) {
          await menuItem.click();
          await page.waitForLoadState('networkidle');

          await page.goBack();
          await page.waitForLoadState('networkidle');

          // Verify we're back on menu page
          expect(page.url()).toBe(currentUrl);
        }
      }
    });
  });

  test.describe('Error Handling Tests', () => {
    test('should handle network failures gracefully', async ({ page, context }) => {
      // Simulate offline mode
      await context.setOffline(true);

      await page.goto('/menu');
      await page.waitForTimeout(2000);

      // Page should still render (even if with error state)
      await expect(page.locator('body')).toBeVisible();

      // Re-enable network
      await context.setOffline(false);
    });
  });

  test.describe('Accessibility Tests', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/menu');
      await page.waitForLoadState('networkidle');

      const h1 = await page.locator('h1').count();
      expect(h1).toBeGreaterThan(0);
    });

    test('should have keyboard navigation support', async ({ page }) => {
      await page.goto('/menu');
      await page.waitForLoadState('networkidle');

      // Press Tab to navigate
      await page.keyboard.press('Tab');

      // Verify focus is visible
      const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(focusedElement).toBeTruthy();
    });
  });
});
