"use client"

import { ReservationCard } from "./reservation-card"
import type { Reservation, ReservationStatus } from "../types"

interface CalendarViewProps {
  reservations: Reservation[]
  onStatusChange: (
    reservation: Reservation,
    status: ReservationStatus,
  ) => Promise<void>
  updatingId?: string
}

export function CalendarView({
  reservations,
  onStatusChange,
  updatingId,
}: CalendarViewProps) {
  const sortedReservations = [...reservations].sort((a, b) =>
    a.reservationStart.localeCompare(b.reservationStart),
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sortedReservations.map((reservation) => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onStatusChange={onStatusChange}
          isUpdating={updatingId === reservation.id}
        />
      ))}
    </div>
  )
}

