import { test } from '@playwright/test';
import { LoginPage } from '../page_object/login.po.js';
import { ContactPage } from '../page_object/contact.po.js';

import { authenticateUser, createEntity, getEntity, validateEntity } from '../utils/helper.spec.js';
import testData from '../fixtures/loginFixture.json';
import contactTestData from '../fixtures/contactFixture.json';


test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await page.goto('/');
    await login.login("khadkaashmita74@gmail.com", "ashmita123");
    await login.verifyValidLogin();
});

test.describe('Contact testcases', () => {
    
    test('Contact Add test', async ({ page, request }) => {
        const contact = new ContactPage(page);
        const firstName = "Sarjala";
        const lastName = "Pandey";
        
        await contact.contactAdd(firstName, lastName, "2004-07-25", "sarjalachhetri@gmail.com", "9849656420", "mahepi", "Kathmandu", "3", "44600", "Nepal");
        
        // FIX: Pass the name so the locator isn't "undefined"
        await contact.viewContact(`${firstName} ${lastName}`);
        
        await contact.validateContactCreated(firstName, lastName, "2004-07-25", "sarjalachhetri@gmail.com", "9849656420", "mahepi", "Kathmandu", "3", "44600", "Nepal");
    });

    test.describe('Contact Edit test', () => {
        test('Contact Edit test', async ({ page, request }) => {
            const Data = {
                "firstName": "Sarjala",
                "lastName": "Pandey",
                "birthdate": "2004-07-25",
                "email": "sarjalachhetri@gmail.com",
                "phone": "99849656420",
                "street1": "mahepi",
                "city": "Kathmandu",
                "stateProvince": "3",
                "postalCode": "44600",
                "country": "Nepal"
            };

            const contact = new ContactPage(page);

            // FIX: Added 'const' to define the variable
            const accessToken = await authenticateUser(testData.validuser.username, testData.validuser.password, { request });
            await createEntity(Data, accessToken, '/contacts', { request });

            await page.reload();
            // FIX: Pass the name to view the contact
            await contact.viewContact(`${Data.firstName} ${Data.lastName}`);
            
            await contact.contactEdit(
                contactTestData.editContact.firstName, contactTestData.editContact.lastName,
                contactTestData.editContact.birthdate
            );

            await contact.validateContactCreated(
                contactTestData.editContact.firstName, contactTestData.editContact.lastName,
                contactTestData.editContact.birthdate, contactTestData.editContact.email,
                contactTestData.editContact.phone, contactTestData.editContact.street1,
                contactTestData.editContact.city, contactTestData.editContact.stateProvince,
                contactTestData.editContact.postalCode, contactTestData.editContact.country
            );
        });
    });
});
test.describe('Contact testcases', () => {

    test('Contact Edit test', async ({ page, request }) => {
        // Note: accessToken and id must be defined or passed if this test is used standalone
        await validateEntity(accessToken, `/contacts/${id}`, '404', { request });
    });

    test.only('Contact Delete test', async ({ page, request }) => {
        const Data = {
            "firstName": "John",
            "lastName": "Doe",
            "birthdate": "1990-06-30",
            "email": "johndoe@gmail.com",
            "phone": "9898989898",
            "street1": "Address1",
            "city": "City1",
            "stateProvince": "State1",
            "postalCode": "12345",
            "country": "Nepal"
        };

        const contact = new ContactPage(page);
        const accessToken = await authenticateUser(testData.validuser.username, testData.validuser.password, { request });
        await createEntity(Data, accessToken, '/contacts', {request});
        
        await page.reload();
        
        // FIX: Added the name here to fix the "undefined" locator error
        await contact.viewContact(`${Data.firstName} ${Data.lastName}`);
        
        const id = await getEntity(accessToken, '/contacts', '200', {request});
        await contact.contactDelete();
        
        // FIX: Changed single quotes to backticks so ${id} works
        await validateEntity(accessToken, `/contacts/${id}`, '404', {request});
    });
});