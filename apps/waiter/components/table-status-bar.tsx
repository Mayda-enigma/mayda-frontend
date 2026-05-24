"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { cn } from "@/shared/utils"
import type { Table } from "@/features/tables"

interface TableStatusBarProps {
  tables: Table[]
}

export function TableStatusBar({ tables }: TableStatusBarProps) {
  const totalTables = tables.length
  const freeTables = tables.filter((t) => t.status === "AVAILABLE").length
  const occupiedTables = tables.filter((t) => t.status === "OCCUPIED").length
  const highPriority = tables.filter((t) => t.status === "OCCUPIED" && t.activeOrdersCount > 0).length

  return (
    <div className="grid grid-cols-4 gap-2">
      {[
        { label: "Total", value: totalTables, color: "text-foreground" },
        { label: "Free", value: freeTables, color: "text-green-600" },
        { label: "Occupied", value: occupiedTables, color: "text-blue-600" },
        { label: "Priority", value: highPriority, color: "text-primary" },
      ].map(({ label, value, color }) => (
        <Card key={label}>
          <CardContent className="p-2 sm:p-3 text-center">
            <div className={cn("text-xl sm:text-2xl font-bold", color)}>{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
