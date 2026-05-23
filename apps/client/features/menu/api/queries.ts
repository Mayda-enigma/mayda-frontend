import { useQuery } from "@tanstack/react-query"
import { menuService } from "./services"
import { toMenuItems } from "./mappers"
import { menuKeys } from "./queryKeys"

export function useMenu(restaurantId: string) {
  return useQuery({
    queryKey: menuKeys.list(restaurantId),
    queryFn: () => menuService.list(restaurantId).then(toMenuItems),
    staleTime: 60_000,
  })
}
