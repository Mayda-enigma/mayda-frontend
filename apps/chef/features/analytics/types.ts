/* ─── DTOs (mirror backend response shapes exactly) ─── */

export interface KitchenKpisDto {
  totalOrders: number
  ordersTrend: number
  revenue: number
  revenueTrend: number
  avgPrepTimeMinutes: number
  avgPrepTimeTrend: number
  customerRating: number
  customerRatingTrend: number
}

export interface OrderVolumePointDto {
  time: string
  orders: number
}

export interface DishPopularityDto {
  name: string
  orders: number
  revenue: number
}

export interface KitchenEfficiencyPointDto {
  day: string
  avgTimeMinutes: number
  orders: number
}

export interface OrderStatusSliceDto {
  name: string
  value: number
}

export interface RevenuePointDto {
  month: string
  revenue: number
  orders: number
}

/* ─── Domain models ─── */

export type RangePreset = 'day' | 'week' | 'month'

export interface KitchenKpis {
  totalOrders: number
  ordersTrend: number
  revenue: number
  revenueTrend: number
  avgPrepTimeMinutes: number
  avgPrepTimeTrend: number
  customerRating: number
  customerRatingTrend: number
}

export interface OrderVolumePoint {
  time: string
  orders: number
}

export interface DishPopularity {
  name: string
  orders: number
  revenue: number
}

export interface KitchenEfficiencyPoint {
  day: string
  avgTimeMinutes: number
  orders: number
}

export interface OrderStatusSlice {
  name: string
  value: number
}

export interface RevenuePoint {
  month: string
  revenue: number
  orders: number
}
