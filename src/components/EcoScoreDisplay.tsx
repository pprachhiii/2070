import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TreePine, Droplets, Wind, Heart } from 'lucide-react';

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
  coordinates: number[];
}

interface EcoScoreDisplayProps {
  stateData: StateData;
}

const EcoScoreDisplay: React.FC<EcoScoreDisplayProps> = ({ stateData }) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400';
    if (score >= 75) return 'text-lime-400';
    if (score >= 65) return 'text-yellow-400';
    if (score >= 55) return 'text-orange-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 65) return 'Fair';
    if (score >= 55) return 'Poor';
    return 'Critical';
  };

  const getScoreBadgeClass = (score: number) => {
    if (score >= 85) return 'eco-excellent';
    if (score >= 75) return 'eco-good';
    if (score >= 65) return 'eco-fair';
    if (score >= 55) return 'eco-poor';
    return 'eco-critical';
  };

  const ecoFactors = [
    {
      name: 'Forest Cover',
      value: stateData.forestCover,
      icon: TreePine,
      color: 'text-green-400',
      suffix: '%'
    },
    {
      name: 'Air Quality',
      value: stateData.airQuality,
      icon: Wind,
      color: 'text-blue-400',
      suffix: '%'
    },
    {
      name: 'Water Availability',
      value: stateData.waterAvailability,
      icon: Droplets,
      color: 'text-cyan-400',
      suffix: '%'
    },
    {
      name: 'Wildlife Health',
      value: stateData.wildlifeHealth,
      icon: Heart,
      color: 'text-purple-400',
      suffix: '%'
    }
  ];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-2xl">{stateData.name} - Environmental Health</CardTitle>
        <div className="flex items-center gap-3">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor(stateData.ecoScore)}`}>
              {Math.round(stateData.ecoScore)}
            </div>
            <Badge className={getScoreBadgeClass(stateData.ecoScore)} variant="outline">
              {getScoreLabel(stateData.ecoScore)}
            </Badge>
          </div>
          <div className="flex-1">
            <div className="text-sm text-muted-foreground mb-2">Overall Eco Score</div>
            <Progress value={stateData.ecoScore} className="h-3" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Individual Factors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ecoFactors.map((factor) => {
            const Icon = factor.icon;
            return (
              <div key={factor.name} className="p-4 bg-card/30 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg bg-background/50 ${factor.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{factor.name}</h3>
                    <div className="text-xs text-muted-foreground">
                      Environmental factor
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      {Math.round(factor.value)}{factor.suffix}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={getScoreBadgeClass(factor.value)}
                    >
                      {getScoreLabel(factor.value)}
                    </Badge>
                  </div>
                  <Progress value={factor.value} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Conservation Projects */}
        <div>
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <TreePine className="text-primary" size={18} />
            Active Conservation Projects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {stateData.conservationProjects.map((project, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-sm">{project}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Species Count */}
        <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-semibold">Major Species</h3>
              <p className="text-sm text-muted-foreground">Protected wildlife species</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary">
                {stateData.majorSpecies.length}
              </div>
              <div className="text-xs text-muted-foreground">Species</div>
            </div>
          </div>
        </div>

        {/* Score Calculation Info */}
        <div className="text-xs text-muted-foreground bg-card/20 p-3 rounded-lg">
          <div className="font-medium mb-1">Eco Score Calculation:</div>
          <div>Forest Cover (40%) + Wildlife Health (40%) + Water Availability (10%) + Air Quality (10%)</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EcoScoreDisplay;