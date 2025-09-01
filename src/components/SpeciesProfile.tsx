import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, MapPin, Heart, Zap } from 'lucide-react';
import type { SpeciesData } from '@/lib/types';


interface SpeciesProfileProps {
  species: SpeciesData;
  onClose: () => void;
}

const SpeciesProfile: React.FC<SpeciesProfileProps> = ({ species, onClose }) => {
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
      case 'increasing': return '📈';
      case 'stable': return '➡️';
      case 'decreasing': return '📉';
      default: return '➡️';
    }
  };

  const populationChange = species.predicted2070Population - species.currentPopulation;
  const populationChangePercent = ((populationChange / species.currentPopulation) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <Card className="glass-card w-full max-w-5xl max-h-[90vh] overflow-auto m-4">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 right-4"
            onClick={onClose}
          >
            <X size={20} />
          </Button>
          <div className="flex items-start gap-6">
            <img
              src={species.image || '/api/placeholder/600/400'}
              alt={species.name}
              className="w-32 h-32 rounded-lg object-cover border-2 border-primary/30"
            />
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2">{species.name}</CardTitle>
              <p className="text-lg text-muted-foreground italic mb-3">{species.scientificName}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className={getStatusColor(species.status)} variant="outline">
                  Current: {species.status}
                </Badge>
                <Badge className={getStatusColor(species.conservationStatus2070)} variant="outline">
                  2070: {species.conservationStatus2070}
                </Badge>
                <Badge variant="secondary">
                  {getTrendIcon(species.populationTrend)} {species.populationTrend}
                </Badge>
              </div>
              <p className="text-foreground">{species.description}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Population Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Zap className="text-primary" />
                  Population Projection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Current (2024)</span>
                    <span className="font-bold text-xl">{species.currentPopulation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Predicted (2070)</span>
                    <span className={`font-bold text-xl ${
                      populationChange > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {species.predicted2070Population.toLocaleString()}
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(100, (species.predicted2070Population / species.currentPopulation) * 50)} 
                    className="h-3"
                  />
                  <div className="text-center">
                    <span className={`text-sm font-medium ${
                      populationChange > 0 ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {populationChange > 0 ? '+' : ''}{populationChangePercent}% change
                    </span>
                  </div>

                  {/* Historical Population */}
                  <div className="mt-4">
                    <span className="font-semibold">Historical Population:</span>
                    <ul className="text-sm space-y-1">
                      {Object.entries(species.historicalPopulation).map(([year, pop]) => (
                        <li key={year}>{year}: {pop.toLocaleString()}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Heart className="text-accent" />
                  Species Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Diet Type</span>
                    <span className="font-medium">{species.dietType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Lifespan</span>
                    <span className="font-medium">{species.averageLifespan}</span>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">Habitat</span>
                    <div className="flex flex-wrap gap-1">
                      {species.habitatPreferences.map((habitat, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {habitat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Predator-Prey Relationships */}
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">Predator-Prey Relationships</span>
                    <div className="flex flex-wrap gap-1">
                      {species.predatorPreyRelationships.map((prey, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {prey}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Migration Patterns */}
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">Migration Patterns</span>
                    <p className="text-sm">
                      Seasonal: {species.migrationPatterns.seasonal ? 'Yes' : 'No'}, Distance: {species.migrationPatterns.distance}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {species.migrationPatterns.corridorsUsed.map((corridor, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {corridor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Genetic Diversity */}
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">Genetic Diversity</span>
                    <p className="text-sm">
                      Current: {species.geneticDiversity.current}%, Predicted 2070: {species.geneticDiversity.predicted2070}%
                    </p>
                  </div>

                  {/* Population Scenarios */}
                  <div>
                    <span className="text-sm text-muted-foreground block mb-1">Population Scenarios</span>
                    <p className="text-sm">
                      Optimistic: {species.populationScenarios.optimistic.toLocaleString()}, Pessimistic: {species.populationScenarios.pessimistic.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* States and Conservation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="text-secondary" />
                  Found in States
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {species.states.map((state, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {state}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Major Threats</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {species.threats.map((threat, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      {threat}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Conservation Actions */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Conservation Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {species.conservationActions.map((action, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <span className="text-sm">{action}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fun Facts */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Fun Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {species.funFacts.map((fact, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-lg">💡</span>
                    <span className="text-sm">{fact}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default SpeciesProfile;
