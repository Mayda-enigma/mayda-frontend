"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import { Skeleton } from "@/shared/ui/skeleton"
import { useI18n } from "@/components/i18n-provider"
import { useTopDishes } from "../api/queries"
import type { RangePreset } from "../types"

interface TopDishesListProps {
  range: RangePreset
}

export function TopDishesList({ range }: TopDishesListProps) {
  const { t } = useI18n()
  const { data, isLoading } = useTopDishes(range)

  const maxOrders = data && data.length > 0 ? data[0].orders : 0

  return (
    <Card className="bg-card border-border">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-primary text-base sm:text-lg">{t.topPerformingDishes}</CardTitle>
        <CardDescription className="text-xs sm:text-sm">Most ordered items this week</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {(data ?? []).map((dish, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <span className="font-medium text-card-foreground text-sm sm:text-base">{dish.name}</span>
                  </div>
                  <Progress
                    value={maxOrders > 0 ? (dish.orders / maxOrders) * 100 : 0}
                    className="h-2"
                  />
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-card-foreground text-sm sm:text-base">{dish.orders}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">${dish.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
