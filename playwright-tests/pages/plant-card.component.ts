import { Locator } from '@playwright/test';

export class PlantCardComponent {
    private readonly root: Locator;
    readonly cardTitle: Locator;
    readonly collapseContent: Locator;
    readonly detailsButton: Locator;
    readonly favoriteIcon: Locator;

    constructor(card: Locator) {
        this.root = card;
        this.cardTitle = this.root.getByTestId("card-title");
        this.collapseContent = this.root.getByTestId("plant-collapse-content");
        this.detailsButton = this.root.getByTestId("plant-details-button");
        this.favoriteIcon = this.root.getByRole('button', { name: 'Favorite button' });
    }

    async toggleFavorite() {
        await this.favoriteIcon.click();
    }

    async getName() {
        return this.cardTitle.innerText();
    }

    async clickCard() {
        await this.root.click();
    }

    async openDetails() {
        await this.detailsButton.click();
    }
}
