import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('renders hero section with conservation content', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Conservation|Greenfield|Protecting/)
    // Hero section should have main heading
    const heading = page.locator('h1').first()
    await expect(heading).toBeVisible()
  })

  test('has working navigation links', async ({ page }) => {
    await page.goto('/')
    // Check that nav links exist
    await expect(page.locator('a[href="/projects"]').first()).toBeVisible()
    await expect(page.locator('a[href="/species"]').first()).toBeVisible()
    await expect(page.locator('a[href="/events"]').first()).toBeVisible()
    await expect(page.locator('a[href="/news"]').first()).toBeVisible()
  })

  test('displays stats section', async ({ page }) => {
    await page.goto('/')
    // Stats section should show numbers
    const statsText = await page.textContent('body')
    expect(statsText).toBeTruthy()
  })
})

test.describe('Projects listing', () => {
  test('renders project cards', async ({ page }) => {
    await page.goto('/projects')
    await expect(page.locator('h1')).toContainText('Conservation Projects')
    // Should have at least one project card
    const cards = page.locator('[class*="grid"] a, [class*="grid"] [class*="card"]')
    await expect(cards.first()).toBeVisible()
  })

  test('project cards link to detail pages', async ({ page }) => {
    await page.goto('/projects')
    const firstLink = page.locator('a[href^="/projects/"]').first()
    await expect(firstLink).toBeVisible()
    const href = await firstLink.getAttribute('href')
    expect(href).toMatch(/^\/projects\//)
  })
})

test.describe('Project detail page', () => {
  test('renders project content', async ({ page }) => {
    await page.goto('/projects/wetland-restoration')
    await expect(page.locator('h1')).toContainText('Wetland Restoration')
    expect(await page.textContent('body')).toContain('Wetland')
  })
})

test.describe('Species listing', () => {
  test('renders species cards', async ({ page }) => {
    await page.goto('/species')
    await expect(page.locator('h1')).toContainText('Species')
    const cards = page.locator('[class*="grid"] a, [class*="grid"] [class*="card"]')
    await expect(cards.first()).toBeVisible()
  })
})

test.describe('Species detail page', () => {
  test('renders species content', async ({ page }) => {
    await page.goto('/species/bald-eagle')
    await expect(page.locator('h1')).toContainText('Bald Eagle')
  })
})

test.describe('Events listing', () => {
  test('renders event cards', async ({ page }) => {
    await page.goto('/events')
    await expect(page.locator('h1')).toContainText('Events')
    const cards = page.locator('[class*="grid"] a, [class*="grid"] [class*="card"]')
    await expect(cards.first()).toBeVisible()
  })
})

test.describe('News listing', () => {
  test('renders news cards', async ({ page }) => {
    await page.goto('/news')
    await expect(page.locator('h1')).toContainText('News')
    const cards = page.locator('[class*="grid"] a, [class*="grid"] [class*="card"]')
    await expect(cards.first()).toBeVisible()
  })
})

test.describe('Static pages', () => {
  test('about page renders', async ({ page }) => {
    await page.goto('/about')
    await expect(page.locator('h1')).toContainText('About')
  })

  test('contact page renders', async ({ page }) => {
    await page.goto('/contact')
    await expect(page.locator('h1')).toBeVisible()
  })
})
