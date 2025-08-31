import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, AlertCircle, Info, Filter, Bell, X } from 'lucide-react';

interface Alert {
  id: string;
  type: 'species' | 'environment' | 'ecosystem';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  state?: string;
  species?: string[];
  timestamp: Date;
  metric?: string;
  value?: number;
  threshold?: number;
}

interface StateData {
  name: string;
  ecoScore: number;
  forestCover: number;
  waterAvailability: number;
  airQuality: number;
  criticalAlerts?: Alert[];
}

interface SpeciesData {
  name: string;
  currentPopulation: number;
  predicted2070Population: number;
  geneticDiversity?: { current: number; predicted2070?: number };
  status?: string;
}

interface EnvironmentalFactors {
  deforestation: number;
  climateChange: number;
  conservation: number;
}

interface InteractiveAlertsProps {
  statesData: StateData[];
  speciesData: SpeciesData[];
  currentEnvironmentalFactors: EnvironmentalFactors;
}

const InteractiveAlerts: React.FC<InteractiveAlertsProps> = ({ 
  statesData, 
  speciesData, 
  currentEnvironmentalFactors 
}) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [filteredAlerts, setFilteredAlerts] = useState<Alert[]>([]);
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [dismissedAlerts, setDismissedAlerts] = useState<string[]>([]);

  useEffect(() => {
    const newAlerts: Alert[] = [];
    let alertId = 0;

    statesData.forEach(state => {
      if (state.ecoScore < 50) {
        newAlerts.push({
          id: `alert-${alertId++}`,
          type: 'environment',
          severity: 'critical',
          message: `${state.name} eco-score critically low at ${state.ecoScore.toFixed(1)}`,
          state: state.name,
          timestamp: new Date(),
          metric: 'ecoScore',
          value: state.ecoScore,
          threshold: 50
        });
      } else if (state.ecoScore < 65) {
        newAlerts.push({
          id: `alert-${alertId++}`,
          type: 'environment',
          severity: 'medium',
          message: `${state.name} eco-score below warning threshold at ${state.ecoScore.toFixed(1)}`,
          state: state.name,
          timestamp: new Date(),
          metric: 'ecoScore',
          value: state.ecoScore,
          threshold: 65
        });
      }

      if (state.forestCover < 10) {
        newAlerts.push({
          id: `alert-${alertId++}`,
          type: 'environment',
          severity: 'high',
          message: `Critical deforestation in ${state.name}: ${state.forestCover.toFixed(1)}% forest cover remaining`,
          state: state.name,
          timestamp: new Date(),
          metric: 'forestCover',
          value: state.forestCover,
          threshold: 10
        });
      }

      if (state.waterAvailability < 40) {
        newAlerts.push({
          id: `alert-${alertId++}`,
          type: 'environment',
          severity: 'high',
          message: `Severe water scarcity in ${state.name}: ${state.waterAvailability.toFixed(1)}% availability`,
          state: state.name,
          timestamp: new Date(),
          metric: 'waterAvailability',
          value: state.waterAvailability,
          threshold: 40
        });
      }

      if (state.airQuality < 50) {
        newAlerts.push({
          id: `alert-${alertId++}`,
          type: 'environment',
          severity: 'medium',
          message: `Poor air quality in ${state.name}: ${state.airQuality.toFixed(1)}% quality index`,
          state: state.name,
          timestamp: new Date(),
          metric: 'airQuality',
          value: state.airQuality,
          threshold: 50
        });
      }

      if (state.criticalAlerts) {
        state.criticalAlerts.forEach((alert: Alert) => {
          newAlerts.push({
            ...alert,
            id: `alert-${alertId++}`,
            timestamp: new Date()
          });
        });
      }
    });

    speciesData.forEach(species => {
      const populationChange = ((species.predicted2070Population - species.currentPopulation) / species.currentPopulation) * 100;
      
      if (populationChange < -50) {
        newAlerts.push({
          id: `alert-${alertId++}`,
          type: 'species',
          severity: 'critical',
          message: `${species.name} population projected to decline by ${Math.abs(populationChange).toFixed(1)}%`,
          species: [species.name],
          timestamp: new Date()
        });
      } else if (populationChange < -20) {
        newAlerts.push({
          id: `alert-${alertId++}`,
          type: 'species',
          severity: 'high',
          message: `${species.name} population at risk with ${Math.abs(populationChange).toFixed(1)}% decline predicted`,
          species: [species.name],
          timestamp: new Date()
        });
      }

      if (species.geneticDiversity && species.geneticDiversity.current < 60) {
        newAlerts.push({
          id: `alert-${alertId++}`,
          type: 'species',
          severity: 'medium',
          message: `${species.name} genetic diversity critically low at ${species.geneticDiversity.current}%`,
          species: [species.name],
          timestamp: new Date()
        });
      }

      if (species.status === 'critically endangered') {
        newAlerts.push({
          id: `alert-${alertId++}`,
          type: 'species',
          severity: 'critical',
          message: `${species.name} is critically endangered with only ${species.currentPopulation.toLocaleString()} individuals remaining`,
          species: [species.name],
          timestamp: new Date()
        });
      }
    });

    if (currentEnvironmentalFactors.deforestation > 80) {
      newAlerts.push({
        id: `alert-${alertId++}`,
        type: 'environment',
        severity: 'critical',
        message: `Extreme deforestation levels detected: ${currentEnvironmentalFactors.deforestation}%`,
        timestamp: new Date()
      });
    }

    if (currentEnvironmentalFactors.climateChange > 85) {
      newAlerts.push({
        id: `alert-${alertId++}`,
        type: 'environment',
        severity: 'high',
        message: `Severe climate change impact: ${currentEnvironmentalFactors.climateChange}%`,
        timestamp: new Date()
      });
    }

    if (currentEnvironmentalFactors.conservation < 30) {
      newAlerts.push({
        id: `alert-${alertId++}`,
        type: 'environment',
        severity: 'medium',
        message: `Conservation efforts insufficient: ${currentEnvironmentalFactors.conservation}%`,
        timestamp: new Date()
      });
    }

    setAlerts(newAlerts);
  }, [statesData, speciesData, currentEnvironmentalFactors]);

  useEffect(() => {
    let filtered = alerts.filter(alert => !dismissedAlerts.includes(alert.id));

    if (severityFilter !== 'all') {
      filtered = filtered.filter(alert => alert.severity === severityFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(alert => alert.type === typeFilter);
    }

    const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
    filtered.sort((a, b) => {
      const severityDiff = severityOrder[b.severity] - severityOrder[a.severity];
      if (severityDiff !== 0) return severityDiff;
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

    setFilteredAlerts(filtered);
  }, [alerts, severityFilter, typeFilter, dismissedAlerts]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'high':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'medium':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'low':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
      case 'high':
        return 'destructive';
      case 'medium':
        return 'secondary';
      case 'low':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts(prev => [...prev, alertId]);
  };

  const clearAllDismissed = () => {
    setDismissedAlerts([]);
  };

  const criticalCount = filteredAlerts.filter(a => a.severity === 'critical').length;
  const highCount = filteredAlerts.filter(a => a.severity === 'high').length;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <Bell className="text-primary" />
            Interactive Wildlife Alerts
            {criticalCount > 0 && (
              <Badge variant="destructive" className="animate-pulse">
                {criticalCount} Critical
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {filteredAlerts.length} active alerts
            </span>
            {dismissedAlerts.length > 0 && (
              <Button variant="outline" size="sm" onClick={clearAllDismissed}>
                Show Dismissed ({dismissedAlerts.length})
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filter Controls */}
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="species">Species</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="ecosystem">Ecosystem</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Alert Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-3 border-red-200 bg-red-50/10">
            <div className="text-sm text-red-600 font-medium">Critical</div>
            <div className="text-2xl font-bold text-red-700">{criticalCount}</div>
          </Card>
          <Card className="p-3 border-orange-200 bg-orange-50/10">
            <div className="text-sm text-orange-600 font-medium">High</div>
            <div className="text-2xl font-bold text-orange-700">{highCount}</div>
          </Card>
          <Card className="p-3 border-yellow-200 bg-yellow-50/10">
            <div className="text-sm text-yellow-600 font-medium">Medium</div>
            <div className="text-2xl font-bold text-yellow-700">
              {filteredAlerts.filter(a => a.severity === 'medium').length}
            </div>
          </Card>
          <Card className="p-3 border-blue-200 bg-blue-50/10">
            <div className="text-sm text-blue-600 font-medium">Low</div>
            <div className="text-2xl font-bold text-blue-700">
              {filteredAlerts.filter(a => a.severity === 'low').length}
            </div>
          </Card>
        </div>

        {/* Alerts List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredAlerts.length === 0 ? (
            <Card className="p-6 text-center">
              <div className="text-muted-foreground">
                No alerts matching current filters
              </div>
            </Card>
          ) : (
            filteredAlerts.map(alert => (
              <Card 
                key={alert.id} 
                className={`p-4 transition-all hover:shadow-md ${
                  alert.severity === 'critical' 
                    ? 'border-red-200 bg-red-50/20' 
                    : alert.severity === 'high'
                    ? 'border-orange-200 bg-orange-50/20'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={getSeverityColor(alert.severity)}>
                          {alert.severity.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{alert.type}</Badge>
                        {alert.state && (
                          <Badge variant="secondary">{alert.state}</Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium mb-1">{alert.message}</p>
                      {alert.species && (
                        <div className="flex gap-1 mb-2">
                          {alert.species.map(species => (
                            <Badge key={species} variant="outline" className="text-xs">
                              {species}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {alert.metric && (
                        <div className="text-xs text-muted-foreground">
                          {alert.metric}: {alert.value?.toFixed(1)} 
                          (threshold: {alert.threshold})
                        </div>
                      )}
                      <div className="text-xs text-muted-foreground mt-1">
                        {alert.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => dismissAlert(alert.id)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Alert Actions */}
        {filteredAlerts.length > 0 && (
          <div className="flex gap-2 pt-4 border-t">
            <Button variant="outline" size="sm">
              Export Alerts
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setDismissedAlerts(filteredAlerts.map(a => a.id))}
            >
              Dismiss All
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InteractiveAlerts;
