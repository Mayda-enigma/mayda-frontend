"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Clock, ChefHat, Users } from "lucide-react"
import { OrderCard } from "@/components/order-card"
import { StockAlert } from "@/components/stock-alert"
import { NotificationBanner } from "@/components/notification-banner"
import { NotificationCenter } from "@/components/notification-center"
import { VoiceControlPanel } from "@/components/voice-control-panel"
import { useKitchenNotifications } from "@/components/notification-system"
import { useI18n } from "@/components/i18n-provider"

// Mock data for demonstration
const mockOrders = [
  {
    id: "ORD-001",
    tableNumber: 12,
    timeReceived: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    status: "pending",
    complexity: "high",
    dishes: [
      {
        name: "Grilled Salmon",
        notes: "Medium rare, no sauce",
        allergens: ["fish"],
        image: "/grilled-salmon-dish.jpg",
      },
      {
        name: "Caesar Salad",
        notes: "Extra croutons",
        allergens: ["gluten", "dairy"],
        image: "/caesar-salad.png",
      },
    ],
    specialRequests: "Customer has severe nut allergy",
    priority: "urgent",
  },
  {
    id: "ORD-002",
    tableNumber: 8,
    timeReceived: new Date(Date.now() - 8 * 60 * 1000), // 8 minutes ago
    status: "in-progress",
    complexity: "medium",
    dishes: [
      {
        name: "Margherita Pizza",
        notes: "Extra basil",
        allergens: ["gluten", "dairy"],
        image: "/margherita-pizza.png",
      },
      { name: "Garlic Bread", notes: "Light garlic", allergens: ["gluten"], image: "/garlic-bread.png" },
    ],
    specialRequests: "",
    priority: "normal",
  },
  {
    id: "ORD-003",
    tableNumber: 5,
    timeReceived: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
    status: "pending",
    complexity: "low",
    dishes: [{ name: "House Salad", notes: "Dressing on side", allergens: [], image: "/house-salad.jpg" }],
    specialRequests: "Vegan customer",
    priority: "normal",
  },
]

const mockStockAlerts = [
  { ingredient: "Tomatoes", currentStock: 8, threshold: 10, unit: "%", category: "vegetable" },
  { ingredient: "Salmon Fillets", currentStock: 3, threshold: 5, unit: "pieces", category: "protein" },
]

export default function ChefDashboard() {
  const [orders, setOrders] = useState(mockOrders)
  const [sortBy, setSortBy] = useState<"time" | "complexity">("time")
  const [newOrderAlert, setNewOrderAlert] = useState(false)
  const { notifyNewOrder, notifyOrderReady, notifyOrderDelayed, notifyStockLow } = useKitchenNotifications()
  const { t } = useI18n()
  const router = useRouter()

  // Simulate new order notifications
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        // Simulate various kitchen notifications
        const notificationType = Math.random()

        if (notificationType > 0.7) {
          notifyNewOrder({
            id: `ORD-${Math.floor(Math.random() * 1000)}`,
            tableNumber: Math.floor(Math.random() * 20) + 1,
            priority: Math.random() > 0.7 ? "urgent" : "normal",
          })
        } else if (notificationType > 0.5) {
          notifyStockLow("Tomatoes", 8, 20)
        } else if (notificationType > 0.3) {
          notifyOrderDelayed({
            id: "ORD-001",
            tableNumber: 12,
            delay: 5,
          })
        }
      }
    }, 15000)

    return () => clearInterval(interval)
  }, [notifyNewOrder, notifyStockLow, notifyOrderDelayed])

  const sortedOrders = [...orders].sort((a, b) => {
    if (sortBy === "time") {
      return a.timeReceived.getTime() - b.timeReceived.getTime()
    } else {
      const complexityOrder = { high: 3, medium: 2, low: 1 }
      return complexityOrder[b.complexity] - complexityOrder[a.complexity]
    }
  })

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const handleVoiceOrderAction = (orderId: string, action: string) => {
    if (action === "start" && orders.length > 0) {
      const firstPendingOrder = orders.find((order) => order.status === "pending")
      if (firstPendingOrder) {
        updateOrderStatus(firstPendingOrder.id, "in-progress")
      }
    } else if (action === "ready" && orders.length > 0) {
      const firstInProgressOrder = orders.find((order) => order.status === "in-progress")
      if (firstInProgressOrder) {
        updateOrderStatus(firstInProgressOrder.id, "completed")
      }
    }
  }

  const handleVoiceNavigation = (path: string) => {
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Voice Control Panel */}
      <VoiceControlPanel onOrderAction={handleVoiceOrderAction} onNavigate={handleVoiceNavigation} />

      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
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

        {/* Stock Alerts */}
        {mockStockAlerts.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-lg sm:text-xl font-semibold text-amber-400">Stock Alerts</h2>
            <div className="grid gap-2 sm:gap-3">
              {mockStockAlerts.map((alert, index) => (
                <StockAlert key={index} alert={alert} />
              ))}
            </div>
          </div>
        )}

        {/* New Order Notification */}
        {newOrderAlert && (
          <NotificationBanner
            message="New urgent order received - Table 15"
            type="urgent"
            onDismiss={() => setNewOrderAlert(false)}
          />
        )}

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

        {/* Empty State */}
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
