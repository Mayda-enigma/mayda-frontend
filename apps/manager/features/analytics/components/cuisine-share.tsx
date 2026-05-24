"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useCuisineShare } from "../api/queries"
import type { RangePreset } from "../types"

export function CuisineShare({ range }: { range: RangePreset }) {
  const { data: cuisineData } = useCuisineShare(range)

  if (!cuisineData) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <CardTitle>Répartition par cuisine</CardTitle>
          <CardDescription>Répartition des commandes par type de cuisine</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={cuisineData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {cuisineData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
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
          <CardTitle>Segmentation client</CardTitle>
          <CardDescription>Analyse détaillée des clients</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Clients fidèles</span>
              <span className="text-sm text-muted-foreground">68%</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Nouveaux clients</span>
              <span className="text-sm text-muted-foreground">32%</span>
            </div>
            <Progress value={32} className="h-2" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Clients VIP</span>
              <span className="text-sm text-muted-foreground">15%</span>
            </div>
            <Progress value={15} className="h-2" />
          </div>
          <div className="pt-4 space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Total de clients uniques</span>
              <Badge variant="secondary">1,247</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Taux de fidélisation</span>
              <Badge variant="default">68%</Badge>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Fréquence de visite moyenne</span>
              <Badge variant="outline">2.3x/month</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
