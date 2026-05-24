import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ordersKeys } from './queryKeys'
import { orderService } from './services'
import { useCartStore } from '@/features/cart/store'
import type { PublicOrderDto } from '../types'

export const useCreateOrder = () => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (input: PublicOrderDto) =>
      orderService.createPublic(input),
    onSuccess: () => {
      useCartStore.getState().clear()
      qc.invalidateQueries({ queryKey: ordersKeys.mine() })
    },
  })
}
