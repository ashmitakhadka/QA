const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameInput = '#email';
        this.passwordInput = '//input[@placeholder="Password"]';
        this.loginButton = '//button[@id="submit"]';
        this.logOut = '//button[@id="logout"]';
        this.loginValidation = '//p[contains(text(),"Click on any contact to view the Contact")]';
        this.errorMessage = 'span#error'; 
    }

    async login(username, password) {
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
    }

    // In page_object/login.po.js

async verifyValidLogin() {
    // 1. Check if the error message is visible
    const error = this.page.locator(this.errorMessage);
    
    // If the error appears, fail the test immediately with a clear message
    if (await error.isVisible()) {
        const text = await error.innerText();
        throw new Error(`Login failed with message: "${text}". Check your loginFixture.json`);
    }

    // 2. Otherwise, wait for the logout button (Dashboard)
    await expect(this.page.locator(this.logOut)).toBeVisible({ timeout: 5000 });
}

    async verifyInvalidLogin() { // Removed parameter since we are hardcoding below
        const errorElement = this.page.locator(this.errorMessage);
        // FIXED: Using errorElement instead of undefined InvalidLogin
        await expect(errorElement).toHaveText("Incorrect username or password");
    }
}