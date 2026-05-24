import { useQuery } from '@tanstack/react-query'
import { ordersKeys } from './queryKeys'
import { orderService } from './services'
import { toOrders } from './mappers'

function getTableId(): string {
  if (typeof window === 'undefined') return ''
  return sessionStorage.getItem('mayda_table_id') ?? ''
}

export const useMyOrders = () => {
  const tableId = getTableId()

  return useQuery({
    queryKey: ordersKeys.mine(),
    queryFn: () => orderService.tableOrders(tableId),
    select: toOrders,
    enabled: Boolean(tableId),
    refetchInterval: 15_000,
    staleTime: 5_000,
  })
}
