"use client"

import { useState } from "react"
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
import { TrendingUp, TrendingDown, Clock, ChefHat, DollarSign, Users } from "lucide-react"
import { useI18n } from "@/components/i18n-provider"
import {
  useKitchenKpis,
  useOrderVolume,
  useTopDishes,
  useKitchenEfficiency,
  useOrderStatus,
  useRevenueTrend,
  type RangePreset,
} from "@/features/analytics"

const ORDER_STATUS_COLORS: Record<string, string> = {
  Completed: "#10b981",
  "In Progress": "#f59e0b",
  Delayed: "#ef4444",
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value)

const formatTrend = (value: number) => `${value >= 0 ? "+" : ""}${value.toFixed(1)}%`

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<RangePreset>("today")
  const { t } = useI18n()

  const kpisQuery = useKitchenKpis(timeRange)
  const orderVolumeQuery = useOrderVolume(timeRange)
  const topDishesQuery = useTopDishes(timeRange)
  const efficiencyQuery = useKitchenEfficiency(timeRange)
  const orderStatusQuery = useOrderStatus(timeRange)
  const revenueQuery = useRevenueTrend(timeRange)

  const orderVolumeData = orderVolumeQuery.data ?? []
  const topDishesData = topDishesQuery.data ?? []
  const efficiencyData = (efficiencyQuery.data ?? []).map((p) => ({
    day: p.day,
    avgTime: p.avgTimeMinutes,
    orders: p.orders,
  }))
  const orderStatusData = (orderStatusQuery.data ?? []).map((s) => ({
    ...s,
    color: ORDER_STATUS_COLORS[s.name] ?? "#94a3b8",
  }))
  const revenueData = revenueQuery.data ?? []

  const kpis = kpisQuery.data
  const kpiData = [
    {
      title: t.totalOrdersKpi,
      value: kpis ? kpis.totalOrders.toLocaleString() : "—",
      change: kpis ? formatTrend(kpis.ordersTrend) : "",
      trend: (kpis?.ordersTrend ?? 0) >= 0 ? "up" : "down",
      icon: ChefHat,
      color: "text-green-400",
    },
    {
      title: t.revenue,
      value: kpis ? formatCurrency(kpis.revenue) : "—",
      change: kpis ? formatTrend(kpis.revenueTrend) : "",
      trend: (kpis?.revenueTrend ?? 0) >= 0 ? "up" : "down",
      icon: DollarSign,
      color: "text-green-400",
    },
    {
      title: t.avgPrepTime,
      value: kpis ? `${kpis.avgPrepTimeMinutes.toFixed(1)} min` : "—",
      change: kpis ? formatTrend(kpis.avgPrepTimeTrend) : "",
      trend: (kpis?.avgPrepTimeTrend ?? 0) <= 0 ? "up" : "down",
      icon: Clock,
      color: "text-green-400",
    },
    {
      title: t.customerSatisfaction,
      value: kpis ? `${kpis.customerRating.toFixed(1)}/5` : "—",
      change: kpis ? formatTrend(kpis.customerRatingTrend) : "",
      trend: (kpis?.customerRatingTrend ?? 0) >= 0 ? "up" : "down",
      icon: Users,
      color: "text-green-400",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-orange-500 leading-tight">
            {t.kitchenAnalytics}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">{t.performanceInsights}</p>
        </div>

        {/* Time Range Selector */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {(
            [
              { key: "today", label: t.today },
              { key: "week", label: t.week },
              { key: "month", label: t.month },
            ] as const
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

        {/* KPI Cards */}
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

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Order Volume Chart */}
          <Card className="bg-card border-border">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-orange-500 text-base sm:text-lg">{t.orderVolumeToday}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Orders received throughout the day</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
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
            </CardContent>
          </Card>

          {/* Order Status Distribution */}
          <Card className="bg-card border-border">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-orange-500 text-base sm:text-lg">{t.orderStatusDistribution}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Current order completion rates</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
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
                {orderStatusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Dishes and Kitchen Efficiency */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Popular Dishes */}
          <Card className="bg-card border-border">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-orange-500 text-base sm:text-lg">{t.topPerformingDishes}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Most ordered items this week</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="space-y-3 sm:space-y-4">
                {topDishesData.map((dish, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                        <span className="font-medium text-card-foreground text-sm sm:text-base">{dish.name}</span>
                      </div>
                      <Progress
                        value={topDishesData[0]?.orders ? (dish.orders / topDishesData[0].orders) * 100 : 0}
                        className="h-2"
                      />
                    </div>
                    <div className="text-right ml-4">
                      <p className="font-semibold text-card-foreground text-sm sm:text-base">{dish.orders}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">${dish.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Kitchen Efficiency */}
          <Card className="bg-card border-border">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-orange-500 text-base sm:text-lg">{t.kitchenEfficiency}</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Average preparation time vs order volume</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Bar dataKey="avgTime" fill="#ef4444" name="Avg Time (min)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend */}
        <Card className="bg-card border-border">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-orange-500 text-base sm:text-lg">{t.revenueTrend}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Monthly revenue and order volume comparison
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--popover))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    color: "hsl(var(--popover-foreground))",
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue ($)" />
                <Line type="monotone" dataKey="orders" stroke="#f59e0b" strokeWidth={3} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
