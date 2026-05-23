"use client"

import { StockFilteredTable } from "@/components/stock-filtered-table"

export default function CriticalStockPage() {
  return (
    <StockFilteredTable
      statusFilter="critical"
      title="Critical Stock Items"
      description="Items requiring immediate attention"
    />
  )
}
