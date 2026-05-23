"use client"

import { StockFilteredTable } from "@/features/stock"

export default function GoodStockPage() {
  return (
    <StockFilteredTable
      statusFilter="good"
      title="Well-Stocked Items"
      description="Items with sufficient inventory levels"
    />
  )
}
