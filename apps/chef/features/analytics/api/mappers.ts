import type {
  KitchenKpisDto,
  KitchenKpis,
  OrderVolumePointDto,
  OrderVolumePoint,
  DishPopularityDto,
  DishPopularity,
  KitchenEfficiencyPointDto,
  KitchenEfficiencyPoint,
  OrderStatusSliceDto,
  OrderStatusSlice,
  RevenuePointDto,
  RevenuePoint,
} from '../types'

export const toKitchenKpis = (dto: KitchenKpisDto): KitchenKpis => ({
  totalOrders: dto.totalOrders,
  ordersTrend: dto.ordersTrend,
  revenue: dto.revenue,
  revenueTrend: dto.revenueTrend,
  avgPrepTimeMinutes: dto.avgPrepTimeMinutes,
  avgPrepTimeTrend: dto.avgPrepTimeTrend,
  customerRating: dto.customerRating,
  customerRatingTrend: dto.customerRatingTrend,
})

export const toOrderVolume = (
  dtos: OrderVolumePointDto[],
): OrderVolumePoint[] =>
  dtos.map((d) => ({ time: d.time, orders: d.orders }))

export const toTopDishes = (dtos: DishPopularityDto[]): DishPopularity[] =>
  dtos.map((d) => ({ name: d.name, orders: d.orders, revenue: d.revenue }))

export const toKitchenEfficiency = (
  dtos: KitchenEfficiencyPointDto[],
): KitchenEfficiencyPoint[] =>
  dtos.map((d) => ({
    day: d.day,
    avgTimeMinutes: d.avgTimeMinutes,
    orders: d.orders,
  }))

export const toOrderStatus = (
  dtos: OrderStatusSliceDto[],
): OrderStatusSlice[] => dtos.map((d) => ({ name: d.name, value: d.value }))

export const toRevenueTrend = (dtos: RevenuePointDto[]): RevenuePoint[] =>
  dtos.map((d) => ({ month: d.month, revenue: d.revenue, orders: d.orders }))
