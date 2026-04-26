import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";

export class LoginPage extends BasePage {
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly loginSubmit: Locator;
    readonly emailError: Locator;
    readonly passwordError: Locator;
    readonly loginError: Locator;

    constructor(page: Page) {
        super(page);
        this.loginInput = page.getByRole("textbox", { name: "Email" });
        this.passwordInput = page.getByRole("textbox", { name: "Hasło" });
        this.loginSubmit = page.getByRole("button", { name: "Zaloguj" });
        this.emailError = page.getByText("Nieprawidłowy adres email");
        this.passwordError = page.getByText("Hasło musi mieć co najmniej 8 znaków");
        this.loginError = page.getByText("Niepoprawny email lub hasło");
    }

    async open() {
        await super.open("/user-login-form");
    }

    async login(login: string, password: string) {
        await this.loginInput.fill(login);
        await this.passwordInput.fill(password);
        await this.loginSubmit.click();
    }
}