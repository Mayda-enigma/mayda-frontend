import { useMutation, useQueryClient } from '@tanstack/react-query';
import { tableKeys } from './queryKeys';
import { tableService } from './services';

export const useCheckinTable = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => tableService.checkin(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: tableKeys.all });
    },
  });
};

export const useRequestAssistance = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (tableId: number) => tableService.assistance(tableId),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: tableKeys.all });
    },
  });
};
