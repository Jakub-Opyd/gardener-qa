import { AuthService } from "../api/auth.service";
import { Page } from "@playwright/test";
import { AuthUser } from "../models/auth.types";
import { generateUserData } from "../factories/user.factory";

export async function createDynamicUser(authApi: AuthService): Promise<AuthUser> {
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

    return await response.json();
}

export async function injectSession(page: Page, user: AuthUser) {
    await page.goto("/");

    await page.evaluate((user) => {
        sessionStorage.setItem("userId", user.userId);
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("token", user.token);
    }, user);

    await page.goto("/");
}