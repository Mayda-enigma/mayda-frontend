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
        <h1 className="text-3xl font-bold text-balance">Billing</h1>
        <p className="text-muted-foreground text-prefix">Manage your subscription and payment methods</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription
          </CardTitle>
          <CardDescription>Your current plan and billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div>
              <p className="font-medium">Free Plan</p>
              <p className="text-sm text-muted-foreground">Basic features with limited access</p>
            </div>
            <Badge className="bg-primary/15 text-primary hover:bg-primary/20">Active</Badge>
          </div>
          <div className="space-y-2">
            <Label htmlFor="card">Payment Method</Label>
            <Input id="card" defaultValue="•••• •••• •••• 4242" />
          </div>
          <div className="flex justify-end">
            <Button variant="outline">Update Payment</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
