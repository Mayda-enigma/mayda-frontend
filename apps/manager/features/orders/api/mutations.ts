import { useMutation, useQueryClient } from '@tanstack/react-query'
import { domainToBackendStatus } from './mappers'
import { orderKeys } from './queryKeys'
import { ordersService } from './services'
import type { Order, OrderStatusUpdateInput } from '../types'

export const useUpdateOrderStatus = (restaurantId: number) => {
  const qc = useQueryClient()
  const queryKey = orderKeys.list(restaurantId)

  return useMutation({
    mutationFn: ({ id, status, notes }: OrderStatusUpdateInput) =>
      ordersService.updateStatus(id, domainToBackendStatus[status], notes),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey })

      const previousOrders = qc.getQueryData<Order[]>(queryKey)

      qc.setQueryData<Order[]>(queryKey, (current = []) =>
        current.map((order) =>
          order.id === id ? { ...order, status } : order,
        ),
      )

      return { previousOrders }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousOrders) {
        qc.setQueryData(queryKey, context.previousOrders)
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey })
    },
  })
}
