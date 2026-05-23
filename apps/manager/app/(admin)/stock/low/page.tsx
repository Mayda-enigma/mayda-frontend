"use client"

import { StockFilteredTable } from "@/features/stock"

export default function LowStockPage() {
  return (
    <StockFilteredTable
      statusFilter="low"
      title="Low Stock Items"
      description="Items below minimum threshold"
    />
  )
}
