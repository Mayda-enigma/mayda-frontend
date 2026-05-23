"use client"

import { MenuFilteredTable } from "@/components/menu-filtered-table"

export default function BurgersMenuPage() {
  return (
    <MenuFilteredTable
      categoryFilter="burgers"
      title="Burgers Menu"
      description="All burger items"
    />
  )
}
