import { test, expect } from '@playwright/test';
import { LoginPage } from '../../../pages/LoginPage';


const TEST_USERS = {
  validUser: { username: 'standard_user', password: 'secret_sauce' },
  invalidUser: { username: 'invalid_user', password: 'wrong_password' },
  lockedOutUser: { username: 'locked_out_user', password: 'secret_sauce' },
}

const ERROR_MESSAGES = {
  invalidCredentials: 'Epic sadface: Username and password do not match any user in this service',
  usernameRequired: 'Epic sadface: Username is required',
  passwordRequired: 'Epic sadface: Password is required',
  lockedOutUserErrorMessage: 'Epic sadface: Sorry, this user has been locked out.'
}

test.describe('Login Functionality', () => {
  let loginPage: LoginPage;
  
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  //#region Test Cases
  test('Valid credentials redirection', async () => {
    await loginPage.login(TEST_USERS.validUser.username, TEST_USERS.validUser.password);
    await expect(loginPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('Invalid credentials error', async () => {
    await loginPage.login(TEST_USERS.invalidUser.username, TEST_USERS.invalidUser.password);
    await expect(loginPage.page.locator('[data-test="error"]')).toHaveText(ERROR_MESSAGES.invalidCredentials);
  });

  test ('Empty username error message', async () => {
    await loginPage.login("", TEST_USERS.validUser.password);
    await expect(loginPage.page.locator('[data-test="error"]')).toHaveText(ERROR_MESSAGES.usernameRequired);
  });

  test ('Empty password error message', async () => {
    await loginPage.login(TEST_USERS.validUser.username, "");
    await expect(loginPage.page.locator('[data-test="error"]')).toHaveText(ERROR_MESSAGES.passwordRequired);
  });

  test ('Locked out user login attempt', async () => {
    await loginPage.login(TEST_USERS.lockedOutUser.username, TEST_USERS.lockedOutUser.password);
    await expect(loginPage.page.locator('[data-test="error"]')).toHaveText(ERROR_MESSAGES.lockedOutUserErrorMessage);
  });
  //#endregion
  
});