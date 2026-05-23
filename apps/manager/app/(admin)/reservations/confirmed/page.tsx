"use client"

import { ReservationFilteredTable } from "@/features/reservations"

export default function ConfirmedReservationsPage() {
  return (
    <ReservationFilteredTable
      statusFilter="confirmed"
      title="Confirmed Reservations"
      description="All confirmed bookings"
    />
  )
}
