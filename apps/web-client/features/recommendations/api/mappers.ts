import type { RecommendedItemDto, RecommendedItem, RecommendRequestInput, RecommendRequestDto } from '../types'

export const toRecommendedItem = (dto: RecommendedItemDto): RecommendedItem => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  price: dto.price,
  category: dto.category,
  image: dto.image_url,
  score: dto.score,
  reason: dto.reason,
})

export const toRecommendedItems = (dtos: RecommendedItemDto[]): RecommendedItem[] =>
  dtos.map(toRecommendedItem)

export const toRecommendRequestDto = (input: RecommendRequestInput): RecommendRequestDto => ({
  cartItemIds: input.cartItemIds,
  timeOfDay: input.timeOfDay,
})
