"use client"

import { OrderFilteredTable } from "@/features/orders"

export default function PendingOrdersPage() {
  return (
    <OrderFilteredTable
      statusFilter="pending"
      title="Pending Orders"
      description="Orders awaiting confirmation"
    />
  )
}
