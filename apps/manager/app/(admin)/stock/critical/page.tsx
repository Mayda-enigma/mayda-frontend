"use client"

import { StockFilteredTable } from "@/features/stock"

export default function CriticalStockPage() {
  return (
    <StockFilteredTable
      statusFilter="critical"
      title="Critical Stock Items"
      description="Items requiring immediate attention"
    />
  )
}
