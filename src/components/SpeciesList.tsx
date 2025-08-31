import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Eye, MapPin, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Species {
  id: string;
  name: string;
  currentPopulation: number;
  predicted2070Population: number;
  status: string;
  states: string[];
  populationTrend: string;
  description: string;
}

interface SpeciesListProps {
  species: Species[];
  onSpeciesSelect: (speciesId: string) => void;
}

const SpeciesList: React.FC<SpeciesListProps> = ({ species, onSpeciesSelect }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'safe': return 'status-safe';
      case 'vulnerable': return 'status-vulnerable';
      case 'endangered': return 'status-endangered';
      case 'critical': return 'status-critical';
      default: return 'status-vulnerable';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="text-green-400" size={16} />;
      case 'stable': return <Minus className="text-yellow-400" size={16} />;
      case 'decreasing': return <TrendingDown className="text-red-400" size={16} />;
      default: return <Minus className="text-yellow-400" size={16} />;
    }
  };

  const getSpeciesEmoji = (name: string) => {
    if (name.toLowerCase().includes('tiger')) return '🐅';
    if (name.toLowerCase().includes('elephant')) return '🐘';
    if (name.toLowerCase().includes('rhino')) return '🦏';
    if (name.toLowerCase().includes('leopard')) return '🐆';
    if (name.toLowerCase().includes('panda')) return '🐼';
    if (name.toLowerCase().includes('lion')) return '🦁';
    return '🦌';
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          Indian Wildlife Species
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore detailed profiles and population projections for India's most iconic wildlife species
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {species.map((animal) => {
          const populationChange = animal.predicted2070Population - animal.currentPopulation;
          const changePercent = ((populationChange / animal.currentPopulation) * 100).toFixed(1);
          
          return (
            <Card 
              key={animal.id} 
              className="glass-card hover:scale-105 transition-all duration-300 cursor-pointer group overflow-hidden"
              onClick={() => onSpeciesSelect(animal.id)}
            >
              <CardHeader className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {getSpeciesEmoji(animal.name)}
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(animal.populationTrend)}
                    <Badge className={getStatusColor(animal.status)} variant="outline">
                      {animal.status}
                    </Badge>
                  </div>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">
                  {animal.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {animal.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Population Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current (2024)</span>
                    <span className="font-medium">{animal.currentPopulation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Predicted (2070)</span>
                    <span className={`font-medium ${
                      populationChange > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {animal.predicted2070Population.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(100, (animal.predicted2070Population / animal.currentPopulation) * 50)} 
                    className="h-2"
                  />
                  <div className="text-center">
                    <span className={`text-xs font-medium ${
                      populationChange > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {populationChange > 0 ? '+' : ''}{changePercent}% projected change
                    </span>
                  </div>
                </div>

                {/* Geographic Distribution */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin size={14} className="text-muted-foreground" />
                    <span className="text-sm font-medium">Found in {animal.states.length} states</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {animal.states.slice(0, 3).map((state, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {state.split(' ')[0]}
                      </Badge>
                    ))}
                    {animal.states.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{animal.states.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full mt-4 group-hover:bg-primary/10 group-hover:border-primary/50 transition-colors duration-300"
                >
                  <Eye className="mr-2" size={14} />
                  View Full Profile
                </Button>
              </CardContent>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="text-center mt-12">
        <div className="glass-card p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold mb-3">About Population Projections</h3>
          <p className="text-sm text-muted-foreground">
            Population predictions are based on current conservation efforts, habitat changes, 
            climate impacts, and human intervention scenarios. These projections help guide 
            conservation strategies and policy decisions for wildlife protection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SpeciesList;