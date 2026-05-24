"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Clock, Play, CheckCircle, Utensils } from "lucide-react"

interface Order {
  id: string
  timeReceived: Date
  status: string
  estimatedCompletion?: Date
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
      time: order.estimatedCompletion ?? new Date(Date.now() + 15 * 60 * 1000),
      title: "Ready for Service",
      description: "Order completed and ready",
      icon: <CheckCircle className="w-4 h-4" />,
      completed: order.status === "ready",
    },
    {
      time: order.estimatedCompletion
        ? new Date(order.estimatedCompletion.getTime() + 2 * 60 * 1000)
        : new Date(Date.now() + 17 * 60 * 1000),
      title: "Served",
      description: "Delivered to customer",
      icon: <Utensils className="w-4 h-4" />,
      completed: false,
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">Order Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <div key={index} className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  event.completed
                    ? "bg-success text-white"
                    : index === timelineEvents.findIndex((e) => !e.completed)
                      ? "bg-accent-blue text-white"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {event.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-medium ${event.completed ? "text-success" : "text-foreground"}`}>
                  {event.title}
                </div>
                <div className="text-sm text-muted-foreground mb-1">{event.description}</div>
                <div className="text-xs text-muted-foreground tabular-nums">
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
