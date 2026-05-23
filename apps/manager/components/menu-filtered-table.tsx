"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Star, TrendingUp, TrendingDown, Clock, Users } from "lucide-react"

const menuItems = [
  { id: 1, name: "Pizza Margherita", category: "Pizza", price: 15.99, cost: 6.5, popularity: 92, orders: 145, rating: 4.8, prepTime: 12, status: "active" as const },
  { id: 2, name: "Chicken Alfredo", category: "Pasta", price: 18.99, cost: 7.25, popularity: 88, orders: 128, rating: 4.6, prepTime: 15, status: "active" as const },
  { id: 3, name: "Caesar Salad", category: "Salads", price: 12.99, cost: 4.8, popularity: 75, orders: 98, rating: 4.4, prepTime: 8, status: "active" as const },
  { id: 4, name: "Beef Burger", category: "Burgers", price: 16.99, cost: 8.2, popularity: 82, orders: 87, rating: 4.7, prepTime: 18, status: "active" as const },
  { id: 5, name: "Vegan Buddha Bowl", category: "Healthy", price: 14.99, cost: 5.9, popularity: 68, orders: 64, rating: 4.5, prepTime: 10, status: "active" as const },
]

const getProfitMargin = (price: number, cost: number) => (((price - cost) / price) * 100).toFixed(1)

function getPopularityColor(popularity: number) {
  if (popularity >= 80) return "text-success"
  if (popularity >= 60) return "text-warning"
  return "text-destructive"
}

interface MenuFilteredTableProps {
  categoryFilter?: string
  title: string
  description: string
}

export function MenuFilteredTable({ categoryFilter, title, description }: MenuFilteredTableProps) {
  const filtered = categoryFilter
    ? menuItems.filter((item) => item.category.toLowerCase() === categoryFilter.toLowerCase())
    : menuItems

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
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Popularity</TableHead>
                <TableHead>Profit Margin</TableHead>
                <TableHead>Prep Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell><Badge variant="outline">{item.category}</Badge></TableCell>
                  <TableCell>${item.price}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      {item.orders}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-warning" />
                      {item.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={item.popularity} className="w-16 h-2" />
                      <span className={`text-sm ${getPopularityColor(item.popularity)}`}>{item.popularity}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-success font-medium">{getProfitMargin(item.price, item.cost)}%</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {item.prepTime} min
                    </div>
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
