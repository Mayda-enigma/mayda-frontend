import { useQuery } from '@tanstack/react-query';
import { ordersKeys } from './queryKeys';
import { orderService } from './services';
import { toOrders, toOrderDetail } from './mappers';

export const useOrders = (restaurantId: number) =>
  useQuery({
    queryKey: ordersKeys.list(String(restaurantId)),
    queryFn: () => orderService.list(restaurantId),
    select: toOrders,
    refetchInterval: 15_000,
    staleTime: 5_000,
  });

export const useKitchenQueue = (restaurantId: number) =>
  useQuery({
    queryKey: ['kitchenQueue', restaurantId] as const,
    queryFn: () => orderService.list(restaurantId),
    select: toOrders,
    refetchInterval: 15_000,
    staleTime: 5_000,
  });

export const useOrderDetail = (orderId: number) =>
  useQuery({
    queryKey: ordersKeys.detail(String(orderId)),
    queryFn: () => orderService.detail(orderId),
    select: toOrderDetail,
    enabled: !!orderId,
  });
