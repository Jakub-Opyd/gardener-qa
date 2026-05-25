import { randomUUID } from "crypto";

import {
    INVALID_EMAIL,
    SHORT_PASSWORD,
    LONG_PASSWORD,
    SPACES_ONLY_EMAIL,
    EMPTY_PASSWORD,
    EMPTY_EMAIL,
    XSSSCRIPT
} from "../../test-data/auth/auth.constants";

import {
    LoginPayload,
    RegisterPayload
} from "../../models/auth/auth.payloads.ts";

const VALID_PASSWORD = "TestPass123!";

export function createValidUser(): RegisterPayload {
    return {
        email: `user_${randomUUID()}@gardener.test`,
        password: VALID_PASSWORD
    };
}

export function createInvalidEmailUser(): RegisterPayload {
    return {
        email: INVALID_EMAIL,
        password: VALID_PASSWORD
    };
}

export function createShortPasswordUser(): RegisterPayload {
    return {
        email: `user_${randomUUID()}@gardener.test`,
        password: SHORT_PASSWORD
    };
}

export function createLongPasswordUser(): RegisterPayload {
    return {
        email: `user_${randomUUID()}@gardener.test`,
        password: LONG_PASSWORD
    };
}

export function createSpacesOnlyEmailUser(): RegisterPayload {
    return {
        email: SPACES_ONLY_EMAIL,
        password: VALID_PASSWORD
    };
}

export function createEmptyPasswordUser(): RegisterPayload {
    return {
        email: `user_${randomUUID()} @gardener.test`,
        password: EMPTY_PASSWORD
    };
}

export function createEmptyEmailUser(): RegisterPayload {
    return {
        email: EMPTY_EMAIL,
        password: VALID_PASSWORD
    };
}

export function createScriptInjectionUser(): RegisterPayload {
    return {
        email: XSSSCRIPT,
        password: VALID_PASSWORD
    }
}