import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { StateData, SpeciesData} from '@/lib/types';

interface PopulationChartProps {
  stateData: StateData;
  speciesData: SpeciesData[];
}

const PopulationChart: React.FC<PopulationChartProps> = ({ stateData, speciesData }) => {
  const stateSpecies = speciesData.filter(species =>
    stateData.majorSpecies.includes(species.id)
  );

  const timelineData = [
    { year: 2024, ...Object.fromEntries(stateSpecies.map(s => [s.name, s.currentPopulation])) },
    { year: 2030, ...Object.fromEntries(stateSpecies.map(s => [
      s.name,
      Math.round(s.currentPopulation + (s.predicted2070Population - s.currentPopulation) * 0.13)
    ])) },
    { year: 2040, ...Object.fromEntries(stateSpecies.map(s => [
      s.name,
      Math.round(s.currentPopulation + (s.predicted2070Population - s.currentPopulation) * 0.35)
    ])) },
    { year: 2050, ...Object.fromEntries(stateSpecies.map(s => [
      s.name,
      Math.round(s.currentPopulation + (s.predicted2070Population - s.currentPopulation) * 0.65)
    ])) },
    { year: 2060, ...Object.fromEntries(stateSpecies.map(s => [
      s.name,
      Math.round(s.currentPopulation + (s.predicted2070Population - s.currentPopulation) * 0.85)
    ])) },
    { year: 2070, ...Object.fromEntries(stateSpecies.map(s => [s.name, s.predicted2070Population])) }
  ];

  const comparisonData = stateSpecies.map(species => ({
    name: species.name.split(' ')[0],
    current: species.currentPopulation,
    predicted: species.predicted2070Population,
    change: species.predicted2070Population - species.currentPopulation
  }));

  const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="text-green-400" size={16} />;
      case 'stable': return <Minus className="text-yellow-400" size={16} />;
      case 'decreasing': return <TrendingDown className="text-red-400" size={16} />;
      default: return <Minus className="text-yellow-400" size={16} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'safe': return 'status-safe';
      case 'vulnerable': return 'status-vulnerable';
      case 'endangered': return 'status-endangered';
      case 'critical': return 'status-critical';
      default: return 'status-vulnerable';
    }
  };

  return (
    <Card className="glass-card space-y-6">
      <CardHeader>
        <CardTitle className="text-2xl">Population Trends - {stateData.name}</CardTitle>
        <p className="text-sm text-muted-foreground">
          Wildlife population projections from 2024 to 2070
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Population Timeline */}
        <div>
          <h3 className="font-semibold mb-4">Population Projection Timeline</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                  formatter={(value: number | string) => [Number(value).toLocaleString(), 'Population']}
                />
                {stateSpecies.map((species, index) => (
                  <Line
                    key={species.id}
                    type="monotone"
                    dataKey={species.name}
                    stroke={colors[index % colors.length]}
                    strokeWidth={3}
                    dot={{ fill: colors[index % colors.length], strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: colors[index % colors.length] }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Comparison Chart */}
        <div>
          <h3 className="font-semibold mb-4">Current vs 2070 Prediction</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(31, 41, 55, 0.9)',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f9fafb'
                  }}
                  formatter={(value: number | string) => [Number(value).toLocaleString(), 'Population']}
                />
                <Bar dataKey="current" fill="#6b7280" name="Current (2024)" />
                <Bar dataKey="predicted" fill="#22c55e" name="Predicted (2070)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Species Summary */}
        <div>
          <h3 className="font-semibold mb-4">Species Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {stateSpecies.map((species) => {
              const populationChange = species.predicted2070Population - species.currentPopulation;
              const changePercent = ((populationChange / species.currentPopulation) * 100).toFixed(1);

              return (
                <div key={species.id} className="p-4 bg-card/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{species.name}</h4>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(species.populationTrend)}
                      <Badge className={getStatusColor(species.status)} variant="outline">
                        {species.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current:</span>
                      <span className="font-medium">{species.currentPopulation.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">2070 Prediction:</span>
                      <span className={`font-medium ${populationChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {species.predicted2070Population.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Change:</span>
                      <span className={`font-medium ${populationChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {populationChange > 0 ? '+' : ''}{changePercent}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Additional State Insights */}
        <div>
          <h3 className="font-semibold mb-4">Environmental & Policy Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            {stateData.threats && (
              <div>
                <h4 className="font-medium">Threats:</h4>
                <ul className="list-disc list-inside">{stateData.threats.map((t, i) => <li key={i}>{t}</li>)}</ul>
              </div>
            )}
            {stateData.pollutionLevels && (
              <div>
                <h4 className="font-medium">Pollution Levels:</h4>
                <ul className="list-disc list-inside">
                  <li>Air: {stateData.pollutionLevels.air}%</li>
                  <li>Water: {stateData.pollutionLevels.water}%</li>
                  <li>Soil: {stateData.pollutionLevels.soil}%</li>
                </ul>
              </div>
            )}
            {stateData.invasiveSpeciesImpact !== undefined && (
              <div>Invasive Species Impact: {stateData.invasiveSpeciesImpact}%</div>
            )}
            {stateData.waterScarcityRisk !== undefined && (
              <div>Water Scarcity Risk: {stateData.waterScarcityRisk}%</div>
            )}
            {stateData.forestFragmentation !== undefined && (
              <div>Forest Fragmentation: {stateData.forestFragmentation}%</div>
            )}
            {stateData.conservationProjects && (
              <div>
                <h4 className="font-medium">Conservation Projects:</h4>
                <ul className="list-disc list-inside">{stateData.conservationProjects.map((p, i) => <li key={i}>{p}</li>)}</ul>
              </div>
            )}
            {stateData.criticalAlerts && stateData.criticalAlerts.length > 0 && (
              <div>
                <h4 className="font-medium text-red-500">Critical Alerts:</h4>
                <ul className="list-disc list-inside">
                  {stateData.criticalAlerts.map((alert, i) => (
                    <li key={i}>
                      <strong>{alert.severity.toUpperCase()}:</strong> {alert.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs">
          {stateSpecies.map((species, index) => (
            <div key={species.id} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[index % colors.length] }} />
              <span>{species.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PopulationChart;
