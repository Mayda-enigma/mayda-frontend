"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Skeleton } from "@/shared/ui/skeleton"
import { useI18n } from "@/components/i18n-provider"
import { useKitchenEfficiency } from "../api/queries"
import type { RangePreset } from "../types"

interface PrepTimeChartProps {
  range: RangePreset
}

export function PrepTimeChart({ range }: PrepTimeChartProps) {
  const { t } = useI18n()
  const { data, isLoading } = useKitchenEfficiency(range)

  const chartData = (data ?? []).map((p) => ({
    day: p.day,
    avgTime: p.avgTimeMinutes,
    orders: p.orders,
  }))

  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-orange-500 text-base sm:text-lg">{t.kitchenEfficiency}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Average preparation time vs order volume</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {isLoading ? (
          <Skeleton className="w-full h-[200px]" />
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--popover-foreground))",
                }}
              />
              <Bar dataKey="avgTime" fill="#ef4444" name="Avg Time (min)" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
