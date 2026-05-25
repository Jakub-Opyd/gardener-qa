import { test, expect } from "../../fixtures";
import { createEmptyEmailUser, createEmptyPasswordUser, createInvalidEmailUser, createLongPasswordUser, createScriptInjectionUser, createShortPasswordUser, createSpacesOnlyEmailUser, createValidUser } from "../../factories/auth/auth.factory";
import { SEEDED_USERS } from "../../test-data/auth/seeded-users";
import { VALID_PASSWORD } from "../../test-data/shared/validation.constants";
import { EMPTY_EMAIL, EMPTY_PASSWORD, INVALID_PASSWORD, NON_EXISTING_EMAIL } from "../../test-data/auth/auth.constants";

test.describe("AUTH - API Functional & Security Verification", () => {

    test("AUTH-01: Register new user", async ({ authApi }) => {
        const user = createValidUser();
        const response = await authApi.register(user);

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.userId).toBeTruthy();
        expect(body.email).toBe(user.email);
        expect(body.token.length).toBeGreaterThan(50);
        expect(body).not.toHaveProperty('password');
    });

    test("AUTH-02: Register with existing email", async ({ authApi, apiUser }) => {
        const response = await authApi.register({ email: SEEDED_USERS.user1.email, password: VALID_PASSWORD });
        expect(response.status()).toBe(409);
        const body = await response.json();
        expect(body.error).toContain("User with this email already exists.");
    });

    test("AUTH-03: Register with invalid email format (BUG-004)", async ({ authApi }) => {
        const user = createInvalidEmailUser();
        const response = await authApi.register(user);
        expect(response.status(), "Expected 400 Bad Request but got 500 Internal Server Error - potential server crash").toBe(400);
    });

    test("AUTH-04: Register with empty email", async ({ authApi }) => {
        const user = createEmptyEmailUser();
        const response = await authApi.register(user);
        expect(response.status()).toBe(400);
    });

    test("AUTH-05: Register with empty password", async ({ authApi }) => {
        const user = createEmptyPasswordUser();
        const response = await authApi.register(user);
        expect(response.status()).toBe(400);
    });

    test("AUTH-06: Register with short password (BUG-006)", async ({ authApi }) => {
        const user = createShortPasswordUser();
        const response = await authApi.register(user);
        expect(response.status()).toBe(400);
    });

    test("AUTH-07: Register with long password (BUG-001)", async ({ authApi }) => {
        const user = createLongPasswordUser();
        const response = await authApi.register(user);
        expect(response.status(), "Password should be validated for max length").toBe(400);
    });

    test("AUTH-08: Register with spaces-only email (BUG-004)", async ({ authApi }) => {
        const user = createSpacesOnlyEmailUser();
        const response = await authApi.register(user);
        expect(response.status(), "Expected 400 Bad Request but got 500 Internal Server Error - potential server crash").toBe(400);
    });

    test("AUTH-09/10: Injection payloads (BUG-005)", async ({ authApi }) => {
        const payloads = ["' OR 1=1 --", "<script>alert('xss')</script>"];
        for (const payload of payloads) {
            const response = await authApi.register({ email: payload, password: VALID_PASSWORD });
            expect(response.status(), "Expected 400 Bad Request but got 500 Internal Server Error - potential server crash").toBe(400);
        }
    });
});

test.describe("Gardener - AUTH API Login", () => {

    test("AUTH-11: Successful login", async ({ authApi, apiUser }) => {
        const response = await authApi.login({ email: apiUser.email, password: VALID_PASSWORD });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.userId).toBeTruthy();
        expect(body.email).toBe(apiUser.email);
        expect(body.token.length).toBeGreaterThan(50);
        expect(body).not.toHaveProperty('password');
    });

    test("AUTH-12: Login with wrong password", async ({ authApi, apiUser }) => {
        const response = await authApi.login({ email: apiUser.email, password: INVALID_PASSWORD });
        expect(response.status()).toBe(401);
    });

    test("AUTH-13: Login with non-existing email", async ({ authApi }) => {
        const response = await authApi.login({ email: NON_EXISTING_EMAIL, password: VALID_PASSWORD });
        expect(response.status()).toBe(401);
    });

    test("AUTH-16: Login with empty form", async ({ authApi }) => {
        const response = await authApi.login({ email: EMPTY_EMAIL, password: EMPTY_PASSWORD });
        expect(response.status()).toBe(400);
    });

    test("AUTH-19: Multiple failed login attempts", async ({ authApi, apiUser }) => {
        for (let i = 0; i < 3; i++) {
            const response = await authApi.login({ email: apiUser.email, password: INVALID_PASSWORD });
            expect(response.status()).toBe(401);
        }
    });
});

test.describe("Gardener - AUTH API Session & Security", () => {

    test("AUTH-17: Session persists after authenticated request", async ({ apiUser, favoritesApi }) => {
        const response = await favoritesApi.getFavorites(apiUser.userId, apiUser.token);
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(Array.isArray(body.plants)).toBeTruthy();
        expect(typeof body.count).toBe('number');
        expect(body.count).toBe(0);
        expect(body.plants.length).toBe(0);
        expect(body.plants.length).toBe(body.count);
    });

    test("AUTH-18: Access protected endpoint without login", async ({ favoritesApi }) => {
        const response = await favoritesApi.getFavorites("any-random-id", "");
        expect(response.status()).toBe(401);
    });

    test("AUTH-20: Login immediately after registration", async ({ authApi }) => {
        const user = createValidUser();
        const regRes = await authApi.register(user);
        expect(regRes.status()).toBe(201);

        const loginRes = await authApi.login(user);
        expect(loginRes.status()).toBe(200);
    });
});