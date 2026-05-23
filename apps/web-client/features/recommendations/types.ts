export interface RecommendRequestInput {
  cartItemIds: number[]
  timeOfDay: string
}

export interface RecommendRequestDto {
  cartItemIds: number[]
  timeOfDay: string
}

export interface RecommendedItemDto {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url: string
  score: number
  reason: string
}

export interface RecommendResponseDto {
  recommendations: RecommendedItemDto[]
}

export interface RecommendedItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  score: number
  reason: string
}
