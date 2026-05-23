"use client"

import { OrderFilteredTable } from "@/components/order-filtered-table"

export default function ReadyOrdersPage() {
  return (
    <OrderFilteredTable
      statusFilter="ready"
      title="Ready Orders"
      description="Orders ready to be served"
    />
  )
}
