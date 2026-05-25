import { randomUUID } from "crypto";
import { RegisterPayload } from "../models/auth/auth.payloads";
import { VALID_PASSWORD } from "../test-data/shared/validation.constants";

export function generateUserData(): RegisterPayload {
    return {
        email: `user_${randomUUID()}@gardener.playwright.test`,
        password: VALID_PASSWORD,
    };
}