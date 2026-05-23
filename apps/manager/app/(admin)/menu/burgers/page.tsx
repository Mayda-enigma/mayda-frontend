"use client"

import { MenuFilteredTable } from "@/features/menu"

export default function BurgersMenuPage() {
  return (
    <MenuFilteredTable
      categoryFilter="burgers"
      title="Burgers Menu"
      description="All burger items"
    />
  )
}
