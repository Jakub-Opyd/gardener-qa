import { Locator, Page } from "@playwright/test";

export class PlantFiltersComponent {
    readonly flowering: Locator;
    readonly lifespan: Locator;
    readonly planting: Locator;
    readonly soil: Locator;
    readonly toxicity: Locator;
    readonly species: Locator;

    constructor(filter: Locator) {
        this.flowering = filter.getByTestId("filter-flowering");
        this.lifespan = filter.getByTestId("filter-lifespan");
        this.planting = filter.getByTestId("filter-planting");
        this.soil = filter.getByTestId("filter-soil");
        this.toxicity = filter.getByTestId("filter-toxicity");
        this.species = filter.getByTestId("filter-species");
    }

    async toggleFlowering(season: "Zimą" | "Wiosną" | "Latem" | "Jesienią") {
        await this.flowering.getByRole("checkbox", { name: season }).click();
    }

    async toggleSpecies(type: "Drzewa" | "Krzewy" | "Zioła" | "Kwiaty" | "Warzywa" | "Owoce") {
        await this.species.getByRole("checkbox", { name: type }).click();
    }

    async togglePlanting(season: "Zimą" | "Wiosną" | "Latem" | "Jesienią") {
        await this.planting.getByRole("checkbox", { name: season }).click();
    }

    async setLifespan(value: 0 | 1 | 2 | 3) {
        await this.lifespan.locator('input[type="range"]').fill(String(value));
    }

    async toggleSoil(type: "Piaszczysta" | "Gliniasta" | "Uniwersalna" | "Torfowa" | "Wapienna" | "Lessowa") {
        await this.soil.getByRole("checkbox", { name: type }).click();
    }

    async toggleToxicity(value: "Bezpieczne" | "Toksyczne") {
        await this.toxicity.getByRole("checkbox", { name: value }).click();
    }
}
