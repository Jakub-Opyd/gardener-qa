import { test, expect } from "../fixtures";
import invalidInputs from "../../test-data/invalid-inputs.json";
import users from "../../test-data/users.json";

test.describe('Authentication', () => {

    test.describe('Registration', () => {

        test('should register new user and redirect to home page', async ({ registerPage, page }) => {
            await registerPage.open();

            await registerPage.register(
                `newuser${Date.now()}@gardener.test`,
                "TestPass123!",
                "TestPass123!"
            );
            await expect(page).toHaveURL("/");

            // TODO: teardown user
        });

        test('should show error for invalid email format', async ({ registerPage }) => {
            await registerPage.open();

            await registerPage.register(
                invalidInputs.invalidEmail,
                "TestPass123!",
                "TestPass123!"
            );

            await expect(registerPage.emailError).toBeVisible();
        });

        test("should show error when password is too short", async ({ registerPage }) => {
            await registerPage.open();

            await registerPage.register(
                "newuser@gardener.test",
                invalidInputs.shortPassword,
                "TestPass123!"
            );

            await expect(registerPage.passwordError).toHaveCount(1);
        });

        test("should show error when both passwords are too short", async ({ registerPage }) => {
            await registerPage.open();

            await registerPage.register(
                "newuser@gardener.test",
                invalidInputs.shortPassword,
                invalidInputs.shortPassword
            );

            await expect(registerPage.passwordError).toHaveCount(2);
        });

        test('should show error for different passwords', async ({ registerPage }) => {
            await registerPage.open();

            await registerPage.register(
                "newuser@gardener.test",
                "TestPass123!",
                "TestFail123!"
            );

            await expect(registerPage.repeatPasswordError).toBeVisible();
        });

    });

    test.describe("Login", () => {

        test("should login with valid credentials and redirect to home page", async ({ loginPage, page }) => {
            await loginPage.open();

            await loginPage.login(
                users.testUser1.email,
                process.env.TEST_USER1_PASSWORD!
            );

            await expect(page).toHaveURL("/");
        });

        test("should show error for empty email", async ({ loginPage }) => {
            await loginPage.open();
            await loginPage.login("", "TestPass123!");
            await expect(loginPage.emailError).toBeVisible();
        });

        test("should show error for invalid credentials", async ({ loginPage }) => {
            await loginPage.open();

            await loginPage.login(
                "ghost@gardener.test",
                "WrongPass999!"
            );

            await expect(loginPage.loginError).toBeVisible();
        });

        test("should show error for invalid email format", async ({ loginPage }) => {
            await loginPage.open();

            await loginPage.login(
                invalidInputs.invalidEmail,
                "TestPass123!"
            );

            await expect(loginPage.emailError).toBeVisible();
        });

        test("should show error for too short password", async ({ loginPage }) => {
            await loginPage.open();

            await loginPage.login(
                process.env.TEST_USER1_EMAIL!,
                invalidInputs.shortPassword
            );

            await expect(loginPage.passwordError).toBeVisible();
        });

    });

});
