"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Phone, Mail, Users, Clock, CheckCircle, XCircle } from "lucide-react"

const allReservations = [
  {
    id: 1,
    customerName: "John Smith",
    email: "john@example.com",
    phone: "+1 234-567-8900",
    date: "2024-01-20",
    time: "19:00",
    guests: 4,
    table: "T-12",
    status: "confirmed" as const,
    notes: "Anniversary dinner, requested window table",
  },
  {
    id: 2,
    customerName: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 234-567-8901",
    date: "2024-01-20",
    time: "20:30",
    guests: 2,
    table: "T-05",
    status: "pending" as const,
    notes: "Vegetarian preferences",
  },
  {
    id: 3,
    customerName: "Mike Wilson",
    email: "mike@example.com",
    phone: "+1 234-567-8902",
    date: "2024-01-21",
    time: "18:30",
    guests: 6,
    table: "T-20",
    status: "confirmed" as const,
    notes: "Business dinner",
  },
  {
    id: 4,
    customerName: "Emily Davis",
    email: "emily@example.com",
    phone: "+1 234-567-8903",
    date: "2024-01-21",
    time: "19:30",
    guests: 3,
    table: "T-08",
    status: "cancelled" as const,
    notes: "Family dinner, cancelled due to illness",
  },
  {
    id: 5,
    customerName: "David Brown",
    email: "david@example.com",
    phone: "+1 234-567-8904",
    date: "2024-01-22",
    time: "20:00",
    guests: 8,
    table: "T-25",
    status: "confirmed" as const,
    notes: "Birthday celebration, cake requested",
  },
]

const statusConfig = {
  confirmed: { className: "bg-success text-white", icon: CheckCircle },
  pending: { className: "bg-warning text-black", icon: Clock },
  cancelled: { className: "bg-destructive text-destructive-foreground", icon: XCircle },
}

interface ReservationFilteredTableProps {
  statusFilter?: "confirmed" | "pending" | "cancelled"
  title: string
  description: string
}

export function ReservationFilteredTable({
  statusFilter,
  title,
  description,
}: ReservationFilteredTableProps) {
  const filtered = statusFilter
    ? allReservations.filter((r) => r.status === statusFilter)
    : allReservations

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Guests</TableHead>
                <TableHead>Table</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((r) => {
                const config = statusConfig[r.status]
                const StatusIcon = config.icon
                return (
                  <TableRow key={r.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{r.customerName}</p>
                        {r.notes && (
                          <p className="text-xs text-muted-foreground truncate max-w-32">{r.notes}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-xs">
                          <Phone className="h-3 w-3" />
                          {r.phone}
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                          <Mail className="h-3 w-3" />
                          {r.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{r.date}</p>
                        <p className="text-sm text-muted-foreground">{r.time}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {r.guests}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{r.table}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={config.className}>
                        <div className="flex items-center gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {r.status}
                        </div>
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
