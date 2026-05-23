import validInputs from "../test-data/valid-inputs.json";
import { randomUUID } from "crypto";
import { RegisterPayload } from "../models/auth.types";

export function generateUserData(): RegisterPayload {
    return {
        email: `user_${randomUUID()}@gardener.playwright.test`,
        password: validInputs.validPassword,
    };
}