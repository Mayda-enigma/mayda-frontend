import { apiClient } from '@/shared/api/client'
import type {
  ReservationDto,
  ReservationListDto,
  BackendReservationStatus,
} from '../types'

export const reservationsService = {
  list: (restaurantId: number, date: string) =>
    apiClient<ReservationListDto[]>(
      `/reservations/restaurant/${restaurantId}?date=${date}`,
    ),

  detail: (id: string) =>
    apiClient<ReservationDto>(`/reservations/${id}`),

  updateStatus: (id: string, status: BackendReservationStatus) =>
    apiClient<ReservationDto>(`/reservations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
}

