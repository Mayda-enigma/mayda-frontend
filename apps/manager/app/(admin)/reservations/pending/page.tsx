"use client"

import { ReservationFilteredTable } from "@/components/reservation-filtered-table"

export default function PendingReservationsPage() {
  return (
    <ReservationFilteredTable
      statusFilter="pending"
      title="Pending Reservations"
      description="Reservations awaiting confirmation"
    />
  )
}
