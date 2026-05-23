"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const hourlyData = [
  { hour: "6AM", orders: 2, revenue: 45 },
  { hour: "7AM", orders: 8, revenue: 180 },
  { hour: "8AM", orders: 15, revenue: 340 },
  { hour: "9AM", orders: 12, revenue: 275 },
  { hour: "10AM", orders: 8, revenue: 185 },
  { hour: "11AM", orders: 18, revenue: 420 },
  { hour: "12PM", orders: 45, revenue: 1080 },
  { hour: "1PM", orders: 52, revenue: 1248 },
  { hour: "2PM", orders: 38, revenue: 912 },
  { hour: "3PM", orders: 22, revenue: 528 },
  { hour: "4PM", orders: 15, revenue: 360 },
  { hour: "5PM", orders: 28, revenue: 672 },
  { hour: "6PM", orders: 48, revenue: 1152 },
  { hour: "7PM", orders: 65, revenue: 1560 },
  { hour: "8PM", orders: 58, revenue: 1392 },
  { hour: "9PM", orders: 42, revenue: 1008 },
  { hour: "10PM", orders: 25, revenue: 600 },
  { hour: "11PM", orders: 12, revenue: 288 },
]

export function HourlyHeatmap() {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Hourly Order Distribution</CardTitle>
        <CardDescription>Busiest hours throughout the day with revenue correlation</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="hour"
              stroke="hsl(var(--muted-foreground))"
              fontSize={11}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              yAxisId="left"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, "dataMax + 5"]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              domain={[0, "dataMax + 100"]}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value, name) => {
                if (name === "Revenue ($)") {
                  return [`$${value}`, name]
                }
                return [value, name]
              }}
            />
            <Legend />
            <Bar yAxisId="left" dataKey="orders" fill="#4ECDC4" name="Orders" radius={[4, 4, 0, 0]} />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="#FF6B35"
              strokeWidth={3}
              name="Revenue ($)"
              dot={{ fill: "#FF6B35", strokeWidth: 2, r: 4 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
