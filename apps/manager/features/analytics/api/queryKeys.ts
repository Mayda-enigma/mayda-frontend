import type { RangePreset } from '../types';

export const analyticsKeys = {
  all: ['analytics'] as const,
  kpis: (range: RangePreset) => [...analyticsKeys.all, 'kpis', range] as const,
  revenue: (range: RangePreset) => [...analyticsKeys.all, 'revenue', range] as const,
  topDishes: (range: RangePreset) => [...analyticsKeys.all, 'topDishes', range] as const,
  hourlyHeatmap: (range: RangePreset) => [...analyticsKeys.all, 'hourlyHeatmap', range] as const,
};
