"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
} from "lucide-react"

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
        return "bg-green-500 text-white"
      case "pending":
        return "bg-yellow-500 text-black"
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
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{confirmedCount}</div>
            <p className="text-xs text-muted-foreground">Active reservations</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">Awaiting confirmation</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests}</div>
            <p className="text-xs text-muted-foreground">Expected today</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate}%</div>
            <p className="text-xs text-muted-foreground">Table utilization</p>
          </CardContent>
        </Card>
      </div>

      {/* Calendar View Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Reservation Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium px-4">January 2024</span>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
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
        </CardHeader>
        <CardContent>
          {/* Date Selector */}
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-48"
            />
          </div>

          {/* Time Slot Grid */}
          <div className="space-y-4">
            <h3 className="font-medium">Time Slots for {selectedDate}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {timeSlots.map((time) => {
                const slotReservations = filteredReservations.filter((r) => r.time === time)
                return (
                  <Card key={time} className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{time}</span>
                      <Badge variant="outline">{slotReservations.length}</Badge>
                    </div>
                    <div className="space-y-2">
                      {slotReservations.map((reservation) => (
                        <div
                          key={reservation.id}
                          className={`p-2 rounded text-xs ${getStatusColor(reservation.status)}`}
                        >
                          <div className="flex items-center gap-1">
                            {getStatusIcon(reservation.status)}
                            <span className="font-medium">{reservation.customerName}</span>
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            <span>{reservation.guests} guests</span>
                            <span>{reservation.table}</span>
                          </div>
                        </div>
                      ))}
                      {slotReservations.length === 0 && (
                        <div className="text-xs text-muted-foreground text-center py-2">Available</div>
                      )}
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
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
