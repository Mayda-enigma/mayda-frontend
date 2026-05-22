"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Play, CheckCircle, Utensils } from "lucide-react"

interface Order {
  id: string
  timeReceived: Date
  status: string
  estimatedCompletion: Date
}

interface OrderTimelineProps {
  order: Order
}

export function OrderTimeline({ order }: OrderTimelineProps) {
  const timelineEvents = [
    {
      time: order.timeReceived,
      title: "Order Received",
      description: "Order placed by customer",
      icon: <Clock className="w-4 h-4" />,
      completed: true,
    },
    {
      time: new Date(order.timeReceived.getTime() + 2 * 60 * 1000),
      title: "Preparation Started",
      description: "Kitchen began preparation",
      icon: <Play className="w-4 h-4" />,
      completed: order.status !== "pending",
    },
    {
      time: order.estimatedCompletion,
      title: "Ready for Service",
      description: "Order completed and ready",
      icon: <CheckCircle className="w-4 h-4" />,
      completed: order.status === "ready",
    },
    {
      time: new Date(order.estimatedCompletion.getTime() + 2 * 60 * 1000),
      title: "Served",
      description: "Delivered to customer",
      icon: <Utensils className="w-4 h-4" />,
      completed: false,
    },
  ]

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Order Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  event.completed
                    ? "bg-green-500 text-white"
                    : index === timelineEvents.findIndex((e) => !e.completed)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-600 text-gray-300"
                }`}
              >
                {event.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${event.completed ? "text-green-400" : "text-gray-300"}`}>
                  {event.title}
                </div>
                <div className="text-sm text-gray-400 mb-1">{event.description}</div>
                <div className="text-xs text-gray-500">
                  {event.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
