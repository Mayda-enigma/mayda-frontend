"use client"

import { useMemo, useState } from "react"
import { useCurrentUser } from "@/features/auth/api/queries"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { useToast } from "@/shared/ui/use-toast"
import { AlertCircle, Calendar, CheckCircle2, Clock3, Users } from "lucide-react"
import { useUpdateReservation } from "../api/mutations"
import { useReservations } from "../api/queries"
import { CalendarView } from "./calendar-view"
import { ListView } from "./list-view"
import type { Reservation, ReservationStatus } from "../types"

const today = new Date().toISOString().slice(0, 10)

export function ReservationManagement() {
  const { toast } = useToast()
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? null
  const [selectedDate, setSelectedDate] = useState(today)

  const reservationsQuery = useReservations(restaurantId, selectedDate)
  const reservations = reservationsQuery.data ?? []
  const updateReservation = useUpdateReservation(restaurantId ?? 0, selectedDate)

  const pendingReservations = useMemo(
    () => reservations.filter((reservation) => reservation.status === "pending"),
    [reservations],
  )
  const confirmedReservations = useMemo(
    () =>
      reservations.filter((reservation) => reservation.status === "confirmed"),
    [reservations],
  )
  const noShowReservations = useMemo(
    () => reservations.filter((reservation) => reservation.status === "no-show"),
    [reservations],
  )

  const handleStatusChange = async (
    reservation: Reservation,
    status: ReservationStatus,
  ) => {
    try {
      await updateReservation.mutateAsync({ id: reservation.id, status })
      toast({
        title: "Reservation updated",
        description: `${reservation.customerName} is now marked as ${status}.`,
      })
    } catch {
      toast({
        title: "Update failed",
        description: "The reservation status could not be updated.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-balance">
            Reservation Desk
          </h1>
          <p className="text-base text-muted-foreground">
            Review today&apos;s bookings and update statuses in one place.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <Input
            type="date"
            value={selectedDate}
            onChange={(event) => setSelectedDate(event.target.value)}
            className="w-44"
          />
        </div>
      </div>

      {isUserLoading || reservationsQuery.isLoading ? (
        <Alert>
          <AlertTitle>Loading reservations</AlertTitle>
          <AlertDescription>
            Fetching reservations for {selectedDate}.
          </AlertDescription>
        </Alert>
      ) : null}
      {!isUserLoading && restaurantId === null ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Restaurant context missing</AlertTitle>
          <AlertDescription>
            This manager account is not linked to a restaurant, so reservation
            actions are unavailable.
          </AlertDescription>
        </Alert>
      ) : null}
      {reservationsQuery.isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could not load reservations</AlertTitle>
          <AlertDescription>
            The reservation API request failed. Refresh the page and try again.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-md bg-warning/15 text-warning">
                <Clock3 className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Pending</p>
                <p className="text-2xl font-semibold tabular-nums">
                  {pendingReservations.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-md bg-success/15 text-success">
                <CheckCircle2 className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-semibold tabular-nums">
                  {confirmedReservations.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-md bg-secondary/20 text-secondary-foreground">
                <Users className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">No-show</p>
                <p className="text-2xl font-semibold tabular-nums">
                  {noShowReservations.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Floor View</CardTitle>
        </CardHeader>
        <CardContent>
          {reservations.length > 0 ? (
            <CalendarView
              reservations={reservations}
              onStatusChange={handleStatusChange}
              updatingId={
                updateReservation.isPending
                  ? updateReservation.variables?.id
                  : undefined
              }
            />
          ) : (
            <p className="text-sm text-muted-foreground">
              No reservations scheduled for this date.
            </p>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>Reservation List</CardTitle>
            </CardHeader>
            <CardContent>
              <ListView
                reservations={reservations}
                onStatusChange={handleStatusChange}
                updatingId={
                  updateReservation.isPending
                    ? updateReservation.variables?.id
                    : undefined
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="confirmed">
          <Card>
            <CardHeader>
              <CardTitle>Confirmed Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <ListView
                reservations={confirmedReservations}
                onStatusChange={handleStatusChange}
                updatingId={
                  updateReservation.isPending
                    ? updateReservation.variables?.id
                    : undefined
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <ListView
                reservations={pendingReservations}
                onStatusChange={handleStatusChange}
                updatingId={
                  updateReservation.isPending
                    ? updateReservation.variables?.id
                    : undefined
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Reservations</CardTitle>
            </CardHeader>
            <CardContent>
              <ListView
                reservations={reservations.filter(
                  (reservation) => reservation.status === "cancelled",
                )}
                onStatusChange={handleStatusChange}
                updatingId={
                  updateReservation.isPending
                    ? updateReservation.variables?.id
                    : undefined
                }
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
