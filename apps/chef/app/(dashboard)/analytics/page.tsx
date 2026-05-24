"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
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

  const ranges = [
    { key: "day", label: "Aujourd'hui" },
    { key: "week", label: "Semaine" },
    { key: "month", label: "Mois" },
  ] as const

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary leading-tight">
            Analyses Cuisine
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Aperçus de performance et métriques opérationnelles
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {ranges.map((range) => (
            <Button
              key={range.key}
              variant={timeRange === range.key ? "default" : "outline"}
              onClick={() => setTimeRange(range.key)}
              className={
                timeRange === range.key
                  ? "bg-primary hover:bg-primary/90 transition-all duration-200 min-h-[44px]"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 min-h-[44px]"
              }
            >
              {range.label}
            </Button>
          ))}
        </div>

        <KpiCards range={timeRange} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <OrderVolumeChart range={timeRange} />
          <OrderStatusChart range={timeRange} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <TopDishesList range={timeRange} />
          <PrepTimeChart range={timeRange} />
        </div>

        <RevenueTrendChart range={timeRange} />
      </div>
    </div>
  )
}
