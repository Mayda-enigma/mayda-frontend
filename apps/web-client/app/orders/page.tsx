"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { BurgerMenu } from "@/components/burger-menu"
import { ArrowLeft, Clock, ChefHat, CheckCircle, Utensils, Bell, Loader2, XCircle } from "lucide-react"
import Link from "next/link"
import { useMyOrders } from "@/features/orders"
import type { Order } from "@/features/orders"

const orderStatusConfig: Record<string, {
  label: string
  icon: typeof Clock
  color: string
  bgColor: string
}> = {
  PENDING: {
    label: "En attente",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  CONFIRMED: {
    label: "Confirmée",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  PREPARING: {
    label: "En cuisine",
    icon: ChefHat,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  READY: {
    label: "Prête",
    icon: Bell,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  COMPLETED: {
    label: "Terminée",
    icon: Utensils,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  CANCELLED: {
    label: "Annulée",
    icon: XCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
}

const getElapsedMinutes = (placedAt: Date): number =>
  Math.floor((Date.now() - placedAt.getTime()) / (1000 * 60))

function OrderCard({ order }: { order: Order }) {
  const config = orderStatusConfig[order.status] ?? orderStatusConfig.PENDING
  const StatusIcon = config.icon
  const elapsed = getElapsedMinutes(order.placedAt)

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${config.bgColor} rounded-full flex items-center justify-center`}>
              <StatusIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${config.color}`} />
            </div>
            <div>
              <h3 className="font-semibold text-sm sm:text-base">{order.orderNumber}</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {elapsed < 60
                  ? `${elapsed} min`
                  : `${Math.floor(elapsed / 60)}h ${elapsed % 60}m`}
                {" "}&middot; Table {order.tableNumber}
              </p>
            </div>
          </div>
          <Badge variant="outline" className={`${config.color} border-current text-xs sm:text-sm`}>
            {config.label}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
            <span>{order.type.replace('_', ' ')}</span>
            <span>&middot;</span>
            <span>{order.itemCount} articles</span>
          </div>
          <div className="text-right">
            <span className="font-semibold text-sm sm:text-base">{order.total.toFixed(2)} DZD</span>
            <Badge
              variant="outline"
              className={`ml-2 text-xs ${order.paymentStatus === "PAID" ? "text-success border-success" : "text-amber-600 border-amber-600"}`}
            >
              {order.paymentStatus === "PAID" ? "PAYÉ" : order.paymentStatus}
            </Badge>
          </div>
        </div>

        {order.status === "READY" && (
          <div className="mt-3 bg-primary/10 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary animate-pulse" />
              <p className="font-medium text-primary text-sm">Votre commande est prête !</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useMyOrders()

  const tableId = typeof window !== 'undefined'
    ? sessionStorage.getItem('mayda_table_id') ?? ''
    : ''

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <BurgerMenu currentPage="orders" />
            <Link href="/menu" className="hidden md:block" aria-label="Back to menu">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Vos commandes</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Table {tableId} &middot; {orders?.length ?? 0} commandes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-xs text-success">En direct</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-2 sm:p-3 md:p-4 space-y-3 sm:space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <p className="text-destructive mb-4">Échec du chargement des commandes.</p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Réessayer
            </Button>
          </div>
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <Utensils className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-base sm:text-lg">Aucune commande</p>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4">Ajoutez des plats à votre panier</p>
            <Link href="/menu">
              <Button className="bg-primary text-primary-foreground">Voir le menu</Button>
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>

      <div className="h-16 sm:h-20" />
    </div>
  )
}
