import { menuMock } from '../__fixtures__/menu-mock';
import type { MenuItemDto } from '../types';

export const menuService = {
  list: async (_restaurantId: string): Promise<MenuItemDto[]> => {
    return Promise.resolve(menuMock);
  },
};
