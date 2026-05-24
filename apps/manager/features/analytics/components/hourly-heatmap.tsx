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
import { useHourlyHeatmap } from "../api/queries"
import type { RangePreset } from "../types"

export function HourlyHeatmap({ range }: { range: RangePreset }) {
  const { data: hourly } = useHourlyHeatmap(range)

  if (!hourly) return null

  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>Hourly Order Distribution</CardTitle>
        <CardDescription>Busiest hours throughout the day with revenue correlation</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={hourly} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                if (name === "Revenue (DZD)") {
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
              name="Revenue (DZD)"
              dot={{ fill: "#FF6B35", strokeWidth: 2, r: 4 }}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
