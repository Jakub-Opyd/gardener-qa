import { test as base, Page } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { RegisterPage } from "./pages/register.page";
import { PlantPage } from "./pages/plant.page";
import { PlantInfoPage } from "./pages/plant-info.page";
import { FavoritePage } from "./pages/favorite.page";
import { HomePage } from "./pages/home.page";

async function loginViaApi(page: Page) {
    const response = await page.request.post(process.env.API_URL + "/auth/login", {
        data: {
            email: process.env.TEST_USER1_EMAIL,
            password: process.env.TEST_USER1_PASSWORD
        }
    });

    const { userId, email, token } = await response.json();

    await page.goto(process.env.BASE_URL!);
    await page.evaluate(({ userId, email, token }) => {
        sessionStorage.setItem("userId", userId);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("token", token);
    }, { userId, email, token });
}

type Fixtures = {
    authenticatedPage: Page;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    plantPage: PlantPage;
    plantInfoPage: PlantInfoPage;
    favoritePage: FavoritePage;
    homePage: HomePage;
};

export const test = base.extend<Fixtures>({
    authenticatedPage: async ({ page }, use) => {
        await loginViaApi(page);
        await use(page);
    },
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    registerPage: async ({ page }, use) => {
        await use(new RegisterPage(page));
    },
    plantPage: async ({ page }, use) => {
        await use(new PlantPage(page));
    },
    plantInfoPage: async ({ page }, use) => {
        await use(new PlantInfoPage(page));
    },
    favoritePage: async ({ page }, use) => {
        await use(new FavoritePage(page));
    },
    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },
});

export { expect } from "@playwright/test";