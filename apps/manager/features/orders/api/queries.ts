import { useQuery } from '@tanstack/react-query'
import { toOrder, toOrders } from './mappers'
import { orderKeys } from './queryKeys'
import { ordersService } from './services'
import type { Order } from '../types'

export const useOrders = (restaurantId: number | null) =>
  useQuery<Order[]>({
    queryKey: orderKeys.list(restaurantId ?? 0),
    queryFn: async () =>
      toOrders(await ordersService.list(restaurantId ?? 0)),
    enabled: restaurantId !== null,
    refetchInterval: 15000,
  })

export const useOrderDetail = (id: string) =>
  useQuery<Order>({
    queryKey: orderKeys.detail(id),
    queryFn: async () => toOrder(await ordersService.detail(id)),
    enabled: Boolean(id),
  })
