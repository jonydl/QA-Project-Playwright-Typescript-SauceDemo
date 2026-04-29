import { Page, Locator } from '@playwright/test';
import { LoginPage } from './LoginPage';

export class InventoryPage{
    readonly page : Page;
    readonly url : string = 'https://www.saucedemo.com/inventory.html';
  
    constructor(page: Page){
        this.page = page;
    }

    async gotoCheckoutPage(){
        await this.page.locator('[data-test^="add-to-cart-"]').first().click();
        await this.page.locator('[data-test="shopping-cart-link"]').click();
        await this.page.locator('[data-test="checkout"]').click();
    };
}