"use client"

import { useCurrentUser } from "@/features/auth/api/queries"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { AlertCircle } from "lucide-react"
import { useStock } from "../api/queries"
import { StockTable } from "./stock-table"
import type { StockStatus } from "../types"

interface StockFilteredTableProps {
  statusFilter?: StockStatus
  title: string
  description: string
}

export function StockFilteredTable({
  statusFilter,
  title,
  description,
}: StockFilteredTableProps) {
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? null
  const stockQuery = useStock(restaurantId)

  const stockItems = stockQuery.data ?? []
  const filteredItems = statusFilter
    ? stockItems.filter((item) => item.status === statusFilter)
    : stockItems

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {isUserLoading || stockQuery.isLoading ? (
        <Alert>
          <AlertTitle>Loading stock</AlertTitle>
          <AlertDescription>
            Fetching inventory items for this restaurant.
          </AlertDescription>
        </Alert>
      ) : null}
      {!isUserLoading && restaurantId === null ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Restaurant context missing</AlertTitle>
          <AlertDescription>
            This manager account is not linked to a restaurant, so stock items cannot be shown.
          </AlertDescription>
        </Alert>
      ) : null}
      {stockQuery.isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could not load stock</AlertTitle>
          <AlertDescription>
            The inventory API request failed. Refresh the page and try again.
          </AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <StockTable
            items={filteredItems}
            emptyMessage="No stock items match this view."
          />
        </CardContent>
      </Card>
    </div>
  )
}
