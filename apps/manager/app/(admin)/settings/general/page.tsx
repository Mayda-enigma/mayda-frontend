"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Button } from "@/shared/ui/button"
import { Settings } from "lucide-react"

export default function SettingsGeneralPage() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-balance">Paramètres généraux</h1>
        <p className="text-muted-foreground text-pretty">Gérez le profil et les préférences de votre restaurant</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Profil du restaurant
          </CardTitle>
          <CardDescription>Mettez à jour les informations de base de votre restaurant</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du restaurant</Label>
              <Input id="name" defaultValue="Main Restaurant" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine">Type de cuisine</Label>
              <Input id="cuisine" defaultValue="Italian & American" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Numéro de téléphone</Label>
              <Input id="phone" defaultValue="+1 234-567-8900" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Adresse e-mail</Label>
              <Input id="email" defaultValue="contact@mainrestaurant.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adresse</Label>
            <Input id="address" defaultValue="123 Main Street, New York, NY 10001" />
          </div>
          <div className="flex justify-end">
            <Button>Enregistrer les modifications</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
