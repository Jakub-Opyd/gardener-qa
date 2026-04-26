import { test, expect } from "../../fixtures";
import valid from "../../test-data/valid-inputs.json";
import invalid from "../../test-data/invalid-inputs.json";

test.describe("AUTH - API Functional & Security Verification", () => {

    test("AUTH-01: Register new user", async ({ authApi }) => {
        const email = `user_${Date.now()}@gardener.playwright.test`;
        const response = await authApi.register({ email, password: valid.validPassword });

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.userId).toBeTruthy();
        expect(body.email).toBe(email);
        expect(body.token.length).toBeGreaterThan(50);
        expect(body).not.toHaveProperty('password');
    });

    test("AUTH-02: Register with existing email", async ({ authApi, apiUser }) => {
        const response = await authApi.register({ email: apiUser.email, password: valid.validPassword });
        expect(response.status()).toBe(409);
        const body = await response.json();
        expect(body.error).toContain("User with this email already exists.");
    });

    test("AUTH-03: Register with invalid email format (BUG-004)", async ({ authApi }) => {
        const response = await authApi.register({ email: invalid.invalidEmail, password: valid.validPassword });
        expect(response.status(), "Expected 400 Bad Request but got 500 Internal Server Error - potential server crash").toBe(400);
    });

    test("AUTH-04: Register with empty email", async ({ authApi }) => {
        const response = await authApi.register({ email: "", password: valid.validPassword });
        expect(response.status()).toBe(400);
    });

    test("AUTH-05: Register with empty password", async ({ authApi }) => {
        const response = await authApi.register({ email: `user_${Date.now()}@gardener.playwright.test`, password: "" });
        expect(response.status()).toBe(400);
    });

    test("AUTH-06: Register with short password (BUG-006)", async ({ authApi }) => {
        const response = await authApi.register({ email: `user_${Date.now()}@gardener.playwright.test`, password: invalid.shortPassword });
        expect(response.status()).toBe(400);
    });

    test("AUTH-07: Register with long password (BUG-001)", async ({ authApi }) => {
        const response = await authApi.register({ email: `user_${Date.now()}@gardener.playwright.test`, password: invalid.longPassword });
        expect(response.status(), "Password should be validated for max length").toBe(400);
    });

    test("AUTH-08: Register with spaces-only email (BUG-004)", async ({ authApi }) => {
        const response = await authApi.register({ email: "   ", password: valid.validPassword });
        expect(response.status(), "Expected 400 Bad Request but got 500 Internal Server Error - potential server crash").toBe(400);
    });

    test("AUTH-09/10: Injection payloads (BUG-005)", async ({ authApi }) => {
        const payloads = ["' OR 1=1 --", "<script>alert('xss')</script>"];
        for (const payload of payloads) {
            const response = await authApi.register({ email: payload, password: valid.validPassword });
            expect(response.status(), "Expected 400 Bad Request but got 500 Internal Server Error - potential server crash").toBe(400);
        }
    });
});

test.describe("Gardener - AUTH API Login", () => {

    test("AUTH-11: Successful login", async ({ authApi, apiUser }) => {
        const response = await authApi.login({ email: apiUser.email, password: valid.validPassword });
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.userId).toBeTruthy();
        expect(body.email).toBe(apiUser.email);
        expect(body.token.length).toBeGreaterThan(50);
        expect(body).not.toHaveProperty('password');
    });

    test("AUTH-12: Login with wrong password", async ({ authApi, apiUser }) => {
        const response = await authApi.login({ email: apiUser.email, password: invalid.invalidPassword });
        expect(response.status()).toBe(401);
    });

    test("AUTH-13: Login with non-existing email", async ({ authApi }) => {
        const response = await authApi.login({ email: invalid.notExistingEmail, password: valid.validPassword });
        expect(response.status()).toBe(401);
    });

    test("AUTH-16: Login with empty form", async ({ authApi }) => {
        const response = await authApi.login({ email: "", password: "" });
        expect(response.status()).toBe(400);
    });

    test("AUTH-19: Multiple failed login attempts", async ({ authApi, apiUser }) => {
        for (let i = 0; i < 3; i++) {
            const response = await authApi.login({ email: apiUser.email, password: invalid.invalidPassword });
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
        const email = `user_${Date.now()}@gardener.playwright.test`;
        const pass = valid.validPassword;

        const regRes = await authApi.register({ email, password: pass });
        expect(regRes.status()).toBe(201);

        const loginRes = await authApi.login({ email, password: pass });
        expect(loginRes.status()).toBe(200);
    });
});