"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { CreditCard } from "lucide-react"

export default function SettingsBillingPage() {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-balance">Facturation</h1>
        <p className="text-muted-foreground text-prefix">Gérez votre abonnement et vos moyens de paiement</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Abonnement
          </CardTitle>
          <CardDescription>Votre forfait actuel et vos détails de facturation</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div>
              <p className="font-medium">Forfait gratuit</p>
              <p className="text-sm text-muted-foreground">Fonctionnalités de base avec accès limité</p>
            </div>
            <Badge className="bg-primary/15 text-primary hover:bg-primary/20">Actif</Badge>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card">Moyen de paiement</Label>
            <Input id="card" defaultValue="•••• •••• •••• 4242" />
          </div>
          <div className="flex justify-end">
            <Button variant="outline">Mettre à jour le paiement</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
