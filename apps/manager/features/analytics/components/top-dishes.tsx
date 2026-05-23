"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Star } from "lucide-react"
import { useTopDishes } from "../api/queries"
import type { RangePreset } from "../types"

const MOCK_DISHES = [
  { name: "Pizza Margherita", orders: 145, revenue: 2175, rating: 4.8, trend: "+12%" },
  { name: "Chicken Alfredo", orders: 128, revenue: 2304, rating: 4.7, trend: "+8%" },
  { name: "Caesar Salad", orders: 98, revenue: 1176, rating: 4.6, trend: "+15%" },
  { name: "Beef Burger", orders: 87, revenue: 1392, rating: 4.9, trend: "+5%" },
  { name: "Fish & Chips", orders: 76, revenue: 1368, rating: 4.5, trend: "+22%" },
  { name: "Pasta Carbonara", orders: 65, revenue: 1170, rating: 4.7, trend: "+18%" },
  { name: "Grilled Salmon", orders: 54, revenue: 1296, rating: 4.8, trend: "+10%" },
  { name: "Mushroom Risotto", orders: 43, revenue: 817, rating: 4.6, trend: "+25%" },
]

export function TopDishes({ range }: { range: RangePreset }) {
  const { data: dishes } = useTopDishes(range)

  const d = dishes ?? MOCK_DISHES

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Most Popular Dishes</CardTitle>
          <CardDescription>Top performing menu items by order count</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={d.slice(0, 6)} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
              <YAxis dataKey="name" type="category" width={120} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="orders" fill="#F7931E" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Dish Performance Details</CardTitle>
          <CardDescription>Comprehensive metrics for top dishes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {d.slice(0, 8).map((dish, index) => (
              <div
                key={dish.name}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{dish.name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Star className="h-3 w-3 fill-warning text-warning" />
                      {dish.rating}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{dish.orders} orders</p>
                  <p className="text-xs text-success">{dish.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
