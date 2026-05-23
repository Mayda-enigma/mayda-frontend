"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { AlertTriangle, ShoppingCart } from "lucide-react"
import { getIngredientIcon } from "@/lib/ingredient-icons"
import type { LowStockAlert } from "../types"

interface StockAlertCardProps {
  alert: LowStockAlert
}

export function StockAlertCard({ alert }: StockAlertCardProps) {
  const getUrgencyLevel = () => {
    const percentage = (alert.currentStock / alert.minimumStock) * 100
    if (percentage <= 25) return "critical"
    if (percentage <= 50) return "warning"
    return "low"
  }

  const getUrgencyStyles = (level: string) => {
    switch (level) {
      case "critical":
        return "bg-red-500/30 dark:bg-red-900/30 border-red-500 animate-pulse"
      case "warning":
        return "bg-yellow-500/30 dark:bg-yellow-900/30 border-yellow-500"
      default:
        return "bg-orange-500/30 dark:bg-orange-900/30 border-orange-500"
    }
  }

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-400"
      case "warning":
        return "text-yellow-400"
      default:
        return "text-orange-400"
    }
  }

  const urgencyLevel = getUrgencyLevel()
  const ingredientIcon = getIngredientIcon(alert.name, alert.category || 'other')
  const IngredientIcon = ingredientIcon.icon

  return (
    <Card className={`${getUrgencyStyles(urgencyLevel)} border`}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${ingredientIcon.bgColor} ${getUrgencyColor(urgencyLevel)}`}>
              <IngredientIcon className={`w-5 h-5 ${ingredientIcon.color}`} />
            </div>
            <div>
              <div className="font-medium text-foreground">{alert.name}</div>
              <div className="text-sm text-muted-foreground">
                {alert.currentStock} {alert.unit} remaining (min: {alert.minimumStock} {alert.unit})
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className={`w-5 h-5 ${getUrgencyColor(urgencyLevel)}`} />
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Reorder
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
