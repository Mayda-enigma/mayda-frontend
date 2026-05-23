import { useQuery } from '@tanstack/react-query';
import { menuKeys } from './queryKeys';
import { menuService } from './services';
import { toMenuItems } from './mappers';

export const useMenu = (restaurantId: string) =>
  useQuery({
    queryKey: menuKeys.list(restaurantId),
    queryFn: () => menuService.list(restaurantId),
    select: toMenuItems,
    staleTime: 60_000,
    enabled: Boolean(restaurantId),
  });
