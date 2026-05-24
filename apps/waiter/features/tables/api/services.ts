import { apiClient } from '@/shared/api/client';
import type { TableDto } from '../types';

export const tableService = {
  list: () => apiClient<TableDto[]>('/tables'),

  detail: (id: number) => apiClient<TableDto>(`/tables/${id}`),

  updateStatus: (id: number, status: string) =>
    apiClient<TableDto>(`/tables/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  checkin: (id: number) =>
    apiClient<TableDto>(`/tables/${id}/checkin`, { method: 'POST' }),
};
