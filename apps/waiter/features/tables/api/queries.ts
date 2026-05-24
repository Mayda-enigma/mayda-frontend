import { useQuery } from '@tanstack/react-query';
import { tableKeys } from './queryKeys';
import { tableService } from './services';
import { toTable } from './mappers';
import type { Table } from '../types';

export const useTables = (restaurantId: number) =>
  useQuery<Table[]>({
    queryKey: tableKeys.list(restaurantId),
    queryFn: async () => {
      const dtos = await tableService.list(restaurantId);
      return dtos.map(toTable);
    },
    enabled: !!restaurantId,
    refetchInterval: 10_000,
  });

export const useTableCurrentOrders = (tableId: number) =>
  useQuery({
    queryKey: tableKeys.currentOrders(tableId),
    queryFn: () => tableService.currentOrders(tableId),
    enabled: !!tableId,
    refetchInterval: 10_000,
  });
