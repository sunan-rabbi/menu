# Lab Report: Incremental Multi-Level Website Testing

## Student Information
- **Course**: CSE - 3206
- **Project**: Restaurant Order Management System
- **Date**: January 8, 2026

---

## 1. Introduction

### 1.1 Purpose
This lab demonstrates how to test a website step by step, starting from simple tests and moving to complex tests. This approach is called "incremental multi-level testing."

### 1.2 What is Multi-Level Testing?
Multi-level testing means testing your application in different stages:
- **Level 1**: Test individual pieces (components)
- **Level 2**: Test how data is loaded and displayed
- **Level 3**: Test the complete user experience

### 1.3 Why Use This Approach?
- Find bugs early in development
- Easy to locate problems when tests fail
- Build confidence that the app works correctly
- Save time by catching issues before they become big problems

---

## 2. Testing Levels Explained

### Level 1: Component Rendering Tests
**What it tests**: Does the component appear on the screen?

**File**: [src/components/__tests__/Home.test.tsx](src/components/__tests__/Home.test.tsx)

**Tools Used**:
- React Testing Library
- Jest testing framework

**Tests Performed**:

#### Test 1: Render Without Crashing
```typescript
it('render without crashing', () => {
  const { container } = render(<LandingPage />);
  expect(container.firstChild).toBeInTheDocument();
});
```
**What it does**: Checks if the Home page loads without errors.

**Why it matters**: If a component crashes, nothing else will work.

#### Test 2: Render Sections
```typescript
it('render sections', () => {
  const { container } = render(<LandingPage />);
  expect(container.firstChild).toHaveClass('min-h-screen');
});
```
**What it does**: Checks if the page has the correct CSS class for styling.

**Why it matters**: Ensures the page layout is set up correctly.

---

### Level 2: Data Fetching Tests
**What it tests**: Does the app load and display data correctly?

**File**: [src/app/menu/__tests__/page.test.tsx](src/app/menu/__tests__/page.test.tsx)

**Tools Used**:
- React Testing Library
- Jest with mock functions
- Async/await for waiting

**Test Performed**:

#### Test: Menu Items After Fetch
```typescript
it('menu items after fetch', async () => {
  (global.fetch as jest.Mock).mockResolvedValueOnce({
    json: async () => mockMenuItems,
  });

  render(<MenuPage />);

  await waitFor(() => {
    expect(screen.getByText('Burger')).toBeInTheDocument();
    expect(screen.getByText('Salad')).toBeInTheDocument();
  });
});
```

**What it does**:
1. Creates fake data (mockMenuItems)
2. Pretends to fetch data from a server
3. Checks if "Burger" and "Salad" appear on the screen

**Why it matters**: Most websites need to load data from servers. This tests that process.

**Key Concepts**:
- **Mocking**: Creating fake data for testing
- **waitFor**: Waiting for data to appear (because loading takes time)

---

### Level 3: Full Application Flow Tests
**What it tests**: Does the complete user journey work?

**File**: [tests/full.spec.ts](tests/full.spec.ts)

**Tools Used**:
- Playwright (End-to-End testing tool)
- Real browser simulation

**Test Performed**:

#### Test: Journey from Home to Menu Detail
```typescript
test('Journey from home to menu detail', async ({ page }) => {
  // Step 1: Go to homepage
  await page.goto('/');
  await expect(page).toHaveTitle(/Restaurant Order Management/i);

  // Step 2: Navigate to menu page
  const menuLink = page.locator('a[href*="menu"]').first();
  await menuLink.click();

  // Step 3: Wait for menu page
  await page.waitForSelector('text=Our Menu', { timeout: 10000 });

  // Step 4: Check menu items grid
  await expect(page.locator('.grid')).toBeVisible();

  // Step 5: Click first menu item
  const firstMenuItem = page.locator('a[href^="/menu/"]').first();
  await firstMenuItem.click();

  // Step 6: Verify detail page loaded
  await page.waitForURL(/\/menu\/\d+/);
});
```

**What it does**:
1. Opens the homepage
2. Clicks on the menu link
3. Waits for menu items to load
4. Clicks on a menu item
5. Checks if the detail page opens

**Why it matters**: This simulates what a real user does. If this test passes, you know the whole flow works.

---

## 3. Test Results

### Test Execution
All tests were run using the following commands:

**Unit and Component Tests (Level 1 & 2)**:
```bash
npm test
```

**End-to-End Tests (Level 3)**:
```bash
npx playwright test
```

### Expected Results

| Level | Test Name | Status | Purpose |
|-------|-----------|--------|---------|
| 1 | Render Without Crashing | ✓ Pass | Verify component loads |
| 1 | Render Sections | ✓ Pass | Verify correct styling |
| 2 | Menu Items After Fetch | ✓ Pass | Verify data loading |
| 3 | Journey from Home to Menu Detail | ✓ Pass | Verify user flow |

---

## 4. Key Testing Concepts Learned

### 4.1 Component Testing (Level 1)
- **render()**: Displays a component for testing
- **expect()**: Checks if something is true
- **toBeInTheDocument()**: Checks if element exists
- **toHaveClass()**: Checks if element has a CSS class

### 4.2 Async Testing (Level 2)
- **async/await**: Wait for things to happen
- **mockResolvedValueOnce()**: Create fake server responses
- **waitFor()**: Wait for elements to appear
- **screen.getByText()**: Find elements by text content

### 4.3 E2E Testing (Level 3)
- **page.goto()**: Navigate to a page
- **page.locator()**: Find elements on the page
- **click()**: Click on elements
- **waitForSelector()**: Wait for elements to load
- **toBeVisible()**: Check if users can see the element

---

## 5. Advantages of Multi-Level Testing

### Level 1 Advantages:
- **Fast**: Tests run in milliseconds
- **Easy to debug**: Small, focused tests
- **Catches basic errors**: Like typos or missing imports

### Level 2 Advantages:
- **Tests realistic scenarios**: With data loading
- **Still fast**: Uses mock data, no real server needed
- **Verifies logic**: Ensures data is processed correctly

### Level 3 Advantages:
- **Tests real user experience**: Uses actual browser
- **Catches integration bugs**: Problems between different parts
- **Confidence**: If this passes, the app really works

---

## 6. Testing Best Practices Used

1. **Incremental Approach**: Start simple, then add complexity
2. **Clear Test Names**: Each test says what it checks
3. **Arrange-Act-Assert Pattern**:
   - Arrange: Set up the test
   - Act: Do something
   - Assert: Check the result
4. **Mock External Dependencies**: Use fake data for predictable tests
5. **Wait for Async Operations**: Use waitFor() and page.waitFor()
6. **Test User Behavior**: Click, navigate, like real users do

---

## 7. Challenges and Solutions

### Challenge 1: Async Data Loading
**Problem**: Menu items don't appear immediately.
**Solution**: Use `waitFor()` to wait for elements to appear.

### Challenge 2: Navigation in E2E Tests
**Problem**: Links might have different structures.
**Solution**: Use flexible selectors: `a[href*="menu"]` matches any link containing "menu".

### Challenge 3: Timing Issues
**Problem**: Pages might load at different speeds.
**Solution**: Use `waitForLoadState('networkidle')` to wait for page to fully load.

---

## 8. Conclusion

In this lab, we learned how to test our website in three steps. First, we tested if components show up on the screen. Second, we tested if data loads correctly from the server. Third, we tested if users can navigate through the whole website. Testing in steps helps us find bugs early and makes sure our website works properly. This saves time and gives us confidence that our code is working right.

---

## 9. Code Coverage Summary

**Component Tests**: Cover basic rendering and structure
**Integration Tests**: Cover data fetching and display logic
**E2E Tests**: Cover complete user journeys

**Recommended Coverage Goals**:
- Unit/Component Tests: 80%+ coverage
- Integration Tests: Key user flows
- E2E Tests: Critical paths (home → menu → detail)

---

## 10. References

### Testing Tools:
- **Jest**: JavaScript testing framework
- **React Testing Library**: Testing React components
- **Playwright**: End-to-end testing for web apps

### Documentation:
- React Testing Library: https://testing-library.com/react
- Playwright: https://playwright.dev
- Jest: https://jestjs.io

---

## Appendix A: Running the Tests

### Prerequisites:
```bash
npm install
```

### Run Component & Integration Tests:
```bash
npm test
```

### Run E2E Tests:
```bash
npx playwright test
```

### Run E2E Tests with UI:
```bash
npx playwright test --ui
```

### View Test Reports:
```bash
npx playwright show-report
```

---

**End of Report**
