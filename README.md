# QA Project - SauceDemo E2E Testing

A comprehensive end-to-end (E2E) test automation project for the [SauceDemo](https://www.saucedemo.com/) e-commerce website, built with **Playwright** and **TypeScript**.

---

## 📋 Project Overview

This project demonstrates QA automation practices through automated testing of critical user flows on the SauceDemo website. It covers real-world testing scenarios using the Page Object Model pattern, cross-browser execution, and structured test documentation.

---

## 🎯 Test Scope

The automation covers the following critical user journeys:

- **Authentication** — Login with valid/invalid credentials, locked-out users, and field validation
- **Inventory Management** — Browse products, sorting functionality, and social media links
- **Shopping Cart** — Add and remove items functionality
- **Checkout Flow** — Complete transaction process including payment information

---

## 🛠️ Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright ^1.58.2 | Cross-browser E2E testing framework |
| TypeScript | Type-safe test automation code |
| Node.js | Runtime environment |
| Page Object Model | Organised and maintainable test structure |

---

## 📁 Project Structure

```
├── tests/
│   └── e2e-test/
│       ├── auth/           # Login and authentication tests
│       ├── cart/           # Shopping cart functionality tests
│       ├── checkout/       # Checkout flow tests
│       └── inventory/      # Product inventory tests
├── fixtures/               # Page Object Model classes
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── QA_Info/                # Documentation
│   ├── QA Test Plan.md     # Comprehensive test plan
│   └── bugs_list.md        # Known issues and bugs
├── playwright.config.ts    # Playwright configuration
└── package.json            # Project dependencies
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/QA-Project-Playwright-Typescript-SauceDemo.git
cd QA-Project-Playwright-Typescript-SauceDemo
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

---

## 🧪 Running Tests

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all tests |
| `npx playwright test --project="e2e Tests - Chrome"` | Run on Chrome only |
| `npx playwright test --project="e2e Tests - Firefox"` | Run on Firefox only |
| `npx playwright test --project="e2e Tests - Safari"` | Run on Safari only |
| `npx playwright test --headed` | Run in headed mode (visible browser) |
| `npx playwright test --debug` | Run in debug mode |
| `npx playwright show-report` | View HTML test report |

---

## 🌐 Cross-Browser Testing

Tests are configured to run across three browsers automatically:

- **Chrome** (Chromium)
- **Firefox**
- **Safari**

All tests execute on each configured browser to ensure consistent behaviour across platforms.

---

## 📝 Test Credentials

| User Type | Username | Password |
|-----------|----------|----------|
| Standard User | `standard_user` | `secret_sauce` |
| Locked Out User | `locked_out_user` | `secret_sauce` |
| Performance User | `performance_glitch_user` | `secret_sauce` |

---

## 🐛 Known Issues

The following bugs were identified during testing and documented as part of the QA process:

1. **[Medium]** — "Epic sadface" text displayed instead of emoji in the error button element on the login page (affects both username and password validation)
2. **[High]** — Orders can be placed with an empty cart
3. **[High]** — Checkout form accepts any input (numbers, special characters) without proper validation

See [bugs_list.md](QA_Info/bugs_list.md) for full bug documentation including steps to reproduce and severity rationale.

---

## 📚 Page Object Model (POM)

The project uses the Page Object Model pattern to separate test logic from page interactions, improving maintainability and reusability:

| Class | Responsibility |
|-------|---------------|
| `LoginPage.ts` | Handles all login-related interactions |
| `InventoryPage.ts` | Manages product browsing and sorting |
| `CartPage.ts` | Controls shopping cart operations |
| `CheckoutPage.ts` | Manages checkout flow and payment |

---

## ✅ Best Practices Implemented

- Page Object Model pattern for test organisation
- TypeScript for type safety and code clarity
- Cross-browser testing across Chrome, Firefox, and Safari
- Clear and consistent test naming conventions
- Tests organised by feature area
- Centralised test data and credentials
- Comprehensive bug documentation with severity levels
- Structured QA documentation including test plan and bug list

---

## 💡 About This Project

Built as a portfolio project to demonstrate Playwright automation skills, Page Object Model architecture, and cross-browser test coverage. This project reflects my approach to structured, maintainable test automation while actively developing commercial automation experience alongside five years of manual QA work.
