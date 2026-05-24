import { apiClient } from '@/shared/api/client';
import type { OrderDto } from '../types';

export const orderService = {
  restaurantOrders: (restaurantId: number, status?: string) =>
    apiClient<OrderDto[]>(`/orders/restaurant/${restaurantId}${status ? `?status=${status}` : ''}`),

  byTable: (tableId: number) =>
    apiClient<OrderDto[]>(`/orders/table/${tableId}/current`),

  markDelivered: (id: number) =>
    apiClient<OrderDto>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'COMPLETED' }),
    }),

  updateStatus: (id: number, status: string) =>
    apiClient<OrderDto>(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  create: (payload: { restaurantId: number; tableId: number; items: { dishId: number; quantity: number }[] }) =>
    apiClient<OrderDto>('/orders/public', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
