"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, X, Gift, Star, CheckCircle } from "lucide-react"

interface Notification {
  id: string
  type: "order_update" | "discount" | "feedback_request" | "general"
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionLabel?: string
  actionCallback?: () => void
  priority: "low" | "medium" | "high"
}

interface NotificationSystemProps {
  onFeedbackRequest?: (orderId: string) => void
}

export function NotificationSystem({ onFeedbackRequest }: NotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hasVibration, setHasVibration] = useState(false)

  useEffect(() => {
    // Check for vibration support
    setHasVibration("vibrate" in navigator)

    // Simulate incoming notifications
    const mockNotifications: Notification[] = [
      {
        id: "notif-1",
        type: "order_update",
        title: "Order Ready!",
        message: "Your Grilled Mediterranean Sea Bass is ready to be served",
        timestamp: new Date(Date.now() - 2 * 60 * 1000),
        read: false,
        priority: "high",
      },
      {
        id: "notif-2",
        type: "discount",
        title: "Special Offer",
        message: "20% off desserts when you order a main course today!",
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        read: false,
        actionLabel: "View Desserts",
        actionCallback: () => {
          // Navigate to desserts category
          window.location.href = "/menu?category=desserts"
        },
        priority: "medium",
      },
      {
        id: "notif-3",
        type: "feedback_request",
        title: "How was your meal?",
        message: "We'd love to hear about your experience with Order #ORD-002",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        read: false,
        actionLabel: "Leave Review",
        actionCallback: () => onFeedbackRequest?.("ORD-002"),
        priority: "low",
      },
    ]

    setNotifications(mockNotifications)

    // Simulate real-time notifications
    const interval = setInterval(() => {
      const randomNotifications = [
        {
          id: `notif-${Date.now()}`,
          type: "order_update" as const,
          title: "Chef Update",
          message: "Your order is being prepared with extra care",
          timestamp: new Date(),
          read: false,
          priority: "medium" as const,
        },
        {
          id: `notif-${Date.now()}`,
          type: "general" as const,
          title: "Table Service",
          message: "Your server will be with you shortly",
          timestamp: new Date(),
          read: false,
          priority: "low" as const,
        },
      ]

      if (Math.random() > 0.7) {
        // 30% chance of new notification
        const newNotif = randomNotifications[Math.floor(Math.random() * randomNotifications.length)]
        setNotifications((prev) => [newNotif, ...prev.slice(0, 9)]) // Keep max 10 notifications

        // Trigger vibration for high priority notifications
        if (hasVibration && newNotif.priority === "high") {
          navigator.vibrate([200, 100, 200])
        }
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [hasVibration, onFeedbackRequest])

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order_update":
        return CheckCircle
      case "discount":
        return Gift
      case "feedback_request":
        return Star
      default:
        return Bell
    }
  }

  const getNotificationColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-200"
      default:
        return "text-blue-600 bg-blue-50 border-blue-200"
    }
  }

  return (
    <>
      {/* Notification Bell */}
      <Button
        variant="outline"
        size="sm"
        className="relative bg-transparent h-8 w-8 p-0 sm:h-9 sm:w-auto sm:px-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1.5 -right-1.5 w-4 h-4 p-0 flex items-center justify-center text-xs bg-red-500 text-white sm:-top-2 sm:-right-2 sm:w-5 sm:h-5">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/20 z-40" onClick={() => setIsOpen(false)} />

          {/* Notification Panel */}
          <div className="fixed top-14 right-2 w-72 max-h-80 bg-background border border-border rounded-lg shadow-xl z-50 overflow-hidden sm:top-16 sm:right-4 sm:w-80 sm:max-h-96">
            {/* Header */}
            <div className="flex items-center justify-between p-3 border-b border-border sm:p-4">
              <div className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <h3 className="font-semibold text-sm sm:text-base">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} new
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" className="text-xs h-auto p-1" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="p-1" onClick={() => setIsOpen(false)}>
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-64 overflow-y-auto sm:max-h-80">
              {notifications.length === 0 ? (
                <div className="p-6 text-center sm:p-8">
                  <Bell className="w-6 h-6 text-muted-foreground mx-auto mb-2 sm:w-8 sm:h-8" />
                  <p className="text-muted-foreground text-xs sm:text-sm">No notifications</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {notifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type)
                    const colorClass = getNotificationColor(notification.priority)

                    return (
                      <div
                        key={notification.id}
                        className={`p-2.5 hover:bg-muted/50 transition-colors sm:p-3 ${!notification.read ? "bg-primary/5" : ""}`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex items-start gap-2.5 sm:gap-3">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center sm:w-8 sm:h-8 ${colorClass}`}
                          >
                            <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-xs leading-tight sm:text-sm">{notification.title}</h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="p-0 h-auto text-muted-foreground hover:text-foreground"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeNotification(notification.id)
                                }}
                              >
                                <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-muted-foreground">
                                {notification.timestamp.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                              {notification.actionLabel && notification.actionCallback && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="h-5 px-1.5 text-xs bg-transparent sm:h-6 sm:px-2"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    notification.actionCallback?.()
                                    markAsRead(notification.id)
                                  }}
                                >
                                  {notification.actionLabel}
                                </Button>
                              )}
                            </div>
                            {!notification.read && (
                              <div className="w-1.5 h-1.5 bg-primary rounded-full absolute top-2.5 right-2.5 sm:w-2 sm:h-2 sm:top-3 sm:right-3"></div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  )
}
