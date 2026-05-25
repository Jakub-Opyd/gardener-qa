import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { RegisterFormData } from "../models/auth/auth.forms";

export class RegisterPage extends BasePage {
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly repeatPasswordInput: Locator;
    readonly registerSubmit: Locator;
    readonly emailError: Locator;
    readonly lengthPasswordError: Locator;
    readonly repeatPasswordError: Locator;
    readonly emailConflictError: Locator;

    constructor(page: Page) {
        super(page);
        this.emailInput = page.getByRole("textbox", { name: "Email" });
        this.passwordInput = page.getByRole('textbox', { name: 'Hasło:', exact: true });
        this.repeatPasswordInput = page.getByRole('textbox', { name: 'Powtórz hasło:' });
        this.registerSubmit = page.getByRole("button", { name: "Zarejestruj" });
        this.lengthPasswordError = page.getByText("Hasło musi mieć co najmniej 8 znaków");
        this.repeatPasswordError = page.getByText("Hasła muszą być takie same");
        this.emailError = page.getByText("Nieprawidłowy adres email");
        this.emailConflictError = page.getByText("User with this email already exists.");
    }

    async open() {
        await super.open("/register-form");
    }

    async register(user: RegisterFormData) {
        await this.emailInput.fill(user.email);
        await this.passwordInput.fill(user.password);
        await this.repeatPasswordInput.fill(user.repeatPassword);
        await this.registerSubmit.click();
    }

}