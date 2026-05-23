"use client"

import { OrderFilteredTable } from "@/components/order-filtered-table"

export default function CompletedOrdersPage() {
  return (
    <OrderFilteredTable
      statusFilter="served"
      title="Completed Orders"
      description="Orders that have been served"
    />
  )
}
