import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";


export class HomePage extends BasePage {
    readonly welcomeText: Locator;
    readonly quote: Locator;

    constructor(page: Page) {
        super(page);

        this.welcomeText = page.getByTestId("home-welcome");
        this.quote = page.getByTestId("home-quote");
    }

    async open() {
        await super.open("/");
    }
}
