import { apiClient } from '@/shared/api/client';
import type { RangePreset } from '../types';
import type {
  AnalyticsKpis,
  CuisineShareItem,
  HourlyDataPoint,
  MonthlyComparisonItem,
  PerformanceMetricsData,
  RevenueData,
  TopDish,
} from '../types';

const rangeMap: Record<RangePreset, string> = {
  '7d': 'week',
  '30d': 'month',
  '90d': 'quarter',
};

const r = (range: RangePreset) => rangeMap[range];

export const analyticsService = {
  kpis: (range: RangePreset) =>
    apiClient<AnalyticsKpis>(`/analytics/restaurant?range=${r(range)}&section=kpis`),

  revenue: (range: RangePreset) =>
    apiClient<RevenueData>(`/analytics/restaurant?range=${r(range)}&section=revenue`),

  topDishes: (range: RangePreset) =>
    apiClient<TopDish[]>(`/analytics/restaurant?range=${r(range)}&section=top-dishes`),

  hourlyHeatmap: (range: RangePreset) =>
    apiClient<HourlyDataPoint[]>(`/analytics/restaurant?range=${r(range)}&section=hourly`),

  cuisineShare: (range: RangePreset) =>
    apiClient<CuisineShareItem[]>(`/analytics/restaurant?range=${r(range)}&section=cuisine-share`),

  performance: () =>
    apiClient<PerformanceMetricsData>(`/analytics/restaurant?range=week&section=performance`),

  monthly: (range: RangePreset) =>
    apiClient<MonthlyComparisonItem[]>(`/analytics/restaurant?range=${r(range)}&section=monthly`),
};
