import { apiClient } from '@/shared/api/client';
import type { EmployeeDto, InviteDto, UpdateDto, EmployeesQueryParams } from '../types';

export const employeesService = {
  list: ({ restaurantId }: EmployeesQueryParams) =>
    apiClient<EmployeeDto[]>(`/restaurants/${restaurantId}/staff`),

  invite: (restaurantId: number, data: InviteDto) =>
    apiClient<{ message: string }>(`/restaurants/${restaurantId}/staff/invite`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (restaurantId: number, id: number, data: UpdateDto) =>
    apiClient<EmployeeDto>(`/restaurants/${restaurantId}/staff/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  remove: (restaurantId: number, id: number) =>
    apiClient<{ message: string }>(`/restaurants/${restaurantId}/staff/${id}`, {
      method: 'DELETE',
    }),
};
