import { APIRequestContext } from "@playwright/test";

export class FavoritesService {
    constructor(private request: APIRequestContext) { }

    async getFavorites(userId: string, token: string) {
        return await this.request.get(`/users/${userId}/favorites`, { headers: { 'Authorization': `Bearer ${token}` } });
    }

    async addToFavorites(userId: string, token: string, plantId: string) {
        return await this.request.post(`/users/${userId}/favorites/${plantId}`, { headers: { 'Authorization': `Bearer ${token}` } });
    }

    async deleteFromFavorites(userId: string, token: string, plantId: string) {
        return await this.request.delete(`/users/${userId}/favorites/${plantId}`, { headers: { 'Authorization': `Bearer ${token}` } });
    }
}