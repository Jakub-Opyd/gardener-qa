import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

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

    async register(email: string, password: string, repeatPassword: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.repeatPasswordInput.fill(repeatPassword);
        await this.registerSubmit.click();
    }

}