import { apiClient } from '@/shared/api/client'
import type { CreateMenuItemDto, DishDto, MenuDto } from '../types'

export const menuService = {
  list: (restaurantId: number) =>
    apiClient<MenuDto[]>(`/menus/restaurant/${restaurantId}`),

  create: (payload: CreateMenuItemDto) =>
    apiClient<DishDto>('/menus', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: Partial<CreateMenuItemDto>) =>
    apiClient<DishDto>(`/menus/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  remove: (id: string) =>
    apiClient<void>(`/menus/${id}`, { method: 'DELETE' }),
}

