import { test } from "../../fixtures";
import { checkAccessibility } from "../../helpers/a11y.helpers";

test("A11Y-01 Home page should not contain accessibility violations", async ({ page, homePage }) => {
    await homePage.open();
    await checkAccessibility(page, "home-page");
});

test("A11Y-02 Login page should not contain accessibility violations", async ({ page, loginPage }) => {
    await loginPage.open();
    await checkAccessibility(page, "login-page");
});

test("A11Y-03 Register page should not contain accessibility violations", async ({ page, registerPage }) => {
    await registerPage.open();
    await checkAccessibility(page, "register-page");
});

test("A11Y-04 Plants encyklopedy page should not contain accessibility violations", async ({ page, plantPage }) => {
    await plantPage.open();
    await checkAccessibility(page, "plant-page");
});

test("A11Y-05 Favorites plants page should not contain accessibility violations", async ({ guiUser, page, favoritePage }) => {
    await favoritePage.open();
    await checkAccessibility(page, "favorite-page");
});

test("A11Y-06 Plant page should not contain accessibility violations", async ({ page, plantPage, plantInfoPage }) => {
    await plantPage.open();
    await plantPage.waitForData();

    const plant = plantPage.getFirstPlantCard();

    await plant.openDetails();

    await plantInfoPage.waitForLoad();

    await page.addStyleTag({
        content: `
        *,
        *::before,
        *::after {
            animation: none !important;
            transition: none !important;
        }
    `,
    });

    await checkAccessibility(page, "plant-info-page");
});