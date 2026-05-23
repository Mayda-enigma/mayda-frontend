"use client"

import { TrendingUp, TrendingDown, Clock, ChefHat, DollarSign, Users } from "lucide-react"
import { Card, CardContent } from "@/shared/ui/card"
import { Skeleton } from "@/shared/ui/skeleton"
import { useI18n } from "@/components/i18n-provider"
import { useKitchenKpis } from "../api/queries"
import type { RangePreset } from "../types"

interface KpiCardsProps {
  range: RangePreset
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)

const formatTrend = (value: number) =>
  `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`

export function KpiCards({ range }: KpiCardsProps) {
  const { t } = useI18n()
  const { data: kpis, isLoading } = useKitchenKpis(range)

  const metrics = [
    {
      title: t.totalOrdersKpi,
      value: kpis?.totalOrders != null ? kpis.totalOrders.toLocaleString() : "—",
      change: kpis?.ordersTrend != null ? formatTrend(kpis.ordersTrend) : "",
      trendUp: (kpis?.ordersTrend ?? 0) >= 0,
      Icon: ChefHat,
    },
    {
      title: t.revenue,
      value: kpis?.revenue != null ? formatCurrency(kpis.revenue) : "—",
      change: kpis?.revenueTrend != null ? formatTrend(kpis.revenueTrend) : "",
      trendUp: (kpis?.revenueTrend ?? 0) >= 0,
      Icon: DollarSign,
    },
    {
      title: t.avgPrepTime,
      value: kpis?.avgPrepTimeMinutes != null ? `${kpis.avgPrepTimeMinutes.toFixed(1)} min` : "—",
      change: kpis?.avgPrepTimeTrend != null ? formatTrend(kpis.avgPrepTimeTrend) : "",
      // lower prep time is better → negative trend is "up" for this KPI
      trendUp: (kpis?.avgPrepTimeTrend ?? 0) <= 0,
      Icon: Clock,
    },
    {
      title: t.customerSatisfaction,
      value: kpis?.customerRating != null ? `${kpis.customerRating.toFixed(1)}/5` : "—",
      change: kpis?.customerRatingTrend != null ? formatTrend(kpis.customerRatingTrend) : "",
      trendUp: (kpis?.customerRatingTrend ?? 0) >= 0,
      Icon: Users,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {metrics.map((m) => {
        const TrendIcon = m.trendUp ? TrendingUp : TrendingDown
        const trendColor = m.trendUp ? "text-green-400" : "text-red-400"

        return (
          <Card
            key={m.title}
            className="bg-card border-border hover:bg-accent/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            <CardContent className="p-4 sm:p-6">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-32" />
                  <Skeleton className="h-4 w-16" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1">{m.title}</p>
                    <p className="text-xl sm:text-2xl font-bold text-card-foreground">{m.value}</p>
                    <div className={`flex items-center gap-1 text-xs sm:text-sm ${trendColor}`}>
                      <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                      {m.change}
                    </div>
                  </div>
                  <m.Icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
