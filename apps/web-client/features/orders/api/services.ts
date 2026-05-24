import { apiClient } from '@/shared/api/client'
import type { OrderDto, PublicOrderDto } from '../types'

export const orderService = {
  createPublic: (payload: PublicOrderDto): Promise<OrderDto> =>
    apiClient<OrderDto>('/orders/public', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  tableOrders: (tableId: string): Promise<OrderDto[]> =>
    apiClient<OrderDto[]>(`/orders/public/table/${tableId}`),
}
