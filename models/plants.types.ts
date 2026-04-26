export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export type SoilType = 'sandy' | 'clay' | 'loamy' | 'peaty' | 'chalky' | 'silty';
export type Species = 'tree' | 'shrub' | 'herb' | 'flower' | 'vegetable' | 'fruit';
export type WaterRequirement = 'low' | 'medium' | 'high';
export type Sunlight = 'full sun' | 'partial shade' | 'shade';
export type SoilPh = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
export type GrowthRate = 'slow' | 'medium' | 'fast';
export type Lifespan = 'annual' | 'biennial' | 'perennial';
export type Period = {
    start: Month;
    end: Month;
}

export type Plant = {
    _id: string;
    name: string;
    latinName: string;
    imageUrl: string;
    species: Species;
    soil: SoilType[];
    waterRequirement: WaterRequirement;
    wateringDesc: string;
    sunlight: Sunlight;
    floweringPeriod: Period;
    plantingPeriod: Period;
    heightCm: number;
    color: string[];
    compatibleWith: string[];
    soilPh: SoilPh;
    growthRate: GrowthRate;
    toxicity: boolean;
    careTips: string;
    temp: { min: number; max: number };
    lifespan: Lifespan;
}