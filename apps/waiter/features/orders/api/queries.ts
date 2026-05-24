import { useQuery } from '@tanstack/react-query';
import { orderKeys } from './queryKeys';
import { orderService } from './services';
import { toOrder } from './mappers';
import type { Order } from '../types';

export const useRestaurantOrders = (restaurantId: number, status?: string) =>
  useQuery<Order[]>({
    queryKey: orderKeys.restaurant(restaurantId, status),
    queryFn: async () => {
      const dtos = await orderService.restaurantOrders(restaurantId, status);
      return dtos.map(toOrder);
    },
    enabled: !!restaurantId,
    refetchInterval: 15_000,
  });

export const useTableOrders = (tableId: number) =>
  useQuery<Order[]>({
    queryKey: orderKeys.byTable(tableId),
    queryFn: async () => {
      const dtos = await orderService.byTable(tableId);
      return dtos.map(toOrder);
    },
    enabled: !!tableId,
    refetchInterval: 10_000,
  });
