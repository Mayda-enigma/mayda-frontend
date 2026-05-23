import { apiClient } from '@/shared/api/client'
import type {
  RangePreset,
  KitchenKpisDto,
  OrderVolumePointDto,
  DishPopularityDto,
  KitchenEfficiencyPointDto,
  OrderStatusSliceDto,
  RevenuePointDto,
} from '../types'

const base = (range: RangePreset, section: string) =>
  `/analytics/kitchen?range=${range}&section=${section}`

export const analyticsService = {
  kpis: (range: RangePreset): Promise<KitchenKpisDto> =>
    apiClient<KitchenKpisDto>(base(range, 'kpis')),

  orderVolume: (range: RangePreset): Promise<OrderVolumePointDto[]> =>
    apiClient<OrderVolumePointDto[]>(base(range, 'order-volume')),

  topDishes: (range: RangePreset): Promise<DishPopularityDto[]> =>
    apiClient<DishPopularityDto[]>(base(range, 'top-dishes')),

  kitchenEfficiency: (
    range: RangePreset,
  ): Promise<KitchenEfficiencyPointDto[]> =>
    apiClient<KitchenEfficiencyPointDto[]>(base(range, 'kitchen-efficiency')),

  orderStatus: (range: RangePreset): Promise<OrderStatusSliceDto[]> =>
    apiClient<OrderStatusSliceDto[]>(base(range, 'order-status')),

  revenueTrend: (range: RangePreset): Promise<RevenuePointDto[]> =>
    apiClient<RevenuePointDto[]>(base(range, 'revenue-trend')),
}
