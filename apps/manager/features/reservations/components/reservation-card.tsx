"use client"

import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { Phone, TimerReset } from "lucide-react"
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

interface ReservationCardProps {
  reservation: Reservation
  onStatusChange: (
    reservation: Reservation,
    status: ReservationStatus,
  ) => Promise<void>
  isUpdating?: boolean
}

export function ReservationCard({
  reservation,
  onStatusChange,
  isUpdating,
}: ReservationCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-4 shadow-depth-card">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="font-medium">{reservation.customerName}</p>
          <p className="text-sm text-muted-foreground">
            {reservation.startTime} to {reservation.endTime}
          </p>
        </div>
        <Badge variant={statusBadgeVariant[reservation.status]}>
          {reservation.status}
        </Badge>
      </div>
      <div className="mt-3 space-y-1 text-sm text-muted-foreground">
        <p>Table {reservation.tableNumber}</p>
        <p className="flex items-center gap-1">
          <Phone className="h-3 w-3" />
          {reservation.customerPhone}
        </p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={isUpdating}
          onClick={() => onStatusChange(reservation, "confirmed")}
        >
          Confirmer
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={isUpdating}
          onClick={() => onStatusChange(reservation, "cancelled")}
        >
          Annuler
        </Button>
        <Button
          variant="outline"
          size="sm"
          disabled={isUpdating}
          onClick={() => onStatusChange(reservation, "no-show")}
        >
          <TimerReset className="h-3 w-3" />
          Absent
        </Button>
      </div>
    </div>
  )
}

