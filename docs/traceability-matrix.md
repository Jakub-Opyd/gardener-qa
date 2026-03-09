# Gardener – Traceability Matrix

## Document Information

**Project:** Gardener  
**Last updated:** 2026-03-09

---

## Execution Summary

| Module | Total | Pass | Fail | Not Executed |
|---|---|---|---|---|
| AUTH | 20 | 18 | 1 | 2 |
| PLANTS | 22 | 20 | 1 | 0 |
| FAVORITES | 19 | 18 | 1 | 0 |
| GARDEN CREATOR | 17 | 0 | 0 | 17 |
| **Total** | **78** | **56** | **3** | **19** |

---

## Coverage Summary

| Module | Total Scenarios | Covered by Test Cases | Coverage |
|---|---|---|---|
| AUTH | 7 | 7 | 100% |
| PLANTS | 7 | 7 | 100% |
| FAVORITES | 6 | 6 | 100% |
| GARDEN CREATOR | 10 | 10 | 100% |
| **Total** | **30** | **30** | **100%** |

---

## Known Defects

| Bug ID | Title | Severity | Status | Related Test Case |
|---|---|---|---|---|
| BUG-001 | Missing maximum length validation on email and password fields | Minor | New | AUTH-07 |
| BUG-002 | Backend crashes on POST /users/:userId/favorites/:plantId with invalid plantId format | Critical | New | FAV-05 |
| BUG-003 | Backend crashes on GET /plants/id/:id with invalid ID format | Critical | New | PLANT-05 |

---

## AUTH – Authentication

| Requirement ID | Feature | Scenario ID | Test Case ID | Test Title | Status |
|---|---|---|---|---|---|
| REQ-AUTH-01 | User registration | SC-AUTH-01 | AUTH-01 | Register new user | Pass |
| REQ-AUTH-02 | Registration validation | SC-AUTH-04 | AUTH-02 | Register with existing email | Pass |
| REQ-AUTH-02 | Registration validation | SC-AUTH-04 | AUTH-03 | Register with invalid email format | Pass |
| REQ-AUTH-02 | Registration validation | SC-AUTH-04 | AUTH-04 | Register with empty email | Pass |
| REQ-AUTH-02 | Registration validation | SC-AUTH-04 | AUTH-05 | Register with empty password | Pass |
| REQ-AUTH-02 | Registration validation | SC-AUTH-04 | AUTH-06 | Register with short password | Pass |
| REQ-AUTH-02 | Registration validation | SC-AUTH-04 | AUTH-07 | Register with long password | Fail – BUG-001 |
| REQ-AUTH-02 | Registration validation | SC-AUTH-04 | AUTH-08 | Register with spaces-only email | Pass |
| REQ-AUTH-02 | Registration validation | SC-AUTH-04 | AUTH-09 | Register with SQL injection in email | Not executed |
| REQ-AUTH-02 | Registration validation | SC-AUTH-04 | AUTH-10 | Register with script injection in email | Not executed |
| REQ-AUTH-03 | User login | SC-AUTH-02 | AUTH-11 | Successful login | Pass |
| REQ-AUTH-04 | Login validation | SC-AUTH-03 | AUTH-12 | Login with wrong password | Pass |
| REQ-AUTH-04 | Login validation | SC-AUTH-03 | AUTH-13 | Login with non-existing email | Pass |
| REQ-AUTH-04 | Login validation | SC-AUTH-03 | AUTH-14 | Login with empty email | Pass |
| REQ-AUTH-04 | Login validation | SC-AUTH-03 | AUTH-15 | Login with empty password | Pass |
| REQ-AUTH-04 | Login validation | SC-AUTH-03 | AUTH-16 | Login with empty form | Pass |
| REQ-AUTH-05 | Session persistence | SC-AUTH-05 | AUTH-17 | Session persists after authenticated request | Pass |
| REQ-AUTH-06 | Unauthorized access protection | SC-AUTH-06 | AUTH-18 | Access protected endpoint without login | Pass |
| REQ-AUTH-04 | Login validation | SC-AUTH-03 | AUTH-19 | Multiple failed login attempts | Pass |
| REQ-AUTH-07 | Login after registration | SC-AUTH-07 | AUTH-20 | Login immediately after registration | Pass |

---

## PLANTS – Plant Encyclopedia

| Requirement ID | Feature | Scenario ID | Test Case ID | Test Title | Status |
|---|---|---|---|---|---|
| REQ-PL-01 | View plant list | SC-PL-01 | PLANT-01 | Get plant list via API | Pass |
| REQ-PL-01 | View plant list | SC-PL-01 | PLANT-02 | Plant list accessible for guest user | Pass |
| REQ-PL-01 | View plant list | SC-PL-01 | PLANT-03 | Plant list accessible for logged-in user | Pass |
| REQ-PL-02 | View plant details | SC-PL-02 | PLANT-04 | Get plant by valid ID via API | Pass |
| REQ-PL-02 | View plant details | SC-PL-02 | PLANT-05 | Get plant by invalid ID format via API | Fail – BUG-003 |
| REQ-PL-02 | View plant details | SC-PL-02 | PLANT-06 | Get plant by non-existing ID via API | Pass |
| REQ-PL-01 | View plant list | SC-PL-01 | PLANT-07 | Plant list response JSON schema | Pass |
| REQ-PL-02 | View plant details | SC-PL-02 | PLANT-08 | Plant details response JSON schema | Pass |
| REQ-PL-01 | View plant list | SC-PL-01 | PLANT-09 | Multiple sequential API requests | Pass |
| REQ-PL-02 | View plant details | SC-PL-02 | PLANT-10 | Plant details accessible for guest user | Pass |
| REQ-PL-02 | View plant details | SC-PL-02 | PLANT-11 | Plant details accessible for logged-in user | Pass |
| REQ-PL-01 | View plant list | SC-PL-01 | PLANT-12 | Large dataset response handling | Pass |
| REQ-PL-03 | Search by name | SC-PL-03 | PLANT-13 | Search plants by name – exact match | Pass |
| REQ-PL-03 | Search by name | SC-PL-03 | PLANT-13b | Search plants by name – partial match | Pass |
| REQ-PL-03 | Search by name | SC-PL-03 | PLANT-13c | Search plants by name – case insensitive | Pass |
| REQ-PL-03 | Search by name | SC-PL-03 | PLANT-13d | Search does not match latin name | Pass |
| REQ-PL-04 | Filter by attributes | SC-PL-04 | PLANT-14 | Filter by single attribute – species | Pass |
| REQ-PL-04 | Filter by attributes | SC-PL-04 | PLANT-14b | Filter by single attribute – soil type | Pass |
| REQ-PL-04 | Filter by attributes | SC-PL-04 | PLANT-14c | Filter by lifespan – perennial | Pass |
| REQ-PL-04 | Filter by attributes | SC-PL-04 | PLANT-14d | Filter by multiple attributes combined | Pass |
| REQ-PL-05 | No results scenario | SC-PL-05 | PLANT-15 | No results for impossible filter combination | Pass |
| REQ-PL-07 | Plant data integrity | SC-PL-07 | PLANT-16 | Plant data integrity | Pass |

---

## FAVORITES – Favorite Plants

| Requirement ID | Feature | Scenario ID | Test Case ID | Test Title | Status |
|---|---|---|---|---|---|
| REQ-FAV-01 | Add plant to favorites | SC-FAV-01 | FAV-01 | Add plant to favorites via UI | Pass |
| REQ-FAV-01 | Add plant to favorites | SC-FAV-01 | FAV-02 | Add plant to favorites via API | Pass |
| REQ-FAV-04 | Prevent duplicate favorites | SC-FAV-04 | FAV-03 | Add duplicate plant via API | Pass |
| REQ-FAV-05 | Favorites access protection | SC-FAV-05 | FAV-04 | Add plant to favorites without login | Pass |
| REQ-FAV-04 | Prevent duplicate favorites | SC-FAV-04 | FAV-05 | Add plant with invalid plant ID format | Fail – BUG-002 |
| REQ-FAV-04 | Prevent duplicate favorites | SC-FAV-04 | FAV-06 | Add plant with non-existing plant ID | Pass |
| REQ-FAV-04 | Prevent duplicate favorites | SC-FAV-04 | FAV-07 | Add plant with invalid user ID format | Pass |
| REQ-FAV-03 | View favorites list | SC-FAV-03 | FAV-08 | View favorites via UI | Pass |
| REQ-FAV-03 | View favorites list | SC-FAV-03 | FAV-09 | Retrieve favorites via API | Pass |
| REQ-FAV-03 | View favorites list | SC-FAV-03 | FAV-10 | Retrieve favorites when list is empty | Pass |
| REQ-FAV-05 | Favorites access protection | SC-FAV-05 | FAV-11 | Retrieve favorites without login | Pass |
| REQ-FAV-02 | Remove plant from favorites | SC-FAV-02 | FAV-12 | Remove plant from favorites via UI | Pass |
| REQ-FAV-02 | Remove plant from favorites | SC-FAV-02 | FAV-13 | Remove plant from favorites via API | Pass |
| REQ-FAV-02 | Remove plant from favorites | SC-FAV-02 | FAV-14 | Remove plant not in favorites via API | Pass |
| REQ-FAV-05 | Favorites access protection | SC-FAV-05 | FAV-15 | Remove plant from favorites without login | Pass |
| REQ-FAV-06 | Favorites persistence | SC-FAV-06 | FAV-16 | Favorites persist after logout and login | Pass |
| REQ-FAV-06 | Favorites persistence | SC-FAV-06 | FAV-17 | Favorites are isolated per user | Pass |
| REQ-FAV-06 | Favorites persistence | SC-FAV-06 | FAV-18 | Add multiple plants to favorites | Pass |
| REQ-FAV-02 | Remove plant from favorites | SC-FAV-02 | FAV-19 | Remove one plant from multiple favorites | Pass |

---

## GARDEN CREATOR – Garden Planning

| Requirement ID | Feature | Scenario ID | Test Case ID | Test Title | Status |
|---|---|---|---|---|---|
| REQ-GC-01 | Upload garden image | SC-GC-01 | GC-01 | Upload valid PNG garden image | Not executed |
| REQ-GC-01 | Upload garden image | SC-GC-01 | GC-02 | Upload valid JPG garden image | Not executed |
| REQ-GC-02 | Upload validation | SC-GC-02 | GC-03 | Upload invalid file format – TXT | Not executed |
| REQ-GC-02 | Upload validation | SC-GC-02 | GC-04 | Upload invalid file format – PDF | Not executed |
| REQ-GC-01 | Upload garden image | SC-GC-01 | GC-05 | Upload large image file (>10MB) | Not executed |
| REQ-GC-03 | Add plant to garden layout | SC-GC-03 | GC-06 | Drag single plant onto canvas | Not executed |
| REQ-GC-06 | Create garden layout | SC-GC-06 | GC-07 | Drag multiple plants onto canvas | Not executed |
| REQ-GC-05 | Move plants on canvas | SC-GC-05 | GC-08 | Move plant to new position on canvas | Not executed |
| REQ-GC-04 | Remove plant from layout | SC-GC-04 | GC-09 | Remove plant from canvas | Not executed |
| REQ-GC-07 | Export garden plan | SC-GC-07 | GC-10 | Export garden plan with plants | Not executed |
| REQ-GC-09 | Empty garden export | SC-GC-09 | GC-11 | Export empty garden (no plants) | Not executed |
| REQ-GC-08 | Generate plant list | SC-GC-08 | GC-12 | Generate plant list from layout | Not executed |
| REQ-GC-08 | Generate plant list | SC-GC-08 | GC-13 | Generate plant list for empty garden | Not executed |
| REQ-GC-07 | Export garden plan | SC-GC-07 | GC-14 | Export after multiple layout edits | Not executed |
| REQ-GC-10 | Canvas boundary control | SC-GC-10 | GC-15 | Canvas boundary control | Not executed |
| REQ-GC-06 | Create garden layout | SC-GC-06 | GC-16 | Refresh page with created garden | Not executed |
| REQ-GC-06 | Create garden layout | SC-GC-06 | GC-17 | Large number of plants on canvas | Not executed |