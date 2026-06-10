import { AuthService } from "../api/auth.service";
import { Page } from "@playwright/test";
import { generateUserData } from "../factories/user.factory";
import { AuthResponse } from "../models/auth/auth.responses";

export async function createDynamicUser(authApi: AuthService): Promise<AuthResponse> {
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

export async function injectSession(page: Page, user: AuthResponse) {
    await page.goto("/");

    await page.evaluate((user) => {
        sessionStorage.setItem("userId", user.userId);
        sessionStorage.setItem("email", user.email);
        sessionStorage.setItem("token", user.token);
    }, user);

    await page.goto("/");
}