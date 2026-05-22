"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  CheckCircle,
  Truck,
  AlertTriangle,
  Plus,
  Mic,
  MicOff,
  Clock,
  Users,
  MessageSquare,
  ChefHat,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface OrderItem {
  id: string
  name: string
  quantity: number
  status: "pending" | "preparing" | "ready" | "served"
  specialInstructions?: string
  estimatedTime?: number
}

interface Order {
  id: string
  tableNumber: string
  items: OrderItem[]
  totalAmount: number
  orderTime: Date
  status: "active" | "completed"
  guests: number
}

// Mock data
const mockOrder: Order = {
  id: "ORD-001",
  tableNumber: "T03",
  items: [
    {
      id: "1",
      name: "Grilled Salmon",
      quantity: 2,
      status: "ready",
      specialInstructions: "No lemon",
      estimatedTime: 5,
    },
    {
      id: "2",
      name: "Caesar Salad",
      quantity: 1,
      status: "served",
    },
    {
      id: "3",
      name: "Pasta Carbonara",
      quantity: 1,
      status: "preparing",
      estimatedTime: 12,
    },
    {
      id: "4",
      name: "Red Wine",
      quantity: 2,
      status: "pending",
    },
  ],
  totalAmount: 89.5,
  orderTime: new Date(Date.now() - 1800000), // 30 minutes ago
  status: "active",
  guests: 4,
}

const statusConfig = {
  pending: {
    label: "Pending",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400",
    icon: Clock,
  },
  preparing: {
    label: "Preparing",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400",
    icon: ChefHat,
  },
  ready: {
    label: "Ready",
    color: "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400",
    icon: CheckCircle,
  },
  served: {
    label: "Served",
    color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400",
    icon: Truck,
  },
}

export function OrderManagement({ tableNumber = "T03" }: { tableNumber?: string }) {
  const [order, setOrder] = useState<Order>(mockOrder)
  const [isListening, setIsListening] = useState(false)
  const [voiceCommand, setVoiceCommand] = useState("")
  const [newItemName, setNewItemName] = useState("")
  const [kitchenMessage, setKitchenMessage] = useState("")
  const [showAddItem, setShowAddItem] = useState(false)
  const [showKitchenMessage, setShowKitchenMessage] = useState(false)
  const recognitionRef = useRef<any>(null)

  // Voice recognition setup
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase()
        setVoiceCommand(command)
        processVoiceCommand(command)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  const startVoiceRecognition = () => {
    if (recognitionRef.current) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopVoiceRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const processVoiceCommand = (command: string) => {
    if (command.includes("served") || command.includes("serve")) {
      handleBulkAction("served")
    } else if (command.includes("delivered") || command.includes("deliver")) {
      handleBulkAction("served")
    } else if (command.includes("help") || command.includes("assistance")) {
      handleNeedAssistance()
    }
  }

  const updateItemStatus = (itemId: string, newStatus: OrderItem["status"]) => {
    setOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === itemId ? { ...item, status: newStatus } : item)),
    }))
  }

  const handleBulkAction = (action: "served" | "delivered") => {
    setOrder((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.status === "ready" ? { ...item, status: "served" } : item)),
    }))
  }

  const handleNeedAssistance = () => {
    // Simulate sending assistance request
    console.log(`Assistance requested for table ${tableNumber}`)
  }

  const addNewItem = () => {
    if (newItemName.trim()) {
      const newItem: OrderItem = {
        id: Date.now().toString(),
        name: newItemName.trim(),
        quantity: 1,
        status: "pending",
      }

      setOrder((prev) => ({
        ...prev,
        items: [...prev.items, newItem],
      }))

      setNewItemName("")
      setShowAddItem(false)
    }
  }

  const sendKitchenMessage = () => {
    if (kitchenMessage.trim()) {
      // Simulate sending message to kitchen
      console.log(`Message to kitchen for table ${tableNumber}: ${kitchenMessage}`)
      setKitchenMessage("")
      setShowKitchenMessage(false)
    }
  }

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else {
      const diffHours = Math.floor(diffMins / 60)
      return `${diffHours}h ${diffMins % 60}m ago`
    }
  }

  const readyItems = order.items.filter((item) => item.status === "ready")
  const pendingItems = order.items.filter((item) => item.status === "pending" || item.status === "preparing")

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-2xl text-foreground">Table {tableNumber.slice(1)}</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{order.guests} guests</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatTime(order.orderTime)}</span>
            </div>
          </div>
        </div>

        <Badge variant="outline" className="text-lg px-3 py-1">
          ${order.totalAmount.toFixed(2)}
        </Badge>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => handleBulkAction("served")}
          disabled={readyItems.length === 0}
          className="h-14 bg-green-600 hover:bg-green-700 text-white"
        >
          <CheckCircle className="h-5 w-5 mr-2" />
          Mark Served ({readyItems.length})
        </Button>

        <Button
          onClick={() => handleBulkAction("delivered")}
          disabled={readyItems.length === 0}
          className="h-14 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Truck className="h-5 w-5 mr-2" />
          Delivered ({readyItems.length})
        </Button>

        <Button
          onClick={handleNeedAssistance}
          variant="outline"
          className="h-14 border-orange-200 hover:bg-orange-50 bg-transparent"
        >
          <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
          Need Assistance
        </Button>

        <Button
          onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
          variant="outline"
          className={cn("h-14", isListening && "bg-red-50 border-red-200")}
        >
          {isListening ? <MicOff className="h-5 w-5 mr-2 text-red-600" /> : <Mic className="h-5 w-5 mr-2" />}
          {isListening ? "Stop" : "Voice"}
        </Button>
      </div>

      {/* Voice Command Feedback */}
      {voiceCommand && (
        <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
          <CardContent className="p-3">
            <p className="text-sm text-blue-800 dark:text-blue-400">Voice command: "{voiceCommand}"</p>
          </CardContent>
        </Card>
      )}

      {/* Order Items */}
      <div className="space-y-3">
        {order.items.map((item) => {
          const config = statusConfig[item.status]
          const StatusIcon = config.icon

          return (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{item.name}</h3>
                    <Badge className={cn("text-xs", config.color)}>{config.label}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">×{item.quantity}</span>
                    <StatusIcon className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>

                {item.specialInstructions && (
                  <p className="text-sm text-muted-foreground mb-2">Note: {item.specialInstructions}</p>
                )}

                {item.estimatedTime && item.status === "preparing" && (
                  <p className="text-sm text-blue-600 mb-2">Ready in ~{item.estimatedTime} minutes</p>
                )}

                {/* Item Actions */}
                <div className="flex gap-2 mt-3">
                  {item.status === "ready" && (
                    <Button size="sm" onClick={() => updateItemStatus(item.id, "served")} className="flex-1">
                      Mark Served
                    </Button>
                  )}
                  {item.status === "pending" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateItemStatus(item.id, "preparing")}
                      className="flex-1"
                    >
                      Start Preparing
                    </Button>
                  )}
                  {item.status === "preparing" && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateItemStatus(item.id, "ready")}
                      className="flex-1"
                    >
                      Mark Ready
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Quick Add-ons */}
      <div className="flex gap-2">
        <Dialog open={showAddItem} onOpenChange={setShowAddItem}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Item name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addNewItem()}
              />
              <div className="flex gap-2">
                <Button onClick={addNewItem} disabled={!newItemName.trim()} className="flex-1">
                  Add Item
                </Button>
                <Button variant="outline" onClick={() => setShowAddItem(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={showKitchenMessage} onOpenChange={setShowKitchenMessage}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1 bg-transparent">
              <MessageSquare className="h-4 w-4 mr-2" />
              Call Cook
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Call Cook</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Textarea
                placeholder="Type your message to the cook..."
                value={kitchenMessage}
                onChange={(e) => setKitchenMessage(e.target.value)}
                rows={3}
              />
              <div className="flex gap-2">
                <Button onClick={sendKitchenMessage} disabled={!kitchenMessage.trim()} className="flex-1">
                  Call Cook
                </Button>
                <Button variant="outline" onClick={() => setShowKitchenMessage(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {order.items.filter((i) => i.status === "pending").length}
              </div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {order.items.filter((i) => i.status === "preparing").length}
              </div>
              <div className="text-xs text-muted-foreground">Preparing</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {order.items.filter((i) => i.status === "ready").length}
              </div>
              <div className="text-xs text-muted-foreground">Ready</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-600">
                {order.items.filter((i) => i.status === "served").length}
              </div>
              <div className="text-xs text-muted-foreground">Served</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
