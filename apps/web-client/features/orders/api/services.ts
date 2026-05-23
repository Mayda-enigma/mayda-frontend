import { apiClient } from '@/shared/api/client'
import type { OrderDto, CreateOrderDto } from '../types'

export const orderService = {
  list: (): Promise<OrderDto[]> =>
    apiClient<OrderDto[]>('/orders'),

  create: (payload: CreateOrderDto): Promise<OrderDto> =>
    apiClient<OrderDto>('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  detail: (id: string): Promise<OrderDto> =>
    apiClient<OrderDto>(`/orders/${id}`),
}
