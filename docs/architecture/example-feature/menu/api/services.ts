import { apiClient } from '@/shared/api/client';
import type { MenuItemDto, CreateMenuItemDto } from '../types';

export const menuService = {
  list: (restaurantId: string) =>
    apiClient<MenuItemDto[]>(`/restaurants/${restaurantId}/menus`),

  detail: (id: string) =>
    apiClient<MenuItemDto>(`/menus/${id}`),

  create: (payload: CreateMenuItemDto) =>
    apiClient<MenuItemDto>('/menus', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: CreateMenuItemDto) =>
    apiClient<MenuItemDto>(`/menus/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  remove: (id: string) =>
    apiClient<void>(`/menus/${id}`, { method: 'DELETE' }),
};
