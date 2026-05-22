"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Package, AlertTriangle, ShoppingCart, TrendingDown, TrendingUp, Search } from "lucide-react"
import { useKitchenNotifications } from "@/hooks/use-kitchen-notifications"
import { getIngredientIcon, hasIngredientImage } from "@/lib/ingredient-icons"

interface StockItem {
  id: string
  name: string
  category: "protein" | "vegetable" | "dairy" | "grain" | "spice" | "other"
  currentStock: number
  threshold: number
  unit: string
  costPerUnit: number
  supplier: string
  lastRestocked: Date
  expiryDate?: Date
  trend: "up" | "down" | "stable"
  usageRate: number // units per day
}

const mockStockData: StockItem[] = [
  {
    id: "1",
    name: "Salmon Fillets",
    category: "protein",
    currentStock: 3,
    threshold: 10,
    unit: "pieces",
    costPerUnit: 12.5,
    supplier: "Ocean Fresh",
    lastRestocked: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    trend: "down",
    usageRate: 8,
  },
  {
    id: "2",
    name: "Tomatoes",
    category: "vegetable",
    currentStock: 15,
    threshold: 25,
    unit: "lbs",
    costPerUnit: 3.2,
    supplier: "Farm Direct",
    lastRestocked: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    trend: "down",
    usageRate: 12,
  },
  {
    id: "3",
    name: "Mozzarella Cheese",
    category: "dairy",
    currentStock: 8,
    threshold: 12,
    unit: "lbs",
    costPerUnit: 8.75,
    supplier: "Dairy Co",
    lastRestocked: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    trend: "stable",
    usageRate: 5,
  },
  {
    id: "4",
    name: "Olive Oil",
    category: "other",
    currentStock: 25,
    threshold: 15,
    unit: "bottles",
    costPerUnit: 15.0,
    supplier: "Mediterranean Imports",
    lastRestocked: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    trend: "up",
    usageRate: 2,
  },
]

export function StockManagement() {
  const [stockItems, setStockItems] = useState<StockItem[]>(mockStockData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const { notifyStockLow } = useKitchenNotifications()

  useEffect(() => {
    const checkStockLevels = () => {
      stockItems.forEach((item) => {
        const stockPercentage = (item.currentStock / item.threshold) * 100
        if (stockPercentage <= 50 && Math.random() > 0.8) {
          notifyStockLow(item.name, item.currentStock, item.threshold)
        }
      })
    }

    const interval = setInterval(checkStockLevels, 30000) // Check every 30 seconds
    return () => clearInterval(interval)
  }, [stockItems, notifyStockLow])

  const getStockStatus = (item: StockItem) => {
    const percentage = (item.currentStock / item.threshold) * 100
    if (percentage <= 25) return "critical"
    if (percentage <= 50) return "low"
    if (percentage <= 75) return "medium"
    return "good"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "text-red-400 bg-red-900/30"
      case "low":
        return "text-yellow-400 bg-yellow-900/30"
      case "medium":
        return "text-orange-400 bg-orange-900/30"
      default:
        return "text-green-400 bg-green-900/30"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "protein":
        return "bg-red-500"
      case "vegetable":
        return "bg-green-500"
      case "dairy":
        return "bg-blue-500"
      case "grain":
        return "bg-yellow-500"
      case "spice":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  const filteredItems = stockItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    const matchesStatus = filterStatus === "all" || getStockStatus(item) === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const reorderItem = (itemId: string) => {
    setStockItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, currentStock: item.threshold * 2, lastRestocked: new Date() } : item,
      ),
    )
  }

  const getDaysUntilEmpty = (item: StockItem) => {
    if (item.usageRate === 0) return "N/A"
    return Math.ceil(item.currentStock / item.usageRate)
  }

  const isExpiringSoon = (item: StockItem) => {
    if (!item.expiryDate) return false
    const daysUntilExpiry = Math.ceil((item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    return daysUntilExpiry <= 3
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-orange-500">Stock Management</h2>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Bulk Reorder
        </Button>
      </div>

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
        {["critical", "low", "medium", "good"].map((status) => {
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
        })}
      </div>

      {/* Stock Items Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => {
          const status = getStockStatus(item)
          const stockPercentage = (item.currentStock / item.threshold) * 100
          const daysUntilEmpty = getDaysUntilEmpty(item)
          const expiringSoon = isExpiringSoon(item)
          const ingredientIcon = getIngredientIcon(item.name, item.category)
          const IngredientIcon = ingredientIcon.icon

          return (
            <Card
              key={item.id}
              className={`bg-card border-border ${status === "critical" ? "ring-2 ring-red-500 animate-pulse" : ""}`}
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
                    <span className="text-foreground">
                      {item.currentStock} / {item.threshold} {item.unit}
                    </span>
                  </div>
                  <Progress value={stockPercentage} className="h-2" />
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Days Left</div>
                    <div className="text-foreground font-medium">{daysUntilEmpty}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Usage/Day</div>
                    <div className="text-foreground font-medium">
                      {item.usageRate} {item.unit}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Cost/Unit</div>
                    <div className="text-foreground font-medium">${item.costPerUnit}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Trend</div>
                    <div className="flex items-center gap-1">
                      {item.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-green-400" />
                      ) : item.trend === "down" ? (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      ) : (
                        <div className="w-4 h-4 bg-gray-400 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Supplier & Dates */}
                <div className="text-xs text-muted-foreground space-y-1">
                  <div>Supplier: {item.supplier}</div>
                  <div>Last Restocked: {item.lastRestocked.toLocaleDateString()}</div>
                  {item.expiryDate && (
                    <div className={expiringSoon ? "text-red-400" : ""}>
                      Expires: {item.expiryDate.toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => reorderItem(item.id)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600"
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
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Items Found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
