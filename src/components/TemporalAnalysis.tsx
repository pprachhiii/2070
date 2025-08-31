import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, TrendingUp, TrendingDown } from 'lucide-react';

interface HistoricalData {
  forestCover: number;
  airQuality: number;
  waterAvailability: number;
  wildlifeHealth: number;
  ecoScore: number;
}

interface PopulationPrediction {
  optimistic: HistoricalData;
  pessimistic: HistoricalData;
}

interface StateData {
  id: string;
  name: string;
  forestCover: number;
  airQuality: number;
  waterAvailability: number;
  wildlifeHealth: number;
  ecoScore: number;
  historicalData: Record<string, HistoricalData>;
  population2070Prediction?: PopulationPrediction;
}

interface SpeciesData {
  id: string;
  name: string;
  currentPopulation: number;
  predicted2070Population: number;
  historicalPopulation: Record<string, number>;
}

interface TimelineData {
  year: number;
  forestCover: number;
  airQuality: number;
  waterAvailability: number;
  wildlifeHealth: number;
  ecoScore: number;
  [key: string]: number | string;
}

interface TemporalAnalysisProps {
  stateData: StateData;
  speciesData: SpeciesData[];
}

const TemporalAnalysis: React.FC<TemporalAnalysisProps> = ({ stateData, speciesData }) => {
  const [selectedYear, setSelectedYear] = useState<number[]>([2024]);

  const years = [2020, 2030, 2040, 2050, 2060, 2070];

  const generateTimelineData = (): TimelineData[] => {
    return years.map((year) => {
      const yearStr = year.toString();
      const data: TimelineData = {
        year,
        forestCover: stateData.forestCover,
        airQuality: stateData.airQuality,
        waterAvailability: stateData.waterAvailability,
        wildlifeHealth: stateData.wildlifeHealth,
        ecoScore: stateData.ecoScore,
      };

      if (stateData.historicalData && stateData.historicalData[yearStr]) {
        Object.assign(data, stateData.historicalData[yearStr]);
      }

      return data;
    });
  };

  const generateSpeciesTrendData = (): TimelineData[] => {
    return years.map((year) => {
      const yearStr = year.toString();
      const data: TimelineData = { year, forestCover: 0, airQuality: 0, waterAvailability: 0, wildlifeHealth: 0, ecoScore: 0 };

      speciesData.forEach((species) => {
        if (species.historicalPopulation && species.historicalPopulation[yearStr] !== undefined) {
          data[species.name] = species.historicalPopulation[yearStr];
        } else if (year === 2024) {
          data[species.name] = species.currentPopulation;
        } else if (year === 2070) {
          data[species.name] = species.predicted2070Population;
        } else {
          const progress = (year - 2024) / (2070 - 2024);
          data[species.name] = Math.round(species.currentPopulation + (species.predicted2070Population - species.currentPopulation) * progress);
        }
      });

      return data;
    });
  };

  const timelineData = generateTimelineData();
  const speciesTrendData = generateSpeciesTrendData();

  const currentData = timelineData.find((d) => d.year === selectedYear[0]);

  const getChangeIndicator = (metric: keyof HistoricalData) => {
    if (!currentData) return { change: 0, trend: 'stable' as const };
    const previousYear = timelineData.find((d) => d.year === selectedYear[0] - 10);
    if (!previousYear) return { change: 0, trend: 'stable' as const };

    const change = ((currentData[metric] as number - (previousYear[metric] as number)) / (previousYear[metric] as number)) * 100;
    const trend = change > 2 ? 'increasing' : change < -2 ? 'decreasing' : 'stable';
    return { change: Math.abs(change), trend };
  };

  const colors = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#10b981', '#f59e0b', '#ef4444'];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="text-primary" />
          Temporal Analysis: {stateData.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Year Slider */}
        <div>
          <label className="text-sm font-medium mb-2 block">
            Selected Year: {selectedYear[0]}
          </label>
          <Slider
            value={selectedYear}
            onValueChange={setSelectedYear}
            min={2020}
            max={2070}
            step={10}
            className="mb-4"
          />
        </div>

        {/* Environmental Metrics Timeline */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Environmental Health Trends</h3>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="forestCover" stroke={colors[0]} strokeWidth={2} name="Forest Cover %" />
                <Line type="monotone" dataKey="airQuality" stroke={colors[1]} strokeWidth={2} name="Air Quality %" />
                <Line type="monotone" dataKey="waterAvailability" stroke={colors[2]} strokeWidth={2} name="Water Availability %" />
                <Line type="monotone" dataKey="wildlifeHealth" stroke={colors[3]} strokeWidth={2} name="Wildlife Health %" />
                <Line type="monotone" dataKey="ecoScore" stroke={colors[4]} strokeWidth={2} name="Eco Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Species Population Trends */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Species Population Trends</h3>
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={speciesTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                {speciesData.map((species, index) => (
                  <Line key={species.id} type="monotone" dataKey={species.name} stroke={colors[index % colors.length]} strokeWidth={2} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Year Metrics */}
        {currentData && (
          <div>
            <h3 className="text-lg font-semibold mb-4">Metrics for {selectedYear[0]}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(['forestCover', 'airQuality', 'waterAvailability', 'wildlifeHealth'] as (keyof HistoricalData)[]).map((metric) => {
                const indicator = getChangeIndicator(metric);
                return (
                  <Card key={metric} className="p-4">
                    <div className="text-sm text-muted-foreground capitalize mb-1">
                      {metric.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div className="text-2xl font-bold mb-2">
                      {currentData[metric]?.toFixed(1)}%
                    </div>
                    <div className="flex items-center gap-1">
                      {indicator.trend === 'increasing' && <TrendingUp className="w-4 h-4 text-green-500" />}
                      {indicator.trend === 'decreasing' && <TrendingDown className="w-4 h-4 text-red-500" />}
                      <Badge variant={indicator.trend === 'increasing' ? 'default' : indicator.trend === 'decreasing' ? 'destructive' : 'secondary'}>
                        {indicator.change.toFixed(1)}%
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TemporalAnalysis;
