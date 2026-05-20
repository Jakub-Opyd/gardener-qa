# Gardener-QA

## Overview

**Gardener-QA** is a structured end-to-end QA project created for a full-stack gardening application built with React, Express.js, and MongoDB.

The project combines:

- manual functional testing
- API testing
- UI automation
- defect reporting
- traceability management
- basic security validation
- maintainable Playwright architecture

The main goal was not only to verify application behavior, but also to simulate a real QA workflow used in modern software projects.

---

## Live Playwright Report

The latest automated execution report is available online:

➡️ **[View Playwright HTML Report](https://jakub-opyd.github.io/gardener-qa/)**

The report includes:

- executed test cases
- screenshots on failure
- traces on retry
- execution logs
- browser-level debugging artifacts

---

# Project Scope

The tested application allows users to:

- register and authenticate accounts
- browse a plant encyclopedia
- search and filter plants
- manage favorite plants
- create personalized garden layouts

---

# Testing Scope

The project covers both frontend and backend verification.

## Manual Testing

- functional testing
- negative testing
- validation testing
- exploratory testing
- edge-case verification
- defect reporting
- traceability mapping

## Automated Testing

### UI Automation

Implemented with:

- Playwright
- TypeScript
- Page Object Model (POM)
- reusable UI Components

### API Testing

Implemented with:

- Playwright APIRequestContext
- service-layer abstraction
- isolated test users
- schema verification
- authentication/session validation
- negative API testing

---

# Tech Stack

| Area | Technology |
|---|---|
| Language | TypeScript |
| UI Automation | Playwright |
| API Testing | Playwright API |
| Architecture | POM + Component Objects + Service Layer |
| CI-ready Reporting | Playwright HTML Reporter |
| Test Data | JSON fixtures |
| Backend | Express.js |
| Frontend | React (Vite) |
| Database | MongoDB |
| Version Control | Git / GitHub |

---

# Framework Architecture

The framework was designed with maintainability and scalability in mind.

## UI Layer

The UI automation layer uses:

- Page Object Model
- reusable component abstraction
- centralized fixtures
- reusable locators and actions

Example structure:

```text
pages/
components/
fixtures.ts
```

### Example

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

- cleaner tests
- reusable requests
- centralized endpoint management
- easier maintenance

---

## Fixtures & Test Isolation

Custom Playwright fixtures are used to:

- generate dynamic users
- isolate test execution
- authenticate users via API
- reduce duplicated setup logic

Example:

```ts
dynamicUser: async ({ page }, use) => {
    const user = generateUserData();
}
```

This significantly improves:

- execution speed
- test stability
- maintainability

---

# Test Documentation

```text
docs/
├── test-plan.md
├── test-strategy.md
├── test-scenarios.md
├── traceability-matrix.md
└── test-cases/
```

The repository contains:

- Test Strategy
- Test Plan
- Test Scenarios
- Test Cases
- Traceability Matrix
- Bug Reports
- Final Test Summary Report

---

# Automated Test Structure

```text
tests/
├── api/
│   ├── auth.api.spec.ts
│   ├── favorites.api.spec.ts
│   └── plants.api.spec.ts
└── gui/
    ├── auth.gui.spec.ts
    ├── favorites.gui.spec.ts
    └── plants.gui.spec.ts
```

---

# Test Coverage

## Authentication

Coverage includes:

- registration
- login
- validation
- authorization
- session persistence
- negative scenarios
- injection attempts
- multiple failed login attempts

## Plants Module

Coverage includes:

- plant list retrieval
- search functionality
- filtering logic
- plant details
- API schema validation
- data integrity validation
- response consistency

## Favorites Module

Coverage includes:

- adding favorites
- removing favorites
- unauthorized access handling
- persistence verification

---

# Defect Reporting

The project includes professionally documented defects with:

- reproduction steps
- expected vs actual result
- severity classification
- screenshots
- backend logs
- Postman evidence

Example issues discovered:

| ID | Description | Severity |
|---|---|---|
| BUG-002 | Backend crash on invalid plantId | Critical |
| BUG-003 | Unhandled MongoDB CastError | Critical |
| BUG-005 | Injection payload handling failure | Major |

---

# Security & Negative Testing

The project intentionally includes negative and security-oriented scenarios such as:

- invalid ObjectId handling
- malformed email validation
- injection payload verification
- invalid authentication attempts
- unauthorized endpoint access

Several backend stability issues were identified during testing.

---

# Why Garden Creator Was Not Automated

The Garden Creator module is heavily based on:

- drag & drop interactions
- pixel-based positioning
- visual layout rendering

Reliable automation would require:

- advanced visual regression testing
- image comparison strategies
- coordinate-based validation

Because of the high implementation cost compared to the business/testing value at the current project stage, automation for this module was intentionally postponed.

This decision was made as a practical QA prioritization and ROI tradeoff.

---

# Test Reporting & Debugging

The framework automatically generates:

- HTML reports
- screenshots on failure
- Playwright traces
- execution artifacts

Configured in:

```ts
use: {
  trace: 'on-first-retry',
  screenshot: 'only-on-failure',
  video: 'on-first-retry',
}
```

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

## Run API tests only

```bash
npx playwright test --project=API-Tests
```

## Run UI tests only

```bash
npx playwright test --project=GUI-Chromium
```

## Open HTML report

```bash
npx playwright show-report
```

---

# Environment Variables

Example `.env` configuration:

```env
BASE_URL=http://localhost:4173
API_URL=http://localhost:3001

TEST_USER1_EMAIL=test@example.com
TEST_USER1_PASSWORD=Password123!
```

---

# Future Improvements

Planned improvements include:

- GitHub Actions CI integration
- smoke/regression tagging strategy
- visual regression testing
- database seeding
- API schema validation libraries
- performance testing
- accessibility testing
- Dockerized execution
- advanced reporting dashboards

---

# Project Purpose

This repository was created to demonstrate practical QA engineering skills in areas such as:

- test architecture
- automation design
- API testing
- manual testing
- debugging
- defect analysis
- maintainable framework development
- quality-oriented engineering thinking