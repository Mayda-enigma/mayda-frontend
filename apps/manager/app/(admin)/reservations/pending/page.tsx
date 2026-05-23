"use client"

import { ReservationFilteredTable } from "@/features/reservations"

export default function PendingReservationsPage() {
  return (
    <ReservationFilteredTable
      statusFilter="pending"
      title="Pending Reservations"
      description="Reservations awaiting confirmation"
    />
  )
}
