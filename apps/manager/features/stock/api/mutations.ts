import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toRestockOrderDto, toThresholdUpdateDto } from './mappers'
import { stockKeys } from './queryKeys'
import { stockService } from './services'
import type { RestockOrderInput, StockItem, ThresholdUpdateInput } from '../types'

export const useUpdateThreshold = (restaurantId: number) => {
  const qc = useQueryClient()
  const queryKey = stockKeys.current(restaurantId)

  return useMutation({
    mutationFn: (input: ThresholdUpdateInput) =>
      stockService.update(Number(input.id), toThresholdUpdateDto(input)),
    onMutate: async ({ id, minimumStock }) => {
      await qc.cancelQueries({ queryKey })

      const previousStock = qc.getQueryData<StockItem[]>(queryKey)

      qc.setQueryData<StockItem[]>(queryKey, (current = []) =>
        current.map((item) =>
          item.id === id
            ? {
                ...item,
                minimumStock,
                isLowStock: item.currentStock <= minimumStock,
                shortage: Math.max(minimumStock - item.currentStock, 0),
                thresholdCoverage:
                  minimumStock > 0
                    ? Math.max(
                        0,
                        Math.min(200, (item.currentStock / minimumStock) * 100),
                      )
                    : 100,
                status:
                  item.currentStock <= minimumStock * 0.5
                    ? 'critical'
                    : item.currentStock <= minimumStock
                      ? 'low'
                      : 'good',
              }
            : item,
        ),
      )

      return { previousStock }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousStock) {
        qc.setQueryData(queryKey, context.previousStock)
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey })
    },
  })
}

export const useCreateRestockOrder = (restaurantId: number) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (input: RestockOrderInput) =>
      stockService.restock(toRestockOrderDto(input)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: stockKeys.current(restaurantId) })
    },
  })
}
