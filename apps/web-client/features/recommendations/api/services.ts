import { apiClient } from '@/shared/api/client'
import type { RecommendRequestDto, RecommendResponseDto } from '../types'

export const recommendationService = {
  get: (payload: RecommendRequestDto): Promise<RecommendResponseDto> =>
    apiClient<RecommendResponseDto>('/ai/recommend', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
}
