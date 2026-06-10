import { Page } from "@playwright/test";
import { authResponse } from "../mock-data/auth.mock";
import { allPlantsResponse } from "../mock-data/plants.mock";
import { favoritesResponse } from "../mock-data/favorites.mock";

export async function setupApiMocks(page: Page) {

    await page.route("**/auth/login", async route => {
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            json: authResponse
        });
    });

    await page.route("**/auth/register", async route => {
        return route.fulfill({
            status: 201,
            contentType: "application/json",
            json: authResponse
        });
    });

    await page.route("**/plants", async route => {
        return route.fulfill({
            status: 200,
            contentType: "application/json",
            json: allPlantsResponse
        });
    });

    await page.route("**/plants/id/*", async route => {
        const plantId = route.request().url().split("/").pop();

        const plant = allPlantsResponse.find(plant => plant._id === plantId);

        if (!plant) {
            return route.fulfill({
                status: 404,
                contentType: "application/json",
                json: {
                    message: "Plant not found"
                }
            });
        }

        return route.fulfill({
            status: 200,
            contentType: "application/json",
            json: plant
        });

    });

    let favorites = [...favoritesResponse.plants];

    await page.route("**/users/*/favorites", async route => {
        if (route.request().method() === "GET") {

            return route.fulfill({
                status: 200,
                contentType: "application/json",
                headers: {
                    "access-control-allow-origin": "*",
                    "access-control-allow-credentials": "true"
                },
                body: JSON.stringify({
                    count: favorites.length,
                    plants: favorites
                })
            });
        }

        return route.fallback();
    });

    await page.route("**/users/*/favorites/*", async route => {
        const method = route.request().method();
        const plantId = route.request().url().split("/").pop();
        if (method === "DELETE") {
            const exists = favorites.some(plant => plant._id === plantId);

            if (!exists) {
                return route.fulfill({
                    status: 400,
                    contentType: "application/json",
                    json: {
                        error: "Plant not in favorites"
                    }
                });
            }

            favorites = favorites.filter(
                plant => plant._id !== plantId
            );

            return route.fulfill({
                status: 200,
                contentType: "application/json",
                json: {
                    count: favorites.length,
                    plants: favorites
                }
            });

        }

        if (method === "POST") {
            const plant = allPlantsResponse.find(
                plant => plant._id === plantId
            );

            if (!plant) {
                return route.fulfill({
                    status: 404,
                    contentType: "application/json",
                    json: { message: "Plant not found" }
                });
            }

            const exists = favorites.some(
                favorite => favorite._id === plantId
            );

            if (exists) {
                return route.fulfill({
                    status: 400,
                    contentType: "application/json",
                    json: { error: "Plant already in favorites" }
                });
            }

            favorites.push(plant);

            return route.fulfill({
                status: 200,
                contentType: "application/json",
                json: {
                    count: favorites.length,
                    plants: favorites
                }
            });
        }
        return route.fallback();
    });
}