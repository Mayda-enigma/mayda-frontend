"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Calendar, Clock, DollarSign, Lightbulb, TrendingUp } from "lucide-react"
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
const monthlyData = [
  { month: "Jan", thisYear: 45000, lastYear: 38000 }, { month: "Feb", thisYear: 48000, lastYear: 42000 },
  { month: "Mar", thisYear: 52000, lastYear: 45000 }, { month: "Apr", thisYear: 58000, lastYear: 48000 },
  { month: "May", thisYear: 62000, lastYear: 52000 }, { month: "Jun", thisYear: 68000, lastYear: 58000 },
]
export function AnalyticsDashboard() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-pretty">Comprehensive insights and performance metrics for your restaurant</p>
        </div>
        <Button variant="outline" size="sm" className="hover:bg-primary/10 transition-colors bg-transparent">
          <Calendar className="h-4 w-4 mr-2" />
          Last 7 Days
        </Button>
      </div>

      <KpiCards />
      <RevenueChart />

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
        <TabsContent value="revenue"><RevenueChart /></TabsContent>
        <TabsContent value="popular"><TopDishes /></TabsContent>
        <TabsContent value="cuisine"><CuisineShare /></TabsContent>
        <TabsContent value="hours"><HourlyHeatmap /></TabsContent>
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
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
