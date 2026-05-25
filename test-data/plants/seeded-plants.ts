import { Plant } from "../../models/plants/plants.models";
import { PLANT_IDS } from "./plant-ids";

export const SEEDED_PLANTS: Record<string, Plant> = {
    lavender: {
        _id: PLANT_IDS.lavender,
        name: "Lawenda wąskolistna",
        latinName: "Lavandula angustifolia",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Field_Lavandula_angustifolia.jpg/800px-Field_Lavandula_angustifolia.jpg",
        species: "herb",
        soil: ["chalky", "sandy", "loamy"],
        waterRequirement: "low",
        wateringDesc: "Podlewaj raz na tydzień, tylko gdy ziemia jest bardzo sucha.",
        sunlight: "full sun",
        floweringPeriod: {
            start: 6,
            end: 8
        },
        plantingPeriod: {
            start: 4,
            end: 5
        },
        heightCm: 60,
        color: ["fioletowy"],
        compatibleWith: ["Róża ogrodowa", "Rozmaryn"],
        soilPh: 7,
        growthRate: "slow",
        toxicity: false,
        careTips: "Nie lubi nadmiaru wody, warto przycinać po kwitnieniu, aby zachować ładny kształt.",
        temp: {
            min: -15,
            max: 35
        },
        lifespan: "perennial"
    },

    daylily: {
        _id: PLANT_IDS.daylily,
        name: "Liliowiec ogrodowy",
        latinName: "Hemerocallis",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Daylily_%28Hemerocallis_fulva%29_v2.jpg/800px-Daylily_%28Hemerocallis_fulva%29_v2.jpg",
        species: "herb",
        soil: ["loamy", "sandy"],
        waterRequirement: "medium",
        wateringDesc: "Podlewaj co 4–5 dni w czasie upałów.",
        sunlight: "full sun",
        floweringPeriod: {
            start: 6,
            end: 8
        },
        plantingPeriod: {
            start: 4,
            end: 6
        },
        heightCm: 80,
        color: ["żółty", "pomarańczowy", "czerwony"],
        compatibleWith: ["Lawenda", "Żurawka"],
        soilPh: 6,
        growthRate: "fast",
        toxicity: false,
        careTips: "Usuń stare kwiaty, aby pobudzić kolejne kwitnienie.",
        temp: {
            min: -20,
            max: 35
        },
        lifespan: "perennial"
    },

    hosta: {
        _id: PLANT_IDS.hosta,
        name: "Hosta (Funkia)",
        latinName: "Hosta",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Hosta_two-tone_3.jpg/800px-Hosta_two-tone_3.jpg",
        species: "herb",
        soil: ["loamy", "silty"],
        waterRequirement: "medium",
        wateringDesc: "Podlewaj regularnie, szczególnie w czasie upałów.",
        sunlight: "partial shade",
        floweringPeriod: {
            start: 7,
            end: 8
        },
        plantingPeriod: {
            start: 4,
            end: 5
        },
        heightCm: 60,
        color: ["zielony", "żółty", "biały"],
        compatibleWith: ["Hortensja ogrodowa", "Brunnera"],
        soilPh: 7,
        growthRate: "medium",
        toxicity: false,
        careTips: "Usuń kwiaty po przekwitnięciu; ochroń przed ślimakami.",
        temp: {
            min: -25,
            max: 30
        },
        lifespan: "perennial"
    },

    forsythia: {
        _id: PLANT_IDS.forsythia,
        name: "Forsycja pośrednia",
        latinName: "Forsythia × intermedia",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Forsythia_x_intermedia._2007-04-27.jpg/800px-Forsythia_x_intermedia._2007-04-27.jpg",
        species: "shrub",
        soil: ["loamy", "sandy"],
        waterRequirement: "medium",
        wateringDesc: "Podlewaj umiarkowanie; dobrze znosi przejściową suszę.",
        sunlight: "full sun",
        floweringPeriod: {
            start: 4,
            end: 4
        },
        plantingPeriod: {
            start: 3,
            end: 4
        },
        heightCm: 300,
        color: ["żółty"],
        compatibleWith: ["Jaśminowiec wonny"],
        soilPh: 7,
        growthRate: "fast",
        toxicity: false,
        careTips: "Przycinać tuż po kwitnieniu, inaczej ograniczysz kwiaty na przyszły rok.",
        temp: {
            min: -20,
            max: 35
        },
        lifespan: "perennial"
    }
};