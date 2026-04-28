import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test.describe('Inventory Home Page Functionality', async () => {
    let loginPage : LoginPage;

    test.beforeEach(async ({ page }) => {
        //Create a new login page object instance
        loginPage = new LoginPage(page);
        //Navigate to the login page
        await loginPage.goto();
        //Fill the login username and password fields with valid credentials then submit the form
        await loginPage.login('standard_user', 'secret_sauce');
    });

    //#region Inventory Page Test Cases
    //Verify that the inventory page loads after sucessful login flow
    test('Inventory page loads sucessfully after login', async ({ page }) => {
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    //Verify inventory can be filtered by Name (Z to A)
    test('Filter inventory by Name (Z to A)', async ({ page }) => {

        //Select the dropdown locator and choose the filter Z to A option
        await page.locator('[data-test="product-sort-container"]').selectOption("za");

        //Get all product name elements
        /// The $= "ends with" selector is used to select elements whose attribute value ends with a specified string. 
        /// in this case, it selects all elements with a data-test attribute that ends with "-title-link", 
        /// which are likely the product name links on the inventory page.
        const productNames = page.locator('[data-test$="-title-link"]');

        //Extract the text content of each item into an array variable
        const names = await productNames.allTextContents();

        // Create a Z to A sorted copy of the names array
        const sortedNames = [...names].sort((a, b) => b.localeCompare(a));

        // Assert that the original names array is in the same order as the sortedNames array
        expect(names).toEqual(sortedNames);
    });

    //Verify inventory can be filtered by Name (A to Z)
    test('Filter inventory by name (A to Z)', async ({ page }) => {
        //Select the dropdown locator and choose a filter different than the standard (A to Z)
        await page.locator('[data-test="product-sort-container"]').selectOption("za");


        //Select the dropdown locator and choose the filter A to Z option
        await page.locator('[data-test="product-sort-container"]').selectOption("az");

        //Get all product name elements into an array variable
        const productNames = page.locator('[data-test$="-title-link"]');

        //Extract the item names as a string array, then sort the array in A to Z order and store it in a new variable
        const sortedNames = await productNames.allTextContents();

        expect(sortedNames).toEqual(sortedNames.sort((a, b) => a.localeCompare(b)));

    });

    //Verify inventory can be filtered by Price (low to high)
    test('Filter inventory by Price (low to high)', async ({ page }) => {

        //Select the dropdown locator and choose the filter Price (low to high) option
        await page.locator('[data-test="product-sort-container"]').selectOption('Price (low to high)');

        //Get all product elements and extract their price text
        const productPrices = page.locator('[data-test$="-price"]');

        //Extract the text content of each price element and convert it to a number
        const prices = await productPrices.allTextContents();
        const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));

        // Create a low to high sorted copy of the numericPrices array
        const sortedPrices = [...numericPrices].sort((a, b) => a - b);

        // Assert that the original numericPrices array is in the same order as the sortedPrices array
        expect(numericPrices).toEqual(sortedPrices);
    });

    //Verify inventory can be filtered by Price (high to low)
    test('Filter inventory by Price (high to low)', async ({ page }) => {

        //Select the dropdown locator and choose the filter Price (high to low) option
        await page.locator('[data-test="product-sort-container"]').selectOption('Price (high to low)');

        //Get all product elements and extract their price text
        const productPrices = page.locator('[data-test$="-price"]');

        //Extract the text content of each price element and convert it to a number
        const prices = await productPrices.allTextContents();
        const numericPrices = prices.map(price => parseFloat(price.replace('$', '')));

        // Create a high to low sorted copy of the numericPrices array
        const sortedPrices = [...numericPrices].sort((a, b) => b - a);

        // Assert that the original numericPrices array is in the same order as the sortedPrices array
        expect(numericPrices).toEqual(sortedPrices);
    });

    //Verify that the Twitter, Facebook and Linkedin social media icons redirect to the correct pages
    test('Twitter icon redirects to Twitter page as a new browser tab', async ({ page }) => {
        //Press the twitter button to trigger the popup event
        await page.locator('[data-test="social-twitter"]').click();

        //Create a newPage and store the referencee popup event triggered
        const newPage = await page.waitForEvent('popup');

        //Wait for the new page to load and verify that the URL is correct
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL('https://x.com/saucelabs');

    });

    test('Facebook icon redirects to Facebook page as a new browser tab', async ({ page }) => {
        //Press the facebook button to trigger the popup event
        await page.locator('[data-test="social-facebook"]').click();

        //Create a newPage and store the referencee popup event triggered
        const newPage = await page.waitForEvent('popup');

        //Wait for the new page to load and verify that the URL is correct
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL('https://www.facebook.com/saucelabs');
    });

    test('Linkedin icon redirects to Linkedin page as a new browser tab', async ({ page }) => {
        //Press the linkedin button to trigger the popup event
        await page.locator('[data-test="social-linkedin"]').click();

        //Create a newPage and store the referencee popup event triggered
        const newPage = await page.waitForEvent('popup');
        await newPage.waitForLoadState();
        await expect(newPage).toHaveURL('https://www.linkedin.com/company/sauce-labs/');
    });

    //#endregion
});