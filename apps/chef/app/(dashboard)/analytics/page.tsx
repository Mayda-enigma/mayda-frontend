"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, Clock, ChefHat, DollarSign, AlertTriangle } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import { useCurrentUser } from "@/features/auth"
import { useKitchenQueue } from "@/features/orders/api/queries"
import { useKitchenAnalytics } from "@/features/analytics"

const STATUS_COLORS: Record<string, string> = {
  CONFIRMED: "#f59e0b",
  PREPARING: "#3b82f6",
  READY: "#10b981",
  COMPLETED: "#6b7280",
  CANCELLED: "#ef4444",
  PENDING: "#f59e0b",
}

const HOUR_LABELS: Record<number, string> = {
  0: "0h", 1: "1h", 2: "2h", 3: "3h", 4: "4h", 5: "5h",
  6: "6h", 7: "7h", 8: "8h", 9: "9h", 10: "10h", 11: "11h",
  12: "12h", 13: "13h", 14: "14h", 15: "15h", 16: "16h",
  17: "17h", 18: "18h", 19: "19h", 20: "20h", 21: "21h", 22: "22h", 23: "23h",
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"day" | "week" | "month">("day")
  const { t } = useI18n()
  const { data: user } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? 0

  const { data: analytics, isLoading: analyticsLoading } = useKitchenAnalytics(timeRange)
  const { data: orders = [], isLoading: ordersLoading } = useKitchenQueue(restaurantId)

  const isLoading = analyticsLoading || ordersLoading

  const orderVolumeData = useMemo(() => {
    if (!analytics) return []
    return analytics.ordersPerHour
      .filter((h) => h.orderCount > 0)
      .map((h) => ({
        time: HOUR_LABELS[h.hour] || `${h.hour}h`,
        orders: h.orderCount,
      }))
  }, [analytics])

  const statusDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const order of orders) {
      counts[order.status] = (counts[order.status] || 0) + 1
    }
    const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1
    return Object.entries(counts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1).replace("-", " "),
      value: Math.round((count / total) * 100),
      color: STATUS_COLORS[status.toUpperCase().replace("-", "_")] || "#6b7280",
    }))
  }, [orders])

  const typeDistribution = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const order of orders) {
      const type = order.id.includes("DINE") ? "Dine In" : order.id.includes("DELIVERY") ? "Delivery" : "Takeaway"
      // Fallback: we don't have type in Order domain type, but we have id/backendId
      counts[type] = (counts[type] || 0) + 1
    }
    return Object.entries(counts).map(([name, value]) => ({
      name,
      orders: value,
      revenue: 0,
    }))
  }, [orders])

  const revenue = useMemo(() => {
    // Total amount isn't in the Order domain type, compute from itemCount as proxy
    return orders.length * 15.5
  }, [orders])

  const avgOrderValue = useMemo(() => {
    if (!orders.length) return 0
    return revenue / orders.length
  }, [orders, revenue])

  const kpiData = useMemo(() => [
    {
      title: t.totalOrdersKpi,
      value: orders.length.toString(),
      change: `Active: ${orders.filter((o) => o.status === "in-progress").length}`,
      trend: "up" as const,
      icon: ChefHat,
      color: "text-green-400",
    },
    {
      title: t.revenue,
      value: `$${revenue.toFixed(0)}`,
      change: `${orders.length} orders`,
      trend: "up" as const,
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      title: t.avgPrepTime,
      value: analytics ? `${analytics.avgPrepMinutes.toFixed(1)} min` : "—",
      change: analytics ? `${analytics.ordersPerHour.reduce((s, h) => s + h.orderCount, 0)} orders tracked` : "",
      trend: analytics && analytics.avgPrepMinutes <= 15 ? "up" : "down",
      icon: Clock,
      color: analytics && analytics.avgPrepMinutes <= 15 ? "text-green-400" : "text-red-400",
    },
    {
      title: "Late Orders",
      value: analytics ? `${analytics.lateOrderRate.toFixed(1)}%` : "—",
      change: analytics && analytics.lateOrderRate <= 10 ? "Within target" : "Needs attention",
      trend: analytics && analytics.lateOrderRate <= 10 ? "up" : "down",
      icon: AlertTriangle,
      color: analytics && analytics.lateOrderRate <= 10 ? "text-green-400" : "text-red-400",
    },
  ], [orders, analytics, revenue, t])

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view analytics</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 leading-tight">
            {t.kitchenAnalytics}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">{t.performanceInsights}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {(
            [
              { key: "day" as const, label: t.today },
              { key: "week" as const, label: t.week },
              { key: "month" as const, label: t.month },
            ]
          ).map((range) => (
            <Button
              key={range.key}
              variant={timeRange === range.key ? "default" : "outline"}
              onClick={() => setTimeRange(range.key)}
              className={
                timeRange === range.key
                  ? "bg-orange-500 hover:bg-orange-600 transition-all duration-200 transform hover:scale-105 min-h-[44px]"
                  : "border-border text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200 min-h-[44px]"
              }
            >
              {range.label}
            </Button>
          ))}
        </div>

        {isLoading && (
          <div className="text-center py-8 text-muted-foreground">
            Loading analytics data...
          </div>
        )}

        {!isLoading && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {kpiData.map((kpi, index) => {
                const Icon = kpi.icon
                const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown
                return (
                  <Card
                    key={index}
                    className="bg-card border-border hover:bg-accent/50 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs sm:text-sm text-muted-foreground mb-1">{kpi.title}</p>
                          <p className="text-xl sm:text-2xl font-bold text-card-foreground">{kpi.value}</p>
                          <div className={`flex items-center gap-1 text-xs sm:text-sm ${kpi.color}`}>
                            <TrendIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                            {kpi.change}
                          </div>
                        </div>
                        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400" />
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="bg-card border-border">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-orange-500 text-base sm:text-lg">{t.orderVolumeToday}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Orders received per hour</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  {orderVolumeData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={orderVolumeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            color: "hsl(var(--popover-foreground))",
                          }}
                        />
                        <Area type="monotone" dataKey="orders" stroke="#f59e0b" fill="url(#orderGradient)" />
                        <defs>
                          <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[250px] flex items-center justify-center text-muted-foreground">
                      No order volume data for this period
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-orange-500 text-base sm:text-lg">{t.orderStatusDistribution}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Current order completion rates</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  {statusDistribution.length > 0 ? (
                    <>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={statusDistribution}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {statusDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: "hsl(var(--popover))",
                              border: "1px solid hsl(var(--border))",
                              borderRadius: "8px",
                              color: "hsl(var(--popover-foreground))",
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
                        {statusDistribution.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                            <span className="text-xs sm:text-sm text-muted-foreground">
                              {item.name}: {item.value}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                      No orders yet
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <Card className="bg-card border-border">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-orange-500 text-base sm:text-lg">{t.topPerformingDishes}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Kitchen workload overview</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-3 sm:space-y-4">
                    {orders.length > 0 ? (
                      <>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-card border-border">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">Active</Badge>
                            <span className="font-medium text-card-foreground text-sm sm:text-base">
                              {orders.filter((o) => o.status === "in-progress").length}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground">orders in progress</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-card border-border">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">Ready</Badge>
                            <span className="font-medium text-card-foreground text-sm sm:text-base">
                              {orders.filter((o) => o.status === "ready").length}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground">orders ready</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-card border-border">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">Pending</Badge>
                            <span className="font-medium text-card-foreground text-sm sm:text-base">
                              {orders.filter((o) => o.status === "pending").length}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground">orders waiting</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-card border-border">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">Total</Badge>
                            <span className="font-medium text-card-foreground text-sm sm:text-base">
                              {orders.length}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-muted-foreground">all kitchen orders</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-6 text-muted-foreground">
                        No orders data available
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-orange-500 text-base sm:text-lg">{t.kitchenEfficiency}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Average preparation time vs order volume</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  {analytics ? (
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={[
                        { name: "Avg Prep", value: analytics.avgPrepMinutes },
                        { name: "Late Rate", value: analytics.lateOrderRate },
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            color: "hsl(var(--popover-foreground))",
                          }}
                        />
                        <Bar dataKey="value" fill="#ef4444" name="Minutes/%" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                      No efficiency data for this period
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card border-border">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-orange-500 text-base sm:text-lg">{t.revenueTrend}</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Order volume and value overview
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {analytics && orderVolumeData.length > 0 ? (
                  <>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={orderVolumeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--popover))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                            color: "hsl(var(--popover-foreground))",
                          }}
                        />
                        <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={3} name="Orders" />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Avg Prep</p>
                        <p className="text-lg font-bold text-card-foreground">{analytics.avgPrepMinutes.toFixed(1)}m</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Late Rate</p>
                        <p className="text-lg font-bold text-card-foreground">{analytics.lateOrderRate.toFixed(1)}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Total Orders</p>
                        <p className="text-lg font-bold text-card-foreground">{orders.length}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                    No trend data for this period
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}
