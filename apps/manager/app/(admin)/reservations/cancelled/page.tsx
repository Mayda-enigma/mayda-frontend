"use client"

import { ReservationFilteredTable } from "@/components/reservation-filtered-table"

export default function CancelledReservationsPage() {
  return (
    <ReservationFilteredTable
      statusFilter="cancelled"
      title="Cancelled Reservations"
      description="Previously cancelled bookings"
    />
  )
}
