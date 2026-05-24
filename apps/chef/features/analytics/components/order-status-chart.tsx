"use client"

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Skeleton } from "@/shared/ui/skeleton"
import { useI18n } from "@/components/i18n-provider"
import { useOrderStatus } from "../api/queries"
import type { RangePreset } from "../types"

const ORDER_STATUS_COLORS: Record<string, string> = {
  Completed: "#10b981",
  "In Progress": "#f59e0b",
  Delayed: "#ef4444",
}

interface OrderStatusChartProps {
  range: RangePreset
}

export function OrderStatusChart({ range }: OrderStatusChartProps) {
  const { t } = useI18n()
  const { data, isLoading } = useOrderStatus(range)

  const chartData = (data ?? []).map((s) => ({
    ...s,
    color: ORDER_STATUS_COLORS[s.name] ?? "#94a3b8",
  }))

  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-primary text-base sm:text-lg">{t.orderStatusDistribution}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Current order completion rates</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {isLoading ? (
          <Skeleton className="w-full h-[200px]" />
        ) : (
          <>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-xs sm:text-sm text-muted-foreground">
                    {item.name}: {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
