import { apiClient } from '@/shared/api/client';
import type { MenuDto } from '../types';

export const menuService = {
  list: (restaurantId: string): Promise<MenuDto[]> =>
    apiClient<MenuDto[]>(`/menus/restaurant/${restaurantId}`),
};
