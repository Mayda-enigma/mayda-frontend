"use client"

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Skeleton } from "@/shared/ui/skeleton"
import { useI18n } from "@/components/i18n-provider"
import { useOrderVolume } from "../api/queries"
import type { RangePreset } from "../types"

interface OrderVolumeChartProps {
  range: RangePreset
}

export function OrderVolumeChart({ range }: OrderVolumeChartProps) {
  const { t } = useI18n()
  const { data, isLoading } = useOrderVolume(range)

  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-primary text-base sm:text-lg">{t.orderVolumeToday}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Orders received throughout the day</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {isLoading ? (
          <Skeleton className="w-full h-[250px]" />
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={data ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--popover))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  color: "hsl(var(--popover-foreground))",
                }}
              />
              <Area type="monotone" dataKey="orders" stroke="#f59e0b" fill="url(#orderGradient)" />
              <defs>
                <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}
