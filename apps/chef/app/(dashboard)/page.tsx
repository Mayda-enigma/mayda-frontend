"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/shared/ui/button"
import { Clock, ChefHat, Users } from "lucide-react"
import { OrderCard } from "@/components/order-card"
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
  const { notifyNewOrder } = useKitchenNotifications()
  const { t } = useI18n()
  const router = useRouter()

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
    }
    const complexityOrder = { high: 3, medium: 2, low: 1 }
    return complexityOrder[b.complexity] - complexityOrder[a.complexity]
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
      <div className="flex items-center justify-center py-24">
        <div className="text-center">
          <ChefHat className="w-16 h-16 mx-auto text-muted-foreground mb-4 animate-mongodb-fade-in" />
          <p className="text-base text-muted-foreground">Loading orders...</p>
        </div>
      </div>
    )
  }

  const activeCount = orders.filter((o) => o.status === "in-progress").length

  return (
    <>
      <VoiceControlPanel onOrderAction={handleVoiceOrderAction} onNavigate={handleVoiceNavigation} />

      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {t.kitchenDashboard}
            </h1>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <div className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-depth-card">
            <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
            <span className="text-base font-medium tabular-nums">
              {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-depth-card">
            <ChefHat className="w-5 h-5 text-warning shrink-0" />
            <span className="text-base font-medium tabular-nums">
              {activeCount} Active
            </span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-depth-card">
            <Users className="w-5 h-5 text-muted-foreground shrink-0" />
            <span className="text-base font-medium tabular-nums">{orders.length} Total</span>
          </div>
        </div>

        {/* Sort controls */}
        <div className="flex gap-2">
          <Button
            variant={sortBy === "time" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("time")}
          >
            {t.sortByTime}
          </Button>
          <Button
            variant={sortBy === "complexity" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("complexity")}
          >
            {t.sortByComplexity}
          </Button>
        </div>

        {/* Order grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedOrders.map((order) => (
            <OrderCard key={order.id} order={order} onStatusUpdate={updateOrderStatus} />
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-muted-foreground mb-4 animate-mongodb-fade-in" />
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">No Active Orders</h3>
            <p className="text-base text-muted-foreground">Kitchen is all caught up!</p>
          </div>
        )}
      </div>
    </>
  )
}
