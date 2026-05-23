import { apiClient } from "@/shared/api/client"
import type { MenuItemDto } from "@/features/menu/types"

export const menuService = {
  list: (restaurantId: string) =>
    apiClient<MenuItemDto[]>(`/restaurants/${restaurantId}/menus`),
}
