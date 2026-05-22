"use client"

import { Table } from "./table-overview"

interface TableStatusBarProps {
  tables: Table[]
}

export function TableStatusBar({ tables }: TableStatusBarProps) {
  return (
    <div className="fixed bottom-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-sm font-semibold text-green-600 font-poppins">
              {tables.filter((t) => t.status === "free").length}
            </div>
            <div className="text-xs text-muted-foreground font-medium font-poppins">Free</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-blue-600 font-poppins">
              {tables.filter((t) => t.status === "occupied").length}
            </div>
            <div className="text-xs text-muted-foreground font-medium font-poppins">Occupied</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-amber-600 font-poppins">
              {tables.filter((t) => t.status === "waiting").length}
            </div>
            <div className="text-xs text-muted-foreground font-medium font-poppins">Waiting</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-emerald-600 font-poppins">
              {tables.filter((t) => t.status === "served").length}
            </div>
            <div className="text-xs text-muted-foreground font-medium font-poppins">Served</div>
          </div>
        </div>
      </div>
    </div>
  )
}
