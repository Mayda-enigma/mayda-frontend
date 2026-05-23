import { useQuery } from '@tanstack/react-query'
import { recommendationKeys } from './queryKeys'
import { recommendationService } from './services'
import { toRecommendedItems } from './mappers'

export const useRecommendations = (cartItemIds: number[], timeOfDay: string) =>
  useQuery({
    queryKey: recommendationKeys.list(cartItemIds, timeOfDay),
    queryFn: () =>
      recommendationService.get({ cartItemIds, timeOfDay }),
    select: (data) => toRecommendedItems(data.recommendations),
    staleTime: 120_000,
    enabled: cartItemIds.length > 0,
  })
