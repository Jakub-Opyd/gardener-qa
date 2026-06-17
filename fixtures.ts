import { APIRequestContext, test as base, Page } from "@playwright/test";
import { LoginPage } from "./pages/login.page";
import { RegisterPage } from "./pages/register.page";
import { PlantPage } from "./pages/plant.page";
import { PlantInfoPage } from "./pages/plant-info.page";
import { FavoritePage } from "./pages/favorite.page";
import { HomePage } from "./pages/home.page";
import { AuthService } from "./api/auth.service";
import { FavoritesService } from "./api/favorites.service";
import { PlantsService } from "./api/plants.service";
import { AuthResponse } from "./models/auth/auth.responses";
import { createDynamicUser, injectSession } from "./helpers/auth.helpers";
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

type Fixtures = {
    apiContext: APIRequestContext;
    loginPage: LoginPage;
    registerPage: RegisterPage;
    plantPage: PlantPage;
    plantInfoPage: PlantInfoPage;
    favoritePage: FavoritePage;
    homePage: HomePage;
    apiUser: AuthResponse;
    guiUser: {
        page: Page;
        user: AuthResponse;
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