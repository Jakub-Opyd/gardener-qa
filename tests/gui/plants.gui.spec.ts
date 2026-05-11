import { test, expect } from "../../fixtures";
import plants from "../../test-data/plants.json";

test.describe("PLANTS - UI Test Suite", () => {

    test.describe("Unauthorized user", () => {
        test.beforeEach(async ({ plantPage }) => {
            await plantPage.open();
            await plantPage.waitForData();
        });

        test("PLANT-02: Display plant list for Unauthorized user", async ({ plantPage }) => {
            const count = await plantPage.getPlantsCount();
            expect(count).toBeGreaterThan(0);

            const plantA = plantPage.getPlantCardByName(plants.plantA.name);
            await expect(plantA.cardTitle).toBeVisible();
        });

        test("PLANT-10: Plant details accessible for unauthorized user", async ({ plantPage, plantInfoPage }) => {
            const plantCard = plantPage.getPlantCardByName(plants.plantB.name);
            await plantCard.openDetails();

            await expect(plantInfoPage.page).toHaveURL(new RegExp(`/plant/${plants.plantB.id}`));
            await expect(plantInfoPage.name).toHaveText(plants.plantB.name);
        });

        test("PLANT-13a: Search finds existing plant by partial name", async ({ plantPage }) => {
            await plantPage.search("Funkia");

            const count = await plantPage.getPlantsCount();
            expect(count).toBeGreaterThan(0);
            const card = plantPage.getPlantCardByName("Hosta (Funkia)");
            await expect(card.cardTitle).toBeVisible();
        });

        test("PLANT-13c: Search is case-insensitive", async ({ plantPage }) => {
            await plantPage.search("hOsTa");

            const count = await plantPage.getPlantsCount();
            expect(count).toBe(1);
            await expect(plantPage.getPlantCardByName("Hosta (Funkia)").cardTitle).toBeVisible();
        });

        test("PLANT-14: Filter by single attribute - species", async ({ plantPage }) => {
            await plantPage.filters.toggleSpecies("Zioła");
            const count = await plantPage.getPlantsCount();
            expect(count).toBeGreaterThan(0);

            const allCards = await plantPage.plantCards.all();
            for (const card of allCards) {
                await expect(card).toContainText("Ziele");
            }
        });

        test("PLANT-14b: Filter by single attribute - soil type", async ({ plantPage }) => {

            await plantPage.filters.toggleSoil("Lessowa");
            const count = await plantPage.getPlantsCount();
            expect(count).toBeGreaterThan(0);

            const allCards = await plantPage.plantCards.all();
            for (const card of allCards) {
                await expect(card).toContainText("Lessowa");
            }
        });

        test.skip("PLANT-14c: Filter by lifespan - perennial", async ({ plantPage }) => {
            // SKIP: No differentiated data in DB (perennial only). Test impossible to fully verify.
            await plantPage.filters.setLifespan(3);

            const count = await plantPage.getPlantsCount();
            expect(count).toBeGreaterThan(0);

            const allCards = await plantPage.plantCards.all();
            for (const card of allCards) {
                await expect(card).toContainText("wieloroczna");
            }
        });

        test("PLANT-14d: Filter by multiple attributes combined (AND logic)", async ({ plantPage }) => {
            await plantPage.filters.toggleSpecies("Zioła");
            await plantPage.filters.toggleSoil("Uniwersalna");

            const allCards = await plantPage.plantCards.all();

            for (const card of allCards) {
                await expect(card).toContainText("Ziele");
                await expect(card).toContainText("Uniwersalna");
            }
        });


        test("PLANT-15: No results for impossible filter combination", async ({ plantPage }) => {
            await plantPage.filters.toggleSpecies("Drzewa");
            await plantPage.filters.toggleSoil("Torfowa");
            const count = await plantPage.getPlantsCount();
            expect(count).toEqual(0);
            expect(plantPage.page.getByRole("heading", { name: "Nie odnaleziono żadnej rośliny" })).toBeVisible();
        });

        test("PLANT-16: Plant card data integrity", async ({ plantPage, plantsApi }) => {
            const plantCard = plantPage.getPlantCardByName(plants.plantA.name);
            await plantCard.clickCard();

            const response = await plantsApi.getById(plants.plantA.id);
            const plantData = await response.json();

            await expect(plantCard.cardTitle).toContainText(plantData.name);
            const toxicityText = plantData.toxicity ? "toksyczna" : "nietoksyczna";
            await expect(plantCard.collapseContent).toContainText("Roślina " + toxicityText);
        });

    });

    test.describe("Authorized user", () => {
        test.beforeEach(async ({ authenticatedUser, plantPage }) => {
            await plantPage.open();
            await plantPage.waitForData();
        });

        test("PLANT-03: Display plant list for Authorized user", async ({ plantPage }) => {
            const count = await plantPage.getPlantsCount();
            expect(count).toBeGreaterThan(0);

            const plantA = plantPage.getPlantCardByName(plants.plantA.name);
            await expect(plantA.cardTitle).toBeVisible();
        });

        test("PLANT-11: Plant details accessible for authorized user", async ({ plantPage, plantInfoPage }) => {
            const plantCard = plantPage.getPlantCardByName(plants.plantB.name);
            await plantCard.openDetails();

            await expect(plantInfoPage.page).toHaveURL(new RegExp(`/plant/${plants.plantB.id}`));
            await expect(plantInfoPage.name).toHaveText(plants.plantB.name);
        });

    });

});