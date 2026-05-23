import { useQuery } from '@tanstack/react-query';
import { ordersKeys } from './queryKeys';
import { orderService } from './services';
import { toOrders, toOrderDetail } from './mappers';

export const useOrders = () =>
  useQuery({
    queryKey: ordersKeys.lists(),
    queryFn: orderService.list,
    select: toOrders,
    refetchInterval: 30_000,
    staleTime: 10_000,
  });

export const useOrderDetail = (id: string) =>
  useQuery({
    queryKey: ordersKeys.detail(id),
    queryFn: () => orderService.detail(id),
    select: toOrderDetail,
    enabled: !!id,
  });
