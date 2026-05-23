"use client"

import { OrderFilteredTable } from "@/features/orders"

export default function ReadyOrdersPage() {
  return (
    <OrderFilteredTable
      statusFilter="ready"
      title="Ready Orders"
      description="Orders ready to be served"
    />
  )
}
