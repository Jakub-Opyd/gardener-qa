export type LoginPayload = {
    email: string;
    password: string;
}

export type RegisterPayload = {
    email: string;
    password: string;
}

export type AuthResponse = {
    userId: string;
    email: string;
    token: string;
}