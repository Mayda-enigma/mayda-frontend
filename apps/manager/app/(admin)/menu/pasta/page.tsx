"use client"

import { MenuFilteredTable } from "@/features/menu"

export default function PastaMenuPage() {
  return (
    <MenuFilteredTable
      categoryFilter="pasta"
      title="Pasta Menu"
      description="All pasta items"
    />
  )
}
