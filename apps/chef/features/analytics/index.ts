/* ── Public API for features/analytics ── */

// Types
export type {
  RangePreset,
  KitchenKpis,
  OrderVolumePoint,
  DishPopularity,
  KitchenEfficiencyPoint,
  OrderStatusSlice,
  RevenuePoint,
} from './types'

// Queries
export {
  useKitchenKpis,
  useOrderVolume,
  useTopDishes,
  useKitchenEfficiency,
  useOrderStatus,
  useRevenueTrend,
} from './api/queries'
