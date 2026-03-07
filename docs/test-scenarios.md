# Gardener - Test Scenarios

## 1. Document Information

**Project:** Gardener  
**Application type:** Web Application  
**Architecture:** Frontend + Backend + Database  
**Frontend:** React  
**Backend:** Express.js (Node.js)  
**Database:** MongoDB Cloud  
**API:** REST  

---

## 2. Purpose

The purpose of this document is to define **high-level testing scenarios** for the Gardener application.

Test scenarios describe **major user flows and system behaviors** which are later verified through detailed **test cases** located in:

```
/test-cases/
```

Each scenario represents a **functional path in the application**.

---

## 3. Test Scenarios Overview

The scenarios cover the following modules:

- AUTH
- PLANTS
- FAVORITES
- GARDEN CREATOR
- END-TO-END (cross-module user flows)

---

## 4. AUTH - Authentication Scenarios

| ID | Scenario | Description |
|----|--------|-------------|
| SC-AUTH-01 | User registration | A new user creates an account in the application |
| SC-AUTH-02 | User login | Existing user logs into the application |
| SC-AUTH-03 | Login validation | System validates incorrect login credentials |
| SC-AUTH-04 | Registration validation | System validates incorrect registration input |
| SC-AUTH-05 | Session persistence | User session remains active during normal usage |
| SC-AUTH-06 | Unauthorized access protection | Unauthenticated users cannot access protected resources |
| SC-AUTH-07 | Login immediately after registration | User can log in right after successful registration |

---

## 5. PLANTS - Plant Encyclopedia Scenarios

| ID | Scenario | Description |
|----|--------|-------------|
| SC-PL-01 | View plant list | User views the plant encyclopedia |
| SC-PL-02 | View plant details | User opens details of a selected plant |
| SC-PL-03 | Search by name | User searches plants using a search bar |
| SC-PL-04 | Filter by attributes | User filters plants using type, soil, etc. |
| SC-PL-05 | No results scenario | System correctly handles filter returning no results |
| SC-PL-06 | Navigation between plant pages | User navigates between plant list and plant details |
| SC-PL-07 | Plant data integrity | Plant details display correct information |

---

## 6. FAVORITES - Favorite Plants Scenarios

| ID | Scenario | Description |
|----|--------|-------------|
| SC-FAV-01 | Add plant to favorites | Logged-in user adds a plant to favorites |
| SC-FAV-02 | Remove plant from favorites | User removes a plant from favorites |
| SC-FAV-03 | View favorites list | User views their list of favorite plants |
| SC-FAV-04 | Prevent duplicate favorites | System prevents adding the same plant twice |
| SC-FAV-05 | Favorites access protection | Favorites cannot be accessed without authentication |
| SC-FAV-06 | Favorites persistence | Favorites remain saved between sessions |

---

## 7. GARDEN CREATOR - Garden Planning Scenarios

| ID | Scenario | Description |
|----|--------|-------------|
| SC-GC-01 | Upload garden image | User uploads a photo of their garden area |
| SC-GC-02 | Upload validation | System rejects unsupported file formats |
| SC-GC-03 | Add plant to garden layout | User drags a plant onto the garden canvas |
| SC-GC-04 | Remove plant from layout | User removes a plant from the garden plan |
| SC-GC-05 | Move plants on canvas | User repositions plants within the layout |
| SC-GC-06 | Create garden layout | User designs a complete garden arrangement |
| SC-GC-07 | Export garden plan | User exports the garden layout as an image |
| SC-GC-08 | Generate plant list | System generates a printable list of plants used in the layout |
| SC-GC-09 | Empty garden export | System handles export when no plants are added |
| SC-GC-10 | Canvas boundary control | Plants cannot be placed outside the garden canvas |

---

## 8. END-TO-END - Cross-Module User Flow Scenarios

These scenarios validate complete user journeys spanning multiple application modules.

| ID | Scenario | Description | Modules Covered |
|----|--------|-------------|-----------------|
| SC-E2E-01 | Full onboarding flow | New user registers, logs in, and reaches the home page | AUTH |
| SC-E2E-02 | Browse and favorite a plant | Logged-in user finds a plant via search and adds it to favorites | AUTH > PLANTS > FAVORITES |
| SC-E2E-03 | Favorites persistence across sessions | User adds plant to favorites, logs out, logs back in, and favorites are still present | AUTH > FAVORITES |
| SC-E2E-04 | Create and export a garden | Logged-in user uploads garden image, places multiple plants, and exports the layout | AUTH > PLANTS > GARDEN CREATOR |
| SC-E2E-05 | Full user journey | User registers, logs in, searches for a plant, adds it to favorites, uses it in garden creator, and exports the plan | AUTH > PLANTS > FAVORITES > GARDEN CREATOR |

---

## 9. Traceability

Each scenario is validated by detailed **test cases** located in:

```
/test-cases/
```

| Scenario | Test Case File |
|--------|---------------|
| AUTH scenarios | auth.md |
| PLANTS scenarios | plants.md |
| FAVORITES scenarios | favorites.md |
| GARDEN CREATOR scenarios | garden-creator.md |
| END-TO-END scenarios | e2e.md *(planned)* |

Full traceability between **features, scenarios, and test cases** is provided in:

```
traceability-matrix.md
```