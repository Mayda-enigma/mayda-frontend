"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { AlertTriangle, Star, Users } from "lucide-react"

export function PerformanceMetrics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Service Performance</CardTitle>
          <CardDescription>Key operational metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Average Preparation Time</span>
            <Badge variant="outline">18 min</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Order Accuracy</span>
            <Badge variant="default">96.5%</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Table Turnover Rate</span>
            <Badge variant="secondary">2.3x/day</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Staff Efficiency</span>
            <Badge variant="default">92%</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alerts & Notifications</CardTitle>
          <CardDescription>Important updates requiring attention</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
            <AlertTriangle className="h-4 w-4 text-destructive mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Low Stock Alert</p>
              <p className="text-muted-foreground">Tomatoes running low (2 days remaining)</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
            <Users className="h-4 w-4 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Staff Schedule</p>
              <p className="text-muted-foreground">3 servers scheduled for tonight's rush</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
            <Star className="h-4 w-4 text-secondary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium">Customer Feedback</p>
              <p className="text-muted-foreground">5 new reviews received (avg. 4.9 stars)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
