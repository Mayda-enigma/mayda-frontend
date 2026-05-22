"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, X, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Notification {
  id: string
  type: "order_ready" | "urgent" | "assistance" | "info"
  title: string
  message: string
  tableNumber?: string
  orderNumber?: string
  timestamp: Date
  acknowledged: boolean
  priority: "low" | "medium" | "high"
}

interface NotificationSystemProps {
  onNotificationUpdate?: (notifications: Notification[]) => void
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "order_ready",
    title: "Order Ready",
    message: "Order #25 is ready for pickup",
    tableNumber: "T03",
    orderNumber: "ORD-025",
    timestamp: new Date(Date.now() - 30000),
    acknowledged: false,
    priority: "high",
  },
  {
    id: "2",
    type: "urgent",
    title: "Urgent Order",
    message: "Table 7 has been waiting for 45 minutes",
    tableNumber: "T07",
    timestamp: new Date(Date.now() - 120000),
    acknowledged: false,
    priority: "high",
  },
  {
    id: "3",
    type: "assistance",
    title: "Assistance Needed",
    message: "Table 12 requested assistance",
    tableNumber: "T12",
    timestamp: new Date(Date.now() - 300000),
    acknowledged: false,
    priority: "medium",
  },
]

export function NotificationSystem({ onNotificationUpdate }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [isVisible, setIsVisible] = useState(false)
  const [floatingNotifications, setFloatingNotifications] = useState<Notification[]>([])

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications
      if (Math.random() > 0.7) {
        const newNotification: Notification = {
          id: Date.now().toString(),
          type: Math.random() > 0.5 ? "order_ready" : "urgent",
          title: Math.random() > 0.5 ? "Order Ready" : "Urgent Order",
          message:
            Math.random() > 0.5
              ? `Order #${Math.floor(Math.random() * 100)} is ready for pickup`
              : `Table ${Math.floor(Math.random() * 20 + 1)} needs immediate attention`,
          tableNumber: `T${String(Math.floor(Math.random() * 20 + 1)).padStart(2, "0")}`,
          orderNumber: `ORD-${String(Math.floor(Math.random() * 100)).padStart(3, "0")}`,
          timestamp: new Date(),
          acknowledged: false,
          priority: Math.random() > 0.3 ? "high" : "medium",
        }

        setNotifications((prev) => [newNotification, ...prev])

        if (newNotification.priority === "high") {
          setFloatingNotifications((prev) => [newNotification, ...prev])

          setTimeout(() => {
            setFloatingNotifications((prev) => prev.filter((n) => n.id !== newNotification.id))
          }, 2000)
        }

        // Trigger vibration for high priority notifications
        if (newNotification.priority === "high" && "navigator" in window && navigator.vibrate) {
          navigator.vibrate([200, 100, 200])
        }

        // Play notification sound (if available)
        try {
          const audio = new Audio("/notification.mp3")
          audio.volume = 0.3
          audio.play().catch(() => {
            // Ignore audio play errors
          })
        } catch (error) {
          // Ignore audio errors
        }
      }
    }, 10000) // Check every 10 seconds

    return () => clearInterval(interval)
  }, [])

  // Update parent component when notifications change
  useEffect(() => {
    onNotificationUpdate?.(notifications)
  }, [notifications, onNotificationUpdate])

  const acknowledgeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, acknowledged: true } : notif)))
    setFloatingNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }, [])

  const acknowledgeAll = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, acknowledged: true })))
  }, [])

  const unacknowledgedCount = notifications.filter((n) => !n.acknowledged).length
  const urgentCount = notifications.filter((n) => !n.acknowledged && n.priority === "high").length

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order_ready":
        return CheckCircle
      case "urgent":
        return AlertTriangle
      case "assistance":
        return Bell
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: Notification["type"], priority: Notification["priority"]) => {
    if (priority === "high") {
      return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
    }
    switch (type) {
      case "order_ready":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
      case "urgent":
        return "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20"
      case "assistance":
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
      default:
        return "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/20"
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    return `${diffHours}h ${diffMins % 60}m ago`
  }

  return (
    <>
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(!isVisible)}
        className="relative h-7 w-7 p-0 sm:h-8 sm:w-8 hover-lift"
        aria-label={`${unacknowledgedCount} notifications`}
      >
        <Bell className="h-3 w-3" />
        {unacknowledgedCount > 0 && (
          <span
            className={cn(
              "absolute -top-1 -right-1 text-white text-xs rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 flex items-center justify-center",
              urgentCount > 0 ? "bg-red-500 animate-pulse-urgent" : "bg-primary",
            )}
          >
            {unacknowledgedCount > 9 ? "9+" : unacknowledgedCount}
          </span>
        )}
      </Button>

      {/* Notification Panel */}
      {isVisible && (
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setIsVisible(false)}>
          <div
            className="fixed top-10 sm:top-12 right-1 left-1 sm:right-2 sm:left-auto sm:w-80 max-h-[70vh] bg-background border border-border rounded-lg shadow-lg overflow-hidden animate-slide-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-2 sm:p-3 border-b border-border">
              <div>
                <h3 className="text-xs sm:text-sm font-heading">Notifications</h3>
                <p className="text-xs text-muted-foreground">
                  {unacknowledgedCount} unread {urgentCount > 0 && `• ${urgentCount} urgent`}
                </p>
              </div>
              <div className="flex items-center gap-1">
                {unacknowledgedCount > 0 && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={acknowledgeAll}
                    className="text-xs h-6 px-2 bg-transparent"
                  >
                    Mark All Read
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => setIsVisible(false)} className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-60 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  <Bell className="h-6 w-6 mx-auto mb-2 opacity-50" />
                  <p className="text-xs">No notifications</p>
                </div>
              ) : (
                <div className="p-1.5 sm:p-2 space-y-1.5">
                  {notifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type)
                    return (
                      <Card
                        key={notification.id}
                        className={cn(
                          "transition-all duration-200 hover-lift",
                          getNotificationColor(notification.type, notification.priority),
                          notification.acknowledged && "opacity-60",
                        )}
                      >
                        {/* Card Content */}
                        <CardContent className="p-2">
                          <div className="flex items-start gap-2">
                            <Icon
                              className={cn(
                                "h-3 w-3 mt-0.5 flex-shrink-0",
                                notification.priority === "high" ? "text-red-600" : "text-muted-foreground",
                              )}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-1">
                                <h4 className="text-xs font-medium truncate">{notification.title}</h4>
                                {notification.tableNumber && (
                                  <Badge variant="outline" className="text-xs h-3.5 px-1">
                                    {notification.tableNumber}
                                  </Badge>
                                )}
                                {notification.priority === "high" && (
                                  <Badge className="text-xs h-3.5 px-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                    Urgent
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mb-1.5 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-2.5 w-2.5" />
                                  <span>{formatTime(notification.timestamp)}</span>
                                </div>
                                <div className="flex gap-1">
                                  {!notification.acknowledged && (
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => acknowledgeNotification(notification.id)}
                                      className="h-5 px-1.5 text-xs"
                                    >
                                      Read
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => dismissNotification(notification.id)}
                                    className="h-5 w-5 p-0"
                                  >
                                    <X className="h-2.5 w-2.5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Floating Notification */}
      {floatingNotifications.slice(0, 1).map((notification) => {
        const Icon = getNotificationIcon(notification.type)
        return (
          <div
            key={`floating-${notification.id}`}
            className="fixed top-10 sm:top-12 left-1 right-1 sm:left-2 sm:right-2 z-40 animate-slide-in-up"
          >
            <Card className="border-orange-300 bg-orange-50/90 dark:bg-orange-950/30 dark:border-orange-800 shadow-lg backdrop-blur-sm">
              <CardContent className="p-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-3 w-3 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-heading text-orange-900 dark:text-orange-100 truncate">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-orange-700 dark:text-orange-200 line-clamp-1">{notification.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )
      })}
    </>
  )
}
