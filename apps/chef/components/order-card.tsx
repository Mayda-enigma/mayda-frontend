"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle, Utensils, Play, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface Dish {
  name: string
  notes: string
  allergens: string[]
  image?: string // Added image property for dishes
}

interface Order {
  id: string
  tableNumber: number
  timeReceived: Date
  status: "pending" | "in-progress" | "ready"
  complexity: "low" | "medium" | "high"
  dishes: Dish[]
  specialRequests: string
  priority: "normal" | "urgent"
}

interface OrderCardProps {
  order: Order
  onStatusUpdate: (orderId: string, newStatus: string) => void
}

export function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const [timeElapsed, setTimeElapsed] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const diff = now.getTime() - order.timeReceived.getTime()
      const minutes = Math.floor(diff / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setTimeElapsed(`${minutes}:${seconds.toString().padStart(2, "0")}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [order.timeReceived])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "in-progress":
        return "bg-blue-500"
      case "ready":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "low":
        return "text-green-400"
      case "medium":
        return "text-yellow-400"
      case "high":
        return "text-red-400"
      default:
        return "text-gray-400"
    }
  }

  const getPriorityStyles = (priority: string) => {
    if (priority === "urgent") {
      return "ring-2 ring-red-500 animate-pulse"
    }
    return ""
  }

  const getNextStatus = (currentStatus: string) => {
    switch (currentStatus) {
      case "pending":
        return "in-progress"
      case "in-progress":
        return "ready"
      default:
        return currentStatus
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Play className="w-4 h-4" />
      case "in-progress":
        return <CheckCircle className="w-4 h-4" />
      case "ready":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Play className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Start"
      case "in-progress":
        return "Ready"
      case "ready":
        return "Complete"
      default:
        return "Start"
    }
  }

  return (
    <Card
      className={`bg-card border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${getPriorityStyles(order.priority)}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-bold text-card-foreground">{order.id}</CardTitle>
          <Badge className={`${getStatusColor(order.status)} text-white font-medium text-xs sm:text-sm animate-pulse`}>
            {order.status.replace("-", " ").toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center gap-2 text-amber-400">
            <Utensils className="w-4 h-4 flex-shrink-0" />
            <span>Table {order.tableNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span className="font-mono">{timeElapsed}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs sm:text-sm text-muted-foreground">Complexity:</span>
          <span className={`text-xs sm:text-sm font-medium ${getComplexityColor(order.complexity)}`}>
            {order.complexity.toUpperCase()}
          </span>
        </div>

        <div className="space-y-2 sm:space-y-3">
          {order.dishes.map((dish, index) => (
            <div key={index} className="bg-muted rounded-lg p-2 sm:p-3 transition-all duration-200 hover:bg-muted/80">
              <div className="flex gap-2 sm:gap-3">
                {dish.image && (
                  <div className="flex-shrink-0">
                    <Image
                      src={dish.image || "/placeholder.svg"}
                      alt={dish.name}
                      width={60}
                      height={60}
                      className="rounded-md object-cover w-12 h-12 sm:w-15 sm:h-15"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-card-foreground mb-1 text-sm sm:text-base truncate">{dish.name}</div>
                  {dish.notes && (
                    <div className="text-xs sm:text-sm text-muted-foreground mb-2 line-clamp-2">{dish.notes}</div>
                  )}
                  {dish.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {dish.allergens.map((allergen) => (
                        <Badge key={allergen} variant="destructive" className="text-xs px-1.5 py-0.5">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {order.specialRequests && (
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-2 sm:p-3 animate-pulse">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-red-500/30 flex-shrink-20" />
              <span className="text-xs sm:text-sm font-medium text-red-400">Special Request</span>
            </div>
            <div className="text-xs sm:text-sm text-white">{order.specialRequests}</div>
          </div>
        )}

        {order.status !== "ready" && (
          <Button
            onClick={() => onStatusUpdate(order.id, getNextStatus(order.status))}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all duration-200 transform hover:scale-105 min-h-[44px] text-sm sm:text-base"
            size="lg"
          >
            {getStatusIcon(order.status)}
            <span className="ml-2">{getStatusText(order.status)}</span>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
