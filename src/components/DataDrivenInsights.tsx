import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Target, CheckCircle } from 'lucide-react';

interface Species {
  id: string;
  name: string;
  currentPopulation: number;
  predicted2070Population: number;
  status: 'endangered' | 'critically endangered' | 'vulnerable' | 'least concern';
}

interface StateData {
  id: string;
  name: string;
  forestCover: number;
  ecoScore: number;
  waterAvailability: number;
  majorSpecies: string[];
}

interface EnvironmentalFactors {
  deforestation: number;
  conservation: number;
  climateChange: number;
  [key: string]: number;
}

interface Recommendation {
  id: string;
  type: 'conservation' | 'policy' | 'immediate' | 'longterm';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: {
    species?: string[];
    metric: string;
    expectedChange: number;
    timeframe: string;
    confidence: number;
  };
  actions: string[];
  cost: 'low' | 'medium' | 'high';
  feasibility: number;
  evidenceBased: boolean;
}

interface Prediction {
  id: string;
  target: string;
  currentValue: number;
  predictedValue: number;
  confidence: number;
  reasoning: string[];
  timeframe: string;
  factors: string[];
}

interface DataDrivenInsightsProps {
  statesData: StateData[];
  speciesData: Species[];
  environmentalFactors: EnvironmentalFactors;
  selectedState?: StateData;
}

const DataDrivenInsights: React.FC<DataDrivenInsightsProps> = ({
  statesData,
  speciesData,
  environmentalFactors,
  selectedState
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

  useEffect(() => {
    const targetState = selectedState || statesData[0];

    const generateRecommendations = (): Recommendation[] => {
      const recs: Recommendation[] = [];
      let recId = 0;

      if (targetState.forestCover < 25) {
        recs.push({
          id: `rec-${recId++}`,
          type: 'conservation',
          priority: 'high',
          title: `Urgent Reforestation in ${targetState.name}`,
          description: `Forest cover is critically low at ${targetState.forestCover.toFixed(1)}%. Immediate large-scale tree planting required.`,
          impact: { metric: 'forestCover', expectedChange: 15, timeframe: '5-10 years', confidence: 85 },
          actions: ['Plant 500,000 native trees annually', 'Establish community nurseries', 'Create forest corridors', 'Implement agroforestry programs'],
          cost: 'high',
          feasibility: 75,
          evidenceBased: true
        });
      }

      const endangeredSpecies = speciesData.filter(s =>
        targetState.majorSpecies.includes(s.id) && (s.status === 'endangered' || s.status === 'critically endangered')
      );

      endangeredSpecies.forEach(species => {
        const populationChange = ((species.predicted2070Population - species.currentPopulation) / species.currentPopulation) * 100;
        if (populationChange < 0) {
          recs.push({
            id: `rec-${recId++}`,
            type: 'conservation',
            priority: 'high',
            title: `${species.name} Population Recovery Program`,
            description: `Projected ${Math.abs(populationChange).toFixed(1)}% decline. Targeted intervention needed.`,
            impact: { species: [species.name], metric: 'population', expectedChange: Math.abs(populationChange) * 0.6, timeframe: '10-15 years', confidence: 78 },
            actions: ['Establish breeding programs', 'Enhance habitat protection', 'Reduce human-wildlife conflict', 'Implement anti-poaching measures'],
            cost: 'medium',
            feasibility: 80,
            evidenceBased: true
          });
        }
      });

      if (environmentalFactors.deforestation > 70) {
        recs.push({
          id: `rec-${recId++}`,
          type: 'policy',
          priority: 'high',
          title: 'Emergency Deforestation Moratorium',
          description: 'Implement immediate halt on forest clearing with compensation programs.',
          impact: { metric: 'deforestation', expectedChange: -40, timeframe: '2-3 years', confidence: 90 },
          actions: ['Enact forest protection laws', 'Provide alternative livelihoods', 'Establish monitoring systems', 'Create economic incentives'],
          cost: 'high',
          feasibility: 65,
          evidenceBased: true
        });
      }

      if (targetState.waterAvailability < 50) {
        recs.push({
          id: `rec-${recId++}`,
          type: 'immediate',
          priority: 'medium',
          title: 'Water Conservation Initiative',
          description: 'Implement water harvesting and efficiency measures to address scarcity.',
          impact: { metric: 'waterAvailability', expectedChange: 20, timeframe: '3-5 years', confidence: 82 },
          actions: ['Build rainwater harvesting systems', 'Restore wetlands', 'Improve irrigation efficiency', 'Reduce industrial water usage'],
          cost: 'medium',
          feasibility: 85,
          evidenceBased: true
        });
      }

      return recs.sort((a, b) => ({ high: 3, medium: 2, low: 1 }[b.priority] - { high: 3, medium: 2, low: 1 }[a.priority]));
    };

    const generatePredictions = (): Prediction[] => {
      const preds: Prediction[] = [];
      let predId = 0;

      const currentEcoScore = targetState.ecoScore;
      const predictedEcoScore = Math.max(30, Math.min(100, currentEcoScore + (environmentalFactors.conservation - 50) * 0.8 - (environmentalFactors.deforestation + environmentalFactors.climateChange) * 0.3));

      preds.push({
        id: `pred-${predId++}`,
        target: `${targetState.name} Eco-Score 2070`,
        currentValue: currentEcoScore,
        predictedValue: predictedEcoScore,
        confidence: 78,
        reasoning: ['Based on current conservation trends', 'Climate change impact modeling', 'Historical ecosystem recovery data', 'Machine learning habitat analysis'],
        timeframe: '2070',
        factors: ['conservation', 'deforestation', 'climateChange', 'urbanization']
      });

      speciesData.forEach(species => {
        if (targetState.majorSpecies.includes(species.id)) {
          preds.push({
            id: `pred-${predId++}`,
            target: `${species.name} Population`,
            currentValue: species.currentPopulation,
            predictedValue: species.predicted2070Population,
            confidence: 72,
            reasoning: ['Habitat availability projections', 'Climate suitability modeling', 'Conservation success rates', 'Population dynamics analysis'],
            timeframe: '2070',
            factors: ['habitatLoss', 'conservation', 'climateChange']
          });
        }
      });

      return preds;
    };

    setRecommendations(generateRecommendations());
    setPredictions(generatePredictions());
  }, [statesData, speciesData, environmentalFactors, selectedState]);

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    return priority === 'high' ? 'destructive' : priority === 'medium' ? 'secondary' : 'outline';
  };

  const selectedRec = recommendations.find(r => r.id === selectedRecommendation);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="text-primary" />
          AI-Powered Data Insights & Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recommendations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommendations">Smart Recommendations</TabsTrigger>
            <TabsTrigger value="predictions">AI Predictions</TabsTrigger>
            <TabsTrigger value="analysis">Impact Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="recommendations">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                {recommendations.map(rec => (
                  <Card
                    key={rec.id}
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${selectedRecommendation === rec.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => setSelectedRecommendation(rec.id)}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                      <Badge variant={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </Card>
                ))}
              </div>
              <div>
                {selectedRec ? (
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold">{selectedRec.title}</h3>
                    <ul className="space-y-1">
                      {selectedRec.actions.map((action, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ) : (
                  <Card className="p-6 text-center text-muted-foreground">
                    <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a recommendation to view details</p>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="predictions">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {predictions.map(pred => (
                <Card key={pred.id} className="p-6">
                  <h3 className="font-semibold">{pred.target}</h3>
                  <div className="flex justify-between">
                    <span>Current:</span>
                    <span>{pred.currentValue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Predicted:</span>
                    <span>{pred.predictedValue}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataDrivenInsights;
