"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { cn } from "@/shared/utils"
import { Clock, DollarSign, Lightbulb, TrendingUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts"
import { KpiCards } from "./kpi-cards"
import { RevenueChart } from "./revenue-chart"
import { TopDishes } from "./top-dishes"
import { HourlyHeatmap } from "./hourly-heatmap"
import { CuisineShare } from "./cuisine-share"
import { PerformanceMetrics } from "./performance-metrics"
import { useMonthlyComparison } from "../api/queries"
import { useRange } from "../hooks/use-range"
import type { RangePreset } from "../types"

const RANGES: { label: string; value: RangePreset }[] = [
  { label: "7 Days", value: "7d" },
  { label: "30 Days", value: "30d" },
  { label: "90 Days", value: "90d" },
]
export function AnalyticsDashboard() {
  const { range, setRange } = useRange()
  const { data: monthlyData } = useMonthlyComparison(range)
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-pretty">Comprehensive insights and performance metrics for your restaurant</p>
        </div>
        <div className="flex items-center gap-1 rounded-lg border p-0.5">
          {RANGES.map((r) => (
            <Button
              key={r.value}
              variant="ghost"
              size="sm"
              onClick={() => setRange(r.value)}
              className={cn(
                "h-7 px-3 text-xs font-medium",
                range === r.value && "bg-muted text-foreground shadow-sm",
              )}
            >
              {r.label}
            </Button>
          ))}
        </div>
      </div>

      <KpiCards range={range} />
      <RevenueChart range={range} />

      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Lightbulb className="h-5 w-5 text-primary" />
            AI Predictive Insights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { icon: <TrendingUp className="h-5 w-5 text-success mt-0.5" />, title: "Pizza Margherita demand expected +25% this weekend", desc: "Based on historical data. Consider increasing inventory." },
            { icon: <DollarSign className="h-5 w-5 text-primary mt-0.5" />, title: "Promoting Chicken Alfredo may increase revenue by 15%", desc: "High-margin dish with growing popularity." },
            { icon: <Clock className="h-5 w-5 text-accent mt-0.5" />, title: "Peak hours: 7-8 PM shows 15% increase in wait times", desc: "Consider adding staff during peak hours." },
          ].map((insight) => (
            <div key={insight.title} className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
              {insight.icon}
              <div>
                <p className="font-medium text-sm">{insight.title}</p>
                <p className="text-xs text-muted-foreground">{insight.desc}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="popular">Popular Dishes</TabsTrigger>
          <TabsTrigger value="cuisine">Cuisine Share</TabsTrigger>
          <TabsTrigger value="hours">Busy Hours</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue"><RevenueChart range={range} /></TabsContent>
        <TabsContent value="popular"><TopDishes range={range} /></TabsContent>
        <TabsContent value="cuisine"><CuisineShare range={range} /></TabsContent>
        <TabsContent value="hours"><HourlyHeatmap range={range} /></TabsContent>
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData ?? []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Legend />
                  <Bar dataKey="thisYear" fill="#06FFA5" name="2024" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="lastYear" fill="#FFD23F" name="2023" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <PerformanceMetrics />
    </div>
  )
}
