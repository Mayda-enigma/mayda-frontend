"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Switch } from "@/shared/ui/switch"
import { useTheme } from "next-themes"

import { useCurrentUser } from "@/features/auth"
import { User, Settings, Bell, Palette, Globe, Volume2, Vibrate } from "lucide-react"

export function ProfileSettings() {
  const { data: currentUser } = useCurrentUser()
  const { theme, setTheme } = useTheme()

  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [autoAcknowledge, setAutoAcknowledge] = useState(false)



  return (
    <div className="p-2 sm:p-3 space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center">
          <User className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-foreground">Profil</h2>
          <p className="text-xs text-muted-foreground">
            {currentUser?.role ? `${currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}` : ""}
            {currentUser?.restaurantId ? ` #${currentUser.restaurantId}` : ""}
            {" - "}
            {currentUser?.name || "Chargement..."}
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="h-4 w-4" />
            Paramètres d'affichage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Mode sombre</h4>
              <p className="text-xs text-muted-foreground">
                {theme === "dark" ? "Mode nuit actif" : "Mode clair actif"}
              </p>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
          </div>
          <div className="text-xs text-muted-foreground">
            Le mode clair est optimisé pour les environnements de restaurant lumineux, tandis que le mode sombre est parfait pour le service de nuit.
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4" />
            Paramètres de langue
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm">Français</span>
            <Badge variant="secondary" className="text-xs">Actif</Badge>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4" />
            Paramètres de notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-3 w-3" />
              <div>
                <h4 className="text-sm font-medium">Alertes sonores</h4>
                <p className="text-xs text-muted-foreground">Jouer un son pour les nouvelles notifications</p>
              </div>
            </div>
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Vibrate className="h-3 w-3" />
              <div>
                <h4 className="text-sm font-medium">Vibration</h4>
                <p className="text-xs text-muted-foreground">Vibrer pour les notifications urgentes</p>
              </div>
            </div>
            <Switch checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-3 w-3" />
              <div>
                <h4 className="text-sm font-medium">Confirmation auto</h4>
                <p className="text-xs text-muted-foreground">Marquer automatiquement comme lu après 30s</p>
              </div>
            </div>
            <Switch checked={autoAcknowledge} onCheckedChange={setAutoAcknowledge} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Informations de l'application</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Nom</span>
            <span>{currentUser?.name || "—"}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Email</span>
            <span>{currentUser?.email || "—"}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Rôle</span>
            <span className="capitalize">{currentUser?.role || "—"}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">ID Restaurant</span>
            <span>{currentUser?.restaurantId ? `#${currentUser.restaurantId}` : "—"}</span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <Button variant="outline" className="h-9 bg-transparent text-sm">
          Synchroniser
        </Button>
        <Button variant="outline" className="h-9 bg-transparent text-sm">
          Aide & Support
        </Button>
      </div>
    </div>
  )
}
