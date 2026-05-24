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
            <h1 className="text-3xl font-bold text-balance">Revenue</h1>
            <p className="text-muted-foreground text-pretty">Daily revenue and order trends</p>
          </div>
          <RevenueChart range={range} />
        </div>
      )

    case "popular-dishes":
      return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div>
            <h1 className="text-3xl font-bold text-balance">Popular Dishes</h1>
            <p className="text-muted-foreground text-pretty">Top performing menu items by order count</p>
          </div>
          <TopDishes range={range} />
        </div>
      )

    case "cuisine-share":
      return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div>
            <h1 className="text-3xl font-bold text-balance">Cuisine Share</h1>
            <p className="text-muted-foreground text-pretty">Breakdown of orders by cuisine type</p>
          </div>
          <CuisineShare range={range} />
        </div>
      )

    case "busy-hours":
      return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div>
            <h1 className="text-3xl font-bold text-balance">Busy Hours</h1>
            <p className="text-muted-foreground text-pretty">Hourly order distribution and revenue correlation</p>
          </div>
          <HourlyHeatmap range={range} />
        </div>
      )

    case "monthly":
      return (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <div>
            <h1 className="text-3xl font-bold text-balance">Monthly Comparison</h1>
            <p className="text-muted-foreground text-pretty">Year-over-year revenue comparison</p>
          </div>
          <MonthlySection range={range} />
        </div>
      )
  }
}
