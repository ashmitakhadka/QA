import { test } from '@playwright/test';
import { LoginPage } from '../page_object/login.po';

const testData = require('../fixtures/loginFixture.json');

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

// Separate block for Valid Login
test.describe('Valid Login Tests', () => {
    test('Login using valid username and password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login(testData.validuser.username,testData.validuser.password);
        await login.verifyValidLogin();
    });
});

// Separate block for Invalid Login
test.describe('Invalid Login Scenarios', () => {
    
    test('Login with valid email and invalid password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login(testData.validuser.username,testData.invaliduser.password);
        await login.verifyInvalidLogin(); 
    });

    test('Login with invalid email and password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login(testData.invaliduser.username,testData.validuser.password);
        await login.verifyInvalidLogin();
    });

    test('Login with invalid email and valid password', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login(testData.invaliduser.username,testData.validuser.password);
        // FIXED TYPO: Changed verifyInv to verifyInvalidLogin
        await login.verifyInvalidLogin();
    });

    test('Login with empty credentials', async ({ page }) => {
        const login = new LoginPage(page);
        await login.login("", ""); 
        await login.verifyInvalidLogin(); 
    });


    test.afterEach(async ({page}) => {
      await page.close();
    })
});