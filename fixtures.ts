import { APIRequestContext, test as base, Page } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { RegisterPage } from "./pages/register.page";
import { PlantPage } from "./pages/plant.page";
import { PlantInfoPage } from "./pages/plant-info.page";
import { FavoritePage } from "./pages/favorite.page";
import { HomePage } from "./pages/home.page";
import validInputs from "./test-data/valid-inputs.json";
import { AuthService } from "./api/auth.service";
import { FavoritesService } from "./api/favorites.service";
import { PlantsService } from "./api/plants.service";
import { randomUUID } from "crypto";
import { AuthUser } from "./models/auth.types";

const generateUserData = () => {
    return {
        email: `user_${randomUUID()}@gardener.playwright.test`,
        password: validInputs.validPassword
    };
};

async function createDynamicUser(authApi: AuthService) {
    const user = generateUserData();
    const response = await authApi.register(user);

    if (!response.ok()) {
        const body = await response.text();

        throw new Error(`
            Failed to create user.
            Status: ${response.status()}
            Body: ${body}
        `);
    }

    const { userId, email, token } = await response.json();
    return { userId, email, token };
}

async function injectSession(page: Page, user: AuthUser) {
    await page.goto("/");

    await page.evaluate((user) => {
        sessionStorage.setItem("userId", user.userId);
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("token", user.token);
    }, user);

    await page.goto("/");
}

type Fixtures = {
    apiContext: APIRequestContext;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    plantPage: PlantPage;
    plantInfoPage: PlantInfoPage;
    favoritePage: FavoritePage;
    homePage: HomePage;
    apiUser: AuthUser;
    guiUser: {
        page: Page;
        user: AuthUser;
    };
    authApi: AuthService;
    favoritesApi: FavoritesService;
    plantsApi: PlantsService;
};

export const test = base.extend<Fixtures>({
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
    apiContext: async ({ playwright }, use) => {
        const apiContext = await playwright.request.newContext({
            baseURL: process.env.API_URL,
        });

        await use(apiContext);

        await apiContext.dispose();
    },
    guiUser: async ({ page, authApi }, use) => {
        const user = await createDynamicUser(authApi);

        await injectSession(page, user);

        await use({ page, user });
    },
    apiUser: async ({ authApi }, use) => {
        const user = await createDynamicUser(authApi);
        await use(user);
    },
    authApi: async ({ apiContext }, use) => {
        await use(new AuthService(apiContext));
    },
    favoritesApi: async ({ apiContext }, use) => {
        await use(new FavoritesService(apiContext));
    },
    plantsApi: async ({ apiContext }, use) => {
        await use(new PlantsService(apiContext));
    },
});

export { expect } from "@playwright/test";