// src/lib/types.ts
export type AlertType = "species" | "environment" | "ecosystem";

export interface Alert {
  id: string;
  type: AlertType;
  severity: "low" | "medium" | "high" | string;
  message: string;
  species?: string[];
  state?: string;
  metric?: string;
  value?: number;
  threshold?: number;
  timestamp: string; // keep as ISO string
}

export interface EnvironmentalFactors {
  urbanization: number;
  deforestation: number;
  climateChange: number;
  conservation: number;
  airPollution: number;
  waterPollution: number;
  soilPollution: number;
  invasiveSpecies: number;
  waterScarcity: number;
  forestFragmentation: number;
  industrialExpansion: number;
  mining: number;
  tourism: number;
  agriculture: number;
}

// make coordinates a fixed tuple to satisfy downstream consumers expecting [lat, lon]
export interface StateData {
  id: string;
  name: string;
  forestCover: number;
  airQuality: number;
  waterAvailability: number;
  wildlifeHealth: number;
  ecoScore: number;
  majorSpecies: string[];
  conservationProjects: string[];
  threats?: string[];
  population2070Prediction?: {
    optimistic: {
      forestCover: number;
      airQuality: number;
      waterAvailability: number;
      wildlifeHealth: number;
      ecoScore: number;
    };
    pessimistic: {
      forestCover: number;
      airQuality: number;
      waterAvailability: number;
      wildlifeHealth: number;
      ecoScore: number;
    };
  };
  // enforce tuple for consumers that expect 2 numbers
  coordinates: [number, number];

  historicalData?: {
    [year: string]: {
      forestCover: number;
      airQuality: number;
      waterAvailability: number;
      wildlifeHealth: number;
      ecoScore: number;
    };
  };

  // match component expectations: make pollution fields required when pollutionLevels is present
  pollutionLevels?: {
    air: number;
    water: number;
    soil: number;
  };

  invasiveSpeciesImpact?: number;
  waterScarcityRisk?: number;
  forestFragmentation?: number;
  criticalAlerts?: Alert[];

  policyImpacts?: {
    banDeforestation?: { forestCover?: number; wildlifeHealth?: number };
    renewableEnergy?: { airQuality?: number; climateChange?: number };
    antiPoaching?: { wildlifeHealth?: number };
    urbanPlanning?: { forestFragmentation?: number; wildlifeHealth?: number };
  };
}

export type SpeciesStatus =
  | "endangered"
  | "vulnerable"
  | "critically endangered"
  | "least concern"
  | string; // keep string fallback to avoid brittle errors

export interface SpeciesData {
  id: string;
  name: string;
  scientificName: string;
  currentPopulation: number;
  predicted2070Population: number;
  status: SpeciesStatus;
  threats: string[];
  conservationActions: string[];
  states: string[];
  description: string;
  funFacts: string[];
  image: string;
  habitatPreferences: string[];
  dietType: string;
  averageLifespan: string;
  conservationStatus2070: string;
  populationTrend: string;
  historicalPopulation: { [year: string]: number };
  predatorPreyRelationships: string[];
  migrationPatterns: {
    seasonal: boolean;
    distance: string;
    corridorsUsed: string[];
  };
  geneticDiversity: {
    current: number;
    predicted2070: number;
  };
  populationScenarios: {
    optimistic: number;
    pessimistic: number;
  };
}
