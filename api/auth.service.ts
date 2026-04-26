import { APIRequestContext } from "@playwright/test";
import { LoginPayload, RegisterPayload } from "../models/auth.types";

export class AuthService {
    constructor(private request: APIRequestContext) { }

    async login(credentials: LoginPayload) {
        return await this.request.post("/auth/login", { data: credentials });
    }

    async register(credentials: RegisterPayload) {
        return await this.request.post("/auth/register", { data: credentials });
    }
}