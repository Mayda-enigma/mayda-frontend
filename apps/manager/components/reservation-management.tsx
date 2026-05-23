"use client"

import { useState, useCallback, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Badge } from "@/shared/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog"
import { Label } from "@/shared/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select"
import { Textarea } from "@/shared/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { toast } from "@/hooks/use-toast"
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  Plus,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  GripVertical,
} from "lucide-react"
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd"

// Mock data for reservations
const initialReservations = [
  {
    id: 1,
    customerName: "John Smith",
    email: "john@example.com",
    phone: "+1 234-567-8900",
    date: "2024-01-20",
    time: "19:00",
    guests: 4,
    table: "T-12",
    status: "confirmed",
    notes: "Anniversary dinner, requested window table",
    createdAt: "2024-01-15",
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
    status: "pending",
    notes: "Vegetarian preferences",
    createdAt: "2024-01-18",
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
    status: "confirmed",
    notes: "Business dinner",
    createdAt: "2024-01-16",
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
    status: "cancelled",
    notes: "Family dinner, cancelled due to illness",
    createdAt: "2024-01-17",
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
    status: "confirmed",
    notes: "Birthday celebration, cake requested",
    createdAt: "2024-01-19",
  },
]

const timeSlots = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]

const tables = [
  { id: "T-01", capacity: 2, location: "Window" },
  { id: "T-02", capacity: 2, location: "Window" },
  { id: "T-05", capacity: 4, location: "Center" },
  { id: "T-08", capacity: 4, location: "Center" },
  { id: "T-12", capacity: 4, location: "Window" },
  { id: "T-15", capacity: 6, location: "Private" },
  { id: "T-20", capacity: 6, location: "Center" },
  { id: "T-25", capacity: 8, location: "Private" },
]

export function ReservationManagement() {
  const [selectedDate, setSelectedDate] = useState("2024-01-20")
  const [viewMode, setViewMode] = useState("daily")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState<any>(null)
  const [reservations, setReservations] = useState(initialReservations)

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    table: "",
    status: "pending",
    notes: "",
  })

  const resetForm = () => {
    setFormData({
      customerName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: "",
      table: "",
      status: "pending",
      notes: "",
    })
  }

  const handleAddReservation = () => {
    if (
      !formData.customerName ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.guests
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newReservation = {
      id: Math.max(...reservations.map((r) => r.id)) + 1,
      ...formData,
      guests: Number.parseInt(formData.guests),
      createdAt: new Date().toISOString().split("T")[0],
    }

    setReservations([...reservations, newReservation])
    setIsAddDialogOpen(false)
    resetForm()
    toast({
      title: "Success",
      description: "Reservation created successfully.",
    })
  }

  const handleEditReservation = () => {
    if (
      !formData.customerName ||
      !formData.email ||
      !formData.phone ||
      !formData.date ||
      !formData.time ||
      !formData.guests
    ) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const updatedReservations = reservations.map((reservation) =>
      reservation.id === selectedReservation.id
        ? { ...reservation, ...formData, guests: Number.parseInt(formData.guests) }
        : reservation,
    )

    setReservations(updatedReservations)
    setIsEditDialogOpen(false)
    setSelectedReservation(null)
    resetForm()
    toast({
      title: "Success",
      description: "Reservation updated successfully.",
    })
  }

  const handleDeleteReservation = () => {
    const updatedReservations = reservations.filter((reservation) => reservation.id !== selectedReservation.id)
    setReservations(updatedReservations)
    setIsDeleteDialogOpen(false)
    setSelectedReservation(null)
    toast({
      title: "Success",
      description: "Reservation deleted successfully.",
    })
  }

  const openEditDialog = (reservation: any) => {
    setSelectedReservation(reservation)
    setFormData({
      customerName: reservation.customerName,
      email: reservation.email,
      phone: reservation.phone,
      date: reservation.date,
      time: reservation.time,
      guests: reservation.guests.toString(),
      table: reservation.table,
      status: reservation.status,
      notes: reservation.notes,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteDialog = (reservation: any) => {
    setSelectedReservation(reservation)
    setIsDeleteDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-success text-white"
      case "pending":
        return "bg-warning text-black"
      case "cancelled":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-3 w-3" />
      case "pending":
        return <Clock className="h-3 w-3" />
      case "cancelled":
        return <XCircle className="h-3 w-3" />
      default:
        return null
    }
  }

  const filteredReservations = reservations.filter((reservation) => {
    if (viewMode === "daily") {
      return reservation.date === selectedDate
    }
    // For weekly/monthly views, you'd implement date range filtering
    return true
  })

  const confirmedCount = reservations.filter((r) => r.status === "confirmed").length
  const pendingCount = reservations.filter((r) => r.status === "pending").length
  const totalGuests = reservations.filter((r) => r.status === "confirmed").reduce((sum, r) => sum + r.guests, 0)
  const occupancyRate = Math.round((confirmedCount / tables.length) * 100)

  const weekDays = useMemo(() => {
    const start = new Date(selectedDate)
    const day = start.getDay()
    const diff = start.getDate() - day + (day === 0 ? -6 : 1)
    const monday = new Date(start.setDate(diff))
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)
      return {
        id: date.toISOString().split("T")[0],
        label: date.toLocaleDateString("en-US", { weekday: "short" }),
        dateLabel: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      }
    })
  }, [selectedDate])

  const kanbanColumns = useMemo(() => {
    if (viewMode === "weekly") {
      return weekDays.map((day) => ({
        ...day,
        items: filteredReservations.filter((r) => r.date === day.id),
      }))
    }
    return timeSlots.map((time) => ({
      id: time,
      label: time,
      dateLabel: "time slot",
      items: filteredReservations.filter((r) => r.time === time),
    }))
  }, [viewMode, weekDays, filteredReservations])

  const handleDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return
      const { source, destination, draggableId } = result
      if (source.droppableId === destination.droppableId) return

      const destinationId = destination.droppableId
      const isDateColumn = /^\d{4}-\d{2}-\d{2}$/.test(destinationId)

      setReservations((prev) => {
        const dragged = prev.find((r) => r.id === Number(draggableId))
        if (!dragged) return prev

        toast({
          title: "Reservation moved",
          description: `${dragged.customerName} moved to ${isDateColumn ? destinationId : destinationId}`,
        })

        return prev.map((r) =>
          r.id === dragged.id
            ? {
                ...r,
                date: isDateColumn ? destinationId : r.date,
                time: isDateColumn ? r.time : destinationId,
              }
            : r,
        )
      })
    },
    [],
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Reservation Management</h1>
          <p className="text-muted-foreground text-pretty">Manage bookings and optimize table assignments</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              New Reservation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Reservation</DialogTitle>
              <DialogDescription>Create a new table reservation</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    placeholder="Enter customer name"
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    placeholder="+1 234-567-8900"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Time *</Label>
                  <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="guests">Guests *</Label>
                  <Select
                    value={formData.guests}
                    onValueChange={(value) => setFormData({ ...formData, guests: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Number" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="table">Preferred Table</Label>
                <Select value={formData.table} onValueChange={(value) => setFormData({ ...formData, table: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select table" />
                  </SelectTrigger>
                  <SelectContent>
                    {tables.map((table) => (
                      <SelectItem key={table.id} value={table.id}>
                        {table.id} - {table.capacity} seats ({table.location})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Special Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requests or notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddReservation}>Create Reservation</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Reservation</DialogTitle>
            <DialogDescription>Update reservation details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-customerName">Customer Name *</Label>
                <Input
                  id="edit-customerName"
                  placeholder="Enter customer name"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Phone Number *</Label>
                <Input
                  id="edit-phone"
                  placeholder="+1 234-567-8900"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email Address *</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="customer@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-date">Date *</Label>
                <Input
                  id="edit-date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-time">Time *</Label>
                <Select value={formData.time} onValueChange={(value) => setFormData({ ...formData, time: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-guests">Guests *</Label>
                <Select value={formData.guests} onValueChange={(value) => setFormData({ ...formData, guests: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Number" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-table">Table</Label>
              <Select value={formData.table} onValueChange={(value) => setFormData({ ...formData, table: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select table" />
                </SelectTrigger>
                <SelectContent>
                  {tables.map((table) => (
                    <SelectItem key={table.id} value={table.id}>
                      {table.id} - {table.capacity} seats ({table.location})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-notes">Special Notes</Label>
              <Textarea
                id="edit-notes"
                placeholder="Any special requests or notes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditReservation}>Update Reservation</Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Reservation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the reservation for {selectedReservation?.customerName}? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteReservation}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-success/15 text-success">
                <CheckCircle className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Confirmed</p>
                <div className="text-2xl font-bold text-success">{confirmedCount}</div>
                <p className="text-xs text-muted-foreground">Active reservations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-warning/15 text-warning">
                <Clock className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Pending</p>
                <div className="text-2xl font-bold text-warning">{pendingCount}</div>
                <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
                <Users className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Total Guests</p>
                <div className="text-2xl font-bold">{totalGuests}</div>
                <p className="text-xs text-muted-foreground">Expected today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-blue/15 text-accent-blue">
                <MapPin className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-muted-foreground">Occupancy</p>
                <div className="text-2xl font-bold">{occupancyRate}%</div>
                <p className="text-xs text-muted-foreground">Table utilization</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Reservation Calendar */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reservation Kanban</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="size-4" />
              </Button>
              <span className="text-sm font-medium px-4">January 2024</span>
              <Button variant="outline" size="sm">
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "daily" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("daily")}
              >
                Daily
              </Button>
              <Button
                variant={viewMode === "weekly" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("weekly")}
              >
                Weekly
              </Button>
              <Button
                variant={viewMode === "monthly" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("monthly")}
              >
                Monthly
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-muted-foreground" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-8 w-44"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {kanbanColumns.map((column) => (
                <div key={column.id} className="flex min-w-56 flex-1 flex-col">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{column.label}</span>
                      <Badge variant="outline" className="text-xs">{column.items.length}</Badge>
                    </div>
                    <span className="text-xs text-muted-foreground">{column.dateLabel}</span>
                  </div>
                  <Droppable droppableId={column.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`flex flex-col gap-2 rounded-lg border p-2 min-h-32 transition-colors ${
                          snapshot.isDraggingOver
                            ? "bg-accent/50 border-primary/30"
                            : "bg-muted/30 border-border"
                        }`}
                      >
                        {column.items.map((reservation, index) => (
                          <Draggable
                            key={reservation.id}
                            draggableId={String(reservation.id)}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                className={`rounded-md border bg-card p-3 text-sm transition-shadow ${
                                  snapshot.isDragging
                                    ? "shadow-depth-overlay"
                                    : "shadow-depth-btn"
                                }`}
                              >
                                <div className="flex items-start gap-2">
                                  <span
                                    {...provided.dragHandleProps}
                                    className="mt-0.5 text-muted-foreground/40 hover:text-muted-foreground transition-colors cursor-grab active:cursor-grabbing"
                                  >
                                    <GripVertical className="size-3.5" />
                                  </span>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-1.5">
                                      <span className="size-1.5 shrink-0 rounded-full" style={{
                                        backgroundColor:
                                          reservation.status === "confirmed"
                                            ? "hsl(var(--success))"
                                            : reservation.status === "pending"
                                              ? "hsl(var(--warning))"
                                              : "hsl(var(--destructive))",
                                      }} />
                                      <span className="font-medium truncate">
                                        {reservation.customerName}
                                      </span>
                                    </div>
                                    <div className="mt-1 flex flex-wrap gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                                      <span>{reservation.time}</span>
                                      <span>{reservation.guests} guests</span>
                                      <span>{reservation.table}</span>
                                    </div>
                                    <div className="mt-1.5 flex items-center gap-2">
                                      {getStatusIcon(reservation.status)}
                                      <span className="text-xs capitalize">{reservation.status}</span>
                                    </div>
                                  </div>
                                  <div className="flex gap-0.5 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => openEditDialog(reservation)}
                                      className="grid size-6 place-items-center rounded text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                      aria-label="Edit reservation"
                                    >
                                      <Edit className="size-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => openDeleteDialog(reservation)}
                                      className="grid size-6 place-items-center rounded text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                                      aria-label="Delete reservation"
                                    >
                                      <Trash2 className="size-3" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                        {column.items.length === 0 && !snapshot.isDraggingOver && (
                          <div className="flex flex-1 items-center justify-center py-6">
                            <p className="text-xs text-muted-foreground/60">Drop here</p>
                          </div>
                        )}
                      </div>
                    )}
                  </Droppable>
                </div>
              ))}
            </div>
          </DragDropContext>
        </CardContent>
      </Card>

      {/* Reservations Management */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Reservations</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Reservations</CardTitle>
              <CardDescription>Complete list of all reservations</CardDescription>
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
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{reservation.customerName}</p>
                          {reservation.notes && (
                            <p className="text-xs text-muted-foreground truncate max-w-32">{reservation.notes}</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1 text-xs">
                            <Phone className="h-3 w-3" />
                            {reservation.phone}
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Mail className="h-3 w-3" />
                            {reservation.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{reservation.date}</p>
                          <p className="text-sm text-muted-foreground">{reservation.time}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {reservation.guests}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{reservation.table}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(reservation.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(reservation.status)}
                            {reservation.status}
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openEditDialog(reservation)}
                            className="hover:bg-primary/10"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteDialog(reservation)}
                            className="hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="confirmed">
          <Card>
            <CardHeader>
              <CardTitle>Confirmed Reservations</CardTitle>
              <CardDescription>All confirmed bookings</CardDescription>
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
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations
                    .filter((r) => r.status === "confirmed")
                    .map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{reservation.customerName}</p>
                            {reservation.notes && (
                              <p className="text-xs text-muted-foreground truncate max-w-32">{reservation.notes}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs">
                              <Phone className="h-3 w-3" />
                              {reservation.phone}
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Mail className="h-3 w-3" />
                              {reservation.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{reservation.date}</p>
                            <p className="text-sm text-muted-foreground">{reservation.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {reservation.guests}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{reservation.table}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(reservation)}
                              className="hover:bg-primary/10"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDeleteDialog(reservation)}
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reservations</CardTitle>
              <CardDescription>Reservations awaiting confirmation</CardDescription>
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
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations
                    .filter((r) => r.status === "pending")
                    .map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{reservation.customerName}</p>
                            {reservation.notes && (
                              <p className="text-xs text-muted-foreground truncate max-w-32">{reservation.notes}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs">
                              <Phone className="h-3 w-3" />
                              {reservation.phone}
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Mail className="h-3 w-3" />
                              {reservation.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{reservation.date}</p>
                            <p className="text-sm text-muted-foreground">{reservation.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {reservation.guests}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{reservation.table}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(reservation)}
                              className="hover:bg-primary/10"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDeleteDialog(reservation)}
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cancelled">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Reservations</CardTitle>
              <CardDescription>Previously cancelled bookings</CardDescription>
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
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reservations
                    .filter((r) => r.status === "cancelled")
                    .map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{reservation.customerName}</p>
                            {reservation.notes && (
                              <p className="text-xs text-muted-foreground truncate max-w-32">{reservation.notes}</p>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-xs">
                              <Phone className="h-3 w-3" />
                              {reservation.phone}
                            </div>
                            <div className="flex items-center gap-1 text-xs">
                              <Mail className="h-3 w-3" />
                              {reservation.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{reservation.date}</p>
                            <p className="text-sm text-muted-foreground">{reservation.time}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {reservation.guests}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{reservation.table}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openEditDialog(reservation)}
                              className="hover:bg-primary/10"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => openDeleteDialog(reservation)}
                              className="hover:bg-destructive/10 hover:text-destructive"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
