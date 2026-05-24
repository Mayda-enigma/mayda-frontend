"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { useNotifications, useMarkNotificationRead, useMarkAllNotificationsRead } from "@/features/notifications"
import { Bell, X, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import { cn } from "@/shared/utils"

export interface Notification {
  id: number
  type: string
  title: string
  body: string
  isRead: boolean
  createdAt: string
}

interface NotificationSystemProps {
  onNotificationUpdate?: (notifications: Notification[]) => void
}

export function NotificationSystem({ onNotificationUpdate }: NotificationSystemProps) {
  const { data: notifications = [] } = useNotifications()
  const markRead = useMarkNotificationRead()
  const markAllRead = useMarkAllNotificationsRead()
  const [isVisible, setIsVisible] = useState(false)
  const [floatingNotifications, setFloatingNotifications] = useState<Notification[]>([])

  useEffect(() => {
    onNotificationUpdate?.(notifications)
  }, [notifications, onNotificationUpdate])

  useEffect(() => {
    const unread = notifications.filter((n) => !n.isRead && n.type === "urgent")
    if (unread.length > 0) {
      const latest = unread[0]
      setFloatingNotifications((prev) => {
        if (prev.some((n) => n.id === latest.id)) return prev
        return [latest, ...prev]
      })
      setTimeout(() => {
        setFloatingNotifications((prev) => prev.filter((n) => n.id !== latest.id))
      }, 5000)
    }
  }, [notifications])

  const acknowledgeNotification = useCallback(
    (id: number) => {
      markRead.mutate(id)
      setFloatingNotifications((prev) => prev.filter((n) => n.id !== id))
    },
    [markRead],
  )

  const dismissNotification = useCallback((id: number) => {
    setFloatingNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const acknowledgeAll = useCallback(() => {
    markAllRead.mutate()
  }, [markAllRead])

  const unacknowledgedCount = notifications.filter((n) => !n.isRead).length
  const urgentCount = notifications.filter((n) => !n.isRead && n.type === "urgent").length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order_ready":
      case "ready":
        return CheckCircle
      case "urgent":
        return AlertTriangle
      case "assistance":
        return Bell
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "order_ready":
      case "ready":
        return "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20"
      case "urgent":
        return "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20"
      case "assistance":
        return "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/20"
      default:
        return "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-950/20"
    }
  }

  const formatTime = (dateStr: string) => {
    const now = new Date()
    const date = new Date(dateStr)
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    const diffHours = Math.floor(diffMins / 60)
    return `${diffHours}h ${diffMins % 60}m ago`
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(!isVisible)}
        className="relative h-7 w-7 p-0 sm:h-8 sm:w-8"
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

      {isVisible && (
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setIsVisible(false)}>
          <div
            className="fixed top-10 sm:top-12 right-1 left-1 sm:right-2 sm:left-auto sm:w-80 max-h-[70vh] bg-background border border-border rounded-lg shadow-lg overflow-hidden animate-slide-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-2 sm:p-3 border-b border-border">
              <div>
                <h3 className="text-xs sm:text-sm font-semibold">Notifications</h3>
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
                          "transition-all duration-200",
                          getNotificationColor(notification.type),
                          notification.isRead && "opacity-60",
                        )}
                      >
                        <CardContent className="p-2">
                          <div className="flex items-start gap-2">
                            <Icon className="h-3 w-3 mt-0.5 flex-shrink-0 text-muted-foreground" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-1">
                                <h4 className="text-xs font-medium truncate">{notification.title}</h4>
                                {notification.type === "urgent" && (
                                  <Badge className="text-xs h-3.5 px-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400">
                                    Urgent
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground mb-1.5 line-clamp-2">{notification.body}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-2.5 w-2.5" />
                                  <span>{formatTime(notification.createdAt)}</span>
                                </div>
                                <div className="flex gap-1">
                                  {!notification.isRead && (
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

      {floatingNotifications.slice(0, 1).map((notification) => {
        const Icon = getNotificationIcon(notification.type)
        return (
          <div
            key={`floating-${notification.id}`}
            className="fixed top-10 sm:top-12 left-1 right-1 sm:left-2 sm:right-2 z-40 animate-slide-in-up"
          >
            <Card className="border-success/30 bg-success/5/90 dark:bg-success/5/30 dark:border-success/80 shadow-lg backdrop-blur-sm">
              <CardContent className="p-2">
                <div className="flex items-center gap-2">
                  <Icon className="h-3 w-3 text-success dark:text-success flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-success/90 dark:text-success/10 truncate">
                      {notification.title}
                    </h4>
                    <p className="text-xs text-success/70 dark:text-success/20 line-clamp-1">{notification.body}</p>
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
