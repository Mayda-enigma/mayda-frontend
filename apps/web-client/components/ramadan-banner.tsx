"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Star, Clock, X } from "lucide-react"

interface RamadanBannerProps {
  onPreOrder?: () => void
}

export function RamadanBanner({ onPreOrder }: RamadanBannerProps) {
  const [isRamadan, setIsRamadan] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [iftarTime, setIftarTime] = useState("19:30")

  useEffect(() => {
    // Simulate Ramadan detection (in real app, would check Islamic calendar)
    const now = new Date()
    const month = now.getMonth()
    // Simulate Ramadan period (this would be dynamic in real app)
    setIsRamadan(month === 2 || month === 3) // March/April as example
  }, [])

  if (!isRamadan || isDismissed) return null

  return (
    <Card className="overflow-hidden border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <Moon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 flex items-center gap-1">
                Ramadan Mubarak
                <Star className="w-3 h-3 text-yellow-500" />
              </h3>
              <p className="text-sm text-blue-700">Special Iftar menu available</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto text-blue-600 hover:text-blue-800"
            onClick={() => setIsDismissed(true)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="bg-white/70 rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Today's Iftar</span>
            </div>
            <Badge variant="outline" className="text-blue-700 border-blue-300">
              {iftarTime}
            </Badge>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90"
            onClick={onPreOrder}
          >
            Pre-order Iftar Menu
          </Button>
          <Button variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
            View Halal Options
          </Button>
        </div>

        <p className="text-xs text-blue-600 text-center mt-2">
          <Star className="w-3 h-3 inline mr-1" />
          Special pricing and timing for Iftar meals
        </p>
      </CardContent>
    </Card>
  )
}
