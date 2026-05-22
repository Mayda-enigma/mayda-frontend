"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, Users, ChefHat, AlertTriangle, Filter, Grid3X3, List, Eye, Leaf, Utensils } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

type TableStatus = "free" | "occupied" | "waiting" | "served"
type SortOption = "newest" | "longest" | "urgency"

export interface Table {
  id: number
  number: string
  status: TableStatus
  guests: number
  pendingOrders: number
  elapsedTime: number // in minutes
  needsAttention: boolean
  lastOrderTime?: string
}

// Mock data
export const mockTables: Table[] = [
  {
    id: 1,
    number: "T01",
    status: "waiting",
    guests: 4,
    pendingOrders: 2,
    elapsedTime: 15,
    needsAttention: true,
    lastOrderTime: "14:30",
  },
  {
    id: 2,
    number: "T02",
    status: "served",
    guests: 2,
    pendingOrders: 0,
    elapsedTime: 45,
    needsAttention: false,
    lastOrderTime: "14:15",
  },
  {
    id: 3,
    number: "T03",
    status: "occupied",
    guests: 6,
    pendingOrders: 1,
    elapsedTime: 25,
    needsAttention: false,
    lastOrderTime: "14:25",
  },
  {
    id: 4,
    number: "T04",
    status: "free",
    guests: 0,
    pendingOrders: 0,
    elapsedTime: 0,
    needsAttention: false,
  },
  {
    id: 5,
    number: "T05",
    status: "waiting",
    guests: 3,
    pendingOrders: 3,
    elapsedTime: 35,
    needsAttention: true,
    lastOrderTime: "14:10",
  },
  {
    id: 6,
    number: "T06",
    status: "occupied",
    guests: 2,
    pendingOrders: 1,
    elapsedTime: 10,
    needsAttention: false,
    lastOrderTime: "14:35",
  },
]

const statusConfig = {
  free: {
    label: "Free",
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    cardColor: "border-green-200 dark:border-green-800",
  },
  occupied: {
    label: "Occupied",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    cardColor: "border-blue-200 dark:border-blue-800",
  },
  waiting: {
    label: "Waiting",
    color: "bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400",
    cardColor: "border-amber-200 dark:border-amber-800",
  },
  served: {
    label: "Served",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
    cardColor: "border-emerald-200 dark:border-emerald-800",
  },
}

export function TableOverview() {
  const [sortBy, setSortBy] = useState<SortOption>("urgency")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const sortedTables = useMemo(() => {
    const sorted = [...mockTables].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return b.elapsedTime - a.elapsedTime
        case "longest":
          return a.elapsedTime - b.elapsedTime
        case "urgency":
          if (a.needsAttention && !b.needsAttention) return -1
          if (!a.needsAttention && b.needsAttention) return 1
          return b.pendingOrders - a.pendingOrders
        default:
          return 0
      }
    })
    return sorted
  }, [sortBy])

  const formatTime = (minutes: number) => {
    if (minutes === 0) return "0m"
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  return (
    <div className="p-1.5 sm:p-3 space-y-3 sm:space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Utensils className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <h2 className="text-base sm:text-lg font-heading text-foreground">Tables</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            {mockTables.filter((t) => t.needsAttention).length} need attention
          </p>
        </div>

        <div className="flex items-center gap-1">
          {/* Sort Options */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 bg-transparent text-xs h-7 px-1.5 sm:h-8 sm:px-2 hover-lift"
              >
                <Filter className="h-3 w-3" />
                <span className="hidden sm:inline text-xs">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs animate-fade-in">
              <DropdownMenuItem onClick={() => setSortBy("urgency")} className="text-xs py-1.5">
                <AlertTriangle className="h-3 w-3 mr-2" />
                By Urgency
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("newest")} className="text-xs py-1.5">
                <Clock className="h-3 w-3 mr-2" />
                Newest Orders
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("longest")} className="text-xs py-1.5">
                <Clock className="h-3 w-3 mr-2" />
                Longest Waiting
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-border p-0.5">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="h-6 w-6 p-0 sm:h-7 sm:w-7"
            >
              <Grid3X3 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="h-6 w-6 p-0 sm:h-7 sm:w-7"
            >
              <List className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tables Grid/List */}
      <div
        className={cn(
          viewMode === "grid"
            ? "grid gap-1.5 sm:gap-2 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "space-y-1.5 sm:space-y-2",
        )}
      >
        {sortedTables.map((table) => {
          const config = statusConfig[table.status]
          return (
            <Card
              key={table.id}
              className={cn(
                "relative overflow-hidden transition-all duration-200 hover-lift",
                config.cardColor,
                table.needsAttention && "animate-glow ring-1 ring-primary/30",
                viewMode === "list" && "flex-row",
              )}
            >
              <CardContent
                className={cn("p-2 sm:p-3", viewMode === "list" && "flex items-center justify-between w-full")}
              >
                {viewMode === "list" ? (
                  <>
                    {/* Left side - Table info */}
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="text-xs sm:text-sm font-heading">{table.number}</h3>
                        {table.needsAttention && <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-500" />}
                        {Math.random() > 0.7 && (
                          <span title="Vegetarian options">
                            <Leaf className="h-2.5 w-2.5 text-green-600" />
                          </span>
                        )}
                      </div>
                      <Badge className={cn("text-xs", config.color)}>{config.label}</Badge>
                    </div>

                    {/* Center - Table details */}
                    {table.status !== "free" && (
                      <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-2.5 w-2.5" />
                          <span className="hidden xs:inline">{table.guests}</span>
                        </div>
                        {table.pendingOrders > 0 && (
                          <div className="flex items-center gap-1">
                            <ChefHat className="h-2.5 w-2.5" />
                            <span className="hidden xs:inline">{table.pendingOrders}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />
                          <span>{formatTime(table.elapsedTime)}</span>
                        </div>
                      </div>
                    )}

                    {/* Right side - Action button */}
                    <div className="flex-shrink-0">
                      <Link href={`/table/${table.id}`}>
                        <Button
                          size="sm"
                          className="bg-gradient-primary hover:bg-gradient-primary-dark text-white text-xs h-6 px-2"
                        >
                          <Eye className="h-2.5 w-2.5 sm:mr-1" />
                          <span className="hidden sm:inline">View</span>
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Grid view - existing layout with improvements */}
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <div className="flex items-center gap-1">
                        <h3 className="text-xs sm:text-sm font-heading">{table.number}</h3>
                        {table.needsAttention && <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-500" />}
                        {Math.random() > 0.7 && (
                          <span title="Vegetarian options">
                            <Leaf className="h-2.5 w-2.5 text-green-600" />
                          </span>
                        )}
                      </div>
                      <Badge className={cn("text-xs", config.color)}>{config.label}</Badge>
                    </div>

                    {/* Table Info */}
                    <div className="space-y-1">
                      {table.status !== "free" && (
                        <>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span>{table.guests} guests</span>
                          </div>

                          {table.pendingOrders > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <ChefHat className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              <span>{table.pendingOrders} pending</span>
                            </div>
                          )}

                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span>{formatTime(table.elapsedTime)}</span>
                          </div>
                        </>
                      )}

                      {table.status === "free" && (
                        <p className="text-xs text-muted-foreground">Available for seating</p>
                      )}
                    </div>

                    {/* Quick Actions */}
                    {table.status !== "free" && (
                      <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-border">
                        <Link href={`/table/${table.id}`}>
                          <Button
                            size="sm"
                            className="w-full bg-gradient-primary hover:bg-gradient-primary-dark text-white text-xs h-6 sm:h-7"
                          >
                            <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                            View Details
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </CardContent>

              {table.needsAttention && (
                <div className="absolute top-1.5 right-1.5 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full animate-pulse" />
              )}
            </Card>
          )
        })}
      </div>
    </div>
  )
}
