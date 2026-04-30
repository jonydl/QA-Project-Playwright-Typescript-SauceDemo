import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly url: string;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.url = 'https://www.saucedemo.com/cart.html';
    }

    async goToCartPage() {
        await this.page.goto(this.url);
    }

    async returnToInventoryPage() {
        await this.page.locator('[data-test="continue-shopping"]').click();
    }

    async goToCheckoutPage() {
        await this.page.locator('[data-test="checkout"]').click();
    }


    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.click();
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.click();
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.click();
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToCheckOutOverview() {
        await this.page.locator('[data-test="continue"]').click();
    }

    async cancelCheckout() {
        await this.page.locator('[data-test="cancel"]').click();
    }

    async finishCheckout() {
        await this.page.locator('[data-test="finish"]').click();
    }
}