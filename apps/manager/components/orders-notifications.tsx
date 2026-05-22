"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  Users,
  DollarSign,
  Filter,
  Search,
  Eye,
  MoreHorizontal,
  ChefHat,
  Utensils,
  Package,
  CreditCard,
  User,
  Calendar,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
} from "lucide-react"

// Mock data for orders
const orders = [
  {
    id: "ORD-001",
    customerName: "John Smith",
    table: "T-12",
    waiter: "Bob Smith",
    items: [
      { name: "Pizza Margherita", quantity: 2, price: 15.99 },
      { name: "Caesar Salad", quantity: 1, price: 12.99 },
    ],
    total: 44.97,
    status: "preparing",
    orderTime: "2024-01-20T19:15:00",
    estimatedTime: "2024-01-20T19:35:00",
    specialInstructions: "Extra cheese on pizza",
    paymentMethod: "Card",
  },
  {
    id: "ORD-002",
    customerName: "Sarah Johnson",
    table: "T-05",
    waiter: "Alice Johnson",
    items: [
      { name: "Chicken Alfredo", quantity: 1, price: 18.99 },
      { name: "Garlic Bread", quantity: 1, price: 6.99 },
    ],
    total: 25.98,
    status: "ready",
    orderTime: "2024-01-20T19:20:00",
    estimatedTime: "2024-01-20T19:40:00",
    specialInstructions: "No mushrooms",
    paymentMethod: "Cash",
  },
  {
    id: "ORD-003",
    customerName: "Mike Wilson",
    table: "T-20",
    waiter: "Carol Davis",
    items: [
      { name: "Beef Burger", quantity: 3, price: 16.99 },
      { name: "French Fries", quantity: 3, price: 4.99 },
      { name: "Soft Drinks", quantity: 3, price: 2.99 },
    ],
    total: 74.91,
    status: "served",
    orderTime: "2024-01-20T18:45:00",
    estimatedTime: "2024-01-20T19:05:00",
    specialInstructions: "Medium rare burgers",
    paymentMethod: "Card",
  },
  {
    id: "ORD-004",
    customerName: "Emily Davis",
    table: "T-08",
    waiter: "Bob Smith",
    items: [
      { name: "Vegan Buddha Bowl", quantity: 2, price: 14.99 },
      { name: "Fresh Juice", quantity: 2, price: 5.99 },
    ],
    total: 41.96,
    status: "cancelled",
    orderTime: "2024-01-20T19:00:00",
    estimatedTime: "2024-01-20T19:20:00",
    specialInstructions: "Customer left early",
    paymentMethod: "Card",
  },
  {
    id: "ORD-005",
    customerName: "David Brown",
    table: "T-25",
    waiter: "Alice Johnson",
    items: [
      { name: "Seafood Pasta", quantity: 1, price: 22.99 },
      { name: "Wine", quantity: 1, price: 8.99 },
    ],
    total: 31.98,
    status: "pending",
    orderTime: "2024-01-20T19:30:00",
    estimatedTime: "2024-01-20T19:50:00",
    specialInstructions: "Allergic to shellfish",
    paymentMethod: "Card",
  },
]

// Mock data for notifications
const notifications = [
  {
    id: 1,
    type: "order",
    title: "New Order Received",
    message: "Order ORD-005 from Table T-25 needs attention",
    timestamp: "2024-01-20T19:30:00",
    isRead: false,
    priority: "medium",
    icon: ShoppingCart,
  },
  {
    id: 2,
    type: "kitchen",
    title: "Order Ready for Pickup",
    message: "Order ORD-002 is ready to be served to Table T-05",
    timestamp: "2024-01-20T19:25:00",
    isRead: false,
    priority: "high",
    icon: ChefHat,
  },
  {
    id: 3,
    type: "staff",
    title: "Staff Schedule Update",
    message: "Bob Smith's shift has been extended until 11 PM",
    timestamp: "2024-01-20T19:20:00",
    isRead: true,
    priority: "low",
    icon: Users,
  },
  {
    id: 4,
    type: "reservation",
    title: "Reservation Cancelled",
    message: "Table T-15 reservation for 8 PM has been cancelled",
    timestamp: "2024-01-20T19:15:00",
    isRead: false,
    priority: "medium",
    icon: XCircle,
  },
  {
    id: 5,
    type: "inventory",
    title: "Low Stock Alert",
    message: "Tomatoes are running low - only 2 days remaining",
    timestamp: "2024-01-20T19:10:00",
    isRead: true,
    priority: "high",
    icon: Package,
  },
]

export function OrdersNotifications() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterTable, setFilterTable] = useState("all")
  const [filterWaiter, setFilterWaiter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const { toast } = useToast()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-black"
      case "preparing":
        return "bg-blue-500 text-white"
      case "ready":
        return "bg-green-500 text-white"
      case "served":
        return "bg-gray-500 text-white"
      case "cancelled":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-3 w-3" />
      case "preparing":
        return <ChefHat className="h-3 w-3" />
      case "ready":
        return <CheckCircle className="h-3 w-3" />
      case "served":
        return <Utensils className="h-3 w-3" />
      case "cancelled":
        return <XCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-orange-500 text-white"
      case "low":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    const matchesTable = filterTable === "all" || order.table === filterTable
    const matchesWaiter = filterWaiter === "all" || order.waiter === filterWaiter
    return matchesSearch && matchesStatus && matchesTable && matchesWaiter
  })

  const activeOrders = orders.filter((order) => ["pending", "preparing", "ready"].includes(order.status)).length
  const totalRevenue = orders.filter((order) => order.status === "served").reduce((sum, order) => sum + order.total, 0)
  const avgOrderValue = orders.length > 0 ? orders.reduce((sum, order) => sum + order.total, 0) / orders.length : 0
  const unreadNotifications = notifications.filter((n) => !n.isRead).length

  const handleViewOrder = (order: (typeof orders)[0]) => {
    setSelectedOrder(order)
    setIsViewDialogOpen(true)
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}`,
    })
    setIsViewDialogOpen(false)
  }

  const handleOrderAction = (orderId: string, action: string) => {
    toast({
      title: "Order Action",
      description: `${action} performed on order ${orderId}`,
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Orders & Notifications</h1>
          <p className="text-muted-foreground text-pretty">Monitor live orders and manage system notifications</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" size="sm" className="relative bg-transparent">
            <Bell className="h-4 w-4" />
            {unreadNotifications > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive">
                {unreadNotifications}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{activeOrders}</div>
            <p className="text-xs text-muted-foreground">Currently processing</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From completed orders</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per order average</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notifications</CardTitle>
            <Bell className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{unreadNotifications}</div>
            <p className="text-xs text-muted-foreground">Unread alerts</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders & Notifications Tabs */}
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="orders">Live Orders</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="history">Order History</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders or customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="ready">Ready</SelectItem>
                    <SelectItem value="served">Served</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterTable} onValueChange={setFilterTable}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Table" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tables</SelectItem>
                    <SelectItem value="T-05">Table T-05</SelectItem>
                    <SelectItem value="T-08">Table T-08</SelectItem>
                    <SelectItem value="T-12">Table T-12</SelectItem>
                    <SelectItem value="T-20">Table T-20</SelectItem>
                    <SelectItem value="T-25">Table T-25</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterWaiter} onValueChange={setFilterWaiter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Waiter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Waiters</SelectItem>
                    <SelectItem value="Bob Smith">Bob Smith</SelectItem>
                    <SelectItem value="Alice Johnson">Alice Johnson</SelectItem>
                    <SelectItem value="Carol Davis">Carol Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Live Orders Feed */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">{order.customerName}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(order.status)}
                        {order.status}
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Table</p>
                      <p className="font-medium">{order.table}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Waiter</p>
                      <p className="font-medium">{order.waiter}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Items:</p>
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <span>${(item.quantity * item.price).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t">
                    <div className="flex items-center justify-between font-medium">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>

                  {order.specialInstructions && (
                    <div className="p-2 bg-muted/50 rounded text-sm">
                      <p className="font-medium">Special Instructions:</p>
                      <p className="text-muted-foreground">{order.specialInstructions}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Ordered: {new Date(order.orderTime).toLocaleTimeString()}</span>
                    <span>ETA: {new Date(order.estimatedTime).toLocaleTimeString()}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Dialog
                      open={isViewDialogOpen && selectedOrder?.id === order.id}
                      onOpenChange={setIsViewDialogOpen}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-transparent"
                          onClick={() => handleViewOrder(order)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Order Details - {selectedOrder?.id}
                          </DialogTitle>
                          <DialogDescription>Complete order information and management options</DialogDescription>
                        </DialogHeader>

                        {selectedOrder && (
                          <ScrollArea className="max-h-[70vh] pr-4">
                            <div className="space-y-6">
                              {/* Order Status and Actions */}
                              <div className="flex items-center justify-between">
                                <Badge className={getStatusColor(selectedOrder.status)} variant="secondary">
                                  <div className="flex items-center gap-1">
                                    {getStatusIcon(selectedOrder.status)}
                                    {selectedOrder.status.toUpperCase()}
                                  </div>
                                </Badge>
                                <div className="flex gap-2">
                                  {selectedOrder.status === "pending" && (
                                    <Button size="sm" onClick={() => handleStatusUpdate(selectedOrder.id, "preparing")}>
                                      <ChefHat className="h-4 w-4 mr-1" />
                                      Start Preparing
                                    </Button>
                                  )}
                                  {selectedOrder.status === "preparing" && (
                                    <Button size="sm" onClick={() => handleStatusUpdate(selectedOrder.id, "ready")}>
                                      <CheckCircle2 className="h-4 w-4 mr-1" />
                                      Mark Ready
                                    </Button>
                                  )}
                                  {selectedOrder.status === "ready" && (
                                    <Button size="sm" onClick={() => handleStatusUpdate(selectedOrder.id, "served")}>
                                      <Utensils className="h-4 w-4 mr-1" />
                                      Mark Served
                                    </Button>
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleOrderAction(selectedOrder.id, "Refresh")}
                                  >
                                    <RefreshCw className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>

                              <Separator />

                              {/* Customer and Table Information */}
                              <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                  <h3 className="font-semibold flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    Customer Information
                                  </h3>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Name:</span>
                                      <span className="font-medium">{selectedOrder.customerName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Table:</span>
                                      <Badge variant="outline">{selectedOrder.table}</Badge>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Waiter:</span>
                                      <span className="font-medium">{selectedOrder.waiter}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-4">
                                  <h3 className="font-semibold flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    Order Timing
                                  </h3>
                                  <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Ordered:</span>
                                      <span className="font-medium">
                                        {new Date(selectedOrder.orderTime).toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">ETA:</span>
                                      <span className="font-medium">
                                        {new Date(selectedOrder.estimatedTime).toLocaleString()}
                                      </span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span className="text-muted-foreground">Payment:</span>
                                      <div className="flex items-center gap-1">
                                        <CreditCard className="h-3 w-3" />
                                        <span className="font-medium">{selectedOrder.paymentMethod}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Separator />

                              {/* Order Items */}
                              <div className="space-y-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                  <Package className="h-4 w-4" />
                                  Order Items
                                </h3>
                                <div className="space-y-3">
                                  {selectedOrder.items.map((item, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                                    >
                                      <div className="flex items-center gap-3">
                                        <Badge
                                          variant="secondary"
                                          className="w-8 h-8 rounded-full flex items-center justify-center p-0"
                                        >
                                          {item.quantity}
                                        </Badge>
                                        <div>
                                          <p className="font-medium">{item.name}</p>
                                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                                        </div>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-semibold">${(item.quantity * item.price).toFixed(2)}</p>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <Separator />

                              {/* Special Instructions */}
                              {selectedOrder.specialInstructions && (
                                <div className="space-y-4">
                                  <h3 className="font-semibold flex items-center gap-2">
                                    <AlertCircle className="h-4 w-4" />
                                    Special Instructions
                                  </h3>
                                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                    <p className="text-sm">{selectedOrder.specialInstructions}</p>
                                  </div>
                                </div>
                              )}

                              {/* Order Total */}
                              <div className="space-y-4">
                                <Separator />
                                <div className="flex items-center justify-between text-lg font-semibold">
                                  <span>Order Total:</span>
                                  <span className="text-green-600 dark:text-green-400">
                                    ${selectedOrder.total.toFixed(2)}
                                  </span>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex gap-2 pt-4">
                                <Button
                                  variant="outline"
                                  className="flex-1 bg-transparent"
                                  onClick={() => handleOrderAction(selectedOrder.id, "Print Receipt")}
                                >
                                  Print Receipt
                                </Button>
                                <Button
                                  variant="outline"
                                  className="flex-1 bg-transparent"
                                  onClick={() => handleOrderAction(selectedOrder.id, "Send to Kitchen")}
                                >
                                  Send to Kitchen
                                </Button>
                                {selectedOrder.status !== "cancelled" && selectedOrder.status !== "served" && (
                                  <Button
                                    variant="destructive"
                                    className="flex-1"
                                    onClick={() => handleStatusUpdate(selectedOrder.id, "cancelled")}
                                  >
                                    Cancel Order
                                  </Button>
                                )}
                              </div>
                            </div>
                          </ScrollArea>
                        )}
                      </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="sm">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>System Notifications</CardTitle>
              <CardDescription>Recent alerts and system updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.map((notification) => {
                const Icon = notification.icon
                return (
                  <div
                    key={notification.id}
                    className={`flex items-start gap-4 p-4 rounded-lg border ${
                      !notification.isRead ? "bg-muted/50" : "bg-background"
                    }`}
                  >
                    <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{notification.title}</h4>
                        <div className="flex items-center gap-2">
                          <Badge className={getPriorityColor(notification.priority)}>{notification.priority}</Badge>
                          {!notification.isRead && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>Complete record of all orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Table</TableHead>
                    <TableHead>Waiter</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{order.table}</Badge>
                      </TableCell>
                      <TableCell>{order.waiter}</TableCell>
                      <TableCell>{order.items.length} items</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(order.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(order.orderTime).toLocaleTimeString()}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
