import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ordersKeys } from './queryKeys';
import { orderService } from './services';

export interface UpdateOrderStatusInput {
  orderId: number;
  status: string;
  notes?: string;
}

export const useUpdateOrderStatus = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: UpdateOrderStatusInput) =>
      orderService.updateStatus(input.orderId, input.status, input.notes),
    onSuccess: (_, input) => {
      qc.invalidateQueries({ queryKey: ordersKeys.detail(String(input.orderId)) });
      qc.invalidateQueries({ queryKey: ordersKeys.lists() });
      qc.invalidateQueries({ queryKey: ['kitchenQueue'] });
    },
  });
};
