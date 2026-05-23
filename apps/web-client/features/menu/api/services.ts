import { apiClient } from '@/shared/api/client';
import type { MenuItemDto } from '../types';

export const menuService = {
  list: (restaurantId: string): Promise<MenuItemDto[]> =>
    apiClient<MenuItemDto[]>(`/restaurants/${restaurantId}/menus`),
};
