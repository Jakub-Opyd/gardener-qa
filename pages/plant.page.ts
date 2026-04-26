import { Locator, Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { PlantCardComponent } from "../components/plant-card.component";
import { PlantFiltersComponent } from "../components/plant-filters.component";

export class PlantPage extends BasePage {
    readonly filters: PlantFiltersComponent;
    readonly searchInput: Locator;
    readonly plantCards: Locator;
    readonly skeletons: Locator;

    constructor(page: Page) {
        super(page);

        this.filters = new PlantFiltersComponent(
            page.getByRole("strong").filter({ hasText: "Filtry" }).locator("..")
        );
        this.searchInput = page.getByTestId("plant-search-input");
        this.plantCards = page.getByTestId("plant-card");
        this.skeletons = page.getByTestId("plant-skeleton");
    }

    async open() {
        await super.open("/encyklopedia");
    }

    async search(name: string) {
        await this.searchInput.fill(name);
    }

    async getPlantsCount() {
        return this.plantCards.count();
    }

    async waitForData() {
        await this.skeletons.first().waitFor({ state: "hidden" });
    }

    getPlantCardByName(plantName: string): PlantCardComponent {
        const plantCard = this.plantCards.filter({ has: this.page.getByTestId("card-title").filter({ hasText: plantName }) }).first();

        return new PlantCardComponent(plantCard);
    }
}