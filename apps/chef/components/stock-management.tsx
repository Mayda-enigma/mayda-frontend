"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import { Input } from "@/shared/ui/input"
import { Package, AlertTriangle, ShoppingCart, Search, Loader2 } from "lucide-react"
import { getIngredientIcon, hasIngredientImage } from "@/lib/ingredient-icons"
import { useStock, useStockStats, useLowStockAlerts } from "@/features/inventory"
import { StockAlertCard } from "@/features/inventory"
import { useCurrentUser } from "@/features/auth"
import type { StockItem } from "@/features/inventory"

export function StockManagement() {
  const { data: user } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? 0

  const { data: stockItems = [], isLoading: isLoadingStock } = useStock(restaurantId)
  const { data: stats, isLoading: isLoadingStats } = useStockStats(restaurantId)
  const { data: alerts = [], isLoading: isLoadingAlerts } = useLowStockAlerts(restaurantId)

  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const getStockStatus = (item: StockItem) => {
    const percentage = (item.currentStock / item.minimumStock) * 100
    if (percentage <= 25) return "critical"
    if (percentage <= 50) return "low"
    if (percentage <= 75) return "medium"
    return "good"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-destructive bg-destructive/10"
      case "low":
        return "text-warning bg-warning/10"
      case "medium":
        return "text-primary bg-primary/10"
      default:
        return "text-success bg-success/10"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "protein":
        return "bg-destructive"
      case "vegetable":
        return "bg-success"
      case "dairy":
        return "bg-accent-blue"
      case "grain":
        return "bg-warning"
      case "spice":
        return "bg-purple-500"
      default:
        return "bg-muted"
    }
  }

  const filteredItems = stockItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    const matchesStatus = filterStatus === "all" || getStockStatus(item) === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const isLoading = isLoadingStock || isLoadingStats

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <Loader2 className="w-12 h-12 mx-auto text-primary mb-4 animate-spin" />
          <p className="text-muted-foreground">Loading inventory...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-primary">Stock Management</h2>
        <Button className="bg-primary hover:bg-primary/90">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Bulk Reorder
        </Button>
      </div>

      {/* Low Stock Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Low Stock Alerts ({alerts.length})
          </h3>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {alerts.map((alert) => (
              <StockAlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search ingredients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background border-border text-foreground"
                />
              </div>
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-foreground"
            >
              <option value="all">All Categories</option>
              <option value="protein">Protein</option>
              <option value="vegetable">Vegetables</option>
              <option value="dairy">Dairy</option>
              <option value="grain">Grains</option>
              <option value="spice">Spices</option>
              <option value="other">Other</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 bg-background border border-border rounded-md text-foreground"
            >
              <option value="all">All Status</option>
              <option value="critical">Critical</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="good">Good</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Stock Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats ? (
          <>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-success/30" />
                  <div>
                    <div className="text-2xl font-bold tabular-nums text-foreground">{stats.totalItems}</div>
                    <div className="text-sm text-muted-foreground">Total Items</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-accent-blue/30" />
                  <div>
                    <div className="text-2xl font-bold tabular-nums text-foreground">{stats.activeItems}</div>
                    <div className="text-sm text-muted-foreground">Active Items</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-destructive/30" />
                  <div>
                    <div className="text-2xl font-bold tabular-nums text-foreground">{stats.lowStockItems}</div>
                    <div className="text-sm text-muted-foreground">Low Stock</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-warning/30" />
                  <div>
                    <div className="text-2xl font-bold tabular-nums text-foreground">{stats.expiringSoonItems}</div>
                    <div className="text-sm text-muted-foreground">Expiring Soon</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          ["critical", "low", "medium", "good"].map((status) => {
            const count = filteredItems.filter((item) => getStockStatus(item) === status).length
            return (
              <Card key={status} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(status).split(" ")[1]}`} />
                    <div>
                      <div className="text-2xl font-bold text-foreground">{count}</div>
                      <div className="text-sm text-muted-foreground capitalize">{status} Stock</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })
        )}
      </div>

      {/* Stock Items Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const status = getStockStatus(item)
          const stockPercentage = Math.min((item.currentStock / item.minimumStock) * 100, 100)
          const ingredientIcon = getIngredientIcon(item.name, item.category)
          const IngredientIcon = ingredientIcon.icon
          const expiringSoon = item.expiryDate
            ? Math.ceil((item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) <= 3
            : false

          return (
            <Card
              key={item.id}
              className={`bg-card border-border ${status === "critical" ? "ring-2 ring-destructive" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${ingredientIcon.bgColor} dark:bg-opacity-20 flex-shrink-0`}>
                      {hasIngredientImage(item.name) ? (
                        <div className="relative w-8 h-8">
                          <Image
                            src={ingredientIcon.image || "/placeholder.svg"}
                            alt={item.name}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                      ) : (
                        <IngredientIcon className={`w-6 h-6 ${ingredientIcon.color} dark:text-opacity-80`} />
                      )}
                    </div>
                    <CardTitle className="text-lg text-foreground">{item.name}</CardTitle>
                  </div>
                  <Badge className={getCategoryColor(item.category)}>{item.category}</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(status)} variant="outline">
                    {status.toUpperCase()}
                  </Badge>
                  {expiringSoon && (
                    <Badge variant="destructive" className="text-xs">
                      Expires Soon
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Stock Level */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Stock Level</span>
                    <span className="tabular-nums text-foreground">
                      {item.currentStock} / {item.minimumStock} {item.unit}
                    </span>
                  </div>
                  <Progress value={stockPercentage} className="h-2" />
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Unit Price</div>
                    <div className="tabular-nums text-foreground font-medium">${item.unitPrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total Value</div>
                    <div className="tabular-nums text-foreground font-medium">${item.totalValue.toFixed(2)}</div>
                  </div>
                  {item.location && (
                    <div>
                      <div className="text-muted-foreground">Location</div>
                      <div className="text-foreground font-medium">{item.location}</div>
                    </div>
                  )}
                  {item.supplier && (
                    <div>
                      <div className="text-muted-foreground">Supplier</div>
                      <div className="text-foreground font-medium">{item.supplier}</div>
                    </div>
                  )}
                </div>

                {/* Expiry */}
                {item.expiryDate && (
                  <div className={`text-xs tabular-nums ${expiringSoon ? "text-destructive" : "text-muted-foreground"}`}>
                    Expires: {item.expiryDate.toLocaleDateString()}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Reorder
                  </Button>
                  {status === "critical" && (
                    <Button size="sm" variant="destructive" className="flex-1">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Urgent
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">No Items Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
