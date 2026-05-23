import { useQuery } from '@tanstack/react-query'
import { ordersKeys } from './queryKeys'
import { orderService } from './services'
import { toOrders } from './mappers'

export const useMyOrders = () =>
  useQuery({
    queryKey: ordersKeys.mine(),
    queryFn: () => orderService.list(),
    select: toOrders,
    refetchInterval: 30_000,
    staleTime: 10_000,
  })
