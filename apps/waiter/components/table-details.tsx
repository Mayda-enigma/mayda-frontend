"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog"
import { Clock, Users, ChefHat, CheckCircle, AlertTriangle, Plus, MessageSquare } from "lucide-react"
import { cn } from "@/shared/utils"
import { useTableCurrentOrders } from "@/features/tables"
import { useUpdateOrderStatus, useCreateOrder } from "@/features/orders"
import { useCurrentUser } from "@/features/auth"
import { useRequestAssistance } from "@/features/tables/api/mutations"

export function TableDetails({ tableId }: { tableId: string }) {
  const { data: currentUser } = useCurrentUser()
  const { data: ordersData, isLoading } = useTableCurrentOrders(Number(tableId))
  const updateOrderStatus = useUpdateOrderStatus()
  const createOrder = useCreateOrder()
  const requestAssistance = useRequestAssistance()

  const [newItemName, setNewItemName] = useState("")
  const [kitchenMessage, setKitchenMessage] = useState("")
  const [showAddItem, setShowAddItem] = useState(false)
  const [showKitchenMessage, setShowKitchenMessage] = useState(false)

  const currentOrders = ordersData?.current_orders ?? []
  const tableNumber = ordersData?.table_number ?? `T${tableId}`

  const addNewItem = () => {
    if (newItemName.trim() && currentUser?.restaurantId) {
      createOrder.mutate({
        restaurantId: currentUser.restaurantId,
        tableId: Number(tableId),
        items: [{ dishId: 0, quantity: 1 }],
      })
      setNewItemName("")
      setShowAddItem(false)
    }
  }

  const sendKitchenMessage = () => {
    if (kitchenMessage.trim()) {
      requestAssistance.mutate(Number(tableId))
      setKitchenMessage("")
      setShowKitchenMessage(false)
    }
  }

  const formatTime = (dateStr: string) => {
    const now = new Date()
    const date = new Date(dateStr)
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
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

  const itemsByStatus = {
    pending: currentOrders.filter((o: any) => o.status === "PENDING" || o.status === "CONFIRMED"),
    preparing: currentOrders.filter((o: any) => o.status === "PREPARING"),
    ready: currentOrders.filter((o: any) => o.status === "READY"),
    served: currentOrders.filter((o: any) => o.status === "COMPLETED"),
  }

  if (isLoading) {
    return (
      <div className="p-2 sm:p-3 space-y-3">
        <div className="h-8 bg-muted rounded animate-pulse w-32" />
        <div className="h-16 bg-muted rounded animate-pulse" />
        <div className="h-32 bg-muted rounded animate-pulse" />
      </div>
    )
  }

  return (
    <div className="p-2 sm:p-3 space-y-3 sm:space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">
            Table {tableNumber.slice(1)}
          </h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{currentOrders.length > 0 ? `${currentOrders.length} commandes` : `Convives`}</span>
            </div>
          </div>
        </div>
        <Badge variant="outline" className="text-sm px-3 py-1">
          {currentOrders.length} actif
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
          <DialogTrigger asChild>
            <Button size="lg" className="h-12 sm:h-14 hover:-dark text-white">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Ajouter article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Ajouter article</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Nom de l'article</label>
                <Input
                  placeholder="Saisir le nom"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="text-sm h-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowAddItem(false)} className="flex-1 text-sm h-10">
                  Annuler
                </Button>
                <Button
                  onClick={addNewItem}
                  disabled={!newItemName.trim()}
                  className="flex-1 hover:-dark text-white text-sm h-10"
                >
                  Ajouter
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showKitchenMessage} onOpenChange={setShowKitchenMessage}>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="h-12 sm:h-14 bg-transparent text-sm">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Message cuisine
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Message cuisine</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Textarea
                placeholder="Tapez votre message..."
                value={kitchenMessage}
                onChange={(e) => setKitchenMessage(e.target.value)}
                rows={4}
                className="text-sm"
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowKitchenMessage(false)} className="flex-1 text-sm h-10">
                  Annuler
                </Button>
                <Button
                  onClick={sendKitchenMessage}
                  disabled={!kitchenMessage.trim()}
                  className="flex-1 hover:-dark text-white text-sm h-10"
                >
                  Envoyer
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Articles</h3>
        {currentOrders.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <ChefHat className="h-8 w-8 mx-auto mb-3 opacity-50" />
              <p className="text-sm text-muted-foreground">Aucune commande active pour cette table</p>
            </CardContent>
          </Card>
        ) : (
          currentOrders.map((order: any) => {
            const config = statusConfig[order.status] || statusConfig.PENDING
            const StatusIcon = config.icon

            return (
              <Card key={order.id} className="overflow-hidden">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm sm:text-base font-medium">{order.orderNumber}</h4>
                      <Badge className={cn("text-xs", config.color)}>
                        <StatusIcon className="h-2.5 w-2.5 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                    <div className="text-sm font-medium">{(order.totalAmount || 0).toFixed(2)} DZD</div>
                  </div>

                  {(order.items || []).map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between text-sm py-1 border-b border-border last:border-0">
                      <span>
                        {item.quantity}x {item.dishName || `Dish #${item.dishId}`}
                      </span>
                      <span className="text-muted-foreground">{(item.totalPrice || 0).toFixed(2)} DZD</span>
                    </div>
                  ))}

                  {order.status !== "COMPLETED" && order.status !== "CANCELLED" && (
                    <div className="flex gap-2 mt-3">
                      {order.status === "PENDING" && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus.mutate({ id: order.id, status: "CONFIRMED" })}
                          className="flex-1 hover:-dark text-white text-sm h-8"
                        >
                          Confirmer
                        </Button>
                      )}
                      {order.status === "CONFIRMED" && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus.mutate({ id: order.id, status: "PREPARING" })}
                          className="flex-1 hover:-dark text-white text-sm h-8"
                        >
                          Commencer la préparation
                        </Button>
                      )}
                      {order.status === "PREPARING" && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus.mutate({ id: order.id, status: "READY" })}
                          className="flex-1 hover:-dark text-white text-sm h-8"
                        >
                          Marquer prêt
                        </Button>
                      )}
                      {order.status === "READY" && (
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus.mutate({ id: order.id, status: "COMPLETED" })}
                          className="flex-1 hover:-dark text-white text-sm h-8"
                        >
                          Marquer servi
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Résumé</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-lg sm:text-xl font-bold text-primary">{itemsByStatus.pending.length}</div>
              <div className="text-xs text-muted-foreground">En attente</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-blue-600">{itemsByStatus.preparing.length}</div>
              <div className="text-xs text-muted-foreground">En préparation</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-green-600">{itemsByStatus.ready.length}</div>
              <div className="text-xs text-muted-foreground">Prête</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-gray-600">{itemsByStatus.served.length}</div>
              <div className="text-xs text-muted-foreground">Servie</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
