import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersKeys } from './queryKeys'
import { orderService } from './services'
import { toCreateOrderDto } from './mappers'
import { useCartStore } from '@/features/cart/store'
import type { CreateOrderInput } from '../types'

export const useCreateOrder = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateOrderInput) =>
      orderService.create(toCreateOrderDto(input)),
    onSuccess: () => {
      useCartStore.getState().clear()
      qc.invalidateQueries({ queryKey: ordersKeys.lists() })
      qc.invalidateQueries({ queryKey: ordersKeys.mine() })
    },
  })
}
