export interface Alert {
  id: string;
  type: string;
  severity: string;
  message: string;
  species?: string[];
  timestamp: string; // or Date
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
  coordinates: number[];
  historicalData?: {
    [year: string]: {
      forestCover: number;
      airQuality: number;
      waterAvailability: number;
      wildlifeHealth: number;
      ecoScore: number;
    };
  };
  pollutionLevels?: {
    air?: number;
    water?: number;
    soil?: number;
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










interface HistoricalPopulation {
  [year: string]: number;
}

interface MigrationPatterns {
  seasonal: boolean;
  distance: string;
  corridorsUsed: string[];
}

interface GeneticDiversity {
  current: number;
  predicted2070: number;
}

interface PopulationScenarios {
  optimistic: number;
  pessimistic: number;
}

export  interface Species {
  id: string;
  name: string;
  scientificName: string;
  currentPopulation: number;
  predicted2070Population: number;
  status: string;
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
  historicalPopulation: HistoricalPopulation;
  predatorPreyRelationships: string[];
  migrationPatterns: MigrationPatterns;
  geneticDiversity: GeneticDiversity;
  populationScenarios: PopulationScenarios;
}

export interface SpeciesProfileProps {
  species: Species;
  onClose: () => void;
}
