import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toReservationStatusDto } from './mappers'
import { reservationKeys } from './queryKeys'
import { reservationsService } from './services'
import type { Reservation, ReservationStatusUpdateInput } from '../types'

export const useUpdateReservation = (
  restaurantId: number,
  date: string,
) => {
  const qc = useQueryClient()
  const queryKey = reservationKeys.byDate(restaurantId, date)

  return useMutation({
    mutationFn: ({ id, status }: ReservationStatusUpdateInput) =>
      reservationsService.updateStatus(id, toReservationStatusDto(status)),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey })

      const previousReservations = qc.getQueryData<Reservation[]>(queryKey)

      qc.setQueryData<Reservation[]>(queryKey, (current = []) =>
        current.map((reservation) =>
          reservation.id === id ? { ...reservation, status } : reservation,
        ),
      )

      return { previousReservations }
    },
    onError: (_error, _variables, context) => {
      if (context?.previousReservations) {
        qc.setQueryData(queryKey, context.previousReservations)
      }
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey })
    },
  })
}

