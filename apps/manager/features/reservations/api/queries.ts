import { useQuery } from '@tanstack/react-query'
import { toReservation, toReservations } from './mappers'
import { reservationKeys } from './queryKeys'
import { reservationsService } from './services'
import type { Reservation } from '../types'

export const useReservations = (
  restaurantId: number | null,
  date: string,
) =>
  useQuery<Reservation[]>({
    queryKey: reservationKeys.byDate(restaurantId ?? 0, date),
    queryFn: async () =>
      toReservations(await reservationsService.list(restaurantId ?? 0, date)),
    enabled: restaurantId !== null && Boolean(date),
  })

export const useReservation = (id: string) =>
  useQuery<Reservation>({
    queryKey: reservationKeys.detail(id),
    queryFn: async () => toReservation(await reservationsService.detail(id)),
    enabled: Boolean(id),
  })

