import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tableKeys } from './queryKeys';
import { tableService } from './services';
import { toTable } from './mappers';
import type { Table } from '../types';

export const useUpdateTableStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      tableService.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: tableKeys.all });
    },
  });
};

export const useCheckinTable = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => tableService.checkin(id),
    onSuccess: (_data, id) => {
      qc.invalidateQueries({ queryKey: tableKeys.all });
      return id;
    },
  });
};
