import { test, expect } from "../../fixtures";
import { createEmptyEmailUser, createEmptyPasswordUser, createInvalidEmailUser, createLongPasswordUser, createScriptInjectionUser, createShortPasswordUser, createSpacesOnlyEmailUser, createValidUser } from "../../factories/auth/auth.factory";
import { SEEDED_USERS } from "../../test-data/auth/seeded-users";
import { VALID_PASSWORD } from "../../test-data/shared/validation.constants";
import { EMPTY_EMAIL, EMPTY_PASSWORD, INVALID_PASSWORD, NON_EXISTING_EMAIL } from "../../test-data/auth/auth.constants";

test.describe("AUTH - UI Full Coverage (AUTH-01 to AUTH-20) @ui @auth", () => {

    test.describe('Registration @regression', () => {

        test.beforeEach(async ({ registerPage }) => {
            await registerPage.open();
        });

        test('AUTH-01: Registration - success flow @smoke', async ({ registerPage, page }) => {
            const user = createValidUser();

            await registerPage.register({ ...user, repeatPassword: user.password });
            await expect(page).toHaveURL("/");
        });

        test('AUTH-02: Registration - existing email @sanity', async ({ registerPage }) => {
            const user = {
                email: SEEDED_USERS.user1.email,
                password: VALID_PASSWORD,
                repeatPassword: VALID_PASSWORD
            };
            await registerPage.register(user);
            await expect(registerPage.emailConflictError).toBeVisible();
        });

        test('AUTH-03: Registration - invalid email format', async ({ registerPage }) => {
            const user = createInvalidEmailUser();
            await registerPage.register({ ...user, repeatPassword: user.password });
            await expect(registerPage.emailError).toBeVisible();
        });

        test('AUTH-04: Registration - empty email', async ({ registerPage }) => {
            const user = createEmptyEmailUser();
            await registerPage.register({ ...user, repeatPassword: user.password });
            await expect(registerPage.emailError).toBeVisible();
        });

        test('AUTH-05: Registration - empty password', async ({ registerPage }) => {
            const user = createEmptyPasswordUser()
            await registerPage.register({ ...user, repeatPassword: user.password });
            await expect(registerPage.lengthPasswordError).toHaveCount(2)
        });

        test('AUTH-06: Registration - short password', async ({ registerPage }) => {
            const user = createShortPasswordUser();
            await registerPage.register({ ...user, repeatPassword: user.password });
            await expect(registerPage.lengthPasswordError).toHaveCount(2);
        });

        test('AUTH-07: Registration - long password (BUG-001) @security', async ({ registerPage }) => {
            const user = createLongPasswordUser();
            await registerPage.register({ ...user, repeatPassword: user.password });
            await expect(registerPage.lengthPasswordError).toBeVisible();
        });

        test('AUTH-08: Registration - spaces only email', async ({ registerPage }) => {
            const user = createSpacesOnlyEmailUser();
            await registerPage.register({ ...user, repeatPassword: user.password });
            await expect(registerPage.emailError).toBeVisible();
        });

        test('AUTH-9: Registration - passwords mismatch @sanity', async ({ registerPage }) => {
            const user = createValidUser();
            await registerPage.register({ ...user, repeatPassword: "OtherPass123!" });
            await expect(registerPage.repeatPasswordError).toBeVisible();
        });

        test('AUTH-10: Registration - script injection in email field @security', async ({ registerPage }) => {
            const user = createScriptInjectionUser();
            await registerPage.register({ ...user, repeatPassword: VALID_PASSWORD });
            await expect(registerPage.emailError).toBeVisible();
        });

        test('AUTH-20: Login flow - immediate login after account creation @sanity', async ({ registerPage, page }) => {
            const user = createValidUser();
            await registerPage.register({ ...user, repeatPassword: user.password });
            await expect(page).toHaveURL("/");
            await expect(page.getByRole("button", { name: "Wyloguj" })).toBeVisible();
        });
    });

    test.describe("Login & Session @regression", () => {

        test.beforeEach(async ({ loginPage }) => {
            await loginPage.open();
        });

        test('AUTH-11: Login - success flow @smoke', async ({ loginPage, page }) => {
            await loginPage.login(SEEDED_USERS.user1.email, VALID_PASSWORD);
            await expect(page).toHaveURL("/");
        });

        test('AUTH-12: Login - wrong password @security', async ({ loginPage }) => {
            await loginPage.login(SEEDED_USERS.user1.email, INVALID_PASSWORD);
            await expect(loginPage.loginError).toBeVisible();
        });

        test('AUTH-13: Login - non-existing user @security', async ({ loginPage }) => {
            await loginPage.login(NON_EXISTING_EMAIL, VALID_PASSWORD);
            await expect(loginPage.loginError).toBeVisible();
        });

        test('AUTH-14: Login - empty email', async ({ loginPage }) => {
            await loginPage.login(EMPTY_EMAIL, VALID_PASSWORD);
            await expect(loginPage.emailError).toBeVisible();
        });

        test('AUTH-15: Login - empty password @sanity', async ({ loginPage }) => {
            await loginPage.login(SEEDED_USERS.user1.email, EMPTY_PASSWORD);
            await expect(loginPage.passwordError).toBeVisible();
        });

        test('AUTH-16: Login - empty form @sanity', async ({ loginPage }) => {
            await loginPage.login(EMPTY_EMAIL, EMPTY_PASSWORD);
            await expect(loginPage.emailError).toBeVisible();
            await expect(loginPage.passwordError).toBeVisible();
        });

        test('AUTH-17: Session persistence - stays logged in after refresh @regression', async ({ loginPage, page }) => {
            await loginPage.login(SEEDED_USERS.user1.email, VALID_PASSWORD);
            await expect(page).toHaveURL("/");
            await expect(page.getByRole("button", { name: "Wyloguj" })).toBeVisible();
            await page.reload();
            await expect(page).toHaveURL("/");
            await expect(page.getByRole("button", { name: "Wyloguj" })).toBeVisible();
            await page.goto("/my-plants");
            await expect(page).toHaveURL("/my-plants");
            await expect(page.getByRole("heading", { name: "Ulubione rośliny" })).toBeVisible();
        });

        test('AUTH-19: Multiple failed login attempts (UX test) @security', async ({ loginPage }) => {
            for (let i = 0; i < 3; i++) {
                await loginPage.login(SEEDED_USERS.user1.email, INVALID_PASSWORD);
                await expect(loginPage.loginError).toBeVisible();
            }
        });
    });

    test('AUTH-18: Access protection - direct link to /my-plants without login @smoke', async ({ page }) => {
        await page.goto("/my-plants");
        await expect(page.getByText("Aby korzystać z zakładki moje rośliny musisz być zalogowany")).toBeVisible();
    });

});