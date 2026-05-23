"use client"

import { ReservationFilteredTable } from "@/features/reservations"

export default function CancelledReservationsPage() {
  return (
    <ReservationFilteredTable
      statusFilter="cancelled"
      title="Cancelled Reservations"
      description="Previously cancelled bookings"
    />
  )
}
