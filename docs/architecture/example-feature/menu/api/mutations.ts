import { useMutation, useQueryClient } from '@tanstack/react-query';
import { menuKeys } from './queryKeys';
import { menuService } from './services';
import { toCreateMenuItemDto } from './mappers';
import type { CreateMenuItemInput } from '../types';

export const useCreateMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: CreateMenuItemInput) =>
      menuService.create(toCreateMenuItemDto(input)),
    onSuccess: () => qc.invalidateQueries({ queryKey: menuKeys.all }),
  });
};

export const useUpdateMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CreateMenuItemInput }) =>
      menuService.update(id, toCreateMenuItemDto(input)),
    onSuccess: () => qc.invalidateQueries({ queryKey: menuKeys.all }),
  });
};

export const useDeleteMenuItem = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: menuService.remove,
    onSuccess: () => qc.invalidateQueries({ queryKey: menuKeys.all }),
  });
};
