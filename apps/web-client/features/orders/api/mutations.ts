import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersKeys } from './queryKeys'
import { orderService } from './services'
import { useCartStore } from '@/features/cart/store'
import type { CreateOrderDto } from '../types'

export const useCreateOrder = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateOrderDto) =>
      orderService.create(input),
    onSuccess: () => {
      useCartStore.getState().clear()
      qc.invalidateQueries({ queryKey: ordersKeys.lists() })
      qc.invalidateQueries({ queryKey: ordersKeys.mine() })
    },
  })
}
