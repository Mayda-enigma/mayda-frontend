import { useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeKeys } from './queryKeys';
import { employeesService } from './services';
import { toInviteDto } from './mappers';
import type { Employee, InviteDto, UpdateDto } from '../types';

export const useInviteEmployee = (restaurantId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: InviteDto) =>
      employeesService.invite(restaurantId, toInviteDto(data)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: employeeKeys.list(restaurantId) });
    },
  });
};

export const useUpdateEmployee = (restaurantId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateDto }) =>
      employeesService.update(restaurantId, id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: employeeKeys.list(restaurantId) });
    },
  });
};

export const useRemoveEmployee = (restaurantId: number) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => employeesService.remove(restaurantId, id),
    onMutate: async (employeeId: number) => {
      const queryKey = employeeKeys.list(restaurantId);
      await qc.cancelQueries({ queryKey });

      const previousEmployees = qc.getQueryData<Employee[]>(queryKey);

      qc.setQueryData<Employee[]>(queryKey, (old = []) =>
        old.filter((employee) => employee.id !== employeeId)
      );

      return { previousEmployees };
    },
    onError: (_error, _employeeId, context) => {
      if (context?.previousEmployees) {
        qc.setQueryData(
          employeeKeys.list(restaurantId),
          context.previousEmployees,
        );
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: employeeKeys.list(restaurantId) });
    },
  });
};
