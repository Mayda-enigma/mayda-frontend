import { apiClient } from '@/shared/api/client'
import type {
  InventoryItemDto,
  InventoryStatsDto,
  LowStockAlertDto,
  IngredientDto,
  ForecastRequestDto,
  ForecastDto,
} from '../types'

export const inventoryService = {
  /* ── Inventory items ── */
  stock: (restaurantId: number): Promise<InventoryItemDto[]> =>
    apiClient<InventoryItemDto[]>(
      `/inventory/items?restaurant_id=${restaurantId}`,
    ),

  stats: (restaurantId: number): Promise<InventoryStatsDto> =>
    apiClient<InventoryStatsDto>(`/inventory/stats/${restaurantId}`),

  lowStockAlerts: (restaurantId: number): Promise<LowStockAlertDto[]> =>
    apiClient<LowStockAlertDto[]>(
      `/inventory/low-stock-alerts/${restaurantId}`,
    ),

  /* ── Ingredients ── */
  ingredients: (): Promise<IngredientDto[]> =>
    apiClient<IngredientDto[]>('/ingredients'),

  /* ── AI forecast ── */
  forecast: (payload: ForecastRequestDto): Promise<ForecastDto> =>
    apiClient<ForecastDto>('/ai/inventory/forecast', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
