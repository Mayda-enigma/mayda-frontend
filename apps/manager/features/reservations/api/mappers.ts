import type {
  BackendReservationStatus,
  Reservation,
  ReservationDto,
  ReservationListDto,
  ReservationStatus,
} from '../types'

const backendToDomainStatus: Record<
  BackendReservationStatus,
  ReservationStatus
> = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
  NO_SHOW: 'no-show',
}

const domainToBackendStatus: Record<
  ReservationStatus,
  BackendReservationStatus
> = {
  pending: 'PENDING',
  confirmed: 'CONFIRMED',
  cancelled: 'CANCELLED',
  completed: 'COMPLETED',
  'no-show': 'NO_SHOW',
}

const formatDate = (value: string) =>
  new Date(value).toISOString().slice(0, 10)

const formatTime = (value: string) =>
  new Date(value).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

export const toReservation = (
  dto: ReservationListDto | ReservationDto,
): Reservation => {
  const customerName =
    'customerName' in dto && dto.customerName
      ? dto.customerName
      : dto.user
        ? [dto.user.firstName, dto.user.lastName].filter(Boolean).join(' ').trim()
        : 'Guest'
  const customerPhone =
    'customerPhone' in dto && dto.customerPhone
      ? dto.customerPhone
      : dto.user?.phone
        ? String(dto.user.phone)
        : 'No phone on file'
  const tableNumber =
    'tableNumber' in dto && dto.tableNumber
      ? dto.tableNumber
      : dto.table?.number ?? 'Unassigned'
  const restaurantName =
    'restaurantName' in dto && dto.restaurantName ? dto.restaurantName : 'Restaurant'

  return {
    id: String(dto.id),
    customerName,
    customerPhone,
    tableNumber,
    restaurantId: dto.restaurantId,
    restaurantName,
    status: backendToDomainStatus[dto.status],
    reservationStart: dto.reservationStart,
    reservationEnd: dto.reservationEnd,
    date: formatDate(dto.reservationStart),
    startTime: formatTime(dto.reservationStart),
    endTime: formatTime(dto.reservationEnd),
    createdAt: dto.createdAt,
  }
}

export const toReservations = (
  dtos: ReservationListDto[],
): Reservation[] => dtos.map(toReservation)

export const toReservationStatusDto = (status: ReservationStatus) =>
  domainToBackendStatus[status]

