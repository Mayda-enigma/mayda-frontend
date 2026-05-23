import { apiClient } from '@/shared/api/client'
import type { OrderDetailDto, OrderListDto, BackendOrderStatus } from '../types'

export const ordersService = {
  list: (restaurantId: number) =>
    apiClient<OrderListDto[]>(`/orders/restaurant/${restaurantId}`),

  detail: (orderId: string) =>
    apiClient<OrderDetailDto>(`/orders/${orderId}`),

  updateStatus: (orderId: string, status: BackendOrderStatus, notes?: string) =>
    apiClient<OrderDetailDto>(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, ...(notes ? { notes } : {}) }),
    }),
}
