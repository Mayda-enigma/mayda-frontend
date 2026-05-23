import { useQuery } from '@tanstack/react-query'
import { analyticsKeys } from './queryKeys'
import { analyticsService } from './services'
import {
  toKitchenKpis,
  toOrderVolume,
  toTopDishes,
  toKitchenEfficiency,
  toOrderStatus,
  toRevenueTrend,
} from './mappers'
import type { RangePreset } from '../types'

/** Headline kitchen KPIs for the selected range. */
export const useKitchenKpis = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.kpis(range),
    queryFn: () => analyticsService.kpis(range),
    select: toKitchenKpis,
    staleTime: 30_000,
  })

/** Hourly order volume for the selected range. */
export const useOrderVolume = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.orderVolume(range),
    queryFn: () => analyticsService.orderVolume(range),
    select: toOrderVolume,
    staleTime: 30_000,
  })

/** Top-performing dishes by order count for the selected range. */
export const useTopDishes = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.topDishes(range),
    queryFn: () => analyticsService.topDishes(range),
    select: toTopDishes,
    staleTime: 60_000,
  })

/** Kitchen efficiency (avg prep time + order count) by day. */
export const useKitchenEfficiency = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.kitchenEfficiency(range),
    queryFn: () => analyticsService.kitchenEfficiency(range),
    select: toKitchenEfficiency,
    staleTime: 60_000,
  })

/** Order status distribution (completed / in-progress / delayed). */
export const useOrderStatus = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.orderStatus(range),
    queryFn: () => analyticsService.orderStatus(range),
    select: toOrderStatus,
    staleTime: 30_000,
  })

/** Monthly revenue and order-volume trend. */
export const useRevenueTrend = (range: RangePreset) =>
  useQuery({
    queryKey: analyticsKeys.revenueTrend(range),
    queryFn: () => analyticsService.revenueTrend(range),
    select: toRevenueTrend,
    staleTime: 5 * 60_000,
  })
