"use client"

import { useMemo } from "react"
import { useCurrentUser } from "@/features/auth/api/queries"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { useOrders } from "../api/queries"
import { OrderListTable } from "./order-list-table"
import type { OrderStatus } from "../types"

interface OrderFilteredTableProps {
  statusFilter?: OrderStatus
  title: string
  description: string
}

export function OrderFilteredTable({
  statusFilter,
  title,
  description,
}: OrderFilteredTableProps) {
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? null
  const ordersQuery = useOrders(restaurantId)

  const filteredOrders = useMemo(() => {
    const orders = ordersQuery.data ?? []
    if (!statusFilter) return orders
    return orders.filter((o) => o.status === statusFilter)
  }, [ordersQuery.data, statusFilter])

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-semibold text-balance">{title}</h1>
        <p className="text-base text-muted-foreground">{description}</p>
      </div>

      <Card>
        <CardContent className="p-0">
          {isUserLoading || ordersQuery.isLoading ? (
            <div className="p-6">
              <p className="text-sm text-muted-foreground">Loading orders...</p>
            </div>
          ) : null}
          {!isUserLoading && restaurantId === null ? (
            <Alert variant="destructive" className="m-6">
              <AlertTitle>Restaurant context missing</AlertTitle>
              <AlertDescription>
                This manager account is not linked to a restaurant.
              </AlertDescription>
            </Alert>
          ) : null}
          {ordersQuery.isError ? (
            <Alert variant="destructive" className="m-6">
              <AlertTitle>Could not load orders</AlertTitle>
              <AlertDescription>
                The orders request failed. Refresh the page and try again.
              </AlertDescription>
            </Alert>
          ) : null}
          {!ordersQuery.isLoading &&
          !ordersQuery.isError &&
          restaurantId !== null ? (
            filteredOrders.length > 0 ? (
              <OrderListTable orders={filteredOrders} />
            ) : (
              <p className="p-6 text-sm text-muted-foreground">
                No orders match this status.
              </p>
            )
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
