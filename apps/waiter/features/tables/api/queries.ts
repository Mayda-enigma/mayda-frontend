import { useQuery } from '@tanstack/react-query';
import { tableKeys } from './queryKeys';
import { tableService } from './services';
import { toTable } from './mappers';
import type { Table } from '../types';
import { mockTables } from '../__fixtures__/tables-mock';

export const useTables = (restaurantId: number) =>
  useQuery<Table[]>({
    queryKey: tableKeys.list(restaurantId),
    queryFn: async () => {
      try {
        const dtos = await tableService.list();
        return dtos.map(toTable);
      } catch {
        return mockTables;
      }
    },
    refetchInterval: 10_000,
  });
