"use client"

import { ReservationFilteredTable } from "@/components/reservation-filtered-table"

export default function ConfirmedReservationsPage() {
  return (
    <ReservationFilteredTable
      statusFilter="confirmed"
      title="Confirmed Reservations"
      description="All confirmed bookings"
    />
  )
}
