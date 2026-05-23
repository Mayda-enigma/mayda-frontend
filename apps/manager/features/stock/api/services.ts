import { apiClient } from '@/shared/api/client'
import type {
  InventoryItemDto,
  InventoryItemUpdateDto,
  InventoryStockUpdateDto,
  InventoryStockUpdateResponseDto,
  StockForecastDto,
  StockForecastRequestDto,
} from '../types'

export const stockService = {
  list: (restaurantId: number) =>
    apiClient<InventoryItemDto[]>(`/inventory/items?restaurant_id=${restaurantId}`),

  update: (id: number, payload: InventoryItemUpdateDto) =>
    apiClient<InventoryItemDto>(`/inventory/items/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  restock: (payload: InventoryStockUpdateDto) =>
    apiClient<InventoryStockUpdateResponseDto>('/inventory/stock/update', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  forecast: (payload: StockForecastRequestDto) =>
    apiClient<StockForecastDto>('/ai/inventory/forecast', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
