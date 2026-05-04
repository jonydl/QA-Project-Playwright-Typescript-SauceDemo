import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../fixtures/LoginPage';

test.describe('Cart Functionality', async () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Cart page loads when cart button is clicked', async ({ page }) => {
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });


    test('Inventory page loads when pressing <Continue Shopping> button', async ({ page }) => {
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="continue-shopping"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });


    test('Multiple items can be added to the cart and cart badge text updates', async ({ page }) => {
        const randomCount = 3;

        for (let i = 0; i < randomCount; i++) {
            await page.locator('[data-test^="add-to-cart-"]').first().click();

            // Wait for the cart badge to reflect the updated count before next click
            // This accounts for Safari's slower DOM updates
            await expect(page.locator('.shopping_cart_badge')).toHaveText(String(i + 1));
        }

        const cartBadge = page.locator('.shopping_cart_badge');
        await expect(cartBadge).toHaveText(String(randomCount));

        await page.locator('[data-test="shopping-cart-link"]').click();
        const cartItems = page.locator('.cart_item');
        await expect(cartItems).toHaveCount(randomCount);
    });


    test('Items are added and removed from cart', async ({ page }) => {
        await page.locator('[data-test^="add-to-cart-"]').first().click();
        await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('1');

        await page.locator('[data-test^="remove-"]').first().click();
        await expect(page.locator('[data-test="shopping-cart-link"]')).toHaveText('');
    });
});