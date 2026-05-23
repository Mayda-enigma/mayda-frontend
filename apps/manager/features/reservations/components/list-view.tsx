"use client"

import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table"
import type { Reservation, ReservationStatus } from "../types"

const statusBadgeVariant: Record<
  ReservationStatus,
  "secondary" | "success" | "destructive" | "warning" | "outline"
> = {
  pending: "warning",
  confirmed: "success",
  cancelled: "destructive",
  completed: "secondary",
  "no-show": "outline",
}

interface ListViewProps {
  reservations: Reservation[]
  onStatusChange?: (
    reservation: Reservation,
    status: ReservationStatus,
  ) => Promise<void>
  updatingId?: string
}

export function ListView({
  reservations,
  onStatusChange,
  updatingId,
}: ListViewProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Status</TableHead>
            {onStatusChange ? (
              <TableHead className="text-right">Actions</TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => {
            const isUpdating = updatingId === reservation.id

            return (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">
                  {reservation.customerName}
                </TableCell>
                <TableCell>{reservation.customerPhone}</TableCell>
                <TableCell>
                  {reservation.startTime} to {reservation.endTime}
                </TableCell>
                <TableCell>{reservation.tableNumber}</TableCell>
                <TableCell>
                  <Badge variant={statusBadgeVariant[reservation.status]}>
                    {reservation.status}
                  </Badge>
                </TableCell>
                {onStatusChange ? (
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isUpdating}
                        onClick={() => onStatusChange(reservation, "confirmed")}
                      >
                        Confirm
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isUpdating}
                        onClick={() => onStatusChange(reservation, "cancelled")}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isUpdating}
                        onClick={() => onStatusChange(reservation, "no-show")}
                      >
                        No-show
                      </Button>
                    </div>
                  </TableCell>
                ) : null}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
