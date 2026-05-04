import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../fixtures/LoginPage';
import { InventoryPage } from '../../../fixtures/InventoryPage';

test.describe('Checkout Functionality', async () => {
    let loginPage: LoginPage;
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        inventoryPage = new InventoryPage(page);
        await inventoryPage.gotoCheckoutPage();
    });

    test('Complete checkout flow with valid information', async ({ page }) => {
        // Fill checkout information
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="postalCode"]').fill('12345');
        await page.locator('[data-test="continue"]').click();

        // Verify on checkout overview page
        await expect(page.locator('[data-test="checkout-summary-container"]')).toBeVisible();

        // Verify items are listed
        const cartItems = page.locator('[data-test="inventory-item"]');
        await expect(cartItems).toHaveCount(1);

        // Verify total price and tax calculation
        const subtotal = await page.locator('[data-test="subtotal-label"]').textContent();
        const tax = await page.locator('[data-test="tax-label"]').textContent();
        const total = await page.locator('[data-test="total-label"]').textContent();

        // Assuming item price is $29.99, tax is 8%
        expect(subtotal).toContain('29.99');
        expect(tax).toContain('2.40'); // 29.99 * 0.08
        expect(total).toContain('32.39'); // 29.99 + 2.40

        // Verify payment information
        await expect(page.locator('[data-test="payment-info-label"]')).toContainText('Payment Information');

        // Finish checkout
        await page.locator('[data-test="finish"]').click();

        // Verify thank you page
        await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
        await expect(page.locator('[data-test="complete-text"]')).toBeVisible();

        // Click back home
        await page.locator('[data-test="back-to-products"]').click();

        // Verify redirected to inventory page
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Error validation for empty checkout information', async ({ page }) => {
        // Try to continue without filling information
        await page.locator('[data-test="continue"]').click();

        // Verify error message for first name
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');

        // Fill first name and try again
        await page.locator('[data-test="firstName"]').fill('John');
        await page.locator('[data-test="continue"]').click();

        // Verify error message for last name
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: Last Name is required');

        // Fill last name and try again
        await page.locator('[data-test="lastName"]').fill('Doe');
        await page.locator('[data-test="continue"]').click();

        // Verify error message for postal code
        await expect(page.locator('[data-test="error"]')).toHaveText('Error: Postal Code is required');
    });

    test('Cancel checkout returns to cart', async ({ page }) => {
        // Click cancel
        await page.locator('[data-test="cancel"]').click();

        // Verify back to cart page
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
        await expect(page.locator('[data-test="cart-contents-container"]')).toBeVisible();
    });

    test('Checkout with multiple items', async ({ page }) => {
        // Add another item before checkout
        await page.goto('https://www.saucedemo.com/inventory.html');
        await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();

        // Fill checkout information
        await page.locator('[data-test="firstName"]').fill('Jane');
        await page.locator('[data-test="lastName"]').fill('Smith');
        await page.locator('[data-test="postalCode"]').fill('67890');
        await page.locator('[data-test="continue"]').click();

        // Verify two items are listed
        const cartItems = page.locator('[data-test="inventory-item"]');
        await expect(cartItems).toHaveCount(2);

        // Verify total price calculation
        const subtotal = await page.locator('[data-test="subtotal-label"]').textContent();
        // Assuming prices: 29.99 + 9.99 = 39.98, tax ~3.20, total ~43.18
        expect(subtotal).toContain('39.98');

        // Finish checkout
        await page.locator('[data-test="finish"]').click();
        await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    });

});