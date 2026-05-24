"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { AlertTriangle, Star, Users } from "lucide-react"
import { usePerformanceMetrics } from "../api/queries"

const alertIcons: Record<string, React.ReactNode> = {
  alert: <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />,
  people: <Users className="h-4 w-4 text-primary mt-0.5" />,
  star: <Star className="h-4 w-4 text-secondary mt-0.5" />,
}

export function PerformanceMetrics() {
  const { data: metrics } = usePerformanceMetrics()

  if (!metrics) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Performance du service</CardTitle>
          <CardDescription>Indicateurs opérationnels clés</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Temps de préparation moyen</span>
            <Badge variant="outline">{metrics.avgPrepTime} min</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Précision des commandes</span>
            <Badge variant="default">{metrics.orderAccuracy}%</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Taux de rotation des tables</span>
            <Badge variant="secondary">{metrics.tableTurnoverRate}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Efficacité du personnel</span>
            <Badge variant="default">{metrics.staffEfficiency}%</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alertes & Notifications</CardTitle>
          <CardDescription>Mises à jour importantes nécessitant votre attention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {metrics.alerts.map((alert) => {
            const colorMap: Record<string, string> = {
              destructive: "bg-destructive/10 border-destructive/20",
              primary: "bg-primary/10 border-primary/20",
              secondary: "bg-secondary/10 border-secondary/20",
            }
            return (
              <div
                key={alert.title}
                className={`flex items-start gap-3 p-3 rounded-lg border ${colorMap[alert.color] ?? "bg-muted/50 border-border"}`}
              >
                {alertIcons[alert.type] ?? <AlertTriangle className="h-4 w-4 text-muted-foreground mt-0.5" />}
                <div className="text-sm">
                  <p className="font-medium">{alert.title}</p>
                  <p className="text-muted-foreground">{alert.message}</p>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
