import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { MapPin, Zap } from 'lucide-react';
import InteractiveMap from './InteractiveMap';
import SpeciesProfile from './SpeciesProfile';
import ConservationActions from './ConservationActions';
import EcoScoreDisplay from './EcoScoreDisplay';
import PopulationChart from './PopulationChart';
import speciesDataJson from '../data/speciesData.json';
import stateDataJson from '../data/stateData.json';

interface EnvironmentalFactors {
  urbanization: number;
  deforestation: number;
  climateChange: number;
  conservation: number;
}

interface StateData {
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
    forestCover: number;
    airQuality: number;
    waterAvailability: number;
    wildlifeHealth: number;
    ecoScore: number;
  };
  coordinates: number[];
}

interface SpeciesData {
  id: string;
  name: string;
  scientificName: string;
  currentPopulation: number;
  predicted2070Population: number;
  status: string;
  threats: string[]; // now required
  conservationActions: string[];
  states: string[];
  description: string;
  funFacts: string[];
  image: string;
  habitatPreferences: string[];
  dietType: string;
  averageLifespan: string;
  conservationStatus2070: string;
  populationTrend: string; // now required
}

// Safely type JSON imports
const stateData: { states: StateData[] } = stateDataJson as { states: StateData[] };
const speciesData: { species: SpeciesData[] } = speciesDataJson as { species: SpeciesData[] };

const Dashboard: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [environmentalFactors, setEnvironmentalFactors] = useState<EnvironmentalFactors>({
    urbanization: 50,
    deforestation: 30,
    climateChange: 60,
    conservation: 70,
  });

  const [simulatedData, setSimulatedData] = useState<StateData[]>(stateData.states);

  // Provide defaults for optional fields to satisfy type requirements
  const [simulatedSpecies, setSimulatedSpecies] = useState<SpeciesData[]>(
    speciesData.species.map(species => ({
      ...species,
      threats: species.threats || [],
      populationTrend: species.populationTrend || 'stable',
      conservationActions: species.conservationActions || [],
      states: species.states || [],
      description: species.description || '',
      funFacts: species.funFacts || [],
      image: species.image || '',
      habitatPreferences: species.habitatPreferences || [],
      dietType: species.dietType || '',
      averageLifespan: species.averageLifespan || '',
      conservationStatus2070: species.conservationStatus2070 || 'unknown',
    }))
  );

  useEffect(() => {
    const newStateData = stateData.states.map(state => {
      const urbanizationImpact = (environmentalFactors.urbanization - 50) * 0.4;
      const deforestationImpact = (environmentalFactors.deforestation - 30) * 0.6;
      const climateImpact = (environmentalFactors.climateChange - 60) * 0.3;
      const conservationImpact = (environmentalFactors.conservation - 70) * 0.8;
      const totalImpact = conservationImpact - (urbanizationImpact + deforestationImpact + climateImpact);

      return {
        ...state,
        forestCover: Math.max(5, Math.min(50, state.forestCover + totalImpact * 0.5)),
        wildlifeHealth: Math.max(20, Math.min(100, state.wildlifeHealth + totalImpact)),
        ecoScore: Math.max(30, Math.min(100, state.ecoScore + totalImpact * 0.7)),
      };
    });

    const newSpeciesData = speciesData.species.map(species => {
      const basePopulation = species.currentPopulation;
      const conservationBonus = (environmentalFactors.conservation - 50) * 0.02;
      const threatsReduction = 1 - ((environmentalFactors.urbanization + environmentalFactors.deforestation + environmentalFactors.climateChange) / 300) * 0.3;
      const newPopulation = Math.max(Math.floor(basePopulation * 0.3), Math.floor(basePopulation * (threatsReduction + conservationBonus)));

      return {
        ...species,
        predicted2070Population: newPopulation,
        threats: species.threats || [],
        populationTrend: species.populationTrend || 'stable',
      };
    });

    setSimulatedData(newStateData);
    setSimulatedSpecies(newSpeciesData);
  }, [environmentalFactors]);

  const handleFactorChange = (factor: keyof EnvironmentalFactors, value: number[]) => {
    setEnvironmentalFactors(prev => ({ ...prev, [factor]: value[0] }));
  };

  const applyConservationAction = (action: string) => {
    switch (action) {
      case 'plantTrees':
        setEnvironmentalFactors(prev => ({ ...prev, deforestation: Math.max(0, prev.deforestation - 15), conservation: Math.min(100, prev.conservation + 10) }));
        break;
      case 'wildlifeCorridors':
        setEnvironmentalFactors(prev => ({ ...prev, conservation: Math.min(100, prev.conservation + 15) }));
        break;
      case 'antiPoaching':
        setEnvironmentalFactors(prev => ({ ...prev, conservation: Math.min(100, prev.conservation + 20) }));
        break;
      case 'renewableEnergy':
        setEnvironmentalFactors(prev => ({ ...prev, climateChange: Math.max(0, prev.climateChange - 20) }));
        break;
    }
  };

  const selectedStateData = selectedState ? simulatedData.find(s => s.id === selectedState) : null;
  const selectedSpeciesData = selectedSpecies ? simulatedSpecies.find(s => s.id === selectedSpecies) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-card to-background">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
            India 2070 Wildlife Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore India's wildlife future through interactive simulations and conservation planning
          </p>
        </div>

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
                <InteractiveMap stateData={simulatedData} onStateSelect={setSelectedState} selectedState={selectedState} />
              </CardContent>
            </Card>
          </div>

          {/* Environmental Controls */}
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="text-accent" />
                  Environmental Factors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {(['urbanization', 'deforestation', 'climateChange', 'conservation'] as (keyof EnvironmentalFactors)[]).map(factor => (
                  <div key={factor}>
                    <label className="text-sm font-medium mb-2 block">
                      {factor.charAt(0).toUpperCase() + factor.slice(1)}: {environmentalFactors[factor]}%
                    </label>
                    <Slider value={[environmentalFactors[factor]]} onValueChange={(value) => handleFactorChange(factor, value)} max={100} step={1} className="mb-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <ConservationActions onActionApply={applyConservationAction} />
          </div>
        </div>

        {/* Species Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {simulatedSpecies.slice(0, 6).map(species => (
            <Card key={species.id} className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => setSelectedSpecies(species.id)}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-3xl">🐅</div>
                  <div>
                    <h3 className="font-bold text-lg">{species.name}</h3>
                    <Badge className={`status-${species.status}`} variant="outline">{species.status}</Badge>
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
                      <span className={`font-medium ${species.predicted2070Population > species.currentPopulation ? 'text-green-400' : 'text-red-400'}`}>
                        {species.predicted2070Population.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(species.predicted2070Population / species.currentPopulation) * 50} className="h-2" />
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

        {/* Species Profile Modal */}
        {selectedSpeciesData && <SpeciesProfile species={selectedSpeciesData} onClose={() => setSelectedSpecies(null)} />}
      </div>
    </div>
  );
};

export default Dashboard;
