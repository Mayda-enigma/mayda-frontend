"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Button } from "@/shared/ui/button"
import { Badge } from "@/shared/ui/badge"
import { Separator } from "@/shared/ui/separator"
import { ScrollArea } from "@/shared/ui/scroll-area"
import {
  User,
  Calendar,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  ChefHat,
  Utensils,
  XCircle,
  Package,
  MapPin,
} from "lucide-react"
import { statusConfig } from "./status-utils"
import type { Order, OrderStatus } from "../types"

interface OrderDetailDialogProps {
  order: Order | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onStatusChange: (order: Order, status: OrderStatus) => void
  isUpdating: boolean
  availableTransitions: OrderStatus[]
}

const transitionLabel: Record<string, { label: string; icon: typeof CheckCircle2 }> = {
  confirmed: { label: "Confirm", icon: CheckCircle2 },
  preparing: { label: "Start Preparing", icon: ChefHat },
  ready: { label: "Mark Ready", icon: CheckCircle2 },
  completed: { label: "Mark Completed", icon: Utensils },
  cancelled: { label: "Cancel Order", icon: XCircle },
}

export function OrderDetailDialog({
  order,
  open,
  onOpenChange,
  onStatusChange,
  isUpdating,
  availableTransitions,
}: OrderDetailDialogProps) {
  if (!order) return null

  const config = statusConfig[order.status]
  const StatusIcon = config.icon

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order #{order.orderNumber}
          </DialogTitle>
          <DialogDescription>
            View and manage order details
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge className={config.className}>
                <span className="flex items-center gap-1">
                  <StatusIcon className="h-3 w-3" />
                  {config.label}
                </span>
              </Badge>
              <div className="flex gap-2">
                {availableTransitions.map((status) => {
                  const t = transitionLabel[status]
                  if (!t) return null
                  const TransitionIcon = t.icon
                  const isCancel = status === "cancelled"
                  return (
                    <Button
                      key={status}
                      size="sm"
                      variant={isCancel ? "destructive" : "default"}
                      disabled={isUpdating}
                      onClick={() => onStatusChange(order, status)}
                    >
                      <TransitionIcon className="h-4 w-4 mr-1" />
                      {t.label}
                    </Button>
                  )
                })}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  Customer
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Name:</span>
                    <span className="font-medium">{order.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Table:</span>
                    <Badge variant="outline">{order.tableNumber}</Badge>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  Timing
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ordered at:</span>
                    <span className="font-medium tabular-nums">
                      {new Date(order.orderTime).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment:</span>
                    <span className="flex items-center gap-1 font-medium">
                      <CreditCard className="h-3 w-3" />
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h3 className="font-semibold flex items-center gap-2 text-sm">
                <Package className="h-4 w-4" />
                Items ({order.itemCount})
              </h3>
              <div className="space-y-2">
                {("items" in order ? (order as { items: { name: string; quantity: number; unitPrice: number; totalPrice: number; notes: string | null }[] }).items : []).map(
                  (item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-lg bg-muted/50 p-3"
                    >
                      <div className="flex items-center gap-3">
                        <Badge
                          variant="secondary"
                          className="flex size-8 items-center justify-center rounded-full p-0"
                        >
                          {item.quantity}
                        </Badge>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          {item.notes && (
                            <p className="text-xs text-muted-foreground">
                              {item.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          {item.unitPrice.toFixed(2)} DZD &times; {item.quantity}
                        </p>
                        <p className="font-semibold tabular-nums">
                          {item.totalPrice.toFixed(2)} DZD
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>

            {("notes" in order && (order as { notes: string | null }).notes) && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    Notes
                  </h3>
                  <div className="rounded-lg border border-warning/30 bg-warning/10 p-4">
                    <p className="text-sm">{(order as { notes: string }).notes}</p>
                  </div>
                </div>
              </>
            )}

            {("paymentMethod" in order && (order as { paymentMethod: string | null }).paymentMethod) && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h3 className="font-semibold flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4" />
                    Delivery
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <span className="font-medium">
                        {(order as { paymentMethod: string }).paymentMethod === "DELIVERY"
                          ? "Delivery"
                          : (order as { paymentMethod: string }).paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            <Separator />

            <div className="flex items-center justify-between text-lg font-semibold">
              <span>Total:</span>
              <span className="text-success tabular-nums">
                {order.totalAmount.toFixed(2)} DZD
              </span>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
