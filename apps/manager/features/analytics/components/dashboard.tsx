"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Progress } from "@/shared/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  ShoppingCart,
  Clock,
  Star,
  AlertTriangle,
  Lightbulb,
  Calendar,
  ArrowUpRight,
} from "lucide-react"

const salesData = [
  { name: "Mon", revenue: 4200, orders: 45, profit: 1260 },
  { name: "Tue", revenue: 3800, orders: 38, profit: 1140 },
  { name: "Wed", revenue: 5200, orders: 52, profit: 1560 },
  { name: "Thu", revenue: 4800, orders: 48, profit: 1440 },
  { name: "Fri", revenue: 6800, orders: 68, profit: 2040 },
  { name: "Sat", revenue: 8200, orders: 82, profit: 2460 },
  { name: "Sun", revenue: 7400, orders: 74, profit: 2220 },
]

const popularDishes = [
  { name: "Pizza Margherita", orders: 145, revenue: 2175, rating: 4.8, trend: "+12%" },
  { name: "Chicken Alfredo", orders: 128, revenue: 2304, rating: 4.7, trend: "+8%" },
  { name: "Caesar Salad", orders: 98, revenue: 1176, rating: 4.6, trend: "+15%" },
  { name: "Beef Burger", orders: 87, revenue: 1392, rating: 4.9, trend: "+5%" },
  { name: "Fish & Chips", orders: 76, revenue: 1368, rating: 4.5, trend: "+22%" },
  { name: "Pasta Carbonara", orders: 65, revenue: 1170, rating: 4.7, trend: "+18%" },
  { name: "Grilled Salmon", orders: 54, revenue: 1296, rating: 4.8, trend: "+10%" },
  { name: "Mushroom Risotto", orders: 43, revenue: 817, rating: 4.6, trend: "+25%" },
]

const cuisineShare = [
  { name: "Italian", value: 35, color: "#FF6B35", orders: 342 },
  { name: "American", value: 25, color: "#F7931E", orders: 245 },
  { name: "Mediterranean", value: 20, color: "#FFD23F", orders: 196 },
  { name: "Asian", value: 12, color: "#06FFA5", orders: 118 },
  { name: "Other", value: 8, color: "#4ECDC4", orders: 78 },
]

const hourlyData = [
  { hour: "6AM", orders: 2, revenue: 45 },
  { hour: "7AM", orders: 8, revenue: 180 },
  { hour: "8AM", orders: 15, revenue: 340 },
  { hour: "9AM", orders: 12, revenue: 275 },
  { hour: "10AM", orders: 8, revenue: 185 },
  { hour: "11AM", orders: 18, revenue: 420 },
  { hour: "12PM", orders: 45, revenue: 1080 },
  { hour: "1PM", orders: 52, revenue: 1248 },
  { hour: "2PM", orders: 38, revenue: 912 },
  { hour: "3PM", orders: 22, revenue: 528 },
  { hour: "4PM", orders: 15, revenue: 360 },
  { hour: "5PM", orders: 28, revenue: 672 },
  { hour: "6PM", orders: 48, revenue: 1152 },
  { hour: "7PM", orders: 65, revenue: 1560 },
  { hour: "8PM", orders: 58, revenue: 1392 },
  { hour: "9PM", orders: 42, revenue: 1008 },
  { hour: "10PM", orders: 25, revenue: 600 },
  { hour: "11PM", orders: 12, revenue: 288 },
]

const monthlyComparison = [
  { month: "Jan", thisYear: 45000, lastYear: 38000 },
  { month: "Feb", thisYear: 48000, lastYear: 42000 },
  { month: "Mar", thisYear: 52000, lastYear: 45000 },
  { month: "Apr", thisYear: 58000, lastYear: 48000 },
  { month: "May", thisYear: 62000, lastYear: 52000 },
  { month: "Jun", thisYear: 68000, lastYear: 58000 },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-pretty">
            Comprehensive insights and performance metrics for your restaurant
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-colors bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Last 7 Days
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
                <DollarSign className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Total Revenue</p>
                <div className="text-2xl font-bold text-primary">$38,400</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="size-3 text-success" />
                  +12.5% from last week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-blue/15 text-accent-blue">
                <ShoppingCart className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Total Orders</p>
                <div className="text-2xl font-bold">407</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="size-3 text-success" />
                  +8.2% from last week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-orange/15 text-accent-orange">
                <DollarSign className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Avg. Order Value</p>
                <div className="text-2xl font-bold">$94.35</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="size-3 text-success" />
                  +3.8% from last week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-pink/15 text-accent-pink">
                <Star className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Customer Rating</p>
                <div className="text-2xl font-bold">4.8</div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="size-3 text-success" />
                  +0.2 from last week
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Forecast */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-medium text-muted-foreground">Revenue Forecast</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">$52,400</span>
                <span className="flex items-center gap-0.5 text-xs text-success font-medium">
                  <ArrowUpRight className="size-3" />
                  +15.3% projected
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm bg-primary" />
                Actual
              </div>
              <div className="flex items-center gap-1.5">
                <span className="size-2 rounded-sm bg-primary/40" />
                Forecast
              </div>
            </div>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {salesData.concat([
              { name: "Forecast\nMon", revenue: 7800, orders: 0, profit: 0 },
              { name: "Forecast\nTue", revenue: 8500, orders: 0, profit: 0 },
              { name: "Forecast\nWed", revenue: 9200, orders: 0, profit: 0 },
            ]).map((d, i) => {
              const isForecast = i >= salesData.length
              const height = ((d.revenue / 10000) * 100).toFixed(0)
              return (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className={`w-full rounded-sm transition-all duration-300 ${
                      isForecast ? "bg-primary/40" : "bg-primary"
                    }`}
                    style={{ height: `${Math.max(Number(height), 4)}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground text-center leading-tight">
                    {d.name.split("\n")[0]}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            AI Predictive Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-success mt-0.5" />
            <div>
              <p className="font-medium">Pizza Margherita demand expected +25% this weekend</p>
              <p className="text-sm text-muted-foreground">
                Based on historical data and current trends. Consider increasing inventory.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
            <DollarSign className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Promoting Chicken Alfredo may increase revenue by 15%</p>
              <p className="text-sm text-muted-foreground">
                High-margin dish with growing popularity. Perfect for weekend special.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
            <Clock className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium">Peak hours: 7-8 PM shows 15% increase in wait times</p>
              <p className="text-sm text-muted-foreground">
                Consider adding staff during peak hours to improve service quality.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section - Enhanced with more colorful and responsive charts */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="popular">Popular Dishes</TabsTrigger>
          <TabsTrigger value="cuisine">Cuisine Share</TabsTrigger>
          <TabsTrigger value="hours">Busy Hours</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Daily Revenue & Orders</CardTitle>
              <CardDescription>Revenue and order trends over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickMargin={10} />
                  <YAxis
                    yAxisId="left"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, "dataMax + 1000"]}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, "dataMax + 10"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value, name) => {
                      if (name === "Revenue ($)" || name === "Profit ($)") {
                        return [`$${value}`, name]
                      }
                      return [value, name]
                    }}
                  />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FF6B35"
                    strokeWidth={3}
                    name="Revenue ($)"
                    dot={{ fill: "#FF6B35", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: "#FF6B35", strokeWidth: 2 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="orders"
                    stroke="#06FFA5"
                    strokeWidth={3}
                    name="Orders"
                    dot={{ fill: "#06FFA5", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, stroke: "#06FFA5", strokeWidth: 2 }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="profit"
                    stroke="#FFD23F"
                    strokeWidth={2}
                    name="Profit ($)"
                    strokeDasharray="5 5"
                    dot={{ fill: "#FFD23F", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "#FFD23F", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="popular" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Most Popular Dishes</CardTitle>
                <CardDescription>Top performing menu items by order count</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={popularDishes.slice(0, 6)} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                    <YAxis dataKey="name" type="category" width={120} stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="orders" fill="#F7931E" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Dish Performance Details</CardTitle>
                <CardDescription>Comprehensive metrics for top dishes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {popularDishes.slice(0, 8).map((dish, index) => (
                    <div
                      key={dish.name}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{dish.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Star className="h-3 w-3 fill-warning text-warning" />
                            {dish.rating}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">{dish.orders} orders</p>
                        <p className="text-xs text-success">{dish.trend}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cuisine" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Cuisine Distribution</CardTitle>
                <CardDescription>Breakdown of orders by cuisine type</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={cuisineShare}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cuisineShare.map((entry, index) => (
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

            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle>Customer Segmentation</CardTitle>
                <CardDescription>Detailed customer analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Returning Customers</span>
                    <span className="text-sm text-muted-foreground">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">New Customers</span>
                    <span className="text-sm text-muted-foreground">32%</span>
                  </div>
                  <Progress value={32} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">VIP Customers</span>
                    <span className="text-sm text-muted-foreground">15%</span>
                  </div>
                  <Progress value={15} className="h-2" />
                </div>
                <div className="pt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Total Unique Customers</span>
                    <Badge variant="secondary">1,247</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Customer Retention Rate</span>
                    <Badge variant="default">68%</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Average Visit Frequency</span>
                    <Badge variant="outline">2.3x/month</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hours" className="space-y-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Hourly Order Distribution</CardTitle>
              <CardDescription>Busiest hours throughout the day with revenue correlation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={hourlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="hour"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={11}
                    angle={-45}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, "dataMax + 5"]}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, "dataMax + 100"]}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value, name) => {
                      if (name === "Revenue ($)") {
                        return [`$${value}`, name]
                      }
                      return [value, name]
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="orders" fill="#4ECDC4" name="Orders" radius={[4, 4, 0, 0]} />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="revenue"
                    stroke="#FF6B35"
                    strokeWidth={3}
                    name="Revenue ($)"
                    dot={{ fill: "#FF6B35", strokeWidth: 2, r: 4 }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Monthly Performance Comparison</CardTitle>
              <CardDescription>Year-over-year revenue comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="thisYear" fill="#06FFA5" name="2024" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="lastYear" fill="#FFD23F" name="2023" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
            <CardDescription>Key operational metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Average Preparation Time</span>
              <Badge variant="outline">18 min</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Order Accuracy</span>
              <Badge variant="default">96.5%</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Table Turnover Rate</span>
              <Badge variant="secondary">2.3x/day</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Staff Efficiency</span>
              <Badge variant="default">92%</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alerts & Notifications</CardTitle>
            <CardDescription>Important updates requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
              <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Low Stock Alert</p>
                <p className="text-muted-foreground">Tomatoes running low (2 days remaining)</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <Users className="h-4 w-4 text-primary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Staff Schedule</p>
                <p className="text-muted-foreground">3 servers scheduled for tonight's rush</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
              <Star className="h-4 w-4 text-secondary mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Customer Feedback</p>
                <p className="text-muted-foreground">5 new reviews received (avg. 4.9 stars)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
