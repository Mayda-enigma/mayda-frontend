"use client"

import { MenuFilteredTable } from "@/features/menu"

export default function PizzaMenuPage() {
  return (
    <MenuFilteredTable
      categoryFilter="pizza"
      title="Pizza Menu"
      description="All pizza items"
    />
  )
}
