"use client"

import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Eye } from "lucide-react"
import type { Order } from "../types"
import { statusConfig } from "./status-utils"

interface OrderListTableProps {
  orders: Order[]
  onViewOrder?: (order: Order) => void
}

export function OrderListTable({ orders, onViewOrder }: OrderListTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order #</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Table</TableHead>
          <TableHead>Items</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Time</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => {
          const config = statusConfig[order.status]
          const StatusIcon = config.icon
          return (
            <TableRow key={order.id}>
              <TableCell className="font-medium tabular-nums">
                #{order.orderNumber}
              </TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell>
                <Badge variant="outline">{order.tableNumber}</Badge>
              </TableCell>
              <TableCell>{order.itemCount}</TableCell>
              <TableCell className="tabular-nums">
                {order.totalAmount.toFixed(2)} DZD
              </TableCell>
              <TableCell>
                <Badge className={config.className}>
                  <span className="flex items-center gap-1">
                    <StatusIcon className="h-3 w-3" />
                    {order.status}
                  </span>
                </Badge>
              </TableCell>
              <TableCell className="tabular-nums">
                {order.orderTimeFormatted}
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewOrder?.(order)}
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
