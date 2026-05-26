import { test, expect } from "../../fixtures";
import { SEEDED_PLANTS } from "../../test-data/plants/seeded-plants";

test.describe("FAVORITES - UI Management Coverage (FAV 01, 08, 12) @regression @ui @favorites", () => {

    test("FAV-01 - Add plant to favorites via UI @smoke", async ({ guiUser, plantPage, favoritePage }) => {
        await plantPage.open();
        const plantCard = plantPage.getPlantCardByName(SEEDED_PLANTS.lavender.name);
        await plantCard.toggleFavorite();
        await favoritePage.open();
        await expect(favoritePage.getPlantCardByName(SEEDED_PLANTS.lavender.name).cardTitle).toBeVisible();
    });

    test("FAV-08 - Display plant from favorites via UI @sanity", async ({ guiUser, request, favoritePage }) => {
        const { user } = guiUser;

        await request.post(`${process.env.API_URL}/users/${user.userId}/favorites/${SEEDED_PLANTS.lavender._id}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });

        await favoritePage.open();
        await expect(favoritePage.plantCards).toHaveCount(1);
    });

    test("FAV-12 - Remove plant from favorites via UI @smoke", async ({ guiUser, request, favoritePage }) => {
        const { user } = guiUser;

        await request.post(`${process.env.API_URL}/users/${user.userId}/favorites/${SEEDED_PLANTS.lavender._id}`, {
            headers: { 'Authorization': `Bearer ${user.token}` }
        });

        await favoritePage.open();
        const plantCard = favoritePage.getPlantCardByName(SEEDED_PLANTS.lavender.name);
        await plantCard.toggleFavorite();
        await expect(favoritePage.plantCards).toHaveCount(0);
    });
});