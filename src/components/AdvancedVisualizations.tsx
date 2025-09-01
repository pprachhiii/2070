import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Eye, Layers, Move, Play, Pause, RotateCcw } from 'lucide-react';
import LayeredMap from "./LayeredMap";
import type { StateData} from '@/lib/types';

interface HeatmapData {
  state: string;
  lat: number;
  lng: number;
  value: number;
  label: string;
}

interface LayerConfig {
  id: string;
  name: string;
  type: 'heatmap' | 'choropleth' | 'markers';
  visible: boolean;
  opacity: number;
  color: string;
}

interface MigrationPath {
  species: string;
  path: Array<{ lat: number; lng: number; timestamp: number }>;
  seasonal: boolean;
}


type MetricKey = 'wildlifeHealth' | 'forestCover' | 'airQuality' | 'waterAvailability' | 'ecoScore';


interface AdvancedVisualizationsProps {
  statesData: StateData[];
}

const AdvancedVisualizations: React.FC<AdvancedVisualizationsProps> = ({
  statesData
}) => {
  const [activeVisualization, setActiveVisualization] = useState<'heatmap' | 'migration' | 'layers' >('heatmap');
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('wildlifeHealth');
  const [layers, setLayers] = useState<LayerConfig[]>([
    { id: 'threats', name: 'Threat Levels', type: 'heatmap', visible: true, opacity: 0.7, color: '#ef4444' },
    { id: 'habitats', name: 'Habitat Quality', type: 'heatmap', visible: false, opacity: 0.6, color: '#10b981' },
    { id: 'corridors', name: 'Wildlife Corridors', type: 'markers', visible: false, opacity: 0.8, color: '#3b82f6' },
    { id: 'protected', name: 'Protected Areas', type: 'choropleth', visible: false, opacity: 0.5, color: '#8b5cf6' }
  ]);
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [timeStep, setTimeStep] = useState(0);
  const [migrationData, setMigrationData] = useState<MigrationPath[]>([]);

  const generateHeatmapData = (metric: MetricKey): HeatmapData[] => {
    return statesData.map(state => ({
      state: state.name,
      lat: state.coordinates[0],
      lng: state.coordinates[1],
      value: state[metric],
      label: `${state.name}: ${state[metric].toFixed(1)}%`
    }));
  };

  useEffect(() => {
    const generateMigrationPaths = (): MigrationPath[] => {
      const paths: MigrationPath[] = [];

      // Tiger migration path (Uttarakhand to West Bengal)
      paths.push({
        species: 'Bengal Tiger',
        seasonal: true,
        path: [
          { lat: 30.0668, lng: 79.0193, timestamp: 0 },
          { lat: 28.7041, lng: 77.1025, timestamp: 1 },
          { lat: 26.9124, lng: 80.9462, timestamp: 2 },
          { lat: 25.0961, lng: 85.3131, timestamp: 3 },
          { lat: 22.9868, lng: 87.8550, timestamp: 4 }
        ]
      });

      // Elephant migration path (Kerala to Karnataka to Tamil Nadu)
      paths.push({
        species: 'Asian Elephant',
        seasonal: true,
        path: [
          { lat: 10.8505, lng: 76.2711, timestamp: 0 },
          { lat: 12.2958, lng: 76.6394, timestamp: 1 },
          { lat: 15.3173, lng: 75.7139, timestamp: 2 },
          { lat: 13.0827, lng: 80.2707, timestamp: 3 },
          { lat: 11.1271, lng: 78.6569, timestamp: 4 }
        ]
      });

      // Rhino movement (within Assam)
      paths.push({
        species: 'One-Horned Rhino',
        seasonal: false,
        path: [
          { lat: 26.5774, lng: 93.1714, timestamp: 0 },
          { lat: 26.7029, lng: 92.7597, timestamp: 1 },
          { lat: 26.2006, lng: 92.9376, timestamp: 2 },
          { lat: 26.1158, lng: 91.7086, timestamp: 3 },
          { lat: 26.5774, lng: 93.1714, timestamp: 4 }
        ]
      });

      return paths;
    };

    setMigrationData(generateMigrationPaths());
  }, []);

  const toggleLayer = (layerId: string) => {
    setLayers(prev => prev.map(layer => 
      layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const updateLayerOpacity = (layerId: string, opacity: number) => {
    setLayers(prev => prev.map(layer =>
      layer.id === layerId ? { ...layer, opacity: opacity / 100 } : layer
    ));
  };

  const getIntensityColor = (value: number, metric: MetricKey) => {
    const intensity = value / 100;
    return metric === 'wildlifeHealth' || metric === 'forestCover'
      ? `rgba(16, 185, 129, ${intensity})`
      : `rgba(239, 68, 68, ${intensity})`;
  };

  const heatmapData = generateHeatmapData(selectedMetric);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (animationPlaying) {
      interval = setInterval(() => {
        setTimeStep(prev => (prev + 1) % 5);
      }, 1000);
    }

    return () => interval && clearInterval(interval);
  }, [animationPlaying]);

  const getCurrentMigrationPositions = () => {
    return migrationData.map(migration => ({
      species: migration.species,
      seasonal: migration.seasonal,
      path: migration.path,
      currentPosition: migration.path[timeStep] || migration.path[0]
    }));
  };

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Eye className="text-primary" />
          Advanced Visualizations & Mapping
        </CardTitle>
      </CardHeader>
      <CardContent>

        <Tabs
          value={activeVisualization}
          onValueChange={(value) => setActiveVisualization(value as 'heatmap' | 'migration' | 'layers')}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="heatmap">Heatmaps</TabsTrigger>
            <TabsTrigger value="migration">Migration Patterns</TabsTrigger>
            <TabsTrigger value="layers">Layered Maps</TabsTrigger>
          </TabsList>

          <TabsContent value="heatmap" className="space-y-6">
            {/* Metric Selector */}
            <div className="flex gap-4 items-center">
              <span className="text-sm font-medium">Heatmap Metric:</span>
              <div className="flex gap-2">
                {['wildlifeHealth', 'forestCover', 'airQuality', 'waterAvailability', 'ecoScore'].map(metric => (
                  <Button
                    key={metric}
                    variant={selectedMetric === metric ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedMetric(metric as MetricKey)}
                  >
                    {metric.replace(/([A-Z])/g, ' $1')}
                  </Button>
                ))}
              </div>
            </div>

            {/* Heatmap Visualization */}
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {selectedMetric.replace(/([A-Z])/g, ' $1')} Intensity Map
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Low</span>
                    <div className="w-24 h-4 bg-gradient-to-r from-red-200 to-red-600 rounded"></div>
                    <span className="text-sm text-muted-foreground">High</span>
                  </div>
                </div>

                {/* Simulated Heatmap Grid */}
                <div className="grid grid-cols-5 gap-2">
                  {heatmapData.map((point, index) => {
                    return (
                      <div
                        key={index}
                        className="p-3 rounded border text-center transition-all hover:scale-105 cursor-pointer"
                        style={{
                          backgroundColor: getIntensityColor(point.value, selectedMetric),
                          border: `1px solid ${getIntensityColor(point.value * 1.5, selectedMetric)}`
                        }}
                        title={point.label}
                      >
                        <div className="text-xs font-medium text-white">{point.state}</div>
                        <div className="text-sm font-bold text-white">{point.value.toFixed(1)}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Gradient Legend */}
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Critical</span>
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>
            </Card>

            {/* Threat Level Choropleth */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Threat Level Distribution</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {statesData.slice(0, 6).map(state => {
                  const threatLevel = 100 - state.wildlifeHealth;
                  const threatColor = threatLevel > 60 ? 'bg-red-500' : threatLevel > 30 ? 'bg-orange-500' : 'bg-green-500';
                  
                  return (
                    <div key={state.id} className={`p-4 rounded-lg ${threatColor} text-white`}>
                      <div className="font-semibold">{state.name}</div>
                      <div className="text-sm opacity-90">Threat Level: {threatLevel.toFixed(1)}%</div>
                      <div className="text-xs opacity-75">
                        Main threats: {state.threats?.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="migration" className="space-y-6">
            {/* Animation Controls */}
            <div className="flex gap-4 items-center">
              <Button
                variant={animationPlaying ? 'default' : 'outline'}
                size="sm"
                onClick={() => setAnimationPlaying(!animationPlaying)}
              >
                {animationPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {animationPlaying ? 'Pause' : 'Play'} Animation
              </Button>
              <Button variant="outline" size="sm" onClick={() => setTimeStep(0)}>
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
              <div className="flex items-center gap-2">
                <span className="text-sm">Time Step:</span>
                <Badge variant="secondary">{timeStep + 1}/5</Badge>
              </div>
            </div>

            {/* Migration Map */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Wildlife Migration Patterns</h3>
              
              {/* Migration visualization */}
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-96 overflow-hidden">
                {getCurrentMigrationPositions().map((migration, index) => (
                  <div key={migration.species} className="absolute">
                    {/* Migration path */}
                    <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
                      <path
                        d={`M ${migration.path.map(p => `${(p.lng - 68) * 8} ${(35 - p.lat) * 8}`).join(' L ')}`}
                        stroke={`hsl(${index * 120}, 70%, 50%)`}
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                        opacity="0.6"
                      />
                    </svg>
                    
                    {/* Current position */}
                    <div
                      className={`absolute w-4 h-4 rounded-full border-2 border-white shadow-lg animate-pulse`}
                      style={{
                        backgroundColor: `hsl(${index * 120}, 70%, 50%)`,
                        left: `${(migration.currentPosition.lng - 68) * 8}px`,
                        top: `${(35 - migration.currentPosition.lat) * 8}px`,
                        zIndex: 10
                      }}
                      title={migration.species}
                    />
                  </div>
                ))}
                
                {/* State markers */}
                {statesData.map(state => (
                  <div
                    key={state.id}
                    className="absolute w-2 h-2 bg-gray-400 rounded-full"
                    style={{
                      left: `${(state.coordinates[1] - 68) * 8}px`,
                      top: `${(35 - state.coordinates[0]) * 8}px`
                    }}
                    title={state.name}
                  />
                ))}
              </div>

              {/* Migration Legend */}
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {migrationData.map((migration, index) => (
                  <div key={migration.species} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: `hsl(${index * 120}, 70%, 50%)` }}
                    />
                    <div>
                      <div className="font-medium text-sm">{migration.species}</div>
                      <div className="text-xs text-muted-foreground">
                        {migration.seasonal ? 'Seasonal' : 'Year-round'} movement
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Migration Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {getCurrentMigrationPositions().map(migration => {
                const currentPos = migration.currentPosition;
                return (
                  <Card key={migration.species} className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Move className="w-4 h-4 text-primary" />
                      <h4 className="font-semibold">{migration.species}</h4>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Pattern:</span>
                        <Badge variant={migration.seasonal ? 'default' : 'secondary'}>
                          {migration.seasonal ? 'Seasonal' : 'Resident'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Current Position:</span>
                        <span>{currentPos.lat.toFixed(2)}, {currentPos.lng.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Path Length:</span>
                        <span>{migration.path.length} waypoints</span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="layers" className="space-y-6">
            {/* Layer Controls */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4" />
                Map Layers
              </h3>
              <div className="space-y-4">
                {layers.map(layer => (
                  <div key={layer.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={layer.visible}
                        onChange={() => toggleLayer(layer.id)}
                        className="rounded"
                      />
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: layer.color }}
                      />
                      <span className="font-medium">{layer.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {layer.type}
                      </Badge>
                    </div>
                    
                    {layer.visible && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Opacity:</span>
                        <Slider
                          value={[layer.opacity * 100]}
                          onValueChange={(value) => updateLayerOpacity(layer.id, value[0])}
                          max={100}
                          step={5}
                          className="w-20"
                        />
                        <span className="text-sm w-8">{Math.round(layer.opacity * 100)}%</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
            <TabsContent value="layers" className="space-y-6">
              <LayeredMap />
            </TabsContent>

          </TabsContent>
        </Tabs>
        </CardContent>
    </Card>
  );
};

export default AdvancedVisualizations;
