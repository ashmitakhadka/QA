// @ts-check
import { test, expect } from '@playwright/test'; // {test-> annotation, expect-> assertion}import from playwright

test.skip('has title', async ({ page }) => {          // {beforEach , afterAll haru ko lagi use hunxa 'has titile' ko lagi test garxa, 
  await page.goto('https://playwright.dev/');   
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);  // verify page title 'Playwright' check garyo 
});

test('get started link', async ({ page }) => {   
  await page.goto('https://playwright.dev/');   

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();  
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible(); //toBeVisible()-> assertion 
});
