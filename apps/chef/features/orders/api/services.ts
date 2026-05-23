import { apiClient } from '@/shared/api/client';
import type { OrderListDto, OrderDetailDto } from '../types';

export const orderService = {
  list: (restaurantId: number): Promise<OrderListDto[]> =>
    apiClient<OrderListDto[]>(`/orders/restaurant/${restaurantId}`),

  detail: (orderId: number): Promise<OrderDetailDto> =>
    apiClient<OrderDetailDto>(`/orders/${orderId}`),

  updateStatus: (orderId: number, status: string, notes?: string): Promise<OrderDetailDto> =>
    apiClient<OrderDetailDto>(`/orders/${orderId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, ...(notes ? { notes } : {}) }),
    }),
};
