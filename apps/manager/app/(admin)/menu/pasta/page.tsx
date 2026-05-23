"use client"

import { MenuFilteredTable } from "@/components/menu-filtered-table"

export default function PastaMenuPage() {
  return (
    <MenuFilteredTable
      categoryFilter="pasta"
      title="Pasta Menu"
      description="All pasta items"
    />
  )
}
