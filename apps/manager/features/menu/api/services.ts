import { apiClient } from '@/shared/api/client'
import type { CreateMenuItemDto, DishDto, MenuDto } from '../types'

export const menuService = {
  list: (restaurantId: number) =>
    apiClient<MenuDto[]>(`/menus/restaurant/${restaurantId}`),

  create: (payload: CreateMenuItemDto) =>
    apiClient<DishDto>('/menus/dishes', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: Partial<CreateMenuItemDto>) =>
    apiClient<DishDto>(`/menus/dishes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  remove: (id: string) =>
    apiClient<void>(`/menus/dishes/${id}`, { method: 'DELETE' }),

  toggleAvailability: (id: string) =>
    apiClient<DishDto>(`/menus/dishes/${id}/toggle-availability`, {
      method: 'PATCH',
    }),
}

