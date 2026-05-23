import { apiClient } from '@/shared/api/client';
import type { RangePreset } from '../types';
import type {
  AnalyticsKpis,
  RevenueData,
  TopDish,
  HourlyDataPoint,
} from '../types';

export const analyticsService = {
  kpis: (range: RangePreset) =>
    apiClient<AnalyticsKpis>(`/analytics/restaurant?range=${range}&section=kpis`),

  revenue: (range: RangePreset) =>
    apiClient<RevenueData>(`/analytics/restaurant?range=${range}&section=revenue`),

  topDishes: (range: RangePreset) =>
    apiClient<TopDish[]>(`/analytics/restaurant?range=${range}&section=top-dishes`),

  hourlyHeatmap: (range: RangePreset) =>
    apiClient<HourlyDataPoint[]>(`/analytics/restaurant?range=${range}&section=hourly`),
};
