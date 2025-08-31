import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Play, Pause, RotateCcw } from 'lucide-react';

interface HeatmapData {
  state: string;
  lat: number;
  lng: number;
  value: number;
  label: string;
}

interface MigrationPath {
  species: string;
  path: Array<{ lat: number; lng: number; timestamp: number }>;
  seasonal: boolean;
}

interface State {
  id: string;
  name: string;
  coordinates: [number, number];
  forestCover: number;
  airQuality: number;
  waterAvailability: number;
  wildlifeHealth: number;
  ecoScore: number;
  threats?: string[];
}

interface AdvancedVisualizationsProps {
  statesData: State[];
}

const AdvancedVisualizations: React.FC<AdvancedVisualizationsProps> = ({ statesData }) => {
  const [activeVisualization, setActiveVisualization] = useState('heatmap');
  const [selectedMetric, setSelectedMetric] = useState<keyof State>('wildlifeHealth');
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [timeStep, setTimeStep] = useState(0);
  const [migrationData, setMigrationData] = useState<MigrationPath[]>([]);

  // Generate heatmap data
  const generateHeatmapData = (metric: keyof State): HeatmapData[] => {
    return statesData.map(state => ({
      state: state.name,
      lat: state.coordinates[0],
      lng: state.coordinates[1],
      value: Number(state[metric]) || 0,
      label: `${state.name}: ${(Number(state[metric]) || 0).toFixed(1)}%`
    }));
  };

  const heatmapData = generateHeatmapData(selectedMetric);

  // Generate migration paths
  useEffect(() => {
    const paths: MigrationPath[] = [
      {
        species: 'Bengal Tiger',
        seasonal: true,
        path: [
          { lat: 30.0668, lng: 79.0193, timestamp: 0 },
          { lat: 28.7041, lng: 77.1025, timestamp: 1 },
          { lat: 26.9124, lng: 80.9462, timestamp: 2 },
          { lat: 25.0961, lng: 85.3131, timestamp: 3 },
          { lat: 22.9868, lng: 87.8550, timestamp: 4 }
        ]
      },
      {
        species: 'Asian Elephant',
        seasonal: true,
        path: [
          { lat: 10.8505, lng: 76.2711, timestamp: 0 },
          { lat: 12.2958, lng: 76.6394, timestamp: 1 },
          { lat: 15.3173, lng: 75.7139, timestamp: 2 },
          { lat: 13.0827, lng: 80.2707, timestamp: 3 },
          { lat: 11.1271, lng: 78.6569, timestamp: 4 }
        ]
      },
      {
        species: 'One-Horned Rhino',
        seasonal: false,
        path: [
          { lat: 26.5774, lng: 93.1714, timestamp: 0 },
          { lat: 26.7029, lng: 92.7597, timestamp: 1 },
          { lat: 26.2006, lng: 92.9376, timestamp: 2 },
          { lat: 26.1158, lng: 91.7086, timestamp: 3 },
          { lat: 26.5774, lng: 93.1714, timestamp: 4 }
        ]
      }
    ];
    setMigrationData(paths);
  }, []);

  // Animation control
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (animationPlaying) {
      interval = setInterval(() => setTimeStep(prev => (prev + 1) % 5), 1000);
    }
    return () => interval && clearInterval(interval);
  }, [animationPlaying]);

  // Compute current positions to use migrationData (prevents ESLint warning)
  const currentMigrationPositions = migrationData.map(migration => ({
    species: migration.species,
    seasonal: migration.seasonal,
    currentPosition: migration.path[timeStep] || migration.path[0]
  }));

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="text-primary" />
          Advanced Visualizations & Mapping
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeVisualization} onValueChange={setActiveVisualization} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="heatmap">Heatmaps</TabsTrigger>
            <TabsTrigger value="migration">Migration Patterns</TabsTrigger>
            <TabsTrigger value="layers">Layered Maps</TabsTrigger>
            <TabsTrigger value="3d">3D Visualizations</TabsTrigger>
          </TabsList>

          {/* Heatmap Tab */}
          <TabsContent value="heatmap" className="space-y-6">
            <div className="flex gap-4 items-center">
              <span className="text-sm font-medium">Heatmap Metric:</span>
              <div className="flex gap-2">
                {['wildlifeHealth','forestCover','airQuality','waterAvailability','ecoScore'].map(metric => (
                  <Button
                    key={metric}
                    variant={selectedMetric === metric ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedMetric(metric as keyof State)}
                  >
                    {metric.replace(/([A-Z])/g, ' $1')}
                  </Button>
                ))}
              </div>
            </div>
            
            <Card className="p-6">
              <div className="grid grid-cols-5 gap-2">
                {heatmapData.map((point, index) => (
                  <div
                    key={index}
                    className="p-3 rounded border text-center transition-all hover:scale-105 cursor-pointer"
                    style={{
                      backgroundColor: `rgba(16,185,129,${point.value/100})`,
                      border: `1px solid rgba(16,185,129,${point.value/100*1.5})`
                    }}
                    title={point.label}
                  >
                    <div className="text-xs font-medium text-white">{point.state}</div>
                    <div className="text-sm font-bold text-white">{point.value.toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Migration Tab */}
          <TabsContent value="migration" className="space-y-6">
            <div className="flex gap-4 items-center">
              <Button variant={animationPlaying ? 'default' : 'outline'} size="sm" onClick={() => setAnimationPlaying(!animationPlaying)}>
                {animationPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {animationPlaying ? 'Pause' : 'Play'} Animation
              </Button>
              <Button variant="outline" size="sm" onClick={() => setTimeStep(0)}>
                <RotateCcw className="w-4 h-4" /> Reset
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm">Time Step:</span>
                <Badge variant="secondary">{timeStep + 1}/5</Badge>
              </div>
            </div>

            {/* Display current migration positions */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {currentMigrationPositions.map((m, idx) => (
                <div key={idx} className="text-xs text-white">
                  {m.species}: {m.currentPosition.lat.toFixed(2)}, {m.currentPosition.lng.toFixed(2)}
                </div>
              ))}
            </div>
          </TabsContent>

        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedVisualizations;
