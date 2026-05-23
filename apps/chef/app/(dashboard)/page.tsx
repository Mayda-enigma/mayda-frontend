"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/ui/button"
import { Clock, ChefHat, Users, AlertTriangle } from "lucide-react"
import { OrderCard } from "@/components/order-card"
import { NotificationBanner } from "@/components/notification-banner"
import { NotificationCenter } from "@/components/notification-center"
import { VoiceControlPanel } from "@/components/voice-control-panel"
import { useKitchenNotifications } from "@/components/notification-system"
import { useI18n } from "@/components/i18n-provider"
import { useKitchenQueue } from "@/features/orders/api/queries"
import { useCurrentUser } from "@/features/auth"
import { orderService } from "@/features/orders/api/services"

export default function ChefDashboard() {
  const { data: user } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? 0
  const { data: orders = [], isLoading, refetch } = useKitchenQueue(restaurantId)
  const [sortBy, setSortBy] = useState<"time" | "complexity">("time")
  const { notifyNewOrder, notifyOrderReady, notifyOrderDelayed, notifyStockLow } = useKitchenNotifications()
  const { t } = useI18n()
  const router = useRouter()

  // Poll for new orders and trigger notifications
  const [knownOrderIds, setKnownOrderIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!orders.length) return
    const currentIds = new Set(orders.map((o) => o.id))
    const newIds = [...currentIds].filter((id) => !knownOrderIds.has(id))
    if (newIds.length > 0) {
      for (const id of newIds) {
        const order = orders.find((o) => o.id === id)
        if (order) {
          notifyNewOrder({ id: order.backendId.toString(), tableNumber: order.tableNumber, priority: order.priority })
        }
      }
      setKnownOrderIds(currentIds)
    }
    if (knownOrderIds.size === 0) {
      setKnownOrderIds(currentIds)
    }
  }, [orders, knownOrderIds, notifyNewOrder])

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === "time") {
      return a.timeReceived.getTime() - b.timeReceived.getTime()
    } else {
      const complexityOrder = { high: 3, medium: 2, low: 1 }
      return complexityOrder[b.complexity] - complexityOrder[a.complexity]
    }
  })

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const order = orders.find((o) => o.id === orderId)
    if (!order) return

    const backendStatusMap: Record<string, string> = {
      "in-progress": "PREPARING",
      ready: "READY",
    }
    const backendStatus = backendStatusMap[newStatus]
    if (!backendStatus) return

    try {
      await orderService.updateStatus(order.backendId, backendStatus)
      refetch()
    } catch {
      // Error handled by apiClient
    }
  }

  const handleVoiceOrderAction = (orderId: string, action: string) => {
    const order = orders.find((o) => o.id === orderId)
    if (!order) return

    if (action === "start" && orders.length > 0) {
      const firstPendingOrder = orders.find((order) => order.status === "pending")
      if (firstPendingOrder) {
        updateOrderStatus(firstPendingOrder.id, "in-progress")
      }
    } else if (action === "ready" && orders.length > 0) {
      const firstInProgressOrder = orders.find((order) => order.status === "in-progress")
      if (firstInProgressOrder) {
        updateOrderStatus(firstInProgressOrder.id, "ready")
      }
    }
  }

  const handleVoiceNavigation = (path: string) => {
    router.push(path)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="w-16 h-16 mx-auto text-muted-foreground mb-4 animate-bounce" />
          <p className="text-lg text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <VoiceControlPanel onOrderAction={handleVoiceOrderAction} onNavigate={handleVoiceNavigation} />

      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 leading-tight">
              {t.kitchenDashboard}
            </h1>
            <div className="flex justify-end">
              <NotificationCenter />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="flex items-center gap-2 text-amber-400 bg-card/50 rounded-lg p-3 backdrop-blur-sm">
              <Clock className="w-5 h-5 flex-shrink-0" />
              <span className="text-base sm:text-lg font-medium">
                {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-green-400 bg-card/50 rounded-lg p-3 backdrop-blur-sm">
              <ChefHat className="w-5 h-5 flex-shrink-0" />
              <span className="text-base sm:text-lg font-medium">
                {orders.filter((o) => o.status === "in-progress").length} Active Orders
              </span>
            </div>
            <div className="flex items-center gap-2 text-blue-400 bg-card/50 rounded-lg p-3 backdrop-blur-sm">
              <Users className="w-5 h-5 flex-shrink-0" />
              <span className="text-base sm:text-lg font-medium">{orders.length} Total Orders</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <Button
            data-sort="time"
            variant={sortBy === "time" ? "default" : "outline"}
            onClick={() => setSortBy("time")}
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 min-h-[44px]"
          >
            {t.sortByTime}
          </Button>
          <Button
            data-sort="complexity"
            variant={sortBy === "complexity" ? "default" : "outline"}
            onClick={() => setSortBy("complexity")}
            className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 min-h-[44px]"
          >
            {t.sortByComplexity}
          </Button>
        </div>

        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedOrders.map((order) => (
            <OrderCard key={order.id} order={order} onStatusUpdate={updateOrderStatus} />
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <ChefHat className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4 animate-bounce" />
            <h3 className="text-lg sm:text-xl font-semibold text-muted-foreground mb-2">No Active Orders</h3>
            <p className="text-muted-foreground">Kitchen is all caught up!</p>
          </div>
        )}
      </div>
    </div>
  )
}
