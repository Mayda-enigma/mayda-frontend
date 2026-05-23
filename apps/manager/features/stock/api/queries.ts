import { useQuery } from '@tanstack/react-query'
import { toStockForecast, toStockItems } from './mappers'
import { stockKeys } from './queryKeys'
import { stockService } from './services'

export const useStock = (restaurantId: number | null) =>
  useQuery({
    queryKey: stockKeys.current(restaurantId ?? 0),
    queryFn: async () => toStockItems(await stockService.list(restaurantId ?? 0)),
    enabled: restaurantId !== null,
  })

export const useStockForecast = (
  item: string | null,
  date: string,
  enabled = true,
) =>
  useQuery({
    queryKey: stockKeys.forecast(item ?? '', date),
    queryFn: async () =>
      toStockForecast(
        await stockService.forecast({ item: item ?? '', date }),
        item ?? '',
        date,
      ),
    enabled: enabled && Boolean(item) && Boolean(date),
    retry: false,
  })
