import { apiClient } from '@/shared/api/client';
import type { TableDto } from '../types';

export const tableService = {
  list: (restaurantId: number) =>
    apiClient<TableDto[]>(`/tables/restaurant/${restaurantId}`),

  detail: (id: number) => apiClient<TableDto>(`/tables/${id}`),

  checkin: (id: number) =>
    apiClient<{ tableId: number; status: string; sessionId: number | null }>(
      `/tables/${id}/checkin`,
      { method: 'POST' },
    ),

  qrLookup: (qrValue: string) =>
    apiClient<TableDto>(`/tables/qr/${encodeURIComponent(qrValue)}`),

  assistance: (tableId: number) =>
    apiClient<{ message: string; table_id: number }>(`/tables/${tableId}/assistance`, {
      method: 'POST',
    }),

  toggleStatus: (id: number) =>
    apiClient<{ message: string; table: TableDto }>(`/tables/${id}/toggle-status`, {
      method: 'PATCH',
    }),

  currentOrders: (tableId: number) =>
    apiClient<{ table_id: number; table_number: string; current_orders: unknown[]; total_orders: number }>(
      `/tables/${tableId}/current-orders`,
    ),
};
