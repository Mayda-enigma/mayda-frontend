"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import { FeedbackModal } from "@/components/feedback-modal"
import { ThemeToggle } from "@/components/theme-toggle"
import { BurgerMenu } from "@/components/burger-menu"
import { ArrowLeft, Clock, ChefHat, CheckCircle, Utensils, Bell, Star, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useMyOrders } from "@/features/orders"
import type { Order } from "@/features/orders"

const orderStatusConfig = {
  placed: {
    label: "Order Placed",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    progress: 0,
  },
  confirmed: {
    label: "Chef Accepted",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
    progress: 25,
  },
  preparing: {
    label: "In Kitchen",
    icon: ChefHat,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    progress: 50,
  },
  ready: {
    label: "Ready to Serve",
    icon: Bell,
    color: "text-primary",
    bgColor: "bg-primary/10",
    progress: 90,
  },
  completed: {
    label: "Served",
    icon: Utensils,
    color: "text-restaurant-green",
    bgColor: "bg-restaurant-green/10",
    progress: 100,
  },
}

const itemStatusConfig = {
  pending: { label: "Pending", color: "bg-gray-200" },
  preparing: { label: "Cooking", color: "bg-amber-200" },
  ready: { label: "Ready", color: "bg-primary/20" },
  served: { label: "Served", color: "bg-restaurant-green/20" },
}

const getElapsedMinutes = (placedAt: Date): number =>
  Math.floor((Date.now() - placedAt.getTime()) / (1000 * 60))

const getRemainingMinutes = (order: Order): number =>
  Math.max(0, order.estimatedMinutes - getElapsedMinutes(order.placedAt))

function OrderCard({ order, onFeedback }: { order: Order; onFeedback: (id: string) => void }) {
  const statusConfig = orderStatusConfig[order.status]
  const StatusIcon = statusConfig.icon
  const elapsed = getElapsedMinutes(order.placedAt)
  const remaining = getRemainingMinutes(order)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-3 sm:p-4 border-b border-border">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 ${statusConfig.bgColor} rounded-full flex items-center justify-center`}
              >
                <StatusIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${statusConfig.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Order #{order.id}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Placed {elapsed} minutes ago &middot; ${order.total.toFixed(2)}
                </p>
              </div>
            </div>
            <Badge variant="outline" className={`${statusConfig.color} border-current text-xs sm:text-sm`}>
              {statusConfig.label}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className={statusConfig.color}>
                {order.status === "completed"
                  ? `Served in ${order.actualMinutes} min`
                  : remaining > 0
                    ? `${remaining} min remaining`
                    : "Almost ready!"}
              </span>
            </div>
            <Progress value={statusConfig.progress} className="h-2" />
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <h4 className="font-medium mb-2 sm:mb-3 text-sm sm:text-base">Items ({order.items.length})</h4>
          <div className="space-y-2 sm:space-y-3">
            {order.items.map((item) => {
              const itemConfig = itemStatusConfig[item.status]
              return (
                <div key={`${order.id}-${item.id}`} className="flex items-center gap-2 sm:gap-3">
                  <div className="relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md"
                    />
                    <div
                      className={`absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 ${itemConfig.color} rounded-full border-2 border-background`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs sm:text-sm leading-tight">{item.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">Qty: {item.quantity}</span>
                      <Badge variant="outline" className="text-xs h-4 sm:h-5">
                        {itemConfig.label}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-xs sm:text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="px-3 sm:px-4 pb-3 sm:pb-4">
          <div className="flex items-center justify-between text-xs">
            <div className="flex flex-col items-center">
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mb-1 ${
                  statusConfig.progress >= 0 ? "bg-restaurant-green text-white" : "bg-gray-200"
                }`}
              >
                <Clock className="w-2 h-2 sm:w-3 sm:h-3" />
              </div>
              <span>Placed</span>
            </div>
            <div className="flex-1 h-px bg-gray-200 mx-1 sm:mx-2 relative">
              <div
                className="h-full bg-restaurant-green transition-all duration-500"
                style={{ width: `${Math.min(statusConfig.progress, 100)}%` }}
              />
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mb-1 ${
                  statusConfig.progress >= 25 ? "bg-restaurant-green text-white" : "bg-gray-200"
                }`}
              >
                <CheckCircle className="w-2 h-2 sm:w-3 sm:h-3" />
              </div>
              <span>Confirmed</span>
            </div>
            <div className="flex-1 h-px bg-gray-200 mx-1 sm:mx-2 relative">
              <div
                className="h-full bg-restaurant-green transition-all duration-500"
                style={{ width: `${Math.max(0, Math.min(statusConfig.progress - 25, 75)) * (100 / 75)}%` }}
              />
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mb-1 ${
                  statusConfig.progress >= 50 ? "bg-restaurant-green text-white" : "bg-gray-200"
                }`}
              >
                <ChefHat className="w-2 h-2 sm:w-3 sm:h-3" />
              </div>
              <span>Cooking</span>
            </div>
            <div className="flex-1 h-px bg-gray-200 mx-1 sm:mx-2 relative">
              <div
                className="h-full bg-restaurant-green transition-all duration-500"
                style={{ width: `${Math.max(0, Math.min(statusConfig.progress - 50, 50)) * (100 / 50)}%` }}
              />
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center mb-1 ${
                  statusConfig.progress >= 100 ? "bg-restaurant-green text-white" : "bg-gray-200"
                }`}
              >
                <Utensils className="w-2 h-2 sm:w-3 sm:h-3" />
              </div>
              <span>Ready</span>
            </div>
          </div>
        </div>

        {order.status === "ready" && (
          <div className="bg-primary/10 border-t border-primary/20 p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center animate-pulse">
                <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-primary text-sm sm:text-base">Your order is ready!</p>
                <p className="text-xs sm:text-sm text-muted-foreground">Please let your server know</p>
              </div>
            </div>
          </div>
        )}

        {order.status === "completed" && !order.hasReview && (
          <div className="bg-amber-50 border-t border-amber-200 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-amber-500 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <div>
                  <p className="font-medium text-amber-800 text-sm sm:text-base">How was your experience?</p>
                  <p className="text-xs sm:text-sm text-amber-700">Your feedback helps us improve</p>
                </div>
              </div>
              <Button
                size="sm"
                className="bg-amber-600 text-white hover:bg-amber-700 text-xs sm:text-sm"
                onClick={() => onFeedback(order.id)}
              >
                <Star className="w-3 h-3 mr-1" />
                Rate
              </Button>
            </div>
          </div>
        )}

        {order.status === "completed" && order.hasReview && (
          <div className="bg-restaurant-green/10 border-t border-restaurant-green/20 p-3 sm:p-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-restaurant-green rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-restaurant-green text-sm sm:text-base">
                  Thank you for your feedback!
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">We appreciate your review</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useMyOrders()
  const [feedbackOrderId, setFeedbackOrderId] = useState<string | null>(null)
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false)

  const handleFeedbackRequest = (orderId: string) => {
    setFeedbackOrderId(orderId)
    setIsFeedbackModalOpen(true)
  }

  const closeFeedbackModal = () => {
    setIsFeedbackModalOpen(false)
    setFeedbackOrderId(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <BurgerMenu currentPage="orders" />
            <Link href="/menu" className="hidden md:block">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Your Orders</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">Table 12</p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <div className="text-right">
              <p className="text-xs sm:text-sm text-muted-foreground">Live Updates</p>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-restaurant-green rounded-full animate-pulse" />
                <span className="text-xs text-restaurant-green">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-2 sm:p-3 md:p-4 space-y-3 sm:space-y-4 md:space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Failed to load orders.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <Utensils className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-base sm:text-lg">No orders yet</p>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">Start by adding some dishes to your cart</p>
            <Link href="/menu">
              <Button className="restaurant-gradient text-white">Browse Menu</Button>
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onFeedback={handleFeedbackRequest}
            />
          ))
        )}
      </div>

      <div className="h-16 sm:h-20" />

      <FeedbackModal isOpen={isFeedbackModalOpen} onClose={closeFeedbackModal} orderId={feedbackOrderId || ""} />
    </div>
  )
}
