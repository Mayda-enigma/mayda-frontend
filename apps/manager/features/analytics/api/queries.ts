import { useQuery } from '@tanstack/react-query';
import { analyticsKeys } from './queryKeys';
import { analyticsService } from './services';
import { toKpis } from './mappers';
import type { RangePreset } from '../types';

export const useKpis = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.kpis(range),
    queryFn: () => analyticsService.kpis(range),
    select: toKpis,
  });

export const useRevenue = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.revenue(range),
    queryFn: () => analyticsService.revenue(range),
  });

export const useTopDishes = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.topDishes(range),
    queryFn: () => analyticsService.topDishes(range),
  });

export const useHourlyHeatmap = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.hourlyHeatmap(range),
    queryFn: () => analyticsService.hourlyHeatmap(range),
  });

export const useCuisineShare = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.cuisineShare(range),
    queryFn: () => analyticsService.cuisineShare(range),
  });

export const usePerformanceMetrics = () =>
  useQuery({
    queryKey: analyticsKeys.performance(),
    queryFn: () => analyticsService.performance(),
  });

export const useMonthlyComparison = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.monthly(range),
    queryFn: () => analyticsService.monthly(range),
  });
