import { Page } from "@playwright/test";

export class BasePage {
    public readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async open(url: string) {
        await this.page.goto(url);
    }
}