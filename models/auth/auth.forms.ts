import { RegisterPayload } from "./auth.payloads";

export type RegisterFormData =
    RegisterPayload & {
        repeatPassword: string;
    };