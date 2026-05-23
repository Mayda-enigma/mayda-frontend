"use client"

import { useMemo, useState } from "react"
import { useCurrentUser } from "@/features/auth/api/queries"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useToast } from "@/shared/ui/use-toast"
import {
  ShoppingCart,
  DollarSign,
  Clock,
  ChefHat,
  Search,
  AlertCircle,
} from "lucide-react"
import { useUpdateOrderStatus } from "../api/mutations"
import { useOrders } from "../api/queries"
import { OrderListTable } from "./order-list-table"
import { OrderDetailDialog } from "./order-detail-dialog"
import { statusConfig, statusFlow } from "./status-utils"
import type { Order, OrderStatus } from "../types"

export function OrderManagement() {
  const { toast } = useToast()
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? null

  const ordersQuery = useOrders(restaurantId)
  const orders = ordersQuery.data ?? []
  const updateOrderStatus = useUpdateOrderStatus(restaurantId ?? 0)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [detailOpen, setDetailOpen] = useState(false)

  const filteredOrders = useMemo(() => {
    let result = orders
    if (filterStatus !== "all") {
      result = result.filter((o) => o.status === filterStatus)
    }
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (o) =>
          o.orderNumber.toLowerCase().includes(term) ||
          o.customerName.toLowerCase().includes(term) ||
          o.tableNumber.toLowerCase().includes(term),
      )
    }
    return result
  }, [orders, filterStatus, searchTerm])

  const activeOrderCount = useMemo(
    () => orders.filter((o) => ["pending", "confirmed", "preparing", "ready"].includes(o.status)).length,
    [orders],
  )
  const todayRevenue = useMemo(
    () => orders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.totalAmount, 0),
    [orders],
  )
  const avgOrderValue = useMemo(
    () => (orders.length > 0 ? orders.reduce((sum, o) => sum + o.totalAmount, 0) / orders.length : 0),
    [orders],
  )
  const pendingCount = useMemo(
    () => orders.filter((o) => o.status === "pending").length,
    [orders],
  )

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setDetailOpen(true)
  }

  const handleStatusChange = async (
    order: Order,
    newStatus: OrderStatus,
  ) => {
    try {
      await updateOrderStatus.mutateAsync({ id: order.id, status: newStatus })
      toast({
        title: `Order #${order.orderNumber} updated`,
        description: `Status changed to ${statusConfig[newStatus].label}.`,
      })
      setDetailOpen(false)
    } catch {
      toast({
        title: "Update failed",
        description: "The order status could not be updated.",
        variant: "destructive",
      })
    }
  }

  const availableTransitions = useMemo(
    () => (selectedOrder ? statusFlow[selectedOrder.status] : []),
    [selectedOrder],
  )

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-balance">
            Orders
          </h1>
          <p className="text-base text-muted-foreground">
            Monitor live orders and manage order fulfillment from start to finish.
          </p>
        </div>
      </div>

      {isUserLoading || ordersQuery.isLoading ? (
        <Alert>
          <AlertTitle>Loading orders</AlertTitle>
          <AlertDescription>Fetching active orders for your restaurant.</AlertDescription>
        </Alert>
      ) : null}
      {!isUserLoading && restaurantId === null ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Restaurant context missing</AlertTitle>
          <AlertDescription>
            This manager account is not linked to a restaurant, so order actions are unavailable.
          </AlertDescription>
        </Alert>
      ) : null}
      {ordersQuery.isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could not load orders</AlertTitle>
          <AlertDescription>
            The orders API request failed. Refresh the page and try again.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
                <ShoppingCart className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Active Orders</p>
                <p className="text-2xl font-semibold tabular-nums">{activeOrderCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-success/15 text-success">
                <DollarSign className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Today&apos;s Revenue</p>
                <p className="text-2xl font-semibold tabular-nums">
                  {todayRevenue.toFixed(2)} DZD
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-blue/15 text-accent-blue">
                <DollarSign className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Avg Order</p>
                <p className="text-2xl font-semibold tabular-nums">
                  {avgOrderValue.toFixed(2)} DZD
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-warning/15 text-warning">
                <Clock className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-semibold tabular-nums">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders by number, customer, or table..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="preparing">Preparing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="preparing">Preparing</TabsTrigger>
          <TabsTrigger value="ready">Ready</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Order List</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filteredOrders.length > 0 ? (
                <OrderListTable orders={filteredOrders} onViewOrder={handleViewOrder} />
              ) : (
                <p className="p-6 text-sm text-muted-foreground">
                  No orders found.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {(["pending", "preparing", "ready", "completed"] as const).map((tab) => (
          <TabsContent key={tab} value={tab}>
            <Card>
              <CardHeader>
                <CardTitle>{statusConfig[tab].label} Orders</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {filteredOrders.filter((o) => o.status === tab).length > 0 ? (
                  <OrderListTable
                    orders={filteredOrders.filter((o) => o.status === tab)}
                    onViewOrder={handleViewOrder}
                  />
                ) : (
                  <p className="p-6 text-sm text-muted-foreground">
                    No {tab} orders.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <OrderDetailDialog
        order={selectedOrder}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onStatusChange={handleStatusChange}
        isUpdating={updateOrderStatus.isPending}
        availableTransitions={availableTransitions}
      />
    </div>
  )
}
