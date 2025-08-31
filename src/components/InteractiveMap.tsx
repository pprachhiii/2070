import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

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

interface InteractiveMapProps {
  stateData: StateData[];
  onStateSelect: (stateId: string) => void;
  selectedState: string | null;
}

// India state coordinates and polygons (simplified)
const indiaStates = [
  { id: 'west-bengal', name: 'West Bengal', x: 650, y: 350, width: 120, height: 150 },
  { id: 'karnataka', name: 'Karnataka', x: 450, y: 550, width: 140, height: 120 },
  { id: 'madhya-pradesh', name: 'Madhya Pradesh', x: 450, y: 350, width: 180, height: 120 },
  { id: 'assam', name: 'Assam', x: 700, y: 280, width: 160, height: 80 },
  { id: 'kerala', name: 'Kerala', x: 400, y: 650, width: 80, height: 140 },
  { id: 'uttarakhand', name: 'Uttarakhand', x: 400, y: 200, width: 120, height: 100 },
  { id: 'gujarat', name: 'Gujarat', x: 250, y: 350, width: 150, height: 180 },
  { id: 'himachal-pradesh', name: 'Himachal Pradesh', x: 350, y: 150, width: 120, height: 80 },
  { id: 'sikkim', name: 'Sikkim', x: 650, y: 200, width: 60, height: 60 },
  { id: 'tamil-nadu', name: 'Tamil Nadu', x: 450, y: 700, width: 120, height: 140 }
];

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  stateData,
  onStateSelect,
  selectedState
}) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const getEcoScoreColor = (score: number) => {
    if (score >= 85) return '#22c55e'; // green-500
    if (score >= 75) return '#84cc16'; // lime-500
    if (score >= 65) return '#eab308'; // yellow-500
    if (score >= 55) return '#f97316'; // orange-500
    return '#ef4444'; // red-500
  };

  const getEcoScoreLabel = (score: number) => {
    if (score >= 85) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 65) return 'Fair';
    if (score >= 55) return 'Poor';
    return 'Critical';
  };

  // Properly typed SVG mouse event
  const handleStateHover = (stateId: string, event: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    setHoveredState(stateId);
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  const hoveredStateData = hoveredState ? stateData.find(s => s.id === hoveredState) : null;

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 900 900"
        className="absolute inset-0"
      >
        <rect width="900" height="900" fill="url(#gradient)" />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <path
          d="M200 150 L750 150 L780 200 L800 400 L750 650 L700 800 L500 850 L300 800 L200 650 L150 400 Z"
          fill="none"
          stroke="#334155"
          strokeWidth="2"
          strokeDasharray="5,5"
          opacity="0.3"
        />

        {indiaStates.map((state) => {
          const stateInfo = stateData.find(s => s.id === state.id);
          const ecoScore = stateInfo?.ecoScore ?? 50;
          const isSelected = selectedState === state.id;
          const isHovered = hoveredState === state.id;

          return (
            <g key={state.id}>
              <rect
                x={state.x}
                y={state.y}
                width={state.width}
                height={state.height}
                fill={getEcoScoreColor(ecoScore)}
                fillOpacity={isSelected ? 0.8 : isHovered ? 0.6 : 0.4}
                stroke={getEcoScoreColor(ecoScore)}
                strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                rx={8}
                filter={isSelected || isHovered ? "url(#glow)" : "none"}
                className="cursor-pointer transition-all duration-300"
                onMouseEnter={(e) => handleStateHover(state.id, e)}
                onMouseLeave={() => setHoveredState(null)}
                onClick={() => onStateSelect(state.id)}
              />

              <text
                x={state.x + state.width / 2}
                y={state.y + state.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                className="pointer-events-none select-none"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}
              >
                {state.name.split(' ')[0]}
              </text>

              <circle
                cx={state.x + state.width - 15}
                cy={state.y + 15}
                r={8}
                fill={getEcoScoreColor(ecoScore)}
                stroke="white"
                strokeWidth={2}
                className="pointer-events-none"
              />
              <text
                x={state.x + state.width - 15}
                y={state.y + 15}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="white"
                fontSize={10}
                fontWeight="bold"
                className="pointer-events-none select-none"
              >
                {Math.round(ecoScore)}
              </text>
            </g>
          );
        })}

        <g transform="translate(50, 750)">
          <rect x="0" y="0" width="200" height="120" fill="rgba(0,0,0,0.7)" rx={8} />
          <text x={10} y={20} fill="white" fontSize={14} fontWeight="bold">Eco Score Legend</text>

          {[
            { label: 'Excellent (85+)', color: '#22c55e' },
            { label: 'Good (75+)', color: '#84cc16' },
            { label: 'Fair (65+)', color: '#eab308' },
            { label: 'Poor (55+)', color: '#f97316' },
            { label: 'Critical (<55)', color: '#ef4444' }
          ].map((item, index) => (
            <g key={index} transform={`translate(10, ${35 + index * 15})`}>
              <rect x={0} y={0} width={12} height={12} fill={item.color} rx={2} />
              <text x={20} y={10} fill="white" fontSize={10}>{item.label}</text>
            </g>
          ))}
        </g>
      </svg>

      {hoveredStateData && (
        <div
          className="absolute z-10 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-4 pointer-events-none"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y - 10,
            transform: 'translateY(-100%)'
          }}
        >
          <h3 className="font-bold text-lg mb-2">{hoveredStateData.name}</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span>Eco Score:</span>
              <Badge className={`eco-${getEcoScoreLabel(hoveredStateData.ecoScore).toLowerCase()}`}>
                {Math.round(hoveredStateData.ecoScore)}
              </Badge>
            </div>
            <div className="flex justify-between gap-4">
              <span>Forest Cover:</span>
              <span>{hoveredStateData.forestCover.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Wildlife Health:</span>
              <span>{Math.round(hoveredStateData.wildlifeHealth)}%</span>
            </div>
            <div className="flex justify-between gap-4">
              <span>Species Count:</span>
              <span>{hoveredStateData.majorSpecies.length}</span>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 bg-card/80 backdrop-blur-sm rounded-lg p-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>Hover over states for details • Click to select</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
