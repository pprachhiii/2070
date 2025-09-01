// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as L from 'leaflet';

declare module 'leaflet' {
  interface HeatLayerOptions {
    radius?: number;
    blur?: number;
    minOpacity?: number;
    maxZoom?: number;
    gradient?: { [key: number]: string };
    max?: number;
    pane?: string;
    // add other options as needed
  }

  function heatLayer(latlngs: [number, number, number?][], options?: HeatLayerOptions): HeatLayer;

  // Removed redundant empty interface declaration for HeatLayer
}
