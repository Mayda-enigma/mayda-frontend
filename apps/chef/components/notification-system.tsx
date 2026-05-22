"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react"

interface Notification {
  id: string
  type: "urgent" | "warning" | "info" | "success"
  title: string
  message: string
  timestamp: Date
  duration?: number // Auto-dismiss after this many ms
  persistent?: boolean // Don't auto-dismiss
  actions?: Array<{
    label: string
    action: () => void
    variant?: "default" | "destructive" | "outline"
  }>
}

interface NotificationContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => void
  removeNotification: (id: string) => void
  clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, "id" | "timestamp">) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }

    setNotifications((prev) => [newNotification, ...prev])

    // Auto-dismiss if duration is set and not persistent
    if (notification.duration && !notification.persistent) {
      setTimeout(() => {
        removeNotification(newNotification.id)
      }, notification.duration)
    }
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearAll }}>
      {children}
      <NotificationContainer />
    </NotificationContext.Provider>
  )
}

export function useNotifications() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider")
  }
  return context
}

function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications()

  if (notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onDismiss={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  )
}

function NotificationCard({
  notification,
  onDismiss,
}: {
  notification: Notification
  onDismiss: () => void
}) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "urgent":
        return "bg-orange-50 dark:bg-orange-900/95 border-orange-500 text-orange-900 dark:text-orange-100 animate-pulse shadow-orange-500/20"
      case "warning":
        return "bg-amber-50 dark:bg-amber-900/95 border-amber-500 text-amber-900 dark:text-amber-100 shadow-amber-500/20"
      case "success":
        return "bg-emerald-50 dark:bg-emerald-900/95 border-emerald-500 text-emerald-900 dark:text-emerald-100 shadow-emerald-500/20"
      default:
        return "bg-blue-50 dark:bg-blue-900/95 border-blue-500 text-blue-900 dark:text-blue-100 shadow-blue-500/20"
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="w-5 h-5" />
      case "warning":
        return <AlertTriangle className="w-5 h-5" />
      case "success":
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(onDismiss, 300)
  }

  return (
    <div
      className={`transition-all duration-300 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"
      }`}
    >
      <Card className={`${getTypeStyles(notification.type)} border-2 shadow-lg backdrop-blur-sm`}>
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">{getIcon(notification.type)}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-lg mb-1">{notification.title}</div>
              <div className="text-sm opacity-90 mb-2">{notification.message}</div>
              <div className="flex items-center gap-2 text-xs opacity-75">
                <Clock className="w-3 h-3" />
                <span>{notification.timestamp.toLocaleTimeString()}</span>
              </div>
              {notification.actions && (
                <div className="flex gap-2 mt-3">
                  {notification.actions.map((action, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant={action.variant || "default"}
                      onClick={() => {
                        action.action()
                        handleDismiss()
                      }}
                      className="text-xs"
                    >
                      {action.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="text-current hover:bg-white/10 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Kitchen-specific notification hooks
export function useKitchenNotifications() {
  const { addNotification } = useNotifications()

  const notifyNewOrder = (orderData: { id: string; tableNumber: number; priority: string }) => {
    addNotification({
      type: orderData.priority === "urgent" ? "urgent" : "info",
      title: "New Order Received",
      message: `Order ${orderData.id} for Table ${orderData.tableNumber}`,
      persistent: orderData.priority === "urgent",
      duration: orderData.priority === "urgent" ? undefined : 8000,
      actions: [
        {
          label: "View Order",
          action: () => {
            // Navigate to order detail
            window.location.href = `/order/${orderData.id}`
          },
        },
        {
          label: "Acknowledge",
          action: () => {
            // Mark as acknowledged
          },
          variant: "outline",
        },
      ],
    })
  }

  const notifyOrderReady = (orderData: { id: string; tableNumber: number }) => {
    addNotification({
      type: "success",
      title: "Order Ready",
      message: `Order ${orderData.id} for Table ${orderData.tableNumber} is ready for service`,
      duration: 10000,
      actions: [
        {
          label: "Mark Served",
          action: () => {
            // Mark order as served
          },
        },
      ],
    })
  }

  const notifyOrderDelayed = (orderData: { id: string; tableNumber: number; delay: number }) => {
    const { delay } = orderData // Declare the delay variable
    addNotification({
      type: "warning",
      title: "Order Delayed",
      message: `Order ${orderData.id} for Table ${orderData.tableNumber} is ${delay} minutes behind schedule`,
      persistent: true,
      actions: [
        {
          label: "Update Customer",
          action: () => {
            // Send update to customer
          },
        },
        {
          label: "Prioritize",
          action: () => {
            // Mark as high priority
          },
          variant: "destructive",
        },
      ],
    })
  }

  const notifyStockLow = (ingredient: string, currentStock: number, threshold: number) => {
    addNotification({
      type: "warning",
      title: "Low Stock Alert",
      message: `${ingredient} is running low (${currentStock}/${threshold} remaining)`,
      persistent: true,
      actions: [
        {
          label: "Reorder Now",
          action: () => {
            // Trigger reorder process
          },
        },
        {
          label: "Update Menu",
          action: () => {
            // Mark items as unavailable
          },
          variant: "outline",
        },
      ],
    })
  }

  return {
    notifyNewOrder,
    notifyOrderReady,
    notifyOrderDelayed,
    notifyStockLow,
  }
}
