"use client"

import { useState, useMemo } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu"
import { Clock, Users, ChefHat, AlertTriangle, Filter, Grid3X3, List, Eye, Utensils } from "lucide-react"
import { cn } from "@/shared/utils"
import Link from "next/link"
import { useCurrentUser } from "@/features/auth"
import { useTables } from "@/features/tables"
import { TableStatusBar } from "@/components/table-status-bar"

type SortOption = "newest" | "longest" | "urgency"

const statusConfig: Record<string, { label: string; color: string; cardColor: string }> = {
  AVAILABLE: {
    label: "Libre",
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    cardColor: "border-green-200 dark:border-green-800",
  },
  OCCUPIED: {
    label: "Occupée",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    cardColor: "border-blue-200 dark:border-blue-800",
  },
}

export function TableOverview() {
  const { data: currentUser } = useCurrentUser()
  const restaurantId = currentUser?.restaurantId ?? 0
  const { data: tables = [], isLoading } = useTables(restaurantId)

  const [sortBy, setSortBy] = useState<SortOption>("urgency")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const sortedTables = useMemo(() => {
    const sorted = [...tables].sort((a, b) => {
      const aOccupied = a.status === "OCCUPIED"
      const bOccupied = b.status === "OCCUPIED"
      const aElapsed = a.currentSession
        ? (Date.now() - new Date(a.currentSession.startedAt).getTime()) / 60000
        : 0
      const bElapsed = b.currentSession
        ? (Date.now() - new Date(b.currentSession.startedAt).getTime()) / 60000
        : 0

      switch (sortBy) {
        case "newest":
          return bElapsed - aElapsed
        case "longest":
          return aElapsed - bElapsed
        case "urgency":
          if (aOccupied && !bOccupied) return -1
          if (!aOccupied && bOccupied) return 1
          return b.activeOrdersCount - a.activeOrdersCount
        default:
          return 0
      }
    })
    return sorted
  }, [tables, sortBy])

  const formatTime = (minutes: number) => {
    if (minutes === 0) return "0m"
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
  }

  const needsAttentionCount = tables.filter(
    (t) => t.status === "OCCUPIED" && t.activeOrdersCount > 0,
  ).length

  if (isLoading) {
    return (
      <div className="p-1.5 sm:p-3 space-y-3 sm:space-y-4">
        <div className="h-8 bg-muted rounded animate-pulse" />
        <div className="grid gap-1.5 sm:gap-2 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-3 space-y-2">
                <div className="h-4 bg-muted rounded w-12 animate-pulse" />
                <div className="h-3 bg-muted rounded w-24 animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-1.5 sm:p-3 space-y-3 sm:space-y-4">
      <TableStatusBar tables={tables} />

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Utensils className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
            <h2 className="text-base sm:text-lg font-semibold text-foreground">Tables</h2>
          </div>
          <p className="text-xs text-muted-foreground">
            {needsAttentionCount} nécessitent attention
          </p>
        </div>

        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1 bg-transparent text-xs h-7 px-1.5 sm:h-8 sm:px-2"
              >
                <Filter className="h-3 w-3" />
                <span className="hidden sm:inline text-xs">Trier</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs animate-fade-in">
              <DropdownMenuItem onClick={() => setSortBy("urgency")} className="text-xs py-1.5">
                <AlertTriangle className="h-3 w-3 mr-2" />
                Par urgence
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("newest")} className="text-xs py-1.5">
                <Clock className="h-3 w-3 mr-2" />
                Commandes récentes
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("longest")} className="text-xs py-1.5">
                <Clock className="h-3 w-3 mr-2" />
                Attente la plus longue
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

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

      <div
        className={cn(
          viewMode === "grid"
            ? "grid gap-1.5 sm:gap-2 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : "space-y-1.5 sm:space-y-2",
        )}
      >
        {sortedTables.map((table) => {
          const config = statusConfig[table.status] || statusConfig.AVAILABLE
          const elapsedMinutes = table.currentSession
            ? (Date.now() - new Date(table.currentSession.startedAt).getTime()) / 60000
            : 0
          const isOccupied = table.status === "OCCUPIED"

          return (
            <Card
              key={table.id}
              className={cn(
                "relative overflow-hidden transition-all duration-200",
                config.cardColor,
                isOccupied && table.activeOrdersCount > 0 && "animate-glow ring-1 ring-primary/30",
                viewMode === "list" && "flex-row",
              )}
            >
              <CardContent
                className={cn("p-2 sm:p-3", viewMode === "list" && "flex items-center justify-between w-full")}
              >
                {viewMode === "list" ? (
                  <>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <h3 className="text-xs sm:text-sm font-semibold">{table.number}</h3>
                        {isOccupied && table.activeOrdersCount > 0 && (
                          <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                        )}
                      </div>
                      <Badge className={cn("text-xs", config.color)}>{config.label}</Badge>
                    </div>

                    {isOccupied && (
                      <div className="flex items-center gap-2 sm:gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-2.5 w-2.5" />
                          <span>{table.capacity}</span>
                        </div>
                        {table.activeOrdersCount > 0 && (
                          <div className="flex items-center gap-1">
                            <ChefHat className="h-2.5 w-2.5" />
                            <span>{table.activeOrdersCount}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Clock className="h-2.5 w-2.5" />
                          <span>{formatTime(elapsedMinutes)}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex-shrink-0">
                      <Link href={`/table/${table.id}`}>
                        <Button size="sm" className="hover:-dark text-white text-xs h-6 px-2">
                          <Eye className="h-2.5 w-2.5 sm:mr-1" />
                          <span className="hidden sm:inline">Voir</span>
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <div className="flex items-center gap-1">
                        <h3 className="text-xs sm:text-sm font-semibold">{table.number}</h3>
                        {isOccupied && table.activeOrdersCount > 0 && (
                          <AlertTriangle className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
                        )}
                      </div>
                      <Badge className={cn("text-xs", config.color)}>{config.label}</Badge>
                    </div>

                    <div className="space-y-1">
                      {isOccupied ? (
                        <>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Users className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span>{table.capacity} places</span>
                          </div>
                          {table.activeOrdersCount > 0 && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <ChefHat className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                              <span>{table.activeOrdersCount} commandes</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                            <span>{formatTime(elapsedMinutes)}</span>
                          </div>
                        </>
                      ) : (
                        <p className="text-xs text-muted-foreground">Disponible pour placement</p>
                      )}
                    </div>

                    {isOccupied && (
                      <div className="mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-border">
                        <Link href={`/table/${table.id}`}>
                          <Button
                            size="sm"
                            className="w-full hover:-dark text-white text-xs h-6 sm:h-7"
                          >
                            <Eye className="h-2.5 w-2.5 sm:h-3 sm:w-3 mr-1" />
                            Voir détails
                          </Button>
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
