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
  { label: "7 jours", value: "7d" },
  { label: "30 jours", value: "30d" },
  { label: "90 jours", value: "90d" },
]
export function AnalyticsDashboard() {
  const { range, setRange } = useRange()
  const { data: monthlyData } = useMonthlyComparison(range)
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Tableau de bord analytique</h1>
          <p className="text-muted-foreground text-pretty">Aperçu complet et indicateurs de performance pour votre restaurant</p>
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
            Insights prédictifs IA
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { icon: <TrendingUp className="h-5 w-5 text-success mt-0.5" />, title: "Demande de Pizza Margherita attendue +25% ce week-end", desc: "Basé sur les données historiques. Envisagez d'augmenter les stocks." },
            { icon: <DollarSign className="h-5 w-5 text-primary mt-0.5" />, title: "Promouvoir le Chicken Alfredo peut augmenter les revenus de 15%", desc: "Plat à forte marge avec une popularité croissante." },
            { icon: <Clock className="h-5 w-5 text-accent mt-0.5" />, title: "Heures de pointe : 19h-20h montre une augmentation de 15% des temps d'attente", desc: "Envisagez d'ajouter du personnel aux heures de pointe." },
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
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="popular">Plats populaires</TabsTrigger>
          <TabsTrigger value="cuisine">Part par cuisine</TabsTrigger>
          <TabsTrigger value="hours">Heures d'affluence</TabsTrigger>
          <TabsTrigger value="monthly">Mensuel</TabsTrigger>
        </TabsList>
        <TabsContent value="revenue"><RevenueChart range={range} /></TabsContent>
        <TabsContent value="popular"><TopDishes range={range} /></TabsContent>
        <TabsContent value="cuisine"><CuisineShare range={range} /></TabsContent>
        <TabsContent value="hours"><HourlyHeatmap range={range} /></TabsContent>
        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Comparaison mensuelle des performances</CardTitle>
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
