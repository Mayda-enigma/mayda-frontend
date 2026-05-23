import { apiClient } from '@/shared/api/client'
import type { OrderDto, CreateOrderDto } from '../types'

export const orderService = {
  myOrders: (): Promise<OrderDto[]> =>
    apiClient<OrderDto[]>('/orders/my-orders'),

  create: (payload: CreateOrderDto): Promise<OrderDto> =>
    apiClient<OrderDto>('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  detail: (id: string): Promise<OrderDto> =>
    apiClient<OrderDto>(`/orders/${id}`),
}
