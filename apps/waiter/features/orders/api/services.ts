import { apiClient } from '@/shared/api/client';
import type { OrderDto } from '../types';

export const orderService = {
  list: () => apiClient<OrderDto[]>('/orders'),

  mine: () => apiClient<OrderDto[]>('/orders?waiterId=me'),

  byTable: (tableId: number) => apiClient<OrderDto[]>(`/orders?tableId=${tableId}`),

  markDelivered: (id: number) =>
    apiClient<OrderDto>(`/orders/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: 'served' }),
    }),

  create: (payload: { tableId: number; items: { name: string; quantity: number; price: number }[] }) =>
    apiClient<OrderDto>('/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
