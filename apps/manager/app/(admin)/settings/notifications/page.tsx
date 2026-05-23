"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Label } from "@/shared/ui/label"
import { Switch } from "@/shared/ui/switch"
import { Button } from "@/shared/ui/button"
import { Bell } from "lucide-react"

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-balance">Notification Preferences</h1>
        <p className="text-muted-foreground text-prefix">Control how you receive alerts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose which notifications you want to receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notif" className="font-medium">Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive daily summary via email</p>
            </div>
            <Switch id="email-notif" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notif" className="font-medium">Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Get real-time alerts in-browser</p>
            </div>
            <Switch id="push-notif" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="low-stock" className="font-medium">Low Stock Alerts</Label>
              <p className="text-sm text-muted-foreground">Notify when inventory is running low</p>
            </div>
            <Switch id="low-stock" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-orders" className="font-medium">New Orders</Label>
              <p className="text-sm text-muted-foreground">Alert on every new order placed</p>
            </div>
            <Switch id="new-orders" />
          </div>
          <div className="flex justify-end">
            <Button>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
