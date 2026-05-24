import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderKeys } from './queryKeys';
import { orderService } from './services';

export const useMarkDelivered = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => orderService.markDelivered(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
};

export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { tableId: number; items: { name: string; quantity: number; price: number }[] }) =>
      orderService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
};
