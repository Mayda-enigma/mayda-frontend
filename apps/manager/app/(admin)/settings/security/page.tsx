"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Button } from "@/shared/ui/button"
import { Shield } from "lucide-react"

export default function SettingsSecurityPage() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-balance">Paramètres de sécurité</h1>
        <p className="text-muted-foreground text-pretty">Gérez les mots de passe et les contrôles d'accès</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Mot de passe
          </CardTitle>
          <CardDescription>Mettez à jour le mot de passe de votre compte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Mot de passe actuel</Label>
            <Input id="current" type="password" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="new">Nouveau mot de passe</Label>
              <Input id="new" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Confirmer le nouveau mot de passe</Label>
              <Input id="confirm" type="password" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button>Mettre à jour le mot de passe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
