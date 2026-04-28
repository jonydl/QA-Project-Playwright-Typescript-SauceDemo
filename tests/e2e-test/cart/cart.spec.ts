import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';

test.describe('Cart Functionality', async () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Verify cart page loads when pressing the cart button from the inventory page', async ({ page }) => {
        await page.locator('[data-test="shopping-cart-link"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    });


    test('Verify <Continue Shopping> button redirects back to the inventory page', async ({ page }) => {
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="continue-shopping"]').click();
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('Verify multiple items can be added to the cart and cart badge text updates correctly', async ({ page }) => {
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
});

/*
1. Verify cart page loads when pressing the cart button from the inventory page - DONE
2. Verify <Continue Shopping> button redirects back to the inventory page - DONE
3. Verify that multiple items can be added to the cart - DONE
4. Verify items can be removed from the cart from the inventory page
5. Verify items can be removed from the cart from the cart page
5. Verify that the cart badge updates with the correct number of items in the cart when adding/removing items from the cart - DONE
6.  
*/
