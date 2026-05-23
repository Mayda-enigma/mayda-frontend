"use client"

import { MenuFilteredTable } from "@/components/menu-filtered-table"

export default function SaladsMenuPage() {
  return (
    <MenuFilteredTable
      categoryFilter="salads"
      title="Salads Menu"
      description="All salad items"
    />
  )
}
