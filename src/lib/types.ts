export type Timeline = {
  id: number;
  name?: string;
  year: number; // 2025 or 2070
  policies: Policy[];
  innovations: Innovation[];
  chartData: ChartData[];
  results: Record<string, unknown>; 
  createdAt: string;
  updatedAt: string;
};

export type Policy = {
  id: number;
  timelineId: number;
  name: string;
  description?: string;
  effect: Record<string, unknown>; 
};

export type Innovation = {
  id: number;
  timelineId: number;
  name: string;
  description?: string;
  discoveredAt: string;
};


export type ChartData = {
  id: number;
  timelineId: number;
  metric: string; // e.g. "CO2", "Temperature"
  value: number;
};
