"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const cuisineShare = [
  { name: "Italian", value: 35, color: "#FF6B35", orders: 342 },
  { name: "American", value: 25, color: "#F7931E", orders: 245 },
  { name: "Mediterranean", value: 20, color: "#FFD23F", orders: 196 },
  { name: "Asian", value: 12, color: "#06FFA5", orders: 118 },
  { name: "Other", value: 8, color: "#4ECDC4", orders: 78 },
]

export function CuisineShare() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Cuisine Distribution</CardTitle>
          <CardDescription>Breakdown of orders by cuisine type</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cuisineShare}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {cuisineShare.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Customer Segmentation</CardTitle>
          <CardDescription>Detailed customer analytics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Returning Customers</span>
              <span className="text-sm text-muted-foreground">68%</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">New Customers</span>
              <span className="text-sm text-muted-foreground">32%</span>
            </div>
            <Progress value={32} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">VIP Customers</span>
              <span className="text-sm text-muted-foreground">15%</span>
            </div>
            <Progress value={15} className="h-2" />
          </div>
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Total Unique Customers</span>
              <Badge variant="secondary">1,247</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Customer Retention Rate</span>
              <Badge variant="default">68%</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Average Visit Frequency</span>
              <Badge variant="outline">2.3x/month</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
