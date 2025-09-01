import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Beaker, Droplets, Bug, Factory, TreePine, AlertTriangle, RotateCcw, Save } from 'lucide-react';
import type { EnvironmentalFactors } from '@/lib/types';

interface ScenarioPreset {
  name: string;
  description: string;
  factors: Partial<EnvironmentalFactors>;
  icon: React.ReactNode;
}

interface AdvancedSimulationProps {
  environmentalFactors: EnvironmentalFactors; 
  onFactorChange: (factor: keyof EnvironmentalFactors, value: number[]) => void;
  onApplyScenario: (scenario: EnvironmentalFactors) => void;
}

const AdvancedSimulation: React.FC<AdvancedSimulationProps> = ({ 
  environmentalFactors, 
  onFactorChange,
  onApplyScenario 
}) => {
  const [advancedFactors, setAdvancedFactors] = useState<EnvironmentalFactors>({
    urbanization: environmentalFactors.urbanization || 50,
    deforestation: environmentalFactors.deforestation || 30,
    climateChange: environmentalFactors.climateChange || 60,
    conservation: environmentalFactors.conservation || 70,
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

  const [activePreset, setActivePreset] = useState<string | null>(null);
  const [multiFactor, setMultiFactor] = useState(false);
  const [savedScenarios, setSavedScenarios] = useState<Array<{name: string, factors: EnvironmentalFactors}>>([]);

  const scenarioPresets: ScenarioPreset[] = [
    {
      name: "Climate Crisis",
      description: "Extreme climate change with rising temperatures and erratic weather",
      icon: <AlertTriangle className="w-4 h-4" />,
      factors: {
        climateChange: 95,
        waterScarcity: 85,
        deforestation: 70,
        airPollution: 80
      }
    },
    {
      name: "Industrial Boom",
      description: "Rapid industrial expansion with environmental trade-offs",
      icon: <Factory className="w-4 h-4" />,
      factors: {
        industrialExpansion: 90,
        airPollution: 85,
        waterPollution: 75,
        urbanization: 80,
        mining: 70
      }
    },
    {
      name: "Agricultural Pressure",
      description: "Expansion of farming activities affecting natural habitats",
      icon: <TreePine className="w-4 h-4" />,
      factors: {
        agriculture: 85,
        deforestation: 75,
        waterScarcity: 65,
        soilPollution: 55,
        forestFragmentation: 70
      }
    },
    {
      name: "Invasive Species Crisis",
      description: "Widespread introduction of non-native species",
      icon: <Bug className="w-4 h-4" />,
      factors: {
        invasiveSpecies: 90,
        tourism: 80,
        forestFragmentation: 60,
        conservation: 30
      }
    },
    {
      name: "Water Crisis",
      description: "Severe drought and water contamination scenarios",
      icon: <Droplets className="w-4 h-4" />,
      factors: {
        waterScarcity: 95,
        waterPollution: 80,
        climateChange: 75,
        agriculture: 70,
        industrialExpansion: 65
      }
    },
    {
      name: "Conservation Success",
      description: "Optimal conservation efforts and reduced human impact",
      icon: <TreePine className="w-4 h-4" />,
      factors: {
        conservation: 95,
        deforestation: 10,
        airPollution: 20,
        waterPollution: 15,
        urbanization: 30,
        invasiveSpecies: 15
      }
    }
  ];

  // Factor categories
  const factorCategories = {
    "Core Factors": [
      { key: 'urbanization', label: 'Urbanization Rate', icon: '🏙️', description: 'Urban expansion reducing natural habitats' },
      { key: 'deforestation', label: 'Deforestation', icon: '🌲', description: 'Forest loss and habitat destruction' },
      { key: 'climateChange', label: 'Climate Change', icon: '🌡️', description: 'Temperature and weather pattern changes' },
      { key: 'conservation', label: 'Conservation Efforts', icon: '🛡️', description: 'Active wildlife protection measures' }
    ],
    "Pollution Factors": [
      { key: 'airPollution', label: 'Air Pollution', icon: '🏭', description: 'Atmospheric contamination levels' },
      { key: 'waterPollution', label: 'Water Pollution', icon: '💧', description: 'Water body contamination' },
      { key: 'soilPollution', label: 'Soil Pollution', icon: '🌱', description: 'Soil contamination and degradation' }
    ],
    "Resource & Habitat": [
      { key: 'waterScarcity', label: 'Water Scarcity', icon: '🏜️', description: 'Availability of freshwater resources' },
      { key: 'forestFragmentation', label: 'Forest Fragmentation', icon: '🧩', description: 'Breaking up of continuous forests' },
      { key: 'invasiveSpecies', label: 'Invasive Species', icon: '🦎', description: 'Non-native species impact' }
    ],
    "Human Activities": [
      { key: 'industrialExpansion', label: 'Industrial Expansion', icon: '🏭', description: 'Industrial development growth' },
      { key: 'mining', label: 'Mining Activities', icon: '⛏️', description: 'Extractive industry impact' },
      { key: 'tourism', label: 'Tourism Pressure', icon: '🏖️', description: 'Tourism-related environmental stress' },
      { key: 'agriculture', label: 'Agricultural Expansion', icon: '🚜', description: 'Farming activity expansion' }
    ]
  };

  const handleFactorChange = (factor: keyof EnvironmentalFactors, value: number[]) => {
    const newFactors = { ...advancedFactors, [factor]: value[0] };
    setAdvancedFactors(newFactors);
    onFactorChange(factor, value);
    setActivePreset(null);
  };

  const applyPreset = (preset: ScenarioPreset) => {
    const newFactors = { ...advancedFactors, ...preset.factors };
    setAdvancedFactors(newFactors);
    setActivePreset(preset.name);
    onApplyScenario(newFactors);
  };

  const resetToDefaults = () => {
    const defaultFactors: EnvironmentalFactors = {
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
    };
    setAdvancedFactors(defaultFactors);
    setActivePreset(null);
    onApplyScenario(defaultFactors);
  };

  const saveCurrentScenario = () => {
    const name = prompt("Enter scenario name:");
    if (name) {
      setSavedScenarios(prev => [...prev, { name, factors: advancedFactors }]);
    }
  };

  const getImpactLevel = (value: number) => {
    if (value < 25) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
    if (value < 50) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    if (value < 75) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { level: 'Critical', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const calculateCombinedImpact = () => {
    const negativeFactors: (keyof EnvironmentalFactors)[] = [
      'urbanization', 'deforestation', 'climateChange', 'airPollution', 
      'waterPollution', 'soilPollution', 'invasiveSpecies', 'waterScarcity',
      'forestFragmentation', 'industrialExpansion', 'mining', 'agriculture'
    ];
    
    const positiveFactors: (keyof EnvironmentalFactors)[] = ['conservation', 'tourism'];
    
    const negativeScore = negativeFactors.reduce((sum, factor) => sum + advancedFactors[factor], 0) / negativeFactors.length;
    const positiveScore = positiveFactors.reduce((sum, factor) => sum + advancedFactors[factor], 0) / positiveFactors.length;
    
    return Math.max(0, negativeScore - positiveScore * 0.8);
  };

  const combinedImpact = calculateCombinedImpact();
  const impactAssessment = getImpactLevel(combinedImpact);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Beaker className="text-primary" />
            Advanced Environmental Simulation
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Combined Impact:</span>
            <Badge className={`${impactAssessment.color} ${impactAssessment.bg}`}>
              {impactAssessment.level} ({combinedImpact.toFixed(1)})
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="factors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="factors">Environmental Factors</TabsTrigger>
            <TabsTrigger value="scenarios">Scenario Presets</TabsTrigger>
            <TabsTrigger value="analysis">Multi-Factor Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="factors" className="space-y-6">
            {/* Controls */}
            <div className="flex gap-4 items-center">
              <Button variant="outline" size="sm" onClick={resetToDefaults}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={saveCurrentScenario}>
                <Save className="w-4 h-4 mr-2" />
                Save Scenario
              </Button>
              {activePreset && (
                <Badge variant="secondary">Active: {activePreset}</Badge>
              )}
            </div>

            {/* Factor Categories */}
            {Object.entries(factorCategories).map(([category, factors]) => (
              <Card key={category} className="p-4">
                <h3 className="text-lg font-semibold mb-4">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {factors.map(factor => {
                    const impact = getImpactLevel(advancedFactors[factor.key as keyof EnvironmentalFactors]);
                    return (
                      <div key={factor.key} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium flex items-center gap-2">
                            <span>{factor.icon}</span>
                            {factor.label}
                          </label>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold">
                              {advancedFactors[factor.key as keyof EnvironmentalFactors]}%
                            </span>
                      <Badge className={`text-xs ${impact.color} ${impact.bg}`}>
                              {impact.level}
                            </Badge>
                          </div>
                        </div>
                        <Slider
                          value={[advancedFactors[factor.key as keyof EnvironmentalFactors]]}
                          onValueChange={(value) => handleFactorChange(factor.key as keyof EnvironmentalFactors, value)}
                          max={100}
                          step={1}
                          className="mb-1"
                        />
                        <div className="text-xs text-muted-foreground">
                          {factor.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scenarioPresets.map(preset => (
                <Card 
                  key={preset.name}
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    activePreset === preset.name ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => applyPreset(preset)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {preset.icon}
                    <h3 className="font-semibold">{preset.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {preset.description}
                  </p>
                  <div className="space-y-1">
                    {Object.entries(preset.factors).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="font-medium">{value}%</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Saved Scenarios */}
            {savedScenarios.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Saved Scenarios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedScenarios.map((scenario, index) => (
                    <Card 
                      key={index}
                      className="p-4 cursor-pointer transition-all hover:shadow-md"
                      onClick={() => {
                        setAdvancedFactors(scenario.factors);
                        setActivePreset(scenario.name);
                        onApplyScenario(scenario.factors);
                      }}
                    >
                      <h3 className="font-semibold mb-2">{scenario.name}</h3>
                      <div className="text-xs text-muted-foreground">
                        Custom scenario
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={multiFactor} 
                  onCheckedChange={setMultiFactor}
                />
                <label className="text-sm font-medium">Multi-Factor Interaction</label>
              </div>
            </div>

            {/* Impact Matrix */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Environmental Impact Matrix</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(factorCategories).map(([category, factors]) => {
                  const categoryAverage = factors.reduce((sum, factor) => 
                    sum + advancedFactors[factor.key as keyof EnvironmentalFactors], 0
                  ) / factors.length;
                  const impact = getImpactLevel(categoryAverage);
                  
                  return (
                    <Card key={category} className="p-3">
                      <div className="text-sm font-medium mb-1">{category}</div>
                      <div className="text-2xl font-bold mb-1">{categoryAverage.toFixed(1)}%</div>
                      <Badge className={`text-xs ${impact.color} ${impact.bg}`}>
                        {impact.level}
                      </Badge>
                    </Card>
                  );
                })}
              </div>
            </Card>

            {/* Factor Interactions */}
            {multiFactor && (
              <Card className="p-4">
                <h3 className="text-lg font-semibold mb-4">Factor Interactions</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded">
                    <div className="font-medium text-red-800">High Risk Combination Detected</div>
                    <div className="text-sm text-red-600">
                      Deforestation + Climate Change + Water Scarcity = Critical ecosystem stress
                    </div>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded">
                    <div className="font-medium text-orange-800">Synergistic Effects</div>
                    <div className="text-sm text-orange-600">
                      Industrial Expansion + Air Pollution + Urbanization = Compounded habitat loss
                    </div>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded">
                    <div className="font-medium text-green-800">Positive Feedback</div>
                    <div className="text-sm text-green-600">
                      Conservation + Reduced Deforestation = Enhanced ecosystem recovery
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>      
        </CardContent>
    </Card>
  );
};

export default AdvancedSimulation;
