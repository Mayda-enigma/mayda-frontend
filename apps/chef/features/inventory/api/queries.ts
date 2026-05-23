import { useQuery } from '@tanstack/react-query'
import { inventoryKeys } from './queryKeys'
import { inventoryService } from './services'
import {
  toStockItems,
  toStockStats,
  toLowStockAlerts,
  toIngredients,
  toForecast,
} from './mappers'
import type { ForecastInput } from '../types'

/** Fetch inventory items for a restaurant. Polls every 30s. */
export const useStock = (restaurantId: number) =>
  useQuery({
    queryKey: inventoryKeys.stockByRestaurant(restaurantId),
    queryFn: () => inventoryService.stock(restaurantId),
    select: toStockItems,
    refetchInterval: 30_000,
    staleTime: 10_000,
    enabled: restaurantId > 0,
  })

/** Fetch inventory stats for a restaurant. */
export const useStockStats = (restaurantId: number) =>
  useQuery({
    queryKey: inventoryKeys.statsByRestaurant(restaurantId),
    queryFn: () => inventoryService.stats(restaurantId),
    select: toStockStats,
    staleTime: 30_000,
    enabled: restaurantId > 0,
  })

/** Fetch low-stock alerts for a restaurant. */
export const useLowStockAlerts = (restaurantId: number) =>
  useQuery({
    queryKey: inventoryKeys.alertsByRestaurant(restaurantId),
    queryFn: () => inventoryService.lowStockAlerts(restaurantId),
    select: toLowStockAlerts,
    refetchInterval: 60_000,
    staleTime: 15_000,
    enabled: restaurantId > 0,
  })

/** Fetch all ingredients (staff-scoped). */
export const useIngredients = () =>
  useQuery({
    queryKey: inventoryKeys.ingredients(),
    queryFn: () => inventoryService.ingredients(),
    select: toIngredients,
    staleTime: 60_000,
  })

/**
 * AI-driven stock forecast for a specific item + date.
 * Fails silently when the AI service is down — the UI hides
 * the forecast column and stock data stays unaffected.
 */
export const useStockForecast = (input: ForecastInput) =>
  useQuery({
    queryKey: inventoryKeys.forecast(input.item, input.date),
    queryFn: () =>
      inventoryService.forecast({
        item: input.item,
        date: input.date,
        weather: input.weather ?? null,
        specialEvent: input.specialEvent ?? null,
      }),
    select: toForecast,
    staleTime: 5 * 60_000,
    retry: false, // AI service down → don't retry, just hide
    enabled: Boolean(input.item) && Boolean(input.date),
  })
