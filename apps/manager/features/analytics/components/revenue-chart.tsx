"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { ArrowUpRight } from "lucide-react"

const salesData = [
  { name: "Mon", revenue: 4200, orders: 45, profit: 1260 },
  { name: "Tue", revenue: 3800, orders: 38, profit: 1140 },
  { name: "Wed", revenue: 5200, orders: 52, profit: 1560 },
  { name: "Thu", revenue: 4800, orders: 48, profit: 1440 },
  { name: "Fri", revenue: 6800, orders: 68, profit: 2040 },
  { name: "Sat", revenue: 8200, orders: 82, profit: 2460 },
  { name: "Sun", revenue: 7400, orders: 74, profit: 2220 },
]

export function RevenueChart() {
  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Revenue Forecast</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$52,400</span>
                <span className="flex items-center gap-0.5 text-xs text-success font-medium">
                  <ArrowUpRight className="size-3" />
                  +15.3% projected
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm bg-primary" />
                Actual
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm bg-primary/40" />
                Forecast
              </div>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {salesData.concat([
              { name: "Forecast Mon", revenue: 7800, orders: 0, profit: 0 },
              { name: "Forecast Tue", revenue: 8500, orders: 0, profit: 0 },
              { name: "Forecast Wed", revenue: 9200, orders: 0, profit: 0 },
            ]).map((d, i) => {
              const isForecast = i >= salesData.length
              const height = ((d.revenue / 10000) * 100).toFixed(0)
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-sm transition-all duration-300 ${
                      isForecast ? "bg-primary/40" : "bg-primary"
                    }`}
                    style={{ height: `${Math.max(Number(height), 4)}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">
                    {d.name.split("\n")[0]}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Daily Revenue & Orders</CardTitle>
          <CardDescription>Revenue and order trends over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} />
              <YAxis
                yAxisId="left"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, "dataMax + 1000"]}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, "dataMax + 10"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => {
                  if (name === "Revenue ($)" || name === "Profit ($)") {
                    return [`$${value}`, name]
                  }
                  return [value, name]
                }}
              />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#FF6B35"
                strokeWidth={3}
                name="Revenue ($)"
                dot={{ fill: "#FF6B35", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: "#FF6B35", strokeWidth: 2 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#06FFA5"
                strokeWidth={3}
                name="Orders"
                dot={{ fill: "#06FFA5", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, stroke: "#06FFA5", strokeWidth: 2 }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="profit"
                stroke="#FFD23F"
                strokeWidth={2}
                name="Profit ($)"
                strokeDasharray="5 5"
                dot={{ fill: "#FFD23F", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: "#FFD23F", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  )
}
