const { expect } = require("@playwright/test");

exports.ContactPage = class ContactPage {
  constructor(page) {
    this.page = page;
    this.addContact = '#add-contact';
    this.firstName = '#firstName';
    this.lastName = '#lastName';
    this.dob = '#birthdate';
    this.email = '#email';
    this.phone = '#phone';
    this.address = '#street1';
    this.city = '#city';
    this.state = '#stateProvince';
    this.postal = '#postalCode';
    this.country = '#country';
    this.save = '#submit';
    this.savedFirstName = '#firstName';
    this.savedLastName = '#lastName';
    this.savedDOB = '#birthdate';
    this.savedEmail = '#email';
    this.savedPhone = '#phone';
    this.savedAddress = '#street1';
    this.savedCity = '#city';
    this.savedState = '#stateProvince';
    this.savedPostal = '#postalCode';
    this.savedCountry = '#country';
    
    this.contactRow = (name) => `//tr[contains(., "${name}")]`;
    
    this.editContact = '#edit-contact';
    this.deleteContact = '#delete';
  }

  async contactAdd(firstName, lastName, dateOfBirth, email, phone, address, city, state, postal, country) {
    await this.page.locator(this.addContact).click();
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.dob).fill(dateOfBirth);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phone).fill(phone);
    await this.page.locator(this.address).fill(address);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.state).fill(state);
    await this.page.locator(this.postal).fill(postal);
    await this.page.locator(this.country).fill(country);
    
    await this.page.locator(this.save).click();
    await this.page.waitForLoadState('networkidle');
  }

  // In page_object/contact.po.js

async validateContactCreated(fName, lName, dob, email, phone, address, city, state, postal, country) {
    // Ensure the page has fully transitioned by waiting for the first element
    const firstNameLocator = this.page.locator(this.savedFirstName);
    await firstNameLocator.waitFor({ state: 'visible' });

    // Use toHaveText as the log confirmed these are spans
    await expect(firstNameLocator).toHaveText(fName);
    await expect(this.page.locator(this.savedLastName)).toHaveText(lName);
    await expect(this.page.locator(this.savedDOB)).toHaveText(dob);
    await expect(this.page.locator(this.savedEmail)).toHaveText(email);
    await expect(this.page.locator(this.savedPhone)).toHaveText(phone);
    await expect(this.page.locator(this.savedAddress)).toHaveText(address);
    await expect(this.page.locator(this.savedCity)).toHaveText(city);
    await expect(this.page.locator(this.savedState)).toHaveText(state);
    await expect(this.page.locator(this.savedPostal)).toHaveText(postal);
    await expect(this.page.locator(this.savedCountry)).toHaveText(country);
}

 async viewContact(name) {
    if (!name) {
      throw new Error("viewContact: 'name' argument is missing. Check your test file call.");
    }

    const row = this.page.locator(this.contactRow(name)).first();
    
    // Wait for the specific row to be visible
    await row.waitFor({ state: 'visible', timeout: 10000 });
    await row.click();
  }

  // In page_object/contact.po.js

async contactEdit(firstName, lastName, dob, email, phone, address, city, state, postal, country) {
    await this.page.locator(this.editContact).click();
    
    // Fill all fields to ensure the form matches your fixture expectations
    await this.page.locator(this.firstName).fill(firstName);
    await this.page.locator(this.lastName).fill(lastName);
    await this.page.locator(this.dob).fill(dob);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phone).fill(phone);
    await this.page.locator(this.address).fill(address);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.state).fill(state);
    await this.page.locator(this.postal).fill(postal);
    await this.page.locator(this.country).fill(country);
    
    await this.page.locator(this.save).click();
    
    // Wait for the Details page to load by waiting for the Edit button to reappear
    await this.page.locator(this.editContact).waitFor({ state: 'visible' });
}

  async contactDelete() {
    // Standard Playwright practice: Set up the dialog listener BEFORE the action that triggers it
    this.page.once('dialog', async dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      await dialog.accept();
    });

    const deleteBtn = this.page.locator(this.deleteContact);
    await deleteBtn.waitFor({ state: 'visible' });
    await deleteBtn.click();
    
    // Wait for the page to navigate back to the list after deletion
    await this.page.waitForLoadState('networkidle');
  }
}