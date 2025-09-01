import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Zap } from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import SpeciesProfile from './SpeciesProfile';
import ConservationActions from './ConservationActions';
import EcoScoreDisplay from './EcoScoreDisplay';
import PopulationChart from './PopulationChart';
import ComparativeAnalytics from './ComparativeAnalytics';
import InteractiveAlerts from './InteractiveAlerts';
import AdvancedSimulation from './AdvancedSimulation';
import DataDrivenInsights from './DataDrivenInsights';
import AdvancedVisualizations from './AdvancedVisualizations';
import enhancedSpeciesData from '../data/speciesData.json';
import enhancedStateData from '../data/stateData.json';
import type { StateData, SpeciesData, EnvironmentalFactors } from '@/lib/types';

const Dashboard: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | undefined>(undefined);
  const [selectedSpecies, setSelectedSpecies] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('overview');
  const [environmentalFactors, setEnvironmentalFactors] = useState<EnvironmentalFactors>({
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
    agriculture: 55
  });

const [simulatedData, setSimulatedData] = useState<StateData[]>(
  (enhancedStateData.states as unknown as StateData[]).map(state => ({
    ...state,
    criticalAlerts: state.criticalAlerts?.map((alert, index) => ({
      ...alert, 
      id: `${state.id}-alert-${index}`, // override safely
      timestamp: new Date().toISOString() // override safely
    }))
  }))
);

const [simulatedSpecies, setSimulatedSpecies] = useState<SpeciesData[]>(enhancedSpeciesData.species as SpeciesData[]);

  useEffect(() => {
  // Enhanced simulation logic for all factors
  const newStateData: StateData[] = (enhancedStateData.states as unknown as StateData[]).map(state => {
    // ensure coordinates is always a tuple [lat, lon]
    const coords: [number, number] =
      Array.isArray(state.coordinates) && state.coordinates.length === 2
        ? [state.coordinates[0], state.coordinates[1]]
        : [0, 0];

    const urbanizationImpact = (environmentalFactors.urbanization - 50) * 0.4;
    const deforestationImpact = (environmentalFactors.deforestation - 30) * 0.6;
    const climateImpact = (environmentalFactors.climateChange - 60) * 0.3;
    const conservationImpact = (environmentalFactors.conservation - 70) * 0.8;

    // Advanced factors impact
    const pollutionImpact =
      (environmentalFactors.airPollution +
        environmentalFactors.waterPollution +
        environmentalFactors.soilPollution) /
      3 *
      0.3;
    const invasiveImpact = environmentalFactors.invasiveSpecies * 0.2;
    const waterScarcityImpact = environmentalFactors.waterScarcity * 0.4;
    const fragmentationImpact = environmentalFactors.forestFragmentation * 0.3;
    const industrialImpact = environmentalFactors.industrialExpansion * 0.5;
    const miningImpact = environmentalFactors.mining * 0.4;
    const agricultureImpact = environmentalFactors.agriculture * 0.3;

    const totalNegativeImpact =
      urbanizationImpact +
      deforestationImpact +
      climateImpact +
      pollutionImpact +
      invasiveImpact +
      waterScarcityImpact +
      fragmentationImpact +
      industrialImpact +
      miningImpact +
      agricultureImpact;

    const totalPositiveImpact =
      conservationImpact + (environmentalFactors.tourism - 50) * 0.1;

    const totalImpact = totalPositiveImpact - totalNegativeImpact;

    return {
      ...state,
      coordinates: coords, // 👈 ensures type matches [number, number]
      forestCover: Math.max(5, Math.min(60, state.forestCover + totalImpact * 0.3)),
      wildlifeHealth: Math.max(
        20,
        Math.min(100, state.wildlifeHealth + totalImpact * 0.8)
      ),
      airQuality: Math.max(
        20,
        Math.min(
          100,
          state.airQuality + totalImpact * 0.4 - environmentalFactors.airPollution * 0.2
        )
      ),
      waterAvailability: Math.max(
        20,
        Math.min(
          100,
          state.waterAvailability +
            totalImpact * 0.2 -
            environmentalFactors.waterScarcity * 0.3
        )
      ),
      ecoScore: Math.max(30, Math.min(100, state.ecoScore + totalImpact * 0.6)),
    };
  });

  const newSpeciesData: SpeciesData[] = (enhancedSpeciesData.species as SpeciesData[]).map(species => {
    const basePopulation = species.currentPopulation;
    const conservationBonus = (environmentalFactors.conservation - 50) * 0.03;
    const pollutionPenalty =
      (environmentalFactors.airPollution + environmentalFactors.waterPollution) /
      200;
    const habitatLoss =
      (environmentalFactors.deforestation +
        environmentalFactors.forestFragmentation +
        environmentalFactors.urbanization) /
      300;
    const climateStress = (environmentalFactors.climateChange / 100) * 0.2;
    const invasiveStress = (environmentalFactors.invasiveSpecies / 100) * 0.15;

    const totalStress = habitatLoss + climateStress + invasiveStress + pollutionPenalty;
    const survivalRate = Math.max(0.3, 1 - totalStress + conservationBonus);

    const newPopulation = Math.max(
      Math.floor(basePopulation * 0.2),
      Math.floor(basePopulation * survivalRate)
    );

    return {
      ...species,
      predicted2070Population: newPopulation,
      populationTrend:
        newPopulation > basePopulation
          ? "increasing"
          : newPopulation < basePopulation * 0.9
          ? "decreasing"
          : "stable",
    };
  });

  setSimulatedData(newStateData);
  setSimulatedSpecies(newSpeciesData);
}, [environmentalFactors]);


  const handleFactorChange = (factor: keyof EnvironmentalFactors, value: number[]) => {
    setEnvironmentalFactors(prev => ({
      ...prev,
      [factor]: value[0]
    }));
  };

  const applyAdvancedScenario = (newFactors: EnvironmentalFactors) => {
    setEnvironmentalFactors(newFactors);
  };

  const applyConservationAction = (action: string) => {
    switch (action) {
      case 'plantTrees':
        setEnvironmentalFactors(prev => ({
          ...prev,
          deforestation: Math.max(0, prev.deforestation - 15),
          conservation: Math.min(100, prev.conservation + 10)
        }));
        break;
      case 'wildlifeCorridors':
        setEnvironmentalFactors(prev => ({
          ...prev,
          conservation: Math.min(100, prev.conservation + 15)
        }));
        break;
      case 'antiPoaching':
        setEnvironmentalFactors(prev => ({
          ...prev,
          conservation: Math.min(100, prev.conservation + 20)
        }));
        break;
      case 'renewableEnergy':
        setEnvironmentalFactors(prev => ({
          ...prev,
          climateChange: Math.max(0, prev.climateChange - 20)
        }));
        break;
    }
  };

  const selectedStateData = selectedState ? simulatedData.find(s => s.id === selectedState) : undefined;
  const selectedSpeciesData = selectedSpecies ? simulatedSpecies.find(s => s.id === selectedSpecies) : undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-green-500 mb-4">
            India 2070 Wildlife Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore India's wildlife future through interactive simulations and conservation planning
          </p>
        </div>

        {/* Enhanced Dashboard with Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="temporal">Temporal Analysis</TabsTrigger>
            <TabsTrigger value="comparison">Comparison</TabsTrigger>
            <TabsTrigger value="simulation">Advanced Simulation</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="visualizations">Visualizations</TabsTrigger>
          </TabsList>

          {/* Overview Tab - Original Dashboard */}
          <TabsContent value="overview" className="space-y-6">
            {/* Alerts Section */}
            <InteractiveAlerts
              statesData={simulatedData}
              speciesData={simulatedSpecies}
              currentEnvironmentalFactors={environmentalFactors}
            />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Map Section */}
              <div className="lg:col-span-2">
                <Card className="glass-card h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                      <MapPin className="text-primary" />
                      Interactive Wildlife Map
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <InteractiveMap
                      stateData={simulatedData}
                      onStateSelect={setSelectedState}
                      selectedState={selectedState ?? null}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Environmental Controls */}
              <div className="space-y-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="text-accent" />
                      Core Environmental Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Urbanization Rate: {environmentalFactors.urbanization}%
                      </label>
                      <Slider
                        value={[environmentalFactors.urbanization]}
                        onValueChange={(value) => handleFactorChange('urbanization', value)}
                        max={100}
                        step={1}
                        className="mb-2"
                      />
                      <div className="text-xs text-muted-foreground">Higher values reduce habitats</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Deforestation: {environmentalFactors.deforestation}%
                      </label>
                      <Slider
                        value={[environmentalFactors.deforestation]}
                        onValueChange={(value) => handleFactorChange('deforestation', value)}
                        max={100}
                        step={1}
                        className="mb-2"
                      />
                      <div className="text-xs text-muted-foreground">Affects forest-dwelling species</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Climate Change Impact: {environmentalFactors.climateChange}%
                      </label>
                      <Slider
                        value={[environmentalFactors.climateChange]}
                        onValueChange={(value) => handleFactorChange('climateChange', value)}
                        max={100}
                        step={1}
                        className="mb-2"
                      />
                      <div className="text-xs text-muted-foreground">Temperature and rainfall changes</div>
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Conservation Efforts: {environmentalFactors.conservation}%
                      </label>
                      <Slider
                        value={[environmentalFactors.conservation]}
                        onValueChange={(value) => handleFactorChange('conservation', value)}
                        max={100}
                        step={1}
                        className="mb-2"
                      />
                      <div className="text-xs text-muted-foreground">Positive impact on species survival</div>
                    </div>
                  </CardContent>
                </Card>

                {/* Conservation Actions */}
                <ConservationActions onActionApply={applyConservationAction} />
              </div>
            </div>

            {/* Species Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {simulatedSpecies.slice(0, 6).map((species) => (
                <Card
                  key={species.id}
                  className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedSpecies(species.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-3xl">🐅</div>
                      <div>
                        <h3 className="font-bold text-lg">{species.name}</h3>
                        <Badge
                          className={`status-${species.status}`}
                          variant="outline"
                        >
                          {species.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Current Population</span>
                          <span className="font-medium">{species.currentPopulation.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>2070 Prediction</span>
                          <span className={`font-medium ${
                            species.predicted2070Population > species.currentPopulation
                              ? 'text-green-400'
                              : 'text-red-400'
                          }`}>
                            {species.predicted2070Population.toLocaleString()}
                          </span>
                        </div>
                        <Progress
                          value={(species.predicted2070Population / species.currentPopulation) * 50}
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* State Details */}
            {selectedStateData && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <EcoScoreDisplay stateData={selectedStateData} />
                <PopulationChart stateData={selectedStateData} speciesData={simulatedSpecies} />
              </div>
            )}
          </TabsContent>


          {/* Comparative Analytics Tab */}
          <TabsContent value="comparison" className="space-y-6">
            <ComparativeAnalytics
              allStatesData={simulatedData}
              allSpeciesData={simulatedSpecies}
            />
          </TabsContent>

          {/* Advanced Simulation Tab */}
          <TabsContent value="simulation" className="space-y-6">
            <AdvancedSimulation
              environmentalFactors={environmentalFactors}
              onFactorChange={handleFactorChange}
              onApplyScenario={applyAdvancedScenario}
            />
          </TabsContent>

          {/* AI Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <DataDrivenInsights
              statesData={simulatedData}
              speciesData={simulatedSpecies}
              environmentalFactors={environmentalFactors}
              selectedState={selectedStateData}
            />
          </TabsContent>

          {/* Advanced Visualizations Tab */}
          <TabsContent value="visualizations" className="space-y-6">
            <AdvancedVisualizations
              statesData={simulatedData}
            />
          </TabsContent>
        </Tabs>

        {/* Species Profile Modal */}
        {selectedSpeciesData && (
          <SpeciesProfile
            species={selectedSpeciesData}
            onClose={() => setSelectedSpecies(undefined)}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard; 

