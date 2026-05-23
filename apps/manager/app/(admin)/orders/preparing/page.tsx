"use client"

import { OrderFilteredTable } from "@/features/orders"

export default function PreparingOrdersPage() {
  return (
    <OrderFilteredTable
      statusFilter="preparing"
      title="Orders in Preparation"
      description="Orders currently being prepared"
    />
  )
}
