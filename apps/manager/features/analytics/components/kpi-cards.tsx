"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { DollarSign, ShoppingCart, Star, TrendingUp, TrendingDown } from "lucide-react"
import { useKpis } from "../api/queries"
import type { RangePreset } from "../types"

export function KpiCards({ range }: { range: RangePreset }) {
  const { data: kpis } = useKpis(range)

  if (!kpis) return null

  const cards = [
    {
      label: "Revenu total",
      value: `${kpis.totalRevenue.toLocaleString()} DZD`,
      trend: kpis.revenueTrend,
      icon: <DollarSign className="size-5" />,
      iconClass: "bg-primary/15 text-primary",
    },
    {
      label: "Commandes totales",
      value: kpis.totalOrders.toLocaleString(),
      trend: kpis.ordersTrend,
      icon: <ShoppingCart className="size-5" />,
      iconClass: "bg-accent-blue/15 text-accent-blue",
    },
    {
      label: "Panier moyen",
      value: `${kpis.avgOrderValue.toFixed(2)} DZD`,
      trend: kpis.avgOrderValueTrend,
      icon: <DollarSign className="size-5" />,
      iconClass: "bg-accent-orange/15 text-accent-orange",
    },
    {
      label: "Note client",
      value: kpis.customerRating.toFixed(1),
      trend: kpis.ratingTrend,
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
                  {card.trend >= 0 ? "+" : ""}{card.trend}% par rapport à la semaine dernière
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
