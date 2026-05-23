"use client"

import { MenuFilteredTable } from "@/features/menu"

export default function SaladsMenuPage() {
  return (
    <MenuFilteredTable
      categoryFilter="salads"
      title="Salads Menu"
      description="All salad items"
    />
  )
}
