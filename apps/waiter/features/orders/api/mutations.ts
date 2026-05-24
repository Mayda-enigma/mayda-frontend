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

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      orderService.updateStatus(id, status),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
};

export const useCreateOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: { restaurantId: number; tableId: number; items: { dishId: number; quantity: number }[] }) =>
      orderService.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
};
