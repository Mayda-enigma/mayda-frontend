"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Clock, AlertTriangle, Utensils, Play, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

interface Dish {
  name: string
  notes: string
  allergens: string[]
  image?: string
}

interface Order {
  id: string
  backendId: number
  tableNumber: number
  timeReceived: Date
  status: string
  complexity: "low" | "medium" | "high"
  dishes: Dish[]
  specialRequests: string
  priority: "normal" | "urgent"
}

interface OrderCardProps {
  order: Order
  onStatusUpdate: (orderId: string, newStatus: string) => void
}

const statusStyles: Record<string, string> = {
  pending: "bg-warning text-warning-foreground dark:text-white",
  "in-progress": "bg-accent-blue text-white",
  ready: "bg-success text-white",
}

const complexityStyles: Record<string, string> = {
  low: "text-success",
  medium: "text-warning",
  high: "text-destructive",
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

  const isUrgent = order.priority === "urgent"
  const statusColor = statusStyles[order.status] || "bg-muted text-muted-foreground"

  return (
    <Card
      className={isUrgent ? "ring-2 ring-destructive" : ""}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">{order.id}</CardTitle>
          <Badge className={statusColor}>
            {order.status.replace("-", " ").toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Utensils className="w-4 h-4 shrink-0" />
            <span>Table {order.tableNumber}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 shrink-0" />
            <span className="font-mono tabular-nums">{timeElapsed}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Complexity:</span>
          <span className={`text-sm font-medium ${complexityStyles[order.complexity] || "text-muted-foreground"}`}>
            {order.complexity.toUpperCase()}
          </span>
        </div>

        <div className="space-y-2">
          {order.dishes.map((dish, index) => (
            <div key={index} className="bg-muted rounded-lg p-2 sm:p-3">
              <div className="flex gap-2 sm:gap-3">
                {dish.image && (
                  <div className="shrink-0">
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
                  <div className="font-medium text-card-foreground mb-1 text-sm truncate">{dish.name}</div>
                  {dish.notes && (
                    <div className="text-xs text-muted-foreground mb-2 line-clamp-2">{dish.notes}</div>
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
          <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-2 sm:p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
              <span className="text-xs font-medium text-destructive">Special Request</span>
            </div>
            <div className="text-xs text-foreground">{order.specialRequests}</div>
          </div>
        )}

        {order.status !== "ready" && (
          <Button
            onClick={() => onStatusUpdate(order.id, getNextStatus(order.status))}
            className="w-full"
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
