import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveAlerts from "@/components/InteractiveAlerts";
import enhancedSpeciesData from "../data/speciesData.json";
import enhancedStateData from "../data/stateData.json";
import type { StateData, SpeciesData, EnvironmentalFactors } from "@/lib/types";

const Alerts: React.FC = () => {
  const simulatedData = enhancedStateData.states as unknown as StateData[];
  const simulatedSpecies = enhancedSpeciesData.species as SpeciesData[];
  const environmentalFactors: EnvironmentalFactors = {
    urbanization: 50,
    deforestation: 30,
    climateChange: 60,
    conservation: 70,
    airPollution: 45,
    waterPollution: 35,
    soilPollution: 25,
    invasiveSpecies: 30,
    waterScarcity: 40,
    forestFragmentation: 35,
    industrialExpansion: 50,
    mining: 25,
    tourism: 60,
    agriculture: 55,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background p-6">
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-red-500 text-3xl">
            🚨 Interactive Wildlife Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <InteractiveAlerts
            statesData={simulatedData}
            speciesData={simulatedSpecies}
            currentEnvironmentalFactors={environmentalFactors}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
