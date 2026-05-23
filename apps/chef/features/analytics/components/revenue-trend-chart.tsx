"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Skeleton } from "@/shared/ui/skeleton"
import { useI18n } from "@/components/i18n-provider"
import { useRevenueTrend } from "../api/queries"
import type { RangePreset } from "../types"

interface RevenueTrendChartProps {
  range: RangePreset
}

export function RevenueTrendChart({ range }: RevenueTrendChartProps) {
  const { t } = useI18n()
  const { data, isLoading } = useRevenueTrend(range)

  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-orange-500 text-base sm:text-lg">{t.revenueTrend}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Monthly revenue and order volume comparison
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {isLoading ? (
          <Skeleton className="w-full h-[300px]" />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--popover-foreground))",
                }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue ($)" />
              <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={3} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
