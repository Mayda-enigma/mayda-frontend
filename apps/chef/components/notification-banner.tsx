"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, X, Bell } from "lucide-react"

interface NotificationBannerProps {
  message: string
  type: "urgent" | "info" | "warning"
  onDismiss: () => void
}

export function NotificationBanner({ message, type, onDismiss }: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "urgent":
        return "bg-red-900/90 border-red-500 text-red-100 animate-pulse"
      case "warning":
        return "bg-yellow-900/90 border-yellow-500 text-yellow-100"
      default:
        return "bg-blue-900/90 border-blue-500 text-blue-100"
    }
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="w-5 h-5" />
      case "warning":
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <Bell className="w-5 h-5" />
    }
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(onDismiss, 300)
  }

  return (
    <div
      className={`mb-4 transition-all duration-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"}`}
    >
      <Card className={`${getTypeStyles(type)} border-2`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getIcon(type)}
              <span className="font-medium text-lg">{message}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-current hover:bg-white/10">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
