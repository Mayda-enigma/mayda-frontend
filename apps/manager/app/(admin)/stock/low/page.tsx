"use client"

import { StockFilteredTable } from "@/components/stock-filtered-table"

export default function LowStockPage() {
  return (
    <StockFilteredTable
      statusFilter="low"
      title="Low Stock Items"
      description="Items below minimum threshold"
    />
  )
}
