"use client"

import { StockFilteredTable } from "@/components/stock-filtered-table"

export default function GoodStockPage() {
  return (
    <StockFilteredTable
      statusFilter="good"
      title="Well-Stocked Items"
      description="Items with sufficient inventory levels"
    />
  )
}
