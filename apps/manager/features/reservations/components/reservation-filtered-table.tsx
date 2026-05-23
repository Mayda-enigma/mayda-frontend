"use client"

import { useMemo } from "react"
import { useCurrentUser } from "@/features/auth/api/queries"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { useReservations } from "../api/queries"
import { ListView } from "./list-view"
import type { ReservationStatus } from "../types"

const today = new Date().toISOString().slice(0, 10)

interface ReservationFilteredTableProps {
  statusFilter?: Exclude<ReservationStatus, "completed" | "no-show">
  title: string
  description: string
}

export function ReservationFilteredTable({
  statusFilter,
  title,
  description,
}: ReservationFilteredTableProps) {
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? null
  const reservationsQuery = useReservations(restaurantId, today)

  const filteredReservations = useMemo(() => {
    const reservations = reservationsQuery.data ?? []
    if (!statusFilter) {
      return reservations
    }

    return reservations.filter(
      (reservation) => reservation.status === statusFilter,
    )
  }, [reservationsQuery.data, statusFilter])

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {isUserLoading || reservationsQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">
              Loading reservations...
            </p>
          ) : null}
          {!isUserLoading && restaurantId === null ? (
            <Alert variant="destructive">
              <AlertTitle>Restaurant context missing</AlertTitle>
              <AlertDescription>
                The current manager account is not linked to a restaurant.
              </AlertDescription>
            </Alert>
          ) : null}
          {reservationsQuery.isError ? (
            <Alert variant="destructive">
              <AlertTitle>Could not load reservations</AlertTitle>
              <AlertDescription>
                The reservation request failed. Refresh the page and try again.
              </AlertDescription>
            </Alert>
          ) : null}
          {!reservationsQuery.isLoading &&
          !reservationsQuery.isError &&
          restaurantId !== null ? (
            filteredReservations.length > 0 ? (
              <ListView reservations={filteredReservations} />
            ) : (
              <p className="text-sm text-muted-foreground">
                No reservations matched this status.
              </p>
            )
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}
