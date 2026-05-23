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

// Components
export { KpiCards } from './components/kpi-cards'
export { OrderVolumeChart } from './components/order-volume-chart'
export { OrderStatusChart } from './components/order-status-chart'
export { TopDishesList } from './components/top-dishes-list'
export { PrepTimeChart } from './components/prep-time-chart'
export { RevenueTrendChart } from './components/revenue-trend-chart'
