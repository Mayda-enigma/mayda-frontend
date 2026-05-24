"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Progress } from "@/shared/ui/progress"
import { ArrowLeft, Clock, Users, AlertTriangle, Play, Pause, CheckCircle, Timer } from "lucide-react"
import { OrderTimeline } from "@/components/order-timeline"
import { VoiceControl } from "@/components/voice-control"
import { useOrderDetail } from "@/features/orders/api/queries"
import { orderService } from "@/features/orders/api/services"

export default function OrderDetailPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = Number(params.id)
  const { data: order, refetch } = useOrderDetail(orderId)
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
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chargement de la commande...</h1>
          <Button onClick={() => router.push("/")} className="bg-primary hover:bg-primary/90">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour au tableau de bord
          </Button>
        </div>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-warning"
      case "in-progress":
        return "bg-accent-blue"
      case "ready":
        return "bg-success"
      default:
        return "bg-muted"
    }
  }

  const updateOrderStatus = async (newStatus: string) => {
    const backendStatusMap: Record<string, string> = {
      "in-progress": "PREPARING",
      ready: "READY",
    }
    const backendStatus = backendStatusMap[newStatus]
    if (!backendStatus) return

    try {
      await orderService.updateStatus(order.backendId, backendStatus)
      refetch()
    } catch {
      // Error handled by apiClient
    }
  }

  const updateDishStep = (dishIndex: number, newStep: number) => {
    // Local state update for step tracking
  }

  const getOverallProgress = () => {
    const totalSteps = order.dishes.reduce((sum, dish) => sum + dish.steps.length, 0)
    const completedSteps = order.dishes.reduce((sum, dish) => sum + dish.currentStep, 0)
    return Math.round((completedSteps / totalSteps) * 100)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Button variant="outline" onClick={() => router.push("/")} className="border-border hover:bg-accent">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-primary">Commande {order.id}</h1>
          <Badge className={`${getStatusColor(order.status)} text-white font-medium ml-auto`}>
            {order.status.replace("-", " ").toUpperCase()}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-warning mb-2">
                <Users className="w-5 h-5" />
                <span className="font-medium">Table {order.tableNumber}</span>
              </div>
              <div className="text-sm text-muted-foreground">Table attribuée au client</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-accent-blue mb-2">
                <Clock className="w-5 h-5" />
                <span className="font-medium font-mono tabular-nums">{timeElapsed}</span>
              </div>
              <div className="text-sm text-muted-foreground">Temps écoulé</div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-success mb-2">
                <Timer className="w-5 h-5" />
                <span className="font-medium tabular-nums">
                  {(order.estimatedCompletion ?? new Date(Date.now() + 15 * 60 * 1000)).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Fin estimée</div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="bg-card border-border mb-6">
        <CardHeader>
          <CardTitle className="text-xl text-card-foreground">Progression globale</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Progress value={getOverallProgress()} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Progression : {getOverallProgress()}%</span>
              <span>
                {order.dishes.reduce((sum, dish) => sum + dish.currentStep, 0)} /{" "}
                {order.dishes.reduce((sum, dish) => sum + dish.steps.length, 0)} étapes terminées
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {(order.specialRequests || order.customerNotes) && (
            <Card className="bg-destructive/10 border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Notes importantes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.specialRequests && (
                  <div>
                    <div className="font-medium text-destructive mb-1">Allergies & Restrictions :</div>
                    <div className="text-destructive/80">{order.specialRequests}</div>
                  </div>
                )}
                {order.customerNotes && (
                  <div>
                    <div className="font-medium text-destructive mb-1">Notes du client :</div>
                    <div className="text-destructive/80">{order.customerNotes}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {order.dishes.map((dish, index) => (
              <Card key={index} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-card-foreground">{dish.name}</CardTitle>
                    <Badge variant="outline" className="text-warning border-warning">
                      {dish.prepTime} min
                    </Badge>
                  </div>
                  {dish.notes && <div className="text-muted-foreground">{dish.notes}</div>}
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
                      <span className="text-sm text-muted-foreground">Étapes de préparation</span>
                      <span className="text-sm text-muted-foreground">
                        {dish.currentStep} / {dish.steps.length} terminées
                      </span>
                    </div>
                    <Progress value={(dish.currentStep / dish.steps.length) * 100} className="h-2" />
                    <div className="space-y-2">
                      {dish.steps.map((step, stepIndex) => (
                        <div
                          key={stepIndex}
                          className={`p-3 rounded-lg border ${
                            stepIndex < dish.currentStep
                              ? "bg-success/30 border-success/50 text-success"
                              : stepIndex === dish.currentStep
                                ? "bg-accent-blue/30 border-accent-blue/50 text-accent-blue"
                                : "bg-muted border-border text-muted-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                stepIndex < dish.currentStep
                                  ? "bg-success text-white"
                                  : stepIndex === dish.currentStep
                                    ? "bg-accent-blue text-white"
                                    : "bg-muted text-muted-foreground"
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
                        className="border-border hover:bg-accent"
                      >
                        Étape précédente
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateDishStep(index, Math.min(dish.steps.length, dish.currentStep + 1))}
                        disabled={dish.currentStep === dish.steps.length}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Étape suivante
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {order && <OrderTimeline order={order} />}

          <VoiceControl isActive={isVoiceActive} onToggle={setIsVoiceActive} onStatusUpdate={updateOrderStatus} />

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {order.status === "pending" && (
                <Button
                  onClick={() => updateOrderStatus("in-progress")}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Commencer la commande
                </Button>
              )}
              {order.status === "in-progress" && (
                <Button
                  onClick={() => updateOrderStatus("ready")}
                  className="w-full bg-gradient-to-r from-success to-success/80 hover:from-success/90 hover:to-success/70"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Marquer prêt
                </Button>
              )}
              <Button variant="outline" className="w-full border-border hover:bg-accent bg-transparent">
                <Pause className="w-4 h-4 mr-2" />
                Mettre en pause
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
