"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Button } from "@/shared/ui/button"
import { Eye, Clock, ChefHat, CheckCircle, Utensils, XCircle } from "lucide-react"

const orders = [
  { id: "ORD-001", customerName: "John Smith", table: "T-12", waiter: "Bob Smith", items: 2, total: 44.97, status: "preparing" as const },
  { id: "ORD-002", customerName: "Sarah Johnson", table: "T-05", waiter: "Alice Johnson", items: 2, total: 25.98, status: "ready" as const },
  { id: "ORD-003", customerName: "Mike Wilson", table: "T-20", waiter: "Carol Davis", items: 3, total: 74.91, status: "served" as const },
  { id: "ORD-004", customerName: "Emily Davis", table: "T-08", waiter: "Bob Smith", items: 2, total: 41.96, status: "cancelled" as const },
  { id: "ORD-005", customerName: "David Brown", table: "T-25", waiter: "Alice Johnson", items: 2, total: 31.98, status: "pending" as const },
]

const statusConfig: Record<string, { className: string; icon: typeof Clock }> = {
  pending: { className: "bg-warning text-black", icon: Clock },
  preparing: { className: "bg-accent-blue text-white", icon: ChefHat },
  ready: { className: "bg-success text-white", icon: CheckCircle },
  served: { className: "bg-muted text-white", icon: Utensils },
  cancelled: { className: "bg-destructive text-destructive-foreground", icon: XCircle },
}

interface OrderFilteredTableProps {
  statusFilter?: string
  title: string
  description: string
}

export function OrderFilteredTable({ statusFilter, title, description }: OrderFilteredTableProps) {
  const filtered = statusFilter
    ? orders.filter((o) => o.status === statusFilter)
    : orders

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Waiter</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((order) => {
                const config = statusConfig[order.status]
                const StatusIcon = config.icon
                return (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>{order.customerName}</TableCell>
                    <TableCell><Badge variant="outline">{order.table}</Badge></TableCell>
                    <TableCell>{order.waiter}</TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell>${order.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge className={config.className}>
                        <div className="flex items-center gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {order.status}
                        </div>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm"><Eye className="h-3 w-3" /></Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
