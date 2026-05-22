"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  Package,
  AlertTriangle,
  TrendingDown,
  Plus,
  Search,
  ShoppingCart,
  Clock,
  Zap,
  CheckCircle,
  TrendingUp,
  BarChart3,
} from "lucide-react"

// Mock data for stock items
const stockItems = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    currentStock: 15,
    minThreshold: 20,
    unit: "kg",
    supplier: "Fresh Farm Co.",
    lastRestocked: "2024-01-15",
    avgConsumption: "8 kg/day",
    status: "low",
    daysRemaining: 2,
  },
  {
    id: 2,
    name: "Mozzarella Cheese",
    category: "Dairy",
    currentStock: 45,
    minThreshold: 25,
    unit: "kg",
    supplier: "Dairy Fresh Ltd.",
    lastRestocked: "2024-01-18",
    avgConsumption: "12 kg/day",
    status: "good",
    daysRemaining: 4,
  },
  {
    id: 3,
    name: "Chicken Breast",
    category: "Meat",
    currentStock: 8,
    minThreshold: 15,
    unit: "kg",
    supplier: "Premium Meats",
    lastRestocked: "2024-01-16",
    avgConsumption: "6 kg/day",
    status: "critical",
    daysRemaining: 1,
  },
  {
    id: 4,
    name: "Olive Oil",
    category: "Oils",
    currentStock: 12,
    minThreshold: 8,
    unit: "L",
    supplier: "Mediterranean Oils",
    lastRestocked: "2024-01-10",
    avgConsumption: "2 L/day",
    status: "good",
    daysRemaining: 6,
  },
  {
    id: 5,
    name: "Pasta",
    category: "Grains",
    currentStock: 25,
    minThreshold: 30,
    unit: "kg",
    supplier: "Italian Imports",
    lastRestocked: "2024-01-17",
    avgConsumption: "5 kg/day",
    status: "low",
    daysRemaining: 5,
  },
  {
    id: 6,
    name: "Lettuce",
    category: "Vegetables",
    currentStock: 18,
    minThreshold: 12,
    unit: "heads",
    supplier: "Green Gardens",
    lastRestocked: "2024-01-19",
    avgConsumption: "4 heads/day",
    status: "good",
    daysRemaining: 4,
  },
]

const reorderSuggestions = [
  {
    item: "Chicken Breast",
    suggestedQuantity: "30 kg",
    urgency: "critical",
    reason: "Stock critically low, high demand expected",
    estimatedCost: "$180",
  },
  {
    item: "Tomatoes",
    suggestedQuantity: "40 kg",
    urgency: "high",
    reason: "Below threshold, weekend rush approaching",
    estimatedCost: "$120",
  },
  {
    item: "Pasta",
    suggestedQuantity: "50 kg",
    urgency: "medium",
    reason: "Popular dish ingredient, maintain buffer",
    estimatedCost: "$75",
  },
]

const stockTrendData = [
  { date: "Jan 15", tomatoes: 45, cheese: 60, chicken: 35, pasta: 80 },
  { date: "Jan 16", tomatoes: 38, cheese: 55, chicken: 28, pasta: 75 },
  { date: "Jan 17", tomatoes: 32, cheese: 50, chicken: 22, pasta: 70 },
  { date: "Jan 18", tomatoes: 25, cheese: 45, chicken: 15, pasta: 65 },
  { date: "Jan 19", tomatoes: 18, cheese: 40, chicken: 8, pasta: 60 },
  { date: "Jan 20", tomatoes: 15, cheese: 35, chicken: 5, pasta: 55 },
]

const predictionData = [
  { item: "Tomatoes", current: 15, predicted: 5, days: 2, action: "Order 40kg" },
  { item: "Chicken Breast", current: 8, predicted: 0, days: 1, action: "Order 30kg" },
  { item: "Pasta", current: 25, predicted: 10, days: 5, action: "Order 50kg" },
  { item: "Mozzarella", current: 45, predicted: 25, days: 4, action: "Monitor" },
]

const categoryDistribution = [
  { name: "Vegetables", value: 35, color: "#06FFA5" },
  { name: "Meat", value: 25, color: "#FF6B35" },
  { name: "Dairy", value: 20, color: "#FFD23F" },
  { name: "Grains", value: 15, color: "#F7931E" },
  { name: "Others", value: 5, color: "#4ECDC4" },
]

const consumptionData = [
  { day: "Mon", consumed: 45, restocked: 0 },
  { day: "Tue", consumed: 38, restocked: 50 },
  { day: "Wed", consumed: 52, restocked: 0 },
  { day: "Thu", consumed: 48, restocked: 30 },
  { day: "Fri", consumed: 68, restocked: 0 },
  { day: "Sat", consumed: 82, restocked: 40 },
  { day: "Sun", consumed: 74, restocked: 0 },
]

export function StockManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "low":
        return "bg-orange-500 text-white"
      case "good":
        return "bg-green-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-destructive text-destructive-foreground"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const filteredItems = stockItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category.toLowerCase() === filterCategory
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const criticalItems = stockItems.filter((item) => item.status === "critical").length
  const lowItems = stockItems.filter((item) => item.status === "low").length
  const totalValue = stockItems.reduce((sum, item) => sum + item.currentStock * 10, 0) // Mock calculation

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Stock Management</h1>
          <p className="text-muted-foreground text-pretty">Monitor inventory levels and manage stock efficiently</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="hover:scale-105 transition-transform duration-200">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Stock Item</DialogTitle>
              <DialogDescription>Enter details for the new inventory item</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="oils">Oils</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="quantity" className="text-right">
                  Quantity
                </Label>
                <Input id="quantity" type="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="threshold" className="text-right">
                  Min Threshold
                </Label>
                <Input id="threshold" type="number" className="col-span-3" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-destructive hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Items</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{criticalItems}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <TrendingDown className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{lowItems}</div>
            <p className="text-xs text-muted-foreground">Below minimum threshold</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stockItems.length}</div>
            <p className="text-xs text-muted-foreground">Active inventory items</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-all duration-300 hover:scale-105">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Value</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total inventory value</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Reorder Suggestions */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Reorder Suggestions
          </CardTitle>
          <CardDescription>Smart recommendations based on consumption patterns and demand forecasting</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {reorderSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <Badge className={getUrgencyColor(suggestion.urgency)}>{suggestion.urgency}</Badge>
                  <div>
                    <p className="font-medium">{suggestion.item}</p>
                    <p className="text-sm text-muted-foreground">{suggestion.reason}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{suggestion.suggestedQuantity}</p>
                    <p className="text-sm text-muted-foreground">{suggestion.estimatedCost}</p>
                  </div>
                  <Button size="sm" className="hover:scale-105 transition-transform duration-200">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stock Management Tabs */}
      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="alerts">Stock Alerts</TabsTrigger>
          <TabsTrigger value="history">Restock History</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="vegetables">Vegetables</SelectItem>
                    <SelectItem value="meat">Meat</SelectItem>
                    <SelectItem value="dairy">Dairy</SelectItem>
                    <SelectItem value="grains">Grains</SelectItem>
                    <SelectItem value="oils">Oils</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Inventory Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory Items</CardTitle>
              <CardDescription>Complete list of all stock items with current levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Item</TableHead>
                      <TableHead className="min-w-[100px]">Category</TableHead>
                      <TableHead className="min-w-[150px]">Current Stock</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[130px]">Days Remaining</TableHead>
                      <TableHead className="min-w-[150px]">Supplier</TableHead>
                      <TableHead className="min-w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span>
                                {item.currentStock} {item.unit}
                              </span>
                            </div>
                            <Progress
                              value={(item.currentStock / (item.minThreshold * 2)) * 100}
                              className="h-2 w-20"
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {item.daysRemaining} days
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{item.supplier}</TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:scale-105 transition-transform duration-200 bg-transparent"
                          >
                            Restock
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Stock Trends
                </CardTitle>
                <CardDescription>Stock levels over time for key ingredients</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stockTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="tomatoes" stroke="#FF6B35" strokeWidth={2} name="Tomatoes" />
                    <Line type="monotone" dataKey="cheese" stroke="#FFD23F" strokeWidth={2} name="Cheese" />
                    <Line type="monotone" dataKey="chicken" stroke="#06FFA5" strokeWidth={2} name="Chicken" />
                    <Line type="monotone" dataKey="pasta" stroke="#4ECDC4" strokeWidth={2} name="Pasta" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Stock distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Weekly Consumption vs Restocking</CardTitle>
              <CardDescription>Daily consumption patterns and restocking activities</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={consumptionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="consumed" fill="#FF6B35" name="Consumed (kg)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="restocked" fill="#06FFA5" name="Restocked (kg)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Predictions Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                AI Stock Predictions
              </CardTitle>
              <CardDescription>Machine learning predictions for stock levels and reorder timing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictionData.map((prediction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-background/50 rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-primary">{prediction.current}</p>
                        <p className="text-xs text-muted-foreground">Current</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-destructive">{prediction.predicted}</p>
                        <p className="text-xs text-muted-foreground">Predicted</p>
                      </div>
                      <div>
                        <p className="font-medium">{prediction.item}</p>
                        <p className="text-sm text-muted-foreground">
                          Will reach {prediction.predicted} units in {prediction.days} days
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {prediction.action}
                      </Badge>
                      <p className="text-sm text-muted-foreground">Recommended Action</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock Alerts</CardTitle>
              <CardDescription>Items requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {stockItems
                .filter((item) => item.status === "critical" || item.status === "low")
                .map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-all duration-200 ${
                      item.status === "critical"
                        ? "bg-destructive/10 border-destructive/20"
                        : "bg-orange-500/10 border-orange-500/20"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <AlertTriangle
                        className={`h-5 w-5 ${item.status === "critical" ? "text-destructive" : "text-orange-500"}`}
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Current: {item.currentStock} {item.unit} | Min: {item.minThreshold} {item.unit}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Estimated {item.daysRemaining} days remaining at current consumption
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Dismiss
                      </Button>
                      <Button size="sm">Restock Now</Button>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Restocking History</CardTitle>
              <CardDescription>Track of recent inventory replenishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    item: "Mozzarella Cheese",
                    quantity: "50 kg",
                    date: "2024-01-18",
                    supplier: "Dairy Fresh Ltd.",
                    cost: "$300",
                  },
                  { item: "Lettuce", quantity: "30 heads", date: "2024-01-19", supplier: "Green Gardens", cost: "$45" },
                  { item: "Pasta", quantity: "40 kg", date: "2024-01-17", supplier: "Italian Imports", cost: "$60" },
                  {
                    item: "Chicken Breast",
                    quantity: "25 kg",
                    date: "2024-01-16",
                    supplier: "Premium Meats",
                    cost: "$150",
                  },
                ].map((entry, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">{entry.item}</p>
                        <p className="text-sm text-muted-foreground">
                          {entry.quantity} from {entry.supplier}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{entry.cost}</p>
                      <p className="text-sm text-muted-foreground">{entry.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
