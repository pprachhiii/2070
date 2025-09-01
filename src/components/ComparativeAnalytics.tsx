import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import type { StateData, SpeciesData} from '@/lib/types';

interface ComparativeAnalyticsProps {
  allStatesData: StateData[];
  allSpeciesData: SpeciesData[];
}

const ComparativeAnalytics: React.FC<ComparativeAnalyticsProps> = ({ allStatesData, allSpeciesData }) => {
  const [comparisonType, setComparisonType] = useState<'states' | 'species'>('states');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const addToComparison = (id: string) => {
    if (!selectedItems.includes(id) && selectedItems.length < 4) {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const removeFromComparison = (id: string) => {
    setSelectedItems(selectedItems.filter(item => item !== id));
  };

  const getComparisonData = () => {
    if (comparisonType === 'states') {
      const states = allStatesData.filter(state => selectedItems.includes(state.id));
      return states.map(state => ({
        name: state.name,
        forestCover: state.forestCover,
        airQuality: state.airQuality,
        waterAvailability: state.waterAvailability,
        wildlifeHealth: state.wildlifeHealth,
        ecoScore: state.ecoScore,
        predicted2070: state.population2070Prediction?.optimistic?.ecoScore ?? state.ecoScore
      }));
    } else {
      const species = allSpeciesData.filter(sp => selectedItems.includes(sp.id));
      return species.map(sp => ({
        name: sp.name,
        currentPopulation: sp.currentPopulation,
        predicted2070Population: sp.predicted2070Population,
        populationChange: ((sp.predicted2070Population - sp.currentPopulation) / sp.currentPopulation) * 100,
        geneticDiversity: sp.geneticDiversity?.current ?? 70,
        conservationStatus: sp.status
      }));
    }
  };

  const getRadarData = () => {
    if (comparisonType === 'states') {
      const metrics: (keyof StateData)[] = ['forestCover', 'airQuality', 'waterAvailability', 'wildlifeHealth'];
      return metrics.map(metric => {
        const dataPoint: Record<string, number | string> = { metric };
        selectedItems.forEach(stateId => {
          const state = allStatesData.find(s => s.id === stateId);
          if (state) dataPoint[state.name] = typeof state[metric] === 'number' || typeof state[metric] === 'string' ? state[metric] : 0;
        });
        return dataPoint;
      });
    } else {
      const metrics: (keyof SpeciesData)[] = ['currentPopulation', 'predicted2070Population', 'geneticDiversity'];
      return metrics.map(metric => {
        const dataPoint: Record<string, number | string> = { metric };
        selectedItems.forEach(spId => {
          const sp = allSpeciesData.find(s => s.id === spId);
          if (sp) {
            if (metric === 'geneticDiversity') {
              dataPoint[sp.name] = sp.geneticDiversity?.current ?? 70;
            } else {
              const value = sp[metric];
              dataPoint[sp.name] = typeof value === 'number' ? value / 1000 : 0;
            }
          }
        });
        return dataPoint;
      });
    }
  };

  const getStatisticalIndicators = () => {
    const data = getComparisonData();
    if (!data.length) return null;

    const targetMetric = comparisonType === 'states' ? 'ecoScore' : 'populationChange';
    const values: number[] = data.map(item => Number(item[targetMetric as keyof typeof item] ?? 0));

    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);

    const sorted = [...values].sort((a, b) => a - b);
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];

    return { mean, median, stdDev, variance };
  };

  const comparisonData = getComparisonData();
  const radarData = getRadarData();
  const stats = getStatisticalIndicators();
  const colors = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', '#10b981'];

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="text-primary" />
          Comparative Analytics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex gap-2">
          <Button
            variant={comparisonType === 'states' ? 'default' : 'outline'}
            onClick={() => { setComparisonType('states'); setSelectedItems([]); }}
          >
            Compare States
          </Button>
          <Button
            variant={comparisonType === 'species' ? 'default' : 'outline'}
            onClick={() => { setComparisonType('species'); setSelectedItems([]); }}
          >
            Compare Species
          </Button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Select {comparisonType === 'states' ? 'States' : 'Species'} to Compare (Max 4)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
            {(comparisonType === 'states' ? allStatesData : allSpeciesData).map(item => (
              <Button
                key={item.id}
                variant={selectedItems.includes(item.id) ? 'default' : 'outline'}
                size="sm"
                onClick={() => selectedItems.includes(item.id) ? removeFromComparison(item.id) : addToComparison(item.id)}
                disabled={!selectedItems.includes(item.id) && selectedItems.length >= 4}
              >
                {item.name}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedItems.map(id => {
              const item = (comparisonType === 'states' ? allStatesData : allSpeciesData).find(i => i.id === id);
              return (
                <Badge key={id} variant="secondary" className="cursor-pointer" onClick={() => removeFromComparison(id)}>
                  {item?.name} ×
                </Badge>
              );
            })}
          </div>
        </div>

        {comparisonData.length > 0 && (
          <>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                {comparisonType === 'states' ? 'Environmental Metrics' : 'Population Metrics'}
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={comparisonData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px' }} />
                    <Legend />
                    {comparisonType === 'states' ? (
                      <>
                        <Bar dataKey="forestCover" fill={colors[0]} name="Forest Cover %" />
                        <Bar dataKey="airQuality" fill={colors[1]} name="Air Quality %" />
                        <Bar dataKey="wildlifeHealth" fill={colors[2]} name="Wildlife Health %" />
                        <Bar dataKey="ecoScore" fill={colors[3]} name="Eco Score" />
                      </>
                    ) : (
                      <>
                        <Bar dataKey="currentPopulation" fill={colors[0]} name="Current Population" />
                        <Bar dataKey="predicted2070Population" fill={colors[1]} name="2070 Population" />
                      </>
                    )}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Multi-Factor Radar Comparison</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis />
                    {selectedItems.map((id, idx) => {
                      const item = (comparisonType === 'states' ? allStatesData : allSpeciesData).find(i => i.id === id);
                      return (
                        <Radar
                          key={id}
                          name={item?.name}
                          dataKey={item?.name as string}
                          stroke={colors[idx % colors.length]}
                          fill={colors[idx % colors.length]}
                          fillOpacity={0.1}
                        />
                      );
                    })}
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {stats && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Statistical Analysis</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Mean</div>
                    <div className="text-2xl font-bold">{stats.mean.toFixed(2)}</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Median</div>
                    <div className="text-2xl font-bold">{stats.median.toFixed(2)}</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Std. Deviation</div>
                    <div className="text-2xl font-bold">{stats.stdDev.toFixed(2)}</div>
                  </Card>
                  <Card className="p-4">
                    <div className="text-sm text-muted-foreground mb-1">Variance</div>
                    <div className="text-2xl font-bold">{stats.variance.toFixed(2)}</div>
                  </Card>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ComparativeAnalytics;
