import { useQuery } from '@tanstack/react-query'
import { toMenuItems } from './mappers'
import { menuKeys } from './queryKeys'
import { menuService } from './services'
import type { MenuItem } from '../types'

export const useMenu = (restaurantId: number | null) =>
  useQuery<MenuItem[]>({
    queryKey: menuKeys.list(restaurantId ?? 0),
    queryFn: async () => toMenuItems(await menuService.list(restaurantId ?? 0)),
    staleTime: 60_000,
    enabled: restaurantId !== null,
  })

