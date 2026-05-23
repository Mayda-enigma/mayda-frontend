import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toCreateMenuItemDto } from './mappers'
import { menuKeys } from './queryKeys'
import { menuService } from './services'
import type {
  CreateMenuItemInput,
  MenuItem,
  ToggleAvailabilityInput,
} from '../types'

export const useCreateMenuItem = (restaurantId: number) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateMenuItemInput) =>
      menuService.create(toCreateMenuItemDto(input)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: menuKeys.list(restaurantId) })
    },
  })
}

export const useUpdateMenuItem = (restaurantId: number) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: CreateMenuItemInput }) =>
      menuService.update(id, toCreateMenuItemDto(input)),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: menuKeys.list(restaurantId) })
    },
  })
}

export const useDeleteMenuItem = (restaurantId: number) => {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => menuService.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: menuKeys.list(restaurantId) })
    },
  })
}

export const useToggleAvailability = (restaurantId: number) => {
  const qc = useQueryClient()
  const queryKey = menuKeys.list(restaurantId)

  return useMutation({
    mutationFn: ({ id }: ToggleAvailabilityInput) =>
      menuService.toggleAvailability(id),
    onMutate: async ({ id }) => {
      await qc.cancelQueries({ queryKey })

      const previousMenu = qc.getQueryData<MenuItem[]>(queryKey)

      qc.setQueryData<MenuItem[]>(queryKey, (current = []) =>
        current.map((item) =>
          item.id === id ? { ...item, isAvailable: !item.isAvailable } : item,
        ),
      )

      return { previousMenu }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousMenu) {
        qc.setQueryData(queryKey, context.previousMenu)
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey })
    },
  })
}

