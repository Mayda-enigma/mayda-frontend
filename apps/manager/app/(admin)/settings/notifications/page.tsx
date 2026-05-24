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
        <h1 className="text-3xl font-bold text-balance">Préférences de notifications</h1>
        <p className="text-muted-foreground text-prefix">Contrôlez la façon dont vous recevez les alertes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choisissez les notifications que vous souhaitez recevoir</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notif" className="font-medium">Notifications par e-mail</Label>
              <p className="text-sm text-muted-foreground">Recevez un résumé quotidien par e-mail</p>
            </div>
            <Switch id="email-notif" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notif" className="font-medium">Notifications push</Label>
              <p className="text-sm text-muted-foreground">Recevez des alertes en temps réel dans le navigateur</p>
            </div>
            <Switch id="push-notif" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="low-stock" className="font-medium">Alertes de stock faible</Label>
              <p className="text-sm text-muted-foreground">Prévenez lorsque le stock est bas</p>
            </div>
            <Switch id="low-stock" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-orders" className="font-medium">Nouvelles commandes</Label>
              <p className="text-sm text-muted-foreground">Alertez à chaque nouvelle commande passée</p>
            </div>
            <Switch id="new-orders" />
          </div>
          <div className="flex justify-end">
            <Button>Enregistrer les préférences</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
