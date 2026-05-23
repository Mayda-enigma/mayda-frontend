"use client"

import { OrderFilteredTable } from "@/components/order-filtered-table"

export default function PendingOrdersPage() {
  return (
    <OrderFilteredTable
      statusFilter="pending"
      title="Pending Orders"
      description="Orders awaiting preparation"
    />
  )
}
