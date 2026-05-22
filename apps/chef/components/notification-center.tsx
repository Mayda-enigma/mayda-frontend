"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, BellOff, Trash2 } from "lucide-react"
import { useNotifications } from "./notification-system"

export function NotificationCenter() {
  const { notifications, clearAll, removeNotification } = useNotifications()
  const [isOpen, setIsOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const unreadCount = notifications.length

  const getTypeColor = (type: string) => {
    switch (type) {
      case "urgent":
        return "text-red-400"
      case "warning":
        return "text-yellow-400"
      case "success":
        return "text-green-400"
      default:
        return "text-blue-400"
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="relative border-gray-600 hover:bg-gray-800"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center">
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </Button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 z-50">
          <Card className="bg-gray-800 border-gray-700 shadow-xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className="text-gray-400 hover:text-white"
                  >
                    {soundEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAll}
                    className="text-gray-400 hover:text-white"
                    disabled={notifications.length === 0}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-400">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div>No notifications</div>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-4 border-b border-gray-700 hover:bg-gray-750 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${getTypeColor(notification.type)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-white mb-1">{notification.title}</div>
                          <div className="text-sm text-gray-300 mb-2">{notification.message}</div>
                          <div className="text-xs text-gray-500">{notification.timestamp.toLocaleTimeString()}</div>
                          {notification.actions && (
                            <div className="flex gap-2 mt-2">
                              {notification.actions.map((action, index) => (
                                <Button
                                  key={index}
                                  size="sm"
                                  variant={action.variant || "outline"}
                                  onClick={() => {
                                    action.action()
                                    removeNotification(notification.id)
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
                          onClick={() => removeNotification(notification.id)}
                          className="text-gray-400 hover:text-white flex-shrink-0"
                        >
                          ×
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
