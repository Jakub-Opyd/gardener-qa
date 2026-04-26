import { test, expect } from "../../fixtures";
import plants from "../../test-data/plants.json"

test.describe("FAVORITES - UI Management Coverage (FAV 01, 08, 12)", () => {

    test("FAV-01 - Add plant to favorites via UI", async ({ dynamicUser, plantPage, favoritePage }) => {
        await plantPage.open();
        const plantCard = plantPage.getPlantCardByName(plants.plantA.name);
        await plantCard.toggleFavorite();
        await favoritePage.open();
        await expect(favoritePage.getPlantCardByName(plants.plantA.name).cardTitle).toBeVisible();
    });

    test("FAV-08 - Display plant from favorites via UI", async ({ dynamicUser, request, favoritePage }) => {
        const userId = await dynamicUser.evaluate(() => sessionStorage.getItem("userId"));
        const token = await dynamicUser.evaluate(() => sessionStorage.getItem("token"));

        await request.post(`${process.env.API_URL}/users/${userId}/favorites/${plants.plantA.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        await favoritePage.open();
        await expect(favoritePage.plantCards).toHaveCount(1);
    });

    test("FAV-12 - Remove plant from favorites via UI", async ({ dynamicUser, request, favoritePage }) => {
        const userId = await dynamicUser.evaluate(() => sessionStorage.getItem("userId"));
        const token = await dynamicUser.evaluate(() => sessionStorage.getItem("token"));

        await request.post(`${process.env.API_URL}/users/${userId}/favorites/${plants.plantA.id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        await favoritePage.open();
        const plantCard = favoritePage.getPlantCardByName(plants.plantA.name);
        await plantCard.toggleFavorite();
        await expect(favoritePage.plantCards).toHaveCount(0);
    });
});