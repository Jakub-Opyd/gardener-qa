import { APIRequestContext } from "@playwright/test";

export class PlantsService {
    constructor(private request: APIRequestContext) { }

    async getAll() {
        return await this.request.get("/plants");
    }

    async getById(plantId: string) {
        return await this.request.get(`/plants/id/${plantId}`);
    }
}