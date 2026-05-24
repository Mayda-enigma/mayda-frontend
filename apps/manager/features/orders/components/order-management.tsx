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
            Commandes
          </h1>
          <p className="text-base text-muted-foreground">
            Suivez les commandes en direct et gérez leur exécution de bout en bout.
          </p>
        </div>
      </div>

      {isUserLoading || ordersQuery.isLoading ? (
        <Alert>
          <AlertTitle>Chargement des commandes</AlertTitle>
          <AlertDescription>Récupération des commandes actives pour votre restaurant.</AlertDescription>
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
                <p className="text-xs font-medium text-muted-foreground">Commandes actives</p>
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
                <p className="text-xs font-medium text-muted-foreground">Revenus du jour</p>
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
                <p className="text-xs font-medium text-muted-foreground">Panier moyen</p>
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
                <p className="text-xs font-medium text-muted-foreground">En attente</p>
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
                placeholder="Rechercher par numéro, client ou table..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-44">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="confirmed">Confirmée</SelectItem>
                <SelectItem value="preparing">En préparation</SelectItem>
                <SelectItem value="ready">Prête</SelectItem>
                <SelectItem value="completed">Terminée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="preparing">En préparation</TabsTrigger>
          <TabsTrigger value="ready">Prêtes</TabsTrigger>
          <TabsTrigger value="completed">Terminées</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Liste des commandes</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {filteredOrders.length > 0 ? (
                <OrderListTable orders={filteredOrders} onViewOrder={handleViewOrder} />
              ) : (
                <p className="p-6 text-sm text-muted-foreground">
                  Aucune commande trouvée.
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
