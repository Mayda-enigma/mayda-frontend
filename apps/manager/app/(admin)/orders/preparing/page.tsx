"use client"

import { OrderFilteredTable } from "@/components/order-filtered-table"

export default function PreparingOrdersPage() {
  return (
    <OrderFilteredTable
      statusFilter="preparing"
      title="Orders in Preparation"
      description="Orders currently being prepared"
    />
  )
}
