"use client"

import { useRange } from "../hooks/use-range"
import { RevenueChart } from "./revenue-chart"
import { TopDishes } from "./top-dishes"
import { CuisineShare } from "./cuisine-share"
import { HourlyHeatmap } from "./hourly-heatmap"
import { MonthlySection } from "./monthly-section"

interface DashboardSectionProps {
  section: "revenue" | "popular-dishes" | "cuisine-share" | "busy-hours" | "monthly"
}

export function DashboardSection({ section }: DashboardSectionProps) {
  const { range } = useRange()

  switch (section) {
    case "revenue":
      return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div>
            <h1 className="text-3xl font-bold text-balance">Revenus</h1>
            <p className="text-muted-foreground text-pretty">Revenus quotidiens et tendances des commandes</p>
          </div>
          <RevenueChart range={range} />
        </div>
      )

    case "popular-dishes":
      return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div>
            <h1 className="text-3xl font-bold text-balance">Plats populaires</h1>
            <p className="text-muted-foreground text-pretty">Meilleurs articles du menu par nombre de commandes</p>
          </div>
          <TopDishes range={range} />
        </div>
      )

    case "cuisine-share":
      return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div>
            <h1 className="text-3xl font-bold text-balance">Part par cuisine</h1>
            <p className="text-muted-foreground text-pretty">Répartition des commandes par type de cuisine</p>
          </div>
          <CuisineShare range={range} />
        </div>
      )

    case "busy-hours":
      return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div>
            <h1 className="text-3xl font-bold text-balance">Heures d'affluence</h1>
            <p className="text-muted-foreground text-pretty">Répartition horaire des commandes et corrélation des revenus</p>
          </div>
          <HourlyHeatmap range={range} />
        </div>
      )

    case "monthly":
      return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div>
            <h1 className="text-3xl font-bold text-balance">Comparaison mensuelle</h1>
            <p className="text-muted-foreground text-pretty">Comparaison des revenus d'une année sur l'autre</p>
          </div>
          <MonthlySection range={range} />
        </div>
      )
  }
}
