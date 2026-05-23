import { apiClient } from '@/shared/api/client';
import type { KitchenAnalyticsDto } from '../types';

export const analyticsService = {
  kitchen: (range: string): Promise<KitchenAnalyticsDto> =>
    apiClient<KitchenAnalyticsDto>(`/analytics/kitchen?range=${range}`),
};
