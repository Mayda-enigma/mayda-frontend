export type BackendReservationStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'NO_SHOW'

export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no-show'

export interface ReservationListDto {
  id: number
  userId: number | null
  customerName: string | null
  customerPhone: string | null
  tableId: number | null
  tableNumber: string | null
  restaurantId: number
  restaurantName: string | null
  reservationStart: string
  reservationEnd: string
  status: BackendReservationStatus
  createdAt: string
}

export interface ReservationDto {
  id: number
  userId: number | null
  tableId: number | null
  restaurantId: number
  reservationStart: string
  reservationEnd: string
  status: BackendReservationStatus
  createdAt: string
  updatedAt: string
  user?: {
    firstName?: string
    lastName?: string
    phone?: string | number | null
    email?: string | null
  } | null
  table?: {
    number?: string | null
  } | null
}

export interface Reservation {
  id: string
  customerName: string
  customerPhone: string
  tableNumber: string
  restaurantId: number
  restaurantName: string
  status: ReservationStatus
  reservationStart: string
  reservationEnd: string
  date: string
  startTime: string
  endTime: string
  createdAt: string
}

export interface ReservationStatusUpdateInput {
  id: string
  status: ReservationStatus
}

