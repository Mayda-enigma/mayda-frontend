"use client"

import { useState, useMemo } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { Clock, ChefHat, CheckCircle, AlertTriangle, Plus, Filter, Search, Users, Utensils, Leaf } from "lucide-react"
import { cn } from "@/shared/utils"
import { useCurrentUser } from "@/features/auth"
import { useRestaurantOrders, useUpdateOrderStatus } from "@/features/orders"

type OrderStatusFilter = "all" | "PENDING" | "CONFIRMED" | "PREPARING" | "READY" | "COMPLETED" | "CANCELLED"

export function OrdersManagement() {
  const { data: currentUser } = useCurrentUser()
  const restaurantId = currentUser?.restaurantId ?? 0
  const { data: orders = [], isLoading } = useRestaurantOrders(restaurantId)
  const updateOrderStatus = useUpdateOrderStatus()

  const [filterStatus, setFilterStatus] = useState<OrderStatusFilter>("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddOrderOpen, setIsAddOrderOpen] = useState(false)

  const filteredOrders = useMemo(() => {
    let filtered = orders
    if (filterStatus !== "all") {
      filtered = filtered.filter((order) => order.status === filterStatus)
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(q) ||
          order.items.some((item) => item.dishName.toLowerCase().includes(q)),
      )
    }
    return filtered.sort((a, b) => new Date(b.orderTime).getTime() - new Date(a.orderTime).getTime())
  }, [orders, filterStatus, searchQuery])

  const formatTime = (dateStr: string) => {
    const now = new Date()
    const date = new Date(dateStr)
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    if (diffMins < 1) return "À l'instant"
    if (diffMins < 60) return `${diffMins}m`
    const diffHours = Math.floor(diffMins / 60)
    return `${diffHours}h ${diffMins % 60}m`
  }

  const statusConfig: Record<string, { label: string; color: string; icon: typeof Clock }> = {
    PENDING: { label: "En attente", color: "bg-primary/10 text-primary/80", icon: Clock },
    CONFIRMED: { label: "Confirmée", color: "bg-blue-100 text-blue-800", icon: ChefHat },
    PREPARING: { label: "En préparation", color: "bg-blue-100 text-blue-800", icon: ChefHat },
    READY: { label: "Prête", color: "bg-green-100 text-green-800", icon: CheckCircle },
    COMPLETED: { label: "Servie", color: "bg-gray-100 text-gray-800", icon: CheckCircle },
    CANCELLED: { label: "Annulée", color: "bg-red-100 text-red-800", icon: AlertTriangle },
  }

  const getStatusActions = (order: { id: number; status: string }) => {
    switch (order.status) {
      case "PENDING":
      case "CONFIRMED":
        return [{ label: "Commencer préparation", status: "PREPARING", variant: "default" as const }]
      case "PREPARING":
        return [{ label: "Marquer prêt", status: "READY", variant: "default" as const }]
      case "READY":
        return [{ label: "Marquer servi", status: "COMPLETED", variant: "default" as const }]
      default:
        return []
    }
  }

  if (isLoading) {
    return (
      <div className="p-2 sm:p-3 space-y-3">
        <div className="h-8 bg-muted rounded animate-pulse w-48" />
        <div className="h-10 bg-muted rounded animate-pulse" />
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="h-5 bg-muted rounded w-32 animate-pulse mb-2" />
              <div className="h-4 bg-muted rounded w-48 animate-pulse" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  const readyCount = orders.filter((o) => o.status === "READY").length
  const preparingCount = orders.filter((o) => o.status === "PREPARING").length

  return (
    <div className="p-2 sm:p-3 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Commandes</h2>
          <p className="text-sm text-muted-foreground">
            {readyCount} prêtes • {preparingCount} en préparation
          </p>
        </div>
        <Dialog open={isAddOrderOpen} onOpenChange={setIsAddOrderOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="hover:-dark text-white h-9 px-3 text-sm">
              <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5" />
              Ajouter commande
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Ajouter commande manuelle</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Numéro de table</label>
                <Input placeholder="T01" className="text-sm h-9" />
              </div>
              <div>
                <label className="text-sm font-medium">Nom client (optionnel)</label>
                <Input placeholder="Jean Dupont" className="text-sm h-9" />
              </div>
              <div>
                <label className="text-sm font-medium">Articles</label>
                <Textarea placeholder="Listez les articles..." className="text-sm min-h-20" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAddOrderOpen(false)} className="flex-1 text-sm h-9">
                  Annuler
                </Button>
                <Button
                  onClick={() => setIsAddOrderOpen(false)}
                  className="flex-1 hover:-dark text-white text-sm h-9"
                >
                  Ajouter commande
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher commandes ou articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 text-sm h-9"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5 bg-transparent text-sm h-9 px-3">
              <Filter className="h-3 w-3 sm:h-4 sm:w-4" />
              {filterStatus === "all" ? "Toutes les commandes" : statusConfig[filterStatus]?.label || filterStatus}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="text-sm">
            <DropdownMenuItem onClick={() => setFilterStatus("all")} className="text-sm py-2">
              Toutes les commandes
            </DropdownMenuItem>
            {Object.entries(statusConfig).map(([status, config]) => (
              <DropdownMenuItem
                key={status}
                onClick={() => setFilterStatus(status as OrderStatusFilter)}
                className="text-sm py-2"
              >
                <config.icon className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                {config.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <ChefHat className="h-8 w-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">Aucune commande trouvée</p>
            </CardContent>
          </Card>
        ) : (
          filteredOrders.map((order) => {
            const config = statusConfig[order.status] || statusConfig.PENDING
            const StatusIcon = config.icon
            const actions = getStatusActions(order)

            return (
              <Card
                key={order.id}
                className={cn(
                  "transition-all duration-200 hover:shadow-lg",
                  order.status === "PREPARING" && order.items.length > 0 && "ring-1 ring-primary/30",
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-semibold">{order.orderNumber}</h3>
                      {order.tableId && (
                        <Badge variant="outline" className="text-xs">
                          T{order.tableId}
                        </Badge>
                      )}
                    </div>
                    <Badge className={cn("text-xs", config.color)}>
                      <StatusIcon className="h-2.5 w-2.5 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Users className="h-3 w-3" />
                    {order.type || "SUR PLACE"}
                  </p>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="space-y-1.5">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5">
                          <span>{item.quantity}x {item.dishName}</span>
                        </div>
                        <span className="font-medium">{(item.totalPrice || 0).toFixed(2)} DZD</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatTime(order.orderTime)}
                      </span>
                    </div>
                    <span className="font-bold text-foreground">{(order.totalAmount || 0).toFixed(2)} DZD</span>
                  </div>

                  {actions.length > 0 && (
                    <div className="flex gap-2 pt-1">
                      {actions.map((action) => (
                        <Button
                          key={action.status}
                          variant={action.variant}
                          size="sm"
                          onClick={() => updateOrderStatus.mutate({ id: order.id, status: action.status })}
                          className={cn("flex-1 text-sm h-8", action.variant === "default" && "hover:-dark text-white")}
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
