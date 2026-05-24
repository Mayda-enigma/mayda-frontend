"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useMonthlyComparison } from "../api/queries"
import type { RangePreset } from "../types"

export function MonthlySection({ range }: { range: RangePreset }) {
  const { data: monthlyData } = useMonthlyComparison(range)

  return (
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
  )
}
