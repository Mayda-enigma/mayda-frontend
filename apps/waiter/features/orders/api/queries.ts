import { useQuery } from '@tanstack/react-query';
import { orderKeys } from './queryKeys';
import { orderService } from './services';
import { toOrder } from './mappers';

export const useMyOrders = () =>
  useQuery({
    queryKey: orderKeys.mine(),
    queryFn: orderService.mine,
    select: (dtos) => dtos.map(toOrder),
    refetchInterval: 15_000,
  });

export const useTableOrders = (tableId: number) =>
  useQuery({
    queryKey: orderKeys.byTable(tableId),
    queryFn: () => orderService.byTable(tableId),
    select: (dtos) => dtos.map(toOrder),
    enabled: !!tableId,
    refetchInterval: 10_000,
  });
