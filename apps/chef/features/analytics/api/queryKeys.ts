import type { RangePreset } from '../types'

export const analyticsKeys = {
  all: ['analytics'] as const,
  kpis: (range: RangePreset) =>
    [...analyticsKeys.all, 'kpis', range] as const,
  orderVolume: (range: RangePreset) =>
    [...analyticsKeys.all, 'orderVolume', range] as const,
  topDishes: (range: RangePreset) =>
    [...analyticsKeys.all, 'topDishes', range] as const,
  kitchenEfficiency: (range: RangePreset) =>
    [...analyticsKeys.all, 'kitchenEfficiency', range] as const,
  orderStatus: (range: RangePreset) =>
    [...analyticsKeys.all, 'orderStatus', range] as const,
  revenueTrend: (range: RangePreset) =>
    [...analyticsKeys.all, 'revenueTrend', range] as const,
}
