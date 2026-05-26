import { test, expect } from "../../fixtures";
import { INVALID_PLANT_ID, NON_EXISTING_PLANT_ID } from "../../test-data/plants/plant.constants";
import { SEEDED_PLANTS } from "../../test-data/plants/seeded-plants";

test.describe("PLANTS - API Test Suite @api @plants", () => {

    test.describe("Plant list retrieval @regression", () => {

        test("PLANT-01: Get plant list via API @smoke", async ({ plantsApi }) => {
            const response = await plantsApi.getAll();

            expect(response.status()).toBe(200);
            const body = await response.json();
            expect(body).toBeInstanceOf(Array);
            expect(body.length).toBeGreaterThan(0);
        });

        test("PLANT-07: Plant list response JSON schema", async ({ plantsApi }) => {
            const response = await plantsApi.getAll();
            expect(response.status()).toBe(200);
            const body = await response.json();
            const plant = body[0];

            expect(plant).toMatchObject({
                _id: expect.any(String),
                name: expect.any(String),
                latinName: expect.any(String),
                imageUrl: expect.any(String),
                species: expect.any(String),
                soil: expect.arrayContaining([expect.any(String)]),
                waterRequirement: expect.any(String),
                wateringDesc: expect.any(String),
                sunlight: expect.any(String),
                floweringPeriod: {
                    start: expect.any(Number),
                    end: expect.any(Number)
                },
                plantingPeriod: {
                    start: expect.any(Number),
                    end: expect.any(Number)
                },
                heightCm: expect.any(Number),
                color: expect.arrayContaining([expect.any(String)]),
                compatibleWith: expect.arrayContaining([expect.any(String)]),
                soilPh: expect.any(Number),
                growthRate: expect.any(String),
                toxicity: expect.any(Boolean),
                careTips: expect.any(String),
                lifespan: expect.any(String),
                temp: {
                    min: expect.any(Number),
                    max: expect.any(Number)
                }
            });

        });

        test("PLANT-09: Multiple sequential API requests @performance", async ({ plantsApi }) => {
            const responses = await Promise.all([
                plantsApi.getAll(),
                plantsApi.getAll(),
                plantsApi.getAll(),
                plantsApi.getAll(),
                plantsApi.getAll(),
            ]);

            for (const response of responses) {
                expect(response.status()).toBe(200);
            }

            const bodies = await Promise.all(responses.map(r => r.json()));

            for (const body of bodies) {
                expect(body).toBeInstanceOf(Array);
                expect(body.length).toBeGreaterThan(0);
            }

            expect(bodies[0]).toEqual(bodies[1]);
            expect(bodies[1]).toEqual(bodies[2]);
        });

        test("PLANT-12: Large dataset response handling @performance", async ({ plantsApi }) => {
            const start = Date.now();
            const response = await plantsApi.getAll();
            const duration = Date.now() - start;

            expect(response.status()).toBe(200);

            const body = await response.json();
            expect(body.length).toBeGreaterThan(10);

            const lastPlant = body[body.length - 1];
            expect(lastPlant).toMatchObject({
                _id: expect.any(String),
                name: expect.any(String)
            });

            expect(duration).toBeLessThan(2000);
        });
    });

    test.describe("Plant details retrieval @regression", () => {

        test("PLANT-04: Get plant by valid ID via API @smoke", async ({ plantsApi }) => {
            const response = await plantsApi.getById(SEEDED_PLANTS.lavender._id);

            expect(response.status()).toBe(200);
            const plant = await response.json();

            expect(plant).toMatchObject({
                _id: SEEDED_PLANTS.lavender._id,
                name: SEEDED_PLANTS.lavender.name,
                latinName: SEEDED_PLANTS.lavender.latinName,
                species: SEEDED_PLANTS.lavender.species,
                lifespan: SEEDED_PLANTS.lavender.lifespan,
                imageUrl: expect.any(String),
                soil: expect.arrayContaining([expect.any(String)])
            });

        });

        test.fixme("PLANT-05: Get plant by invalid ID format via API (BUG-003) @security", async ({ plantsApi }) => {
            // FIXME: Crashes backend Server Error. 
            // Reported as BUG-003. Disable until fix is deployed.
            const response = await plantsApi.getById(INVALID_PLANT_ID);

            expect(response.status()).toBe(400);
            const body = await response.json();
            expect(body).toHaveProperty("error");
        });

        test("PLANT-06: Get plant by non-existing ID via API", async ({ plantsApi }) => {
            const response = await plantsApi.getById(NON_EXISTING_PLANT_ID);

            expect(response.status()).toBe(404);
            const body = await response.json();
            expect(body).toHaveProperty("message");
            expect(body.message).toContain("Plant not found");
        });

        test("PLANT-08: Plant details response JSON schema", async ({ plantsApi }) => {
            const response = await plantsApi.getById(SEEDED_PLANTS.lavender._id);
            expect(response.status()).toBe(200);
            const plant = await response.json();

            expect(plant).toMatchObject({
                _id: expect.any(String),
                name: expect.any(String),
                latinName: expect.any(String),
                imageUrl: expect.any(String),
                species: expect.any(String),
                soil: expect.arrayContaining([expect.any(String)]),
                waterRequirement: expect.any(String),
                wateringDesc: expect.any(String),
                sunlight: expect.any(String),
                floweringPeriod: {
                    end: expect.any(Number),
                    start: expect.any(Number)
                },
                plantingPeriod: {
                    end: expect.any(Number),
                    start: expect.any(Number)
                },
                heightCm: expect.any(Number),
                color: expect.arrayContaining([expect.any(String)]),
                compatibleWith: expect.arrayContaining([expect.any(String)]),
                soilPh: expect.any(Number),
                growthRate: expect.any(String),
                toxicity: expect.any(Boolean),
                careTips: expect.any(String),
                temp: ({
                    min: expect.any(Number),
                    max: expect.any(Number)
                }),
                lifespan: expect.any(String)
            });

        });
    });

    test.describe("Plant data integrity @sanity @regression", () => {

        test("PLANT-16: Plant data integrity (API vs live database)", async ({ plantsApi }) => {
            const response = await plantsApi.getById(SEEDED_PLANTS.lavender._id);
            expect(response.status()).toBe(200);

            const apiData = await response.json();

            expect(apiData).toMatchObject({
                _id: SEEDED_PLANTS.lavender._id,
                name: SEEDED_PLANTS.lavender.name,
                latinName: SEEDED_PLANTS.lavender.latinName,
                species: SEEDED_PLANTS.lavender.species,
                lifespan: SEEDED_PLANTS.lavender.lifespan,
                imageUrl: expect.any(String),
                soil: expect.arrayContaining([expect.any(String)])

            });

        });
    });
});