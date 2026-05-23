import { apiClient } from '@/shared/api/client';
import type { Order, OrderDetail } from '../types';

export const orderService = {
  list: (): Promise<Order[]> =>
    apiClient<Order[]>('/orders/kitchen'),

  detail: (id: string): Promise<OrderDetail> =>
    apiClient<OrderDetail>(`/orders/${id}`),

  updateStatus: (id: string, status: string): Promise<void> =>
    apiClient<void>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};
