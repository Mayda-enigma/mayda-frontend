"use client"

import { MenuFilteredTable } from "@/components/menu-filtered-table"

export default function PizzaMenuPage() {
  return (
    <MenuFilteredTable
      categoryFilter="pizza"
      title="Pizza Menu"
      description="All pizza items"
    />
  )
}
