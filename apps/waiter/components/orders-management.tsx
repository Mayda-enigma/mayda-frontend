"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, ChefHat, CheckCircle, AlertTriangle, Plus, Filter, Search, Users, Utensils, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"

type OrderStatus = "pending" | "preparing" | "ready" | "served" | "cancelled"
type OrderPriority = "low" | "medium" | "high"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  notes?: string
  isVegetarian?: boolean
}

interface Order {
  id: string
  orderNumber: string
  tableNumber: string
  customerName?: string
  items: OrderItem[]
  status: OrderStatus
  priority: OrderPriority
  totalAmount: number
  createdAt: Date
  estimatedTime: number // in minutes
  specialRequests?: string
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    tableNumber: "T03",
    customerName: "John Smith",
    items: [
      { id: "1", name: "Grilled Salmon", quantity: 1, price: 24.99 },
      { id: "2", name: "Caesar Salad", quantity: 1, price: 12.99, isVegetarian: true },
    ],
    status: "preparing",
    priority: "medium",
    totalAmount: 37.98,
    createdAt: new Date(Date.now() - 900000), // 15 minutes ago
    estimatedTime: 25,
    specialRequests: "No croutons in salad",
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    tableNumber: "T07",
    items: [
      { id: "3", name: "Beef Burger", quantity: 2, price: 18.99 },
      { id: "4", name: "French Fries", quantity: 2, price: 8.99 },
    ],
    status: "ready",
    priority: "high",
    totalAmount: 55.96,
    createdAt: new Date(Date.now() - 1800000), // 30 minutes ago
    estimatedTime: 20,
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    tableNumber: "T12",
    customerName: "Sarah Johnson",
    items: [
      { id: "5", name: "Vegetarian Pizza", quantity: 1, price: 16.99, isVegetarian: true },
      { id: "6", name: "Garden Salad", quantity: 1, price: 10.99, isVegetarian: true },
    ],
    status: "pending",
    priority: "low",
    totalAmount: 27.98,
    createdAt: new Date(Date.now() - 300000), // 5 minutes ago
    estimatedTime: 30,
  },
]

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400",
    icon: Clock,
  },
  preparing: {
    label: "Preparing",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    icon: ChefHat,
  },
  ready: {
    label: "Ready",
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    icon: CheckCircle,
  },
  served: {
    label: "Served",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
    icon: CheckCircle,
  },
  cancelled: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400",
    icon: AlertTriangle,
  },
}

export function OrdersManagement() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [filterStatus, setFilterStatus] = useState<OrderStatus | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false)

  const filteredOrders = useMemo(() => {
    let filtered = orders

    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus)
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customerName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.items.some((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    return filtered.sort((a, b) => {
      // Sort by priority first, then by creation time
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[b.priority] - priorityOrder[a.priority]
      }
      return b.createdAt.getTime() - a.createdAt.getTime()
    })
  }, [orders, filterStatus, searchQuery])

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
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

  const getStatusActions = (order: Order) => {
    switch (order.status) {
      case "pending":
        return [
          { label: "Start Preparing", status: "preparing" as OrderStatus, variant: "default" },
          { label: "Cancel", status: "cancelled" as OrderStatus, variant: "destructive" },
        ]
      case "preparing":
        return [
          { label: "Mark Ready", status: "ready" as OrderStatus, variant: "default" },
          { label: "Cancel", status: "cancelled" as OrderStatus, variant: "destructive" },
        ]
      case "ready":
        return [{ label: "Mark Served", status: "served" as OrderStatus, variant: "default" }]
      default:
        return []
    }
  }

  return (
    <div className="p-2 sm:p-3 space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-heading text-foreground">Orders</h2>
          <p className="text-sm text-muted-foreground">
            {filteredOrders.filter((o) => o.status === "ready").length} ready •{" "}
            {filteredOrders.filter((o) => o.status === "preparing").length} preparing
          </p>
        </div>

        <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-gradient-primary hover:bg-gradient-primary-dark text-white h-9 px-3 text-sm"
            >
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
              Add Order
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-heading">Add Manual Order</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Table Number</label>
                <Input placeholder="T01" className="text-sm h-9" />
              </div>
              <div>
                <label className="text-sm font-medium">Customer Name (Optional)</label>
                <Input placeholder="John Doe" className="text-sm h-9" />
              </div>
              <div>
                <label className="text-sm font-medium">Order Items</label>
                <Textarea placeholder="List items here..." className="text-sm min-h-20" />
              </div>
              <div>
                <label className="text-sm font-medium">Special Requests</label>
                <Textarea placeholder="Any special requests..." className="text-sm min-h-16" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddOrderOpen(false)} className="flex-1 text-sm h-9">
                  Cancel
                </Button>
                <Button
                  onClick={() => setIsAddOrderOpen(false)}
                  className="flex-1 bg-gradient-primary hover:bg-gradient-primary-dark text-white text-sm h-9"
                >
                  Add Order
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders, tables, or items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-sm h-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 bg-transparent text-sm h-9 px-3">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              {filterStatus === "all" ? "All Orders" : statusConfig[filterStatus].label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-sm">
            <DropdownMenuItem onClick={() => setFilterStatus("all")} className="text-sm py-2">
              All Orders
            </DropdownMenuItem>
            {Object.entries(statusConfig).map(([status, config]) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setFilterStatus(status as OrderStatus)}
                className="text-sm py-2"
              >
                <config.icon className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                {config.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Orders List */}
      <div className="space-y-2 sm:space-y-3">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <ChefHat className="h-8 w-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">No orders found</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => {
            const config = statusConfig[order.status]
            const StatusIcon = config.icon
            const actions = getStatusActions(order)

            return (
              <Card
                key={order.id}
                className={cn(
                  "transition-all duration-200 hover:shadow-lg",
                  order.priority === "high" && order.status !== "served" && "ring-1 ring-amber-400/30",
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-heading">{order.orderNumber}</h3>
                      <Badge variant="outline" className="text-xs">
                        {order.tableNumber}
                      </Badge>
                      {order.priority === "high" && <AlertTriangle className="h-3 w-3 sm:h-4 sm:w-4 text-amber-500" />}
                    </div>
                    <Badge className={cn("text-xs", config.color)}>
                      <StatusIcon className="h-2.5 w-2.5 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                  {order.customerName && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                      <Users className="h-3 w-3" />
                      {order.customerName}
                    </p>
                  )}
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Order Items */}
                  <div className="space-y-1.5">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <span>
                            {item.quantity}x {item.name}
                          </span>
                          {item.isVegetarian && <Leaf className="h-3 w-3 text-green-600" />}
                        </div>
                        <span className="font-medium">${item.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Special Requests */}
                  {order.specialRequests && (
                    <div className="p-2 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong>Special requests:</strong> {order.specialRequests}
                      </p>
                    </div>
                  )}

                  {/* Order Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(order.createdAt)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Utensils className="h-3 w-3" />~{order.estimatedTime}min
                      </span>
                    </div>
                    <span className="font-bold text-foreground">${order.totalAmount.toFixed(2)}</span>
                  </div>

                  {/* Action Buttons */}
                  {actions.length > 0 && (
                    <div className="flex gap-2 pt-1">
                      {actions.map((action) => (
                        <Button
                          key={action.status}
                          variant={action.variant as any}
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, action.status)}
                          className={cn(
                            "flex-1 text-sm h-8",
                            action.variant === "default" &&
                              "bg-gradient-primary hover:bg-gradient-primary-dark text-white",
                          )}
                        >
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>
    </div>
  )
}
