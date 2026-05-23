"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { DollarSign, ShoppingCart, Star, TrendingUp, TrendingDown } from "lucide-react"
import { useKpis } from "../api/queries"
import type { RangePreset } from "../types"

const MOCK_KPIS = {
  totalRevenue: 38400,
  totalOrders: 407,
  avgOrderValue: 94.35,
  customerRating: 4.8,
  revenueTrend: 12.5,
  ordersTrend: 8.2,
  avgOrderValueTrend: 3.8,
  ratingTrend: 0.2,
}

export function KpiCards({ range }: { range: RangePreset }) {
  const { data: kpis } = useKpis(range)

  const d = kpis ?? MOCK_KPIS

  const cards = [
    {
      label: "Total Revenue",
      value: `$${d.totalRevenue.toLocaleString()}`,
      trend: d.revenueTrend,
      icon: <DollarSign className="size-5" />,
      iconClass: "bg-primary/15 text-primary",
    },
    {
      label: "Total Orders",
      value: d.totalOrders.toLocaleString(),
      trend: d.ordersTrend,
      icon: <ShoppingCart className="size-5" />,
      iconClass: "bg-accent-blue/15 text-accent-blue",
    },
    {
      label: "Avg. Order Value",
      value: `$${d.avgOrderValue.toFixed(2)}`,
      trend: d.avgOrderValueTrend,
      icon: <DollarSign className="size-5" />,
      iconClass: "bg-accent-orange/15 text-accent-orange",
    },
    {
      label: "Customer Rating",
      value: d.customerRating.toFixed(1),
      trend: d.ratingTrend,
      icon: <Star className="size-5" />,
      iconClass: "bg-accent-pink/15 text-accent-pink",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className={`grid size-10 shrink-0 place-items-center rounded-md ${card.iconClass}`}>
                {card.icon}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">{card.label}</p>
                <div className="text-2xl font-bold">{card.value}</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {card.trend >= 0 ? (
                    <TrendingUp className="size-3 text-success" />
                  ) : (
                    <TrendingDown className="size-3 text-destructive" />
                  )}
                  {card.trend >= 0 ? "+" : ""}{card.trend}% from last week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
