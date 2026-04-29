import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';
import { InventoryPage } from '../../../pages/InventoryPage';

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

    
    test('Checkout flow with valid information', async ({ page }) => {
        //Add an item to the cart and navigate to the cart page
        await page.locator('[data-test^="add-to-cart-"]').first().click();
        await page.locator('[data-test="shopping-cart-link"]').click();
        await page.locator('[data-test="checkout"]').click();
    });



   /*
   > add items to cart > select cart > Press checkout > 
    > fill with valid information (first name, last name, zip code)
     > selected items are listed correctly
        > total price is correct and tax is calculated correctly
         >payment information is accurate
          > finish button redirects to "thank you for your order!" page
           > the button <back home> redirects to inventory page

    > empty data error validation
   */

});