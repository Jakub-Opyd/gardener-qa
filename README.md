# Gardener-QA

## Project Highlights

- 60+ automated tests
- UI, API and Accessibility testing
- Playwright + TypeScript
- POM + Component Objects
- CI/CD with GitHub Actions
- 6 functional defects identified
- 3 accessibility defects identified
  
## Overview

**Gardener-QA** is a comprehensive QA portfolio project created for a full-stack gardening application built with React, Express.js, and MongoDB.

The project demonstrates both manual and automated testing practices commonly used in modern software development teams, including:

* UI test automation
* API testing
* accessibility testing
* manual functional testing
* defect reporting
* traceability management
* security-oriented testing
* CI/CD integration
* maintainable Playwright framework architecture

The goal of the project was not only to verify application quality but also to simulate a realistic QA workflow from test planning to automated execution and reporting.

---

## Live Playwright Report

The latest automated execution report is available online:

➡️ **https://jakub-opyd.github.io/gardener-qa/**

The report includes:

* executed test cases
* screenshots on failure
* Playwright traces
* execution logs
* debugging artifacts

---

## CI/CD

The project includes a GitHub Actions pipeline that automatically:

* builds the frontend application
* starts a production preview server
* executes Playwright smoke tests
* uploads Playwright reports as artifacts
* validates frontend functionality in an isolated environment

A dedicated mocked smoke suite allows CI execution without requiring backend services.

---

## Project Scope

The tested application allows users to:

* register and authenticate accounts
* browse a plant encyclopedia
* search and filter plants
* manage favorite plants

---

# Testing Scope

The project covers both frontend and backend verification.

## Manual Testing

* functional testing
* negative testing
* exploratory testing
* validation testing
* edge-case verification
* defect reporting
* traceability mapping

## Automated Testing

### Accessibility Testing

Implemented with:

* Playwright
* axe-core
* automated WCAG 2.1 AA validation

Covered areas:

* color contrast validation
* landmark structure validation
* semantic HTML validation
* ARIA-related accessibility checks

Executed in:

* Light Theme
* Dark Theme

Detected accessibility defects include:

* WCAG contrast violations
* duplicate landmarks
* nested landmarks
* non-unique landmarks

### UI Automation

Implemented with:

* Playwright
* TypeScript
* Page Object Model (POM)
* reusable Component Objects
* custom Playwright fixtures

### API Testing

Implemented with:

* Playwright APIRequestContext
* Service Layer abstraction
* dynamic test users
* authentication validation
* schema validation
* negative testing
* authorization verification

### Mocked Smoke Testing

A dedicated smoke suite was implemented using Playwright API mocking.

Covered areas:

* authentication
* plant catalog
* favorites management

Benefits:

* backend-independent execution
* faster feedback cycle
* stable CI execution
* frontend regression protection

---

# Tech Stack

| Area            | Technology                              |
| --------------- | --------------------------------------- |
| Language        | TypeScript                              |
| Test Framework  | Playwright                              |
| API Testing     | Playwright API                          |
| Architecture    | POM + Component Objects + Service Layer |
| Mocking         | Playwright Route API                    |
| CI/CD           | GitHub Actions                          |
| Reporting       | Playwright HTML Reporter                |
| Hosting         | GitHub Pages                            |
| Frontend        | React + Vite                            |
| Backend         | Express.js                              |
| Database        | MongoDB                                 |
| Version Control | Git + GitHub                            |

---

# Framework Architecture

The framework was designed with maintainability and scalability in mind.

## UI Layer

The UI automation layer uses:

* Page Object Model
* reusable UI Components
* centralized fixtures
* reusable locators and actions

Example structure:

```text
pages/
components/
fixtures.ts
```

Example:

```ts
export class PlantPage extends BasePage {
    readonly filters: PlantFiltersComponent;

    async search(name: string) {
        await this.searchInput.fill(name);
    }

    getPlantCardByName(plantName: string) {
        return new PlantCardComponent(...);
    }
}
```

---

## API Layer

API communication is abstracted into reusable service classes.

Example:

```ts
export class AuthService {
    async login(credentials: LoginPayload) {
        return await this.request.post("/auth/login", {
            data: credentials
        });
    }
}
```

Benefits:

* reusable requests
* cleaner tests
* centralized endpoint management
* easier maintenance

---

## Fixtures & Test Isolation

Custom Playwright fixtures are used to:

* generate dynamic users
* authenticate through API
* isolate test execution
* reduce duplicated setup logic

Benefits:

* improved stability
* improved readability
* easier maintenance
* faster execution

---

# Test Documentation

```text
docs/
├── test-plan.md
├── test-strategy.md
├── test-scenarios.md
├── traceability-matrix.md
├── bug-reports/
└── test-cases/
```

Repository documentation includes:

* Test Strategy
* Test Plan
* Test Cases
* Test Scenarios
* Traceability Matrix
* Bug Reports
* Final Test Report

---

# Automated Test Structure

```text
tests/
├── api/
│   ├── auth.api.spec.ts
│   ├── favorites.api.spec.ts
│   └── plants.api.spec.ts
│
├── gui/
│   ├── auth.gui.spec.ts
│   ├── favorites.gui.spec.ts
│   └── plants.gui.spec.ts
│
├── accessibility/
│  └── accessibility.a11y.spec.ts
│
└── mocked/
    └── smoke.mocked.spec.ts
```

---

# Test Coverage

## Authentication

Coverage includes:

* registration
* login
* validation
* authorization
* session persistence
* negative scenarios
* injection attempts
* failed authentication flows

## Plants Module

Coverage includes:

* plant retrieval
* search functionality
* filtering logic
* plant details
* schema validation
* response consistency
* data integrity verification

## Favorites Module

Coverage includes:

* adding favorites
* removing favorites
* persistence validation
* authorization checks

## Accessibility

Coverage includes:

* Home Page
* Login Page
* Register Page
* Plant Encyclopedia
* Favorites
* Plant Details

Validated areas:

* WCAG 2.1 AA compliance
* color contrast
* landmark structure
* semantic page hierarchy

---

# Defect Reporting

The project includes professionally documented defects with:

* reproduction steps
* expected vs actual results
* severity classification
* screenshots
* backend logs
* API evidence

Example defects discovered during testing:

| ID      | Description                        | Severity |
| ------- | ---------------------------------- | -------- |
| BUG-002 | Backend crash on invalid plantId   | Critical |
| BUG-003 | Unhandled MongoDB CastError        | Critical |
| BUG-005 | Injection payload handling failure | Major    |

Accessibility defects discovered:

| ID | Description | Severity |
|----|-------------|----------|
| A11Y-001 | Login button contrast violation | Minor |
| A11Y-002 | Invalid landmark structure | Minor |
| A11Y-003 | Filter section contrast violation | Minor |

---

# Security & Negative Testing

The project includes security-oriented and negative scenarios such as:

* invalid ObjectId handling
* malformed email validation
* injection payload verification
* invalid authentication attempts
* unauthorized endpoint access

Several backend stability issues were identified during testing.

---

# Test Reporting & Debugging

The framework automatically generates:

* Playwright HTML reports
* screenshots on failure
* traces on retry
* execution artifacts

Configuration:

```ts
use: {
  trace: 'retain-on-failure',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
}
```

Reports are available:

* locally via Playwright
* as GitHub Actions artifacts
* via GitHub Pages deployment

---

# Running Tests

## Install dependencies

```bash
npm install
```

## Run all tests

```bash
npx playwright test
```

## Run API tests

```bash
npx playwright test --grep @api
```

## Run UI tests

```bash
npx playwright test --grep @ui
```

## Run Smoke Tests

```bash
npx playwright test --grep @smoke
```

## Run Mocked Smoke Tests

```bash
npx playwright test tests/mocked/smoke.mocked.spec.ts
```

## Open Playwright Report

```bash
npx playwright show-report
```

---

# Environment Variables

Example configuration:

```env
BASE_URL=http://localhost:4173
API_URL=http://localhost:3001

TEST_USER1_EMAIL=test@example.com
TEST_USER1_PASSWORD=Password123!
```

---

# Future Improvements

Potential future enhancements:

* Dockerized test execution
* visual regression testing
* performance testing
* advanced reporting dashboards
* cross-browser CI matrix execution

---

# Project Purpose

This project was created to simulate the work of a QA Engineer in a real software development environment.

It combines manual testing, API testing, UI automation, accessibility validation, defect management, test documentation, traceability, and CI/CD integration within a single maintainable Playwright framework.