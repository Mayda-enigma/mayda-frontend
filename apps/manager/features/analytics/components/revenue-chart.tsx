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
import { useRevenue } from "../api/queries"
import type { RangePreset } from "../types"

export function RevenueChart({ range }: { range: RangePreset }) {
  const { data: revenue } = useRevenue(range)

  if (!revenue) return null

  const salesData = revenue.salesData

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Revenue Forecast</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">${revenue.forecast.revenue.toLocaleString()}</span>
                <span className="flex items-center gap-0.5 text-xs text-success font-medium">
                  <ArrowUpRight className="size-3" />
                  +{revenue.forecast.change}% projected
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
            {(() => {
              const maxRevenue = Math.max(...salesData.map((d) => d.revenue), 1)
              return salesData.map((item, i) => {
                const height = ((item.revenue / maxRevenue) * 100).toFixed(0)
                return (
                  <div key={i} className="flex flex-1 flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm bg-primary transition-all duration-300"
                      style={{ height: `${Math.max(Number(height), 4)}%` }}
                    />
                    <span className="text-[10px] text-muted-foreground text-center leading-tight">
                      {item.name}
                    </span>
                  </div>
                )
              })
            })()}
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Daily Revenue & Orders</CardTitle>
          <CardDescription>Revenue and order trends over the selected period</CardDescription>
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
                domain={[0, "auto"]}
                tickFormatter={(value) => `$${value}`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                domain={[0, "auto"]}
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
