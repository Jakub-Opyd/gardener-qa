import { test, expect } from "../fixtures";
import invalidInputs from "../../test-data/invalid-inputs.json";
import plants from "../../test-data/plants.json";

test.describe("Plant encyclopedia", () => {

    test("should display plant list", async ({ plantPage }) => {
        await plantPage.open();
        await plantPage.waitForData();

        await expect(plantPage.plantCards.first()).toBeVisible();
    });

    test("should filter plants by search", async ({ plantPage }) => {
        await plantPage.open();
        await plantPage.waitForData();

        await plantPage.search(plants.plantA.name);

        const card = plantPage.getPlantCardByName(plants.plantA.name);

        await expect(card.cardTitle).toBeVisible();
    });

    test("should return no results for invalid search", async ({ plantPage, page }) => {
        await plantPage.open();
        await plantPage.waitForData();

        await plantPage.search(invalidInputs.invalidPlantId);

        await expect(plantPage.plantCards).toHaveCount(0);
        await expect(page.getByText("Nie odnaleziono żadnej rośliny")).toBeVisible();
    });

    test("should display plant details for all expected fields", async ({ plantPage, plantInfoPage, page }) => {
        await plantPage.open();
        await plantPage.waitForData();

        const card = plantPage.getPlantCardByName(plants.plantA.name);
        await expect(card.detailsButton).toBeVisible();
        await card.openDetails();
        await expect(page).toHaveURL(`/plant/${plants.plantA.id}`);
        await plantInfoPage.waitForLoad();

        await expect(plantInfoPage.name).toBeVisible();
        await expect(plantInfoPage.latinName).toBeVisible();
        await expect(plantInfoPage.image).toBeVisible();
        await expect(plantInfoPage.careDescription).toBeVisible();
        await expect(plantInfoPage.stats).toBeVisible();
    });

});