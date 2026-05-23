"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { useI18n } from "@/components/i18n-provider"
import {
  KpiCards,
  OrderVolumeChart,
  OrderStatusChart,
  TopDishesList,
  PrepTimeChart,
  RevenueTrendChart,
  type RangePreset,
} from "@/features/analytics"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<RangePreset>("day")
  const { t } = useI18n()

  const ranges = [
    { key: "day", label: t.today },
    { key: "week", label: t.week },
    { key: "month", label: t.month },
  ] as const

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 leading-tight">
            {t.kitchenAnalytics}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">{t.performanceInsights}</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {ranges.map((range) => (
            <Button
              key={range.key}
              variant={timeRange === range.key ? "default" : "outline"}
              onClick={() => setTimeRange(range.key)}
              className={
                timeRange === range.key
                  ? "bg-orange-500 hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 min-h-[44px]"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 min-h-[44px]"
              }
            >
              {range.label}
            </Button>
          ))}
        </div>

        {/* KPI Cards */}
        <KpiCards range={timeRange} />

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <OrderVolumeChart range={timeRange} />
          <OrderStatusChart range={timeRange} />
        </div>

        {/* Popular Dishes and Kitchen Efficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <TopDishesList range={timeRange} />
          <PrepTimeChart range={timeRange} />
        </div>

        {/* Revenue Trend */}
        <RevenueTrendChart range={timeRange} />
      </div>
    </div>
  )
}
