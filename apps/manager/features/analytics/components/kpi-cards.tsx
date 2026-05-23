"use client"

import { Card, CardContent } from "@/shared/ui/card"
import { DollarSign, ShoppingCart, Star, TrendingUp } from "lucide-react"

export function KpiCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
              <DollarSign className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">Total Revenue</p>
              <div className="text-2xl font-bold text-primary">$38,400</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="size-3 text-success" />
                +12.5% from last week
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-blue/15 text-accent-blue">
              <ShoppingCart className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">Total Orders</p>
              <div className="text-2xl font-bold">407</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="size-3 text-success" />
                +8.2% from last week
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-orange/15 text-accent-orange">
              <DollarSign className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">Avg. Order Value</p>
              <div className="text-2xl font-bold">$94.35</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="size-3 text-success" />
                +3.8% from last week
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-accent-pink/15 text-accent-pink">
              <Star className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">Customer Rating</p>
              <div className="text-2xl font-bold">4.8</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <TrendingUp className="size-3 text-success" />
                +0.2 from last week
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
