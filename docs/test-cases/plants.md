# Gardener - PLANTS Test Cases

## Scope

Testing the Plant Encyclopedia module, including API endpoints and frontend views.

---

## Endpoints

- GET /plants
- GET /plants/id/:id

---

## Test Environment

- Frontend: `npm run build` + `npm run preview`
- Backend: `cd backend` + `npm run dev`
- Database: MongoDB Cloud
- Browser: Chromium

---

## Test Data Reference

### User Accounts

| Label | Email | Password |
|---|---|---|
| Test User 1 | `testuser1@gardener.test` | `TestPass123!` |
| Test User 2 | `testuser2@gardener.test` | `TestPass123!` |

### Plant IDs

| Label | Value | Notes |
|---|---|---|
| Valid plant ID (Plant A) | `696eb7a86b37e1e5e232a7b0` | Hosta (Funkia) - confirmed in DB |
| Valid plant ID (Plant B) | `696eb7a86b37e1e5e232a7b4` | Piwonia chińska (Paeonia lactiflora) - confirmed in DB |
| Non-existing plant ID | `000000000000000000000000` | Valid ObjectId format, no matching document |
| Invalid plant ID format | `invalid-id` | Not a valid ObjectId - should trigger 400 |

### Search & Filter Values

> **Note:** All filters are applied on the frontend only (client-side filtering of the full plant array returned by GET /plants). There are no filter query parameters on the API.

#### Search bar
| Label | Value | Notes |
|---|---|---|
| Search term - exact match | `Hosta` | Matches "Hosta (Funkia)" |
| Search term - partial match | `piwon` | Should match "Piwonia chińska" |
| Search term - lowercase | `hosta` | Should match (search is case-insensitive) |
| Search term - non-existing | `zzz-no-such-plant-zzz` | No results expected |

> Search filters by `name` field only. `latinName` is not searched.

#### Filters - UI labels vs API values

| UI Label | UI Option | API field | API value |
|---|---|---|---|
| Rośliny kwitnące | Zimą | `floweringPeriod.start` / `.end` | months 12, 1, 2 |
| Rośliny kwitnące | Wiosną | `floweringPeriod` | months 3, 4, 5 |
| Rośliny kwitnące | Latem | `floweringPeriod` | months 6, 7, 8 |
| Rośliny kwitnące | Jesienią | `floweringPeriod` | months 9, 10, 11 |
| Długość życia | 1 rok | `lifespan` | `annual` |
| Długość życia | 2 lata | `lifespan` | `biennial` |
| Długość życia | wieloroczne (2+) | `lifespan` | `perennial` |
| Rośliny sadzone | Zimą / Wiosną / Latem / Jesienią | `plantingPeriod` | months per season |
| Typ gleby | piaszczysta | `soil` | `sandy` |
| Typ gleby | Uniwersalna | `soil` | `loamy` |
| Typ gleby | Wapienna | `soil` | `chalky` |
| Typ gleby | Gliniasta | `soil` | `clay` |
| Typ gleby | Torfowa | `soil` | `peaty` |
| Typ gleby | Lessowa | `soil` | `silty` |
| Toksyczność | Bezpieczne | `toxicity` | `false` |
| Toksyczność | Toksyczne | `toxicity` | `true` |
| Rośliny | Drzewa | `species` | `tree` |
| Rośliny | Zioła | `species` | `herb` |
| Rośliny | Warzywa | `species` | `vegetable` |
| Rośliny | Krzewy | `species` | `shrub` |
| Rośliny | Kwiaty | `species` | `flower` |
| Rośliny | Owoce | `species` | `fruit` |

#### Filter test combinations

| Label | UI selection | Expected result |
|---|---|---|
| Single filter - species | Rośliny: [x] Zioła | Only `species: herb` plants displayed |
| Single filter - soil | Typ gleby: [x] Lessowa | Only plants with `soil` containing `silty` displayed |
| Single filter - toxicity | Toksyczność: [x] Bezpieczne | Only `toxicity: false` plants displayed |
| Single filter - lifespan | Długość życia: wieloroczne | Only `lifespan: perennial` plants displayed |
| Multi filter - species + soil | Rośliny: [x] Zioła + Typ gleby: [x] Universalna | Only `species: herb` AND `soil` contains `loamy` |
| Impossible combination | Rośliny: [x] Drzewa + Typ gleby: [x] Torfowa | Empty state displayed (no matching plants) |

### Expected Plant Object Structure (GET /plants/id/:id)

```json
{
  "_id": "696eb7a86b37e1e5e232a7b0",
  "name": "Hosta (Funkia)",
  "latinName": "Hosta",
  "imageUrl": "<url>",
  "species": "herb",
  "soil": ["loamy", "silty"],
  "waterRequirement": "medium",
  "wateringDesc": "<string>",
  "sunlight": "partial shade",
  "floweringPeriod": { "start": 7, "end": 8 },
  "plantingPeriod": { "start": 4, "end": 5 },
  "heightCm": 60,
  "color": ["<string>"],
  "compatibleWith": ["<string>"],
  "soilPh": 7,
  "growthRate": "medium",
  "toxicity": false,
  "careTips": "<string>",
  "lifespan": "perennial",
  "temp": { "min": -25, "max": 30 }
}
```

---

## Test Cases

| ID | Title | Objective | Preconditions | Test Steps | Test Data | Expected Result | Actual Result | Postconditions | Status | Severity | Related Scenario | Automation Ready |
|----|-------|-----------|---------------|------------|-----------|----------------|---------------|----------------|--------|---------|-----------------|-----------------|
| PLANT-01 | Get plant list via API | Verify API returns full list of plants | At least one plant exists in DB | 1. Send GET /plants request (no auth header) | none | HTTP 200, response body is a non-empty JSON array | TBD | None | Not executed | Major | SC-PL-01 | Yes |
| PLANT-02 | Plant list accessible for guest user | Verify unauthenticated users can view plant list | User not logged in | 1. Open application in browser without logging in 2. Navigate to plant encyclopedia page | no session | Plant list page loads, plants displayed correctly | TBD | None | Not executed | Major | SC-PL-01 | Yes |
| PLANT-03 | Plant list accessible for logged-in user | Verify authenticated users can view plant list | Logged in as `testuser1@gardener.test` | 1. Log in 2. Navigate to plant encyclopedia page | valid session | Plant list page loads, plants displayed correctly, no errors | TBD | None | Not executed | Major | SC-PL-01 | Yes |
| PLANT-04 | Get plant by valid ID via API | Verify API returns correct plant details for valid ID | Plant with known ID exists in DB | 1. Send GET /plants/id/:id using a valid plant ID | valid `_id` from DB | HTTP 200, response body contains correct plant data matching DB record | TBD | None | Not executed | Major | SC-PL-02 | Yes |
| PLANT-05 | Get plant by invalid ID format via API | Verify API returns error for malformed ID | None | 1. Send GET /plants/id/invalid-id | `invalid-id` | HTTP 400 Bad Request, error message in response body | TBD | None | Not executed | Minor | SC-PL-02 | Yes |
| PLANT-06 | Get plant by non-existing ID via API | Verify API returns 404 for unknown plant | None | 1. Send GET /plants/id/000000000000000000000000 | `000000000000000000000000` | HTTP 404 Not Found, error message in response body | TBD | None | Not executed | Minor | SC-PL-02 | Yes |
| PLANT-07 | Plant list response JSON schema | Verify response structure matches expected schema | At least one plant exists in DB | 1. Send GET /plants 2. Inspect response body | none | Each plant object contains required fields: `_id`, `name`, `type`, `soil` (and other expected fields); all fields have correct data types | TBD | None | Not executed | Major | SC-PL-01 | Yes |
| PLANT-08 | Plant details response JSON schema | Verify plant detail response structure | Plant with known ID exists in DB | 1. Send GET /plants/id/:id with valid ID 2. Inspect response body | valid plant ID | Response contains all expected plant fields with correct data types | TBD | None | Not executed | Major | SC-PL-02 | Yes |
| PLANT-09 | Multiple sequential API requests | Verify API stability under sequential requests | Backend is running | 1. Send GET /plants 5 times in sequence | none | All 5 responses return HTTP 200 with complete, identical plant lists | TBD | None | Not executed | Minor | SC-PL-01 | Yes |
| PLANT-10 | Plant details accessible for guest user | Verify unauthenticated users can view plant detail page | User not logged in | 1. Open application without logging in 2. Click on a plant in the list 3. Verify detail page loads | valid plant ID | Plant detail page rendered with all plant information visible, no errors | TBD | None | Not executed | Major | SC-PL-02 | Yes |
| PLANT-11 | Plant details accessible for logged-in user | Verify authenticated users can view plant detail page | Logged in as `testuser1@gardener.test` | 1. Log in 2. Click on a plant in the list 3. Verify detail page loads | valid session, valid plant ID | Plant detail page rendered with all plant information visible, no errors | TBD | None | Not executed | Major | SC-PL-02 | Yes |
| PLANT-12 | Large dataset response handling | Verify API handles large plant datasets | Many plants exist in DB | 1. Send GET /plants 2. Measure response completeness | none | HTTP 200, all plants returned, no timeout or truncation | TBD | None | Not executed | Minor | SC-PL-01 | Yes |
| PLANT-13 | Search plants by name - exact match | Verify search bar returns plants matching entered name | Plants exist in DB, user on plant list page | 1. Navigate to plant encyclopedia 2. Enter `Hosta` in the search bar 3. Observe displayed results | search term: `Hosta` | Only "Hosta (Funkia)" displayed; all other plants hidden | TBD | None | Not executed | Major | SC-PL-03 | Yes |
| PLANT-13b | Search plants by name - partial match | Verify search bar matches partial name input | Plants exist in DB, user on plant list page | 1. Navigate to plant encyclopedia 2. Enter `piwon` in the search bar 3. Observe displayed results | search term: `piwon` | "Piwonia chińska" displayed; non-matching plants hidden | TBD | None | Not executed | Major | SC-PL-03 | Yes |
| PLANT-13c | Search plants by name - case insensitive | Verify search is not case-sensitive | Plants exist in DB, user on plant list page | 1. Navigate to plant encyclopedia 2. Enter `hosta` (all lowercase) in the search bar 3. Observe displayed results | search term: `hosta` | "Hosta (Funkia)" displayed - same result as searching `Hosta` | TBD | None | Not executed | Minor | SC-PL-03 | Yes |
| PLANT-13d | Search does not match latin name | Verify search ignores `latinName` field | Plants exist in DB, user on plant list page | 1. Navigate to plant encyclopedia 2. Enter `Paeonia` in the search bar (latinName of Piwonia chińska) 3. Observe displayed results | search term: `Paeonia` | No results displayed - `latinName` is not searched | TBD | None | Not executed | Minor | SC-PL-03 | Yes |
| PLANT-14 | Filter by single attribute - species | Verify species checkbox filter returns matching plants | Plants exist in DB, user on plant list page | 1. Navigate to plant encyclopedia 2. Under "Rośliny" select "Zioła" 3. Observe displayed results | filter: Rośliny = Zioła (`species: herb`) | Only plants with `species: herb` displayed; trees, shrubs, flowers etc. hidden | TBD | None | Not executed | Major | SC-PL-04 | Yes |
| PLANT-14b | Filter by single attribute - soil type | Verify soil type checkbox filter returns matching plants | Plants exist in DB, user on plant list page | 1. Navigate to plant encyclopedia 2. Under "Typ gleby" select "Lessowa" 3. Observe displayed results | filter: Typ gleby = Lessowa (`soil: silty`) | Only plants with `silty` in their `soil` array displayed | TBD | None | Not executed | Major | SC-PL-04 | Yes |
| PLANT-14c | Filter by lifespan - perennial | Verify lifespan range filter returns matching plants | Plants exist in DB, user on plant list page | 1. Navigate to plant encyclopedia 2. Under "Długość życia" select "wieloroczne" 3. Observe displayed results | filter: Długość życia = wieloroczne (`lifespan: perennial`) | Only plants with `lifespan: perennial` displayed | TBD | None | Not executed | Major | SC-PL-04 | Yes |
| PLANT-14d | Filter by multiple attributes combined | Verify multiple active filters are applied together (AND logic) | Plants exist in DB, user on plant list page | 1. Navigate to plant encyclopedia 2. Under "Rośliny" select "Zioła" 3. Under "Typ gleby" select "Universalna" 4. Observe displayed results | filter: species=herb AND soil contains loamy | Only plants matching ALL selected criteria displayed | TBD | None | Not executed | Major | SC-PL-04 | Yes |
| PLANT-15 | No results for impossible filter combination | Verify empty state displayed when no plants match filters | User on plant list page | 1. Navigate to plant encyclopedia 2. Under "Rośliny" select "Drzewa" 3. Under "Typ gleby" select "Torfowa" 4. Observe displayed results | filter: species=tree AND soil=peaty (no matching plant in DB) | Empty state message displayed (e.g. "Brak roślin" or similar); no error, no spinner stuck | TBD | None | Not executed | Minor | SC-PL-05 | Yes |
| PLANT-16 | Plant data integrity | Verify data on plant detail page matches database | Plant with known ID exists in DB | 1. Retrieve plant data via GET /plants/id/:id 2. Open plant detail page in browser 3. Compare displayed values with API response | valid plant ID | All values on the detail page (name, type, soil, description, etc.) match the API response exactly | TBD | None | Not executed | Major | SC-PL-07 | Yes |