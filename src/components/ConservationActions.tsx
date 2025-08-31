import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TreePine, Shield, Zap, Droplets } from 'lucide-react';

interface ConservationActionsProps {
  onActionApply: (action: string) => void;
}

const conservationActions = [
  {
    id: 'plantTrees',
    name: 'Plant 1M Trees',
    description: 'Massive reforestation program to restore degraded habitats',
    icon: TreePine,
    effect: 'Reduces deforestation by 15%, increases conservation by 10%',
    cost: '₹500 Cr',
    duration: '2 years',
    impact: '+15% Forest Cover',
    color: 'text-green-400'
  },
  {
    id: 'wildlifeCorridors',
    name: 'Wildlife Corridors',
    description: 'Create safe passages for animal migration and genetic diversity',
    icon: Droplets,
    effect: 'Increases conservation efforts by 15%',
    cost: '₹800 Cr',
    duration: '3 years',
    impact: '+20% Species Mobility',
    color: 'text-blue-400'
  },
  {
    id: 'antiPoaching',
    name: 'AI Anti-Poaching',
    description: 'Deploy drone surveillance and AI monitoring systems',
    icon: Shield,
    effect: 'Increases conservation efforts by 20%',
    cost: '₹300 Cr',
    duration: '1 year',
    impact: '+25% Protection',
    color: 'text-purple-400'
  },
  {
    id: 'renewableEnergy',
    name: 'Renewable Energy',
    description: 'Solar and wind farms to reduce climate change impact',
    icon: Zap,
    effect: 'Reduces climate change impact by 20%',
    cost: '₹1200 Cr',
    duration: '4 years',
    impact: '+30% Climate Resilience',
    color: 'text-yellow-400'
  }
];

const ConservationActions: React.FC<ConservationActionsProps> = ({ onActionApply }) => {
  const [appliedActions, setAppliedActions] = useState<string[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  const handleActionApply = async (actionId: string) => {
    if (appliedActions.includes(actionId)) return;

    setLoading(actionId);
    
    // Simulate action application delay
    setTimeout(() => {
      onActionApply(actionId);
      setAppliedActions(prev => [...prev, actionId]);
      setLoading(null);
    }, 1000);
  };

  const isActionApplied = (actionId: string) => appliedActions.includes(actionId);
  const isActionLoading = (actionId: string) => loading === actionId;

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="text-accent" />
          Conservation Actions
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Apply conservation measures to improve wildlife outcomes
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {conservationActions.map((action) => {
          const Icon = action.icon;
          const applied = isActionApplied(action.id);
          const loading = isActionLoading(action.id);
          
          return (
            <div
              key={action.id}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                applied 
                  ? 'bg-primary/20 border-primary/50' 
                  : 'bg-card/50 border-border/50 hover:border-accent/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg bg-background/50 ${action.color}`}>
                  <Icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm">{action.name}</h3>
                    {applied && (
                      <Badge variant="secondary" className="text-xs">
                        Applied ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {action.description}
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Cost: </span>
                      <span className="font-medium">{action.cost}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Duration: </span>
                      <span className="font-medium">{action.duration}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {action.impact}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Button
                size="sm"
                variant={applied ? "secondary" : "default"}
                className="w-full mt-3 text-xs"
                onClick={() => handleActionApply(action.id)}
                disabled={applied || loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Implementing...
                  </div>
                ) : applied ? (
                  'Action Applied'
                ) : (
                  'Apply Action'
                )}
              </Button>
              
              {applied && (
                <p className="text-xs text-green-400 mt-2 text-center">
                  {action.effect}
                </p>
              )}
            </div>
          );
        })}
        
        <div className="pt-4 border-t border-border/30">
          <div className="text-xs text-muted-foreground text-center">
            Applied Actions: {appliedActions.length} / {conservationActions.length}
          </div>
          <div className="w-full bg-muted/30 rounded-full h-2 mt-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500"
              style={{ width: `${(appliedActions.length / conservationActions.length) * 100}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConservationActions;