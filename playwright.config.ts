import { defineConfig, devices } from '@playwright/test';


/**
 * See https://playwright.dev/docs/test-configuration.
 */

export default defineConfig({
  testDir: './tests',

  projects: [
    {
      name: 'e2e Tests - Chrome',
      testMatch: '**/e2e-test/**/*.spec.ts',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'e2e Tests - Firefox',
      testMatch: '**/e2e-test/**/*.spec.ts',
      use: {
        browserName: 'firefox',
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'e2e Tests - Safari',
      testMatch: '**/e2e-test/**/*.spec.ts',
      use: {
        browserName: 'chromium',
        ...devices['Desktop Safari'],
      },
    }
  ],
});
