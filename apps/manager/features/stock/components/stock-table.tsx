"use client"

import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Input } from "@/shared/ui/input"
import { Progress } from "@/shared/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import { cn } from "@/shared/utils"
import type { StockItem } from "../types"

const statusStyles = {
  critical: "bg-destructive text-destructive-foreground",
  low: "bg-warning text-white",
  good: "bg-success text-white",
} as const

interface StockTableProps {
  items: StockItem[]
  emptyMessage: string
  thresholdDrafts?: Record<string, string>
  onThresholdChange?: (id: string, value: string) => void
  onSelectItem?: (item: StockItem) => void
  selectedItemId?: string | null
  onRestock?: (item: StockItem) => void
  restockingId?: string | null
  editableThresholds?: boolean
}

const formatNumber = (value: number) =>
  Number.isInteger(value) ? String(value) : value.toFixed(2)

export function StockTable({
  items,
  emptyMessage,
  thresholdDrafts,
  onThresholdChange,
  onSelectItem,
  selectedItemId,
  onRestock,
  restockingId,
  editableThresholds = false,
}: StockTableProps) {
  if (items.length === 0) {
    return <p className="text-sm text-muted-foreground">{emptyMessage}</p>
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[180px]">Item</TableHead>
            <TableHead className="min-w-[120px]">Category</TableHead>
            <TableHead className="min-w-[170px]">Current Stock</TableHead>
            <TableHead className="min-w-[140px]">Threshold</TableHead>
            <TableHead className="min-w-[110px]">Status</TableHead>
            <TableHead className="min-w-[160px]">Supplier</TableHead>
            <TableHead className="min-w-[120px]">Location</TableHead>
            <TableHead className="min-w-[110px] text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              className={cn(
                "transition-colors",
                onSelectItem ? "cursor-pointer hover:bg-muted/40" : "",
                selectedItemId === item.id ? "bg-muted/35" : "",
              )}
              onClick={() => onSelectItem?.(item)}
            >
              <TableCell>
                <div className="space-y-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="tabular-nums">
                      {formatNumber(item.currentStock)} {item.unit}
                    </span>
                    <span className="text-muted-foreground">
                      {Math.round(item.thresholdCoverage)}%
                    </span>
                  </div>
                  <Progress value={item.thresholdCoverage} className="h-2 w-28" />
                </div>
              </TableCell>
              <TableCell onClick={(event) => event.stopPropagation()}>
                {editableThresholds && onThresholdChange && thresholdDrafts ? (
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={thresholdDrafts[item.id] ?? String(item.minimumStock)}
                      onChange={(event) =>
                        onThresholdChange(item.id, event.target.value)
                      }
                      className="h-9 w-24"
                    />
                    <span className="text-xs text-muted-foreground">
                      {item.unit}
                    </span>
                  </div>
                ) : (
                  <span className="tabular-nums">
                    {formatNumber(item.minimumStock)} {item.unit}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Badge className={statusStyles[item.status]}>{item.status}</Badge>
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.supplier}
              </TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {item.location}
              </TableCell>
              <TableCell className="text-right" onClick={(event) => event.stopPropagation()}>
                {onRestock ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRestock(item)}
                    disabled={restockingId === item.id}
                  >
                    {restockingId === item.id ? "Saving..." : "Restock"}
                  </Button>
                ) : (
                  <span className="text-xs text-muted-foreground">View</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
