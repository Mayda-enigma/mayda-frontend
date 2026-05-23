import { useQuery } from '@tanstack/react-query';
import { analyticsKeys } from './queryKeys';
import { analyticsService } from './services';

export const useKitchenAnalytics = (range: string = 'day') =>
  useQuery({
    queryKey: analyticsKeys.kitchen(range),
    queryFn: () => analyticsService.kitchen(range),
    refetchInterval: 30_000,
    staleTime: 10_000,
  });
