import { useQuery } from '@tanstack/react-query';
import { menuKeys } from './queryKeys';
import { menuService } from './services';
import { toMenuItems, toMenuItem } from './mappers';

export const useMenu = (restaurantId: string) =>
  useQuery({
    queryKey: menuKeys.list(restaurantId),
    queryFn: () => menuService.list(restaurantId),
    select: (dtos) => toMenuItems(dtos),
    staleTime: 60_000,
    enabled: Boolean(restaurantId),
  });

export const useMenuItem = (id: string) =>
  useQuery({
    queryKey: menuKeys.detail(id),
    queryFn: () => menuService.detail(id),
    select: (dto) => toMenuItem(dto),
    enabled: Boolean(id),
  });
