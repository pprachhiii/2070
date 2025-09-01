import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';
import L from 'leaflet';

import speciesData from '@/data/speciesData.json';
import statesData from '@/data/stateData.json';
import { FeatureCollection, GeoJsonObject } from 'geojson';

type SpeciesPoint = { lat: number; lng: number; intensity?: number };
type LayerType = 'heatmap' | 'choropleth' | 'markers';

interface Layer {
  id: string;
  name: string;
  type: LayerType;
  visible: boolean;
  opacity: number;
  color: string;
  data: SpeciesPoint[] | FeatureCollection;
}

const LayeredMap: React.FC = () => {
  const initialLayers: Layer[] = [
    {
      id: 'species-population',
      name: 'Species Population',
      type: 'heatmap',
      visible: true,
      opacity: 0.7,
      color: '#ef4444',
      data: speciesData.species.map(s => ({
        lat: statesData.states.find(st => st.name === s.states[0])?.coordinates[0] || 0,
        lng: statesData.states.find(st => st.name === s.states[0])?.coordinates[1] || 0,
        intensity: Math.min(s.currentPopulation / 5000, 1),
      })),
    },
    {
      id: 'conservation-areas',
      name: 'Conservation Areas',
      type: 'choropleth',
      visible: true,
      opacity: 0.6,
      color: '#10b981',
      data: {
        type: 'FeatureCollection',
        features: statesData.states.map(st => ({
          type: 'Feature',
          properties: { name: st.name },
          geometry: {
            type: 'Polygon',
            coordinates: [[
              [st.coordinates[1] - 0.1, st.coordinates[0] - 0.1],
              [st.coordinates[1] + 0.1, st.coordinates[0] - 0.1],
              [st.coordinates[1] + 0.1, st.coordinates[0] + 0.1],
              [st.coordinates[1] - 0.1, st.coordinates[0] + 0.1],
              [st.coordinates[1] - 0.1, st.coordinates[0] - 0.1],
            ]],
          },
        })),
      } as FeatureCollection,
    },
    {
      id: 'wildlife-corridors',
      name: 'Wildlife Corridors',
      type: 'markers',
      visible: true,
      opacity: 0.8,
      color: '#3b82f6',
      data: speciesData.species.flatMap(s =>
        (s.migrationPatterns.corridorsUsed?.map(c => {
          const state = statesData.states.find(st => st.name.includes(c.split('-')[0]));
          return state ? { lat: state.coordinates[0], lng: state.coordinates[1] } : null;
        }) ?? []).filter((p): p is SpeciesPoint => p !== null) // <-- Type guard
      ),
    },
  ];

  const [layers, setLayers] = useState<Layer[]>(initialLayers);

  const toggleLayer = (id: string) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, visible: !l.visible } : l));
  };

  const updateOpacity = (id: string, value: number) => {
    setLayers(prev => prev.map(l => l.id === id ? { ...l, opacity: value / 100 } : l));
  };

  // HeatLayer component
  const HeatLayer: React.FC<{ points: SpeciesPoint[]; color: string; opacity: number }> = ({ points, color, opacity }) => {
    const map = useMap();

      useEffect(() => {
      const heatPoints: [number, number, number][] = points.map(p => [p.lat, p.lng, p.intensity ?? 0.5]);
      const heatLayer = (L as unknown as { heatLayer: typeof L.heatLayer }).heatLayer(heatPoints, {
        radius: 25,
        blur: 15,
        gradient: { 0: 'blue', 0.5: color, 1: color },
        minOpacity: opacity,
      }) as L.Layer; // cast to L.Layer
      heatLayer.addTo(map);

      return () => {
        map.removeLayer(heatLayer);
      };
    }, [map, points, color, opacity]);

    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Layers className="w-4 h-4"/> Layered Map</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">

        {/* Controls */}
        <div className="space-y-2">
          {layers.map(layer => (
            <div key={layer.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={layer.visible} onChange={() => toggleLayer(layer.id)} />
                <div className="w-4 h-4 rounded" style={{ backgroundColor: layer.color }} />
                <span>{layer.name}</span>
              </div>
              {layer.visible && (
                <div className="flex items-center gap-2">
                  <span className="text-sm">Opacity</span>
                  <Slider value={[layer.opacity * 100]} onValueChange={(v: number[]) => updateOpacity(layer.id, v[0])} max={100} step={5} className="w-24" />
                  <span>{Math.round(layer.opacity * 100)}%</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Map */}
        <div className="h-96 w-full">
          <MapContainer center={[22.9868, 87.8550]} zoom={6} className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {layers.filter(l => l.visible).map(layer => {
              if (layer.type === 'choropleth') {
                return <GeoJSON key={layer.id} data={layer.data as GeoJsonObject} style={{ color: layer.color, fillOpacity: layer.opacity }} />;
              }
              if (layer.type === 'markers') {
                return (layer.data as SpeciesPoint[]).map((point, i) => (
                  <CircleMarker key={i} center={[point.lat, point.lng]} radius={8} pathOptions={{ color: layer.color, fillOpacity: layer.opacity }} />
                ));
              }
              if (layer.type === 'heatmap') {
                return <HeatLayer key={layer.id} points={layer.data as SpeciesPoint[]} color={layer.color} opacity={layer.opacity} />;
              }
              return null;
            })}

          </MapContainer>
        </div>

      </CardContent>
    </Card>
  );
};

export default LayeredMap;
