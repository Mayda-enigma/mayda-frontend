"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bell,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Filter,
  Search,
  MoreVertical,
  Trash2,
  Eye,
  Settings,
} from "lucide-react"

const notifications = [
  {
    id: 1,
    type: "alert",
    title: "Low Stock Alert",
    message: "Tomatoes running critically low - only 2 days remaining",
    time: "2 minutes ago",
    read: false,
    priority: "high",
    category: "inventory",
  },
  {
    id: 2,
    type: "info",
    title: "New Order Received",
    message: "Table 12 - Pizza Margherita x2, Caesar Salad x1",
    time: "5 minutes ago",
    read: false,
    priority: "medium",
    category: "orders",
  },
  {
    id: 3,
    type: "success",
    title: "Staff Check-in",
    message: "Maria Rodriguez checked in for evening shift",
    time: "15 minutes ago",
    read: true,
    priority: "low",
    category: "staff",
  },
  {
    id: 4,
    type: "alert",
    title: "Kitchen Equipment Alert",
    message: "Oven #2 temperature sensor needs calibration",
    time: "1 hour ago",
    read: false,
    priority: "high",
    category: "equipment",
  },
  {
    id: 5,
    type: "info",
    title: "Reservation Update",
    message: "Party of 8 confirmed for 7:30 PM tonight",
    time: "2 hours ago",
    read: true,
    priority: "medium",
    category: "reservations",
  },
  {
    id: 6,
    type: "success",
    title: "Daily Sales Target",
    message: "Congratulations! Today's sales target achieved (102%)",
    time: "3 hours ago",
    read: true,
    priority: "low",
    category: "sales",
  },
]

export function NotificationsPage() {
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  const getIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-5 w-5 text-destructive" />
      case "info":
        return <Info className="h-5 w-5 text-primary" />
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-muted-foreground" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive/10 border-destructive/20"
      case "medium":
        return "bg-primary/10 border-primary/20"
      case "low":
        return "bg-muted/50 border-border"
      default:
        return "bg-muted/50 border-border"
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && !notification.read) ||
      (filter === "priority" && notification.priority === "high") ||
      notification.category === filter

    const matchesSearch =
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">Notifications</h1>
          <p className="text-muted-foreground text-pretty">
            Stay updated with real-time alerts and system notifications
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilter("all")}>All Notifications</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("unread")}>Unread Only</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("priority")}>High Priority</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("inventory")}>Inventory</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("orders")}>Orders</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("staff")}>Staff</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilter("equipment")}>Equipment</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Notification Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Priority</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <Bell className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">6</p>
              </div>
              <Clock className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <Bell className="h-8 w-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
          <CardDescription>
            {filteredNotifications.length} notification{filteredNotifications.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${getPriorityColor(notification.priority)} ${
                !notification.read ? "ring-2 ring-primary/20" : ""
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  {getIcon(notification.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      {!notification.read && (
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs capitalize">
                        {notification.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {notification.category}
                      </Badge>
                    </div>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      Mark as Read
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No notifications found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
