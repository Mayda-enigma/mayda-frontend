"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Button } from "@/shared/ui/button"
import { Clock } from "lucide-react"

const stockItems = [
  { id: 1, name: "Tomatoes", category: "Vegetables", currentStock: 15, minThreshold: 20, unit: "kg", supplier: "Fresh Farm Co.", daysRemaining: 2, status: "low" as const },
  { id: 2, name: "Mozzarella Cheese", category: "Dairy", currentStock: 45, minThreshold: 25, unit: "kg", supplier: "Dairy Fresh Ltd.", daysRemaining: 4, status: "good" as const },
  { id: 3, name: "Chicken Breast", category: "Meat", currentStock: 8, minThreshold: 15, unit: "kg", supplier: "Premium Meats", daysRemaining: 1, status: "critical" as const },
  { id: 4, name: "Olive Oil", category: "Oils", currentStock: 12, minThreshold: 8, unit: "L", supplier: "Mediterranean Oils", daysRemaining: 6, status: "good" as const },
  { id: 5, name: "Pasta", category: "Grains", currentStock: 25, minThreshold: 30, unit: "kg", supplier: "Italian Imports", daysRemaining: 5, status: "low" as const },
  { id: 6, name: "Lettuce", category: "Vegetables", currentStock: 18, minThreshold: 12, unit: "heads", supplier: "Green Gardens", daysRemaining: 4, status: "good" as const },
]

const statusConfig: Record<string, string> = {
  critical: "bg-destructive text-destructive-foreground",
  low: "bg-warning text-white",
  good: "bg-success text-white",
}

interface StockFilteredTableProps {
  statusFilter?: "critical" | "low" | "good"
  title: string
  description: string
}

export function StockFilteredTable({ statusFilter, title, description }: StockFilteredTableProps) {
  const filtered = statusFilter
    ? stockItems.filter((item) => item.status === statusFilter)
    : stockItems

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
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Days Remaining</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <span>{item.currentStock} {item.unit}</span>
                      <Progress value={(item.currentStock / (item.minThreshold * 2)) * 100} className="h-2 w-20" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusConfig[item.status]}>{item.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {item.daysRemaining} days
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{item.supplier}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Restock</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
