import { test, expect } from "../../fixtures";
import { createValidUser } from "../../factories/auth/auth.factory";
import { SEEDED_USERS } from "../../test-data/auth/seeded-users";
import { VALID_PASSWORD } from "../../test-data/shared/validation.constants";
import { SEEDED_PLANTS } from "../../test-data/plants/seeded-plants";
import { setupApiMocks } from "../../helpers/mock-api.helper";

test.describe("GUI Smoke Tests @smoke @mocked", () => {
    test.beforeEach(async ({ page }) => {
        await setupApiMocks(page);
    })

    test.describe("AUTH", () => {
        test('AUTH-01: Registration - success flow', async ({ registerPage, page }) => {
            await registerPage.open();
            const user = createValidUser();

            await registerPage.register({ ...user, repeatPassword: user.password });
            await expect(page).toHaveURL("/");
        });
        test('AUTH-11: Login - success flow', async ({ loginPage, page }) => {
            await loginPage.open();
            await loginPage.login(SEEDED_USERS.user1.email, VALID_PASSWORD);
            await expect(page).toHaveURL("/");
        });
        test('AUTH-18: Access protection - direct link to /my-plants without login', async ({ page }) => {
            await page.goto("/my-plants");
            await expect(page.getByText("Aby korzystać z zakładki moje rośliny musisz być zalogowany")).toBeVisible();
        });
    });

    test.describe("FAVORITES", () => {
        test("FAV-01 - Add plant to favorites via UI", async ({ guiUser, plantPage, favoritePage }) => {
            await plantPage.open();
            const plantCard = plantPage.getPlantCardByName(SEEDED_PLANTS.hosta.name);
            await plantCard.toggleFavorite();
            await favoritePage.open();
            await expect(favoritePage.getPlantCardByName(SEEDED_PLANTS.lavender.name).cardTitle).toBeVisible();
        });
        test("FAV-12 - Remove plant from favorites via UI", async ({ guiUser, request, favoritePage }) => {
            const { user } = guiUser;

            await favoritePage.open();
            const plantCard = favoritePage.getPlantCardByName(SEEDED_PLANTS.lavender.name);
            await plantCard.toggleFavorite();
            await expect(favoritePage.plantCards).toHaveCount(0);
        });
    });

    test.describe("PLANT", () => {
        test("PLANT-02: Display plant list for Unauthorized user", async ({ plantPage }) => {
            await plantPage.open();
            await plantPage.waitForData();
            const count = await plantPage.getPlantsCount();
            expect(count).toBeGreaterThan(0);

            const plantA = plantPage.getPlantCardByName(SEEDED_PLANTS.lavender.name);
            await expect(plantA.cardTitle).toBeVisible();
        });
        test("PLANT-03: Display plant list for Authorized user", async ({ plantPage, guiUser }) => {
            await plantPage.open();
            await plantPage.waitForData();
            const count = await plantPage.getPlantsCount();
            expect(count).toBeGreaterThan(0);

            const plantA = plantPage.getPlantCardByName(SEEDED_PLANTS.lavender.name);
            await expect(plantA.cardTitle).toBeVisible();
        });
    });
});