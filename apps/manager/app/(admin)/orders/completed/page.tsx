"use client"

import { OrderFilteredTable } from "@/features/orders"

export default function CompletedOrdersPage() {
  return (
    <OrderFilteredTable
      statusFilter="completed"
      title="Completed Orders"
      description="Orders that have been served"
    />
  )
}
