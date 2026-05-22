"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Clock, Users, ChefHat, CheckCircle, AlertTriangle, Plus, MessageSquare, Leaf } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/components/language-provider"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  status: "pending" | "preparing" | "ready" | "served"
  specialInstructions?: string
  isVegetarian?: boolean
}

interface TableData {
  id: string
  number: string
  guests: number
  status: "occupied" | "waiting" | "served"
  items: OrderItem[]
  totalAmount: number
  orderTime: Date
  specialRequests?: string
}

// Mock table data
const mockTableData: TableData = {
  id: "1",
  number: "T03",
  guests: 4,
  status: "occupied",
  items: [
    {
      id: "1",
      name: "Grilled Salmon",
      quantity: 2,
      price: 24.99,
      status: "ready",
      specialInstructions: "No lemon",
      isVegetarian: false,
    },
    {
      id: "2",
      name: "Caesar Salad",
      quantity: 1,
      price: 12.99,
      status: "served",
      isVegetarian: true,
    },
    {
      id: "3",
      name: "Pasta Carbonara",
      quantity: 1,
      price: 18.99,
      status: "preparing",
      isVegetarian: false,
    },
    {
      id: "4",
      name: "Vegetarian Pizza",
      quantity: 1,
      price: 16.99,
      status: "pending",
      isVegetarian: true,
    },
  ],
  totalAmount: 89.96,
  orderTime: new Date(Date.now() - 1800000), // 30 minutes ago
  specialRequests: "Table prefers quiet seating area",
}

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
}

export function TableDetails({ tableId }: { tableId: string }) {
  const { t } = useLanguage()
  const [tableData, setTableData] = useState<TableData>(mockTableData)
  const [newItemName, setNewItemName] = useState("")
  const [newItemPrice, setNewItemPrice] = useState("")
  const [kitchenMessage, setKitchenMessage] = useState("")
  const [showAddItem, setShowAddItem] = useState(false)
  const [showKitchenMessage, setShowKitchenMessage] = useState(false)

  const updateItemStatus = (itemId: string, newStatus: OrderItem["status"]) => {
    setTableData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item)),
    }))
  }

  const addNewItem = () => {
    if (newItemName.trim() && newItemPrice.trim()) {
      const newItem: OrderItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        quantity: 1,
        price: Number.parseFloat(newItemPrice),
        status: "pending",
      }

      setTableData((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
        totalAmount: prev.totalAmount + newItem.price,
      }))

      setNewItemName("")
      setNewItemPrice("")
      setShowAddItem(false)
    }
  }

  const sendKitchenMessage = () => {
    if (kitchenMessage.trim()) {
      console.log(`Message to kitchen for table ${tableData.number}: ${kitchenMessage}`)
      setKitchenMessage("")
      setShowKitchenMessage(false)
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) {
      return `${diffMins}m ${t("ago")}`
    } else {
      const diffHours = Math.floor(diffMins / 60)
      return `${diffHours}h ${diffMins % 60}m ${t("ago")}`
    }
  }

  const itemsByStatus = useMemo(() => {
    return {
      pending: tableData.items.filter((item) => item.status === "pending"),
      preparing: tableData.items.filter((item) => item.status === "preparing"),
      ready: tableData.items.filter((item) => item.status === "ready"),
      served: tableData.items.filter((item) => item.status === "served"),
    }
  }, [tableData.items])

  return (
    <div className="p-2 sm:p-3 space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-heading text-foreground">
            {t("table")} {tableData.number.slice(1)}
          </h2>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Users className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>
                {tableData.guests} {t("guests")}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{formatTime(tableData.orderTime)}</span>
            </div>
          </div>
        </div>

        <Badge variant="outline" className="text-sm px-3 py-1">
          ${tableData.totalAmount.toFixed(2)}
        </Badge>
      </div>

      {/* Special Requests */}
      {tableData.specialRequests && (
        <Card className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/20">
          <CardContent className="p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-900 dark:text-amber-100">{t("specialRequests")}</h4>
                <p className="text-sm text-amber-700 dark:text-amber-200">{tableData.specialRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
          <DialogTrigger asChild>
            <Button size="lg" className="h-12 sm:h-14 bg-gradient-primary hover:bg-gradient-primary-dark text-white">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {t("addItem")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-heading">{t("addItem")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">Item Name</label>
                <Input
                  placeholder="Enter item name"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="text-sm h-10"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Price</label>
                <Input
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  value={newItemPrice}
                  onChange={(e) => setNewItemPrice(e.target.value)}
                  className="text-sm h-10"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowAddItem(false)} className="flex-1 text-sm h-10">
                  {t("cancel")}
                </Button>
                <Button
                  onClick={addNewItem}
                  disabled={!newItemName.trim() || !newItemPrice.trim()}
                  className="flex-1 bg-gradient-primary hover:bg-gradient-primary-dark text-white text-sm h-10"
                >
                  Add
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showKitchenMessage} onOpenChange={setShowKitchenMessage}>
          <DialogTrigger asChild>
            <Button variant="outline" size="lg" className="h-12 sm:h-14 bg-transparent text-sm">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              {t("messageKitchen")}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-heading">{t("messageKitchen")}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Textarea
                placeholder="Type your message to the kitchen..."
                value={kitchenMessage}
                onChange={(e) => setKitchenMessage(e.target.value)}
                rows={4}
                className="text-sm"
              />
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setShowKitchenMessage(false)} className="flex-1 text-sm h-10">
                  {t("cancel")}
                </Button>
                <Button
                  onClick={sendKitchenMessage}
                  disabled={!kitchenMessage.trim()}
                  className="flex-1 bg-gradient-primary hover:bg-gradient-primary-dark text-white text-sm h-10"
                >
                  Send
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Order Items */}
      <div className="space-y-3">
        <h3 className="text-lg font-heading">{t("orderItems")}</h3>
        {tableData.items.map((item) => {
          const config = statusConfig[item.status]
          const StatusIcon = config.icon

          return (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm sm:text-base font-medium">{item.name}</h4>
                    {item.isVegetarian && <Leaf className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />}
                    <Badge className={cn("text-xs", config.color)}>
                      <StatusIcon className="h-2.5 w-2.5 mr-1" />
                      {config.label}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">${item.price.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">×{item.quantity}</div>
                  </div>
                </div>

                {item.specialInstructions && (
                  <p className="text-sm text-muted-foreground mb-2">
                    <strong>Note:</strong> {item.specialInstructions}
                  </p>
                )}

                {/* Item Actions */}
                <div className="flex gap-2">
                  {item.status === "pending" && (
                    <Button
                      size="sm"
                      onClick={() => updateItemStatus(item.id, "preparing")}
                      className="flex-1 bg-gradient-primary hover:bg-gradient-primary-dark text-white text-sm h-8"
                    >
                      {t("startPreparing")}
                    </Button>
                  )}
                  {item.status === "preparing" && (
                    <Button
                      size="sm"
                      onClick={() => updateItemStatus(item.id, "ready")}
                      className="flex-1 bg-gradient-primary hover:bg-gradient-primary-dark text-white text-sm h-8"
                    >
                      {t("markReady")}
                    </Button>
                  )}
                  {item.status === "ready" && (
                    <Button
                      size="sm"
                      onClick={() => updateItemStatus(item.id, "served")}
                      className="flex-1 bg-gradient-primary hover:bg-gradient-primary-dark text-white text-sm h-8"
                    >
                      {t("markServedAction")}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-heading">{t("orderSummary")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-3 text-center">
            <div>
              <div className="text-lg sm:text-xl font-bold text-yellow-600">{itemsByStatus.pending.length}</div>
              <div className="text-xs text-muted-foreground">{t("pending")}</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-blue-600">{itemsByStatus.preparing.length}</div>
              <div className="text-xs text-muted-foreground">{t("preparing")}</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-green-600">{itemsByStatus.ready.length}</div>
              <div className="text-xs text-muted-foreground">{t("ready")}</div>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-bold text-gray-600">{itemsByStatus.served.length}</div>
              <div className="text-xs text-muted-foreground">{t("served")}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
