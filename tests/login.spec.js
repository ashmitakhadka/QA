import { test, expect } from '@playwright/test';

test('valid login test', async ({ page }) => {        
  await page.goto('https://www.pinterest.com/');   


  await page.locator("//input[@type='email']").fill("your_email@example.com");

  
  await page.locator("//input[@type='password']").fill("your_password");

  
  await page.locator("button[type='submit']").click();
});

test('valid email & invalid password ', async ({ page }) => {
  await page.goto('https://www.pinterest.com/')


  await page.locator("//input[@type='email']").fill("your_email@example.com");

  await page.locator("//input[@type='password']").fill("wrong_password");

  await page.locator("button[type='submit']").click();

const error = page.locator('//span[@id="password-error"]');

});