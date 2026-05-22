"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Clock, Users, AlertTriangle, Play, Pause, CheckCircle, Timer } from "lucide-react"
import { OrderTimeline } from "@/components/order-timeline"
import { VoiceControl } from "@/components/voice-control"

// Mock data - in real app this would come from API
const mockOrderDetails = {
  "ORD-001": {
    id: "ORD-001",
    tableNumber: 12,
    timeReceived: new Date(Date.now() - 15 * 60 * 1000),
    status: "in-progress",
    complexity: "high",
    dishes: [
      {
        name: "Grilled Salmon",
        notes: "Medium rare, no sauce",
        allergens: ["fish"],
        prepTime: 18,
        steps: [
          "Season salmon with salt and pepper",
          "Heat grill to medium-high",
          "Grill for 6-8 minutes per side",
          "Check internal temperature (145°F)",
          "Rest for 2 minutes before plating",
        ],
        currentStep: 2,
      },
      {
        name: "Caesar Salad",
        notes: "Extra croutons",
        allergens: ["gluten", "dairy"],
        prepTime: 8,
        steps: [
          "Wash and chop romaine lettuce",
          "Prepare Caesar dressing",
          "Toast croutons until golden",
          "Toss lettuce with dressing",
          "Top with croutons and parmesan",
        ],
        currentStep: 4,
      },
    ],
    specialRequests: "Customer has severe nut allergy",
    priority: "urgent",
    customerNotes: "Anniversary dinner - please make it special",
    estimatedCompletion: new Date(Date.now() + 8 * 60 * 1000),
  },
}

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.id as string
  const [order, setOrder] = useState(mockOrderDetails[orderId])
  const [timeElapsed, setTimeElapsed] = useState("")
  const [isVoiceActive, setIsVoiceActive] = useState(false)

  useEffect(() => {
    if (!order) return

    const updateTime = () => {
      const now = new Date()
      const diff = now.getTime() - order.timeReceived.getTime()
      const minutes = Math.floor(diff / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setTimeElapsed(`${minutes}:${seconds.toString().padStart(2, "0")}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [order])

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <Button onClick={() => router.push("/")} className="bg-orange-500 hover:bg-orange-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "in-progress":
        return "bg-blue-500"
      case "ready":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const updateOrderStatus = (newStatus: string) => {
    setOrder({ ...order, status: newStatus })
  }

  const updateDishStep = (dishIndex: number, newStep: number) => {
    const updatedDishes = [...order.dishes]
    updatedDishes[dishIndex].currentStep = newStep
    setOrder({ ...order, dishes: updatedDishes })
  }

  const getOverallProgress = () => {
    const totalSteps = order.dishes.reduce((sum, dish) => sum + dish.steps.length, 0)
    const completedSteps = order.dishes.reduce((sum, dish) => sum + dish.currentStep, 0)
    return Math.round((completedSteps / totalSteps) * 100)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" onClick={() => router.push("/")} className="border-gray-600 hover:bg-gray-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-orange-500">Order {order.id}</h1>
          <Badge className={`${getStatusColor(order.status)} text-white font-medium ml-auto`}>
            {order.status.replace("-", " ").toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-amber-400 mb-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">Table {order.tableNumber}</span>
              </div>
              <div className="text-sm text-gray-300">Customer table assignment</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium font-mono">{timeElapsed}</span>
              </div>
              <div className="text-sm text-gray-300">Time elapsed</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Timer className="w-5 h-5" />
                <span className="font-medium">
                  {order.estimatedCompletion.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="text-sm text-gray-300">Est. completion</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Overall Progress */}
      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-white">Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={getOverallProgress()} className="h-3" />
            <div className="flex justify-between text-sm text-gray-300">
              <span>Progress: {getOverallProgress()}%</span>
              <span>
                {order.dishes.reduce((sum, dish) => sum + dish.currentStep, 0)} of{" "}
                {order.dishes.reduce((sum, dish) => sum + dish.steps.length, 0)} steps completed
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Special Requests */}
          {(order.specialRequests || order.customerNotes) && (
            <Card className="bg-red-900/30 border-red-500/50">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Important Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.specialRequests && (
                  <div>
                    <div className="font-medium text-red-300 mb-1">Allergies & Restrictions:</div>
                    <div className="text-red-200">{order.specialRequests}</div>
                  </div>
                )}
                {order.customerNotes && (
                  <div>
                    <div className="font-medium text-red-300 mb-1">Customer Notes:</div>
                    <div className="text-red-200">{order.customerNotes}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Dishes */}
          <div className="space-y-4">
            {order.dishes.map((dish, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-white">{dish.name}</CardTitle>
                    <Badge variant="outline" className="text-amber-400 border-amber-400">
                      {dish.prepTime} min
                    </Badge>
                  </div>
                  {dish.notes && <div className="text-gray-300">{dish.notes}</div>}
                  {dish.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {dish.allergens.map((allergen) => (
                        <Badge key={allergen} variant="destructive" className="text-xs">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-400">Preparation Steps</span>
                      <span className="text-sm text-gray-400">
                        {dish.currentStep} of {dish.steps.length} completed
                      </span>
                    </div>
                    <Progress value={(dish.currentStep / dish.steps.length) * 100} className="h-2" />
                    <div className="space-y-2">
                      {dish.steps.map((step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className={`p-3 rounded-lg border ${
                            stepIndex < dish.currentStep
                              ? "bg-green-900/30 border-green-500/50 text-green-200"
                              : stepIndex === dish.currentStep
                                ? "bg-blue-900/30 border-blue-500/50 text-blue-200"
                                : "bg-gray-700 border-gray-600 text-gray-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                stepIndex < dish.currentStep
                                  ? "bg-green-500 text-white"
                                  : stepIndex === dish.currentStep
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-600 text-gray-300"
                              }`}
                            >
                              {stepIndex < dish.currentStep ? "✓" : stepIndex + 1}
                            </div>
                            <span>{step}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateDishStep(index, Math.max(0, dish.currentStep - 1))}
                        disabled={dish.currentStep === 0}
                        className="border-gray-600 hover:bg-gray-700"
                      >
                        Previous Step
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateDishStep(index, Math.min(dish.steps.length, dish.currentStep + 1))}
                        disabled={dish.currentStep === dish.steps.length}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Next Step
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Timeline */}
          <OrderTimeline order={order} />

          {/* Voice Control */}
          <VoiceControl isActive={isVoiceActive} onToggle={setIsVoiceActive} onStatusUpdate={updateOrderStatus} />

          {/* Quick Actions */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.status === "pending" && (
                <Button
                  onClick={() => updateOrderStatus("in-progress")}
                  className="w-full bg-orange-500 hover:bg-orange-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Order
                </Button>
              )}
              {order.status === "in-progress" && (
                <Button
                  onClick={() => updateOrderStatus("ready")}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark Ready
                </Button>
              )}
              <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700 bg-transparent">
                <Pause className="w-4 h-4 mr-2" />
                Pause Order
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
