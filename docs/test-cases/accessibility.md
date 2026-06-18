# Gardener - ACCESSIBILITY Test Cases

## Scope

Testing accessibility compliance of key application pages using automated WCAG validation.

---

## Tools

* Playwright
* axe-core

---

## Test Environment

* Frontend: `npm run build` + `npm run preview`
* Backend: `cd backend` + `npm run dev`
* Database: MongoDB Cloud
* Browser: Chromium
* Themes:

  * Light Theme
  * Dark Theme

---

## Accessibility Coverage

### Accessibility Validation Areas

| Area               | Description                                                    |
| ------------------ | -------------------------------------------------------------- |
| Color Contrast     | Verification of WCAG 2.1 AA color contrast requirements        |
| Landmark Structure | Validation of landmark hierarchy and uniqueness                |
| Semantic HTML      | Validation of semantic page structure                          |
| ARIA Attributes    | Verification of accessibility attributes supported by axe-core |
| WCAG Compliance    | Automated WCAG 2.1 AA rule validation                          |

---

## Test Cases

### A11Y-001 Home Page Accessibility Validation

| Field         | Value                  |
| ------------- | ---------------------- |
| Priority      | High                   |
| Type          | Accessibility          |
| Preconditions | Application is running |
| Test Data     | N/A                    |

#### Steps

1. Open Home page.
2. Execute automated accessibility scan.
3. Review detected accessibility violations.

#### Expected Result

* No accessibility violations are detected.
* Page complies with WCAG 2.1 AA rules supported by axe-core.

---

### A11Y-002 Login Page Accessibility Validation

| Field         | Value                  |
| ------------- | ---------------------- |
| Priority      | High                   |
| Type          | Accessibility          |
| Preconditions | Application is running |
| Test Data     | N/A                    |

#### Steps

1. Open Login page.
2. Execute automated accessibility scan.
3. Review detected accessibility violations.

#### Expected Result

* No accessibility violations are detected.
* Page complies with WCAG 2.1 AA rules supported by axe-core.

---

### A11Y-003 Register Page Accessibility Validation

| Field         | Value                  |
| ------------- | ---------------------- |
| Priority      | High                   |
| Type          | Accessibility          |
| Preconditions | Application is running |
| Test Data     | N/A                    |

#### Steps

1. Open Register page.
2. Execute automated accessibility scan.
3. Review detected accessibility violations.

#### Expected Result

* No accessibility violations are detected.
* Page complies with WCAG 2.1 AA rules supported by axe-core.

---

### A11Y-004 Plant Encyclopedia Accessibility Validation

| Field         | Value                  |
| ------------- | ---------------------- |
| Priority      | High                   |
| Type          | Accessibility          |
| Preconditions | Application is running |
| Test Data     | N/A                    |

#### Steps

1. Open Plant Encyclopedia page.
2. Execute automated accessibility scan.
3. Review detected accessibility violations.

#### Expected Result

* No accessibility violations are detected.
* Page complies with WCAG 2.1 AA rules supported by axe-core.

---

### A11Y-005 Favorites Page Accessibility Validation

| Field         | Value             |
| ------------- | ----------------- |
| Priority      | High              |
| Type          | Accessibility     |
| Preconditions | User is logged in |
| Test Data     | Test User 1       |

#### Steps

1. Open Favorites page.
2. Execute automated accessibility scan.
3. Review detected accessibility violations.

#### Expected Result

* No accessibility violations are detected.
* Page complies with WCAG 2.1 AA rules supported by axe-core.

---

### A11Y-006 Plant Details Page Accessibility Validation

| Field         | Value                  |
| ------------- | ---------------------- |
| Priority      | High                   |
| Type          | Accessibility          |
| Preconditions | Application is running |
| Test Data     | First available plant  |

#### Steps

1. Open Plant Encyclopedia page.
2. Wait for plant data to load.
3. Open details of the first available plant.
4. Wait for page content to load.
5. Disable animations and transitions.
6. Execute automated accessibility scan.
7. Review detected accessibility violations.

#### Expected Result

* No accessibility violations are detected.
* Page complies with WCAG 2.1 AA rules supported by axe-core.