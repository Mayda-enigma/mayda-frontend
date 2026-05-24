import {
  Clock,
  ChefHat,
  CheckCircle,
  Utensils,
  XCircle,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react"
import type { OrderStatus } from "../types"

export const statusConfig: Record<
  OrderStatus,
  { className: string; icon: LucideIcon; label: string }
> = {
  pending: {
    className: "bg-warning text-black",
    icon: Clock,
    label: "En attente",
  },
  confirmed: {
    className: "bg-accent-blue text-white",
    icon: CheckCircle,
    label: "Confirmée",
  },
  preparing: {
    className: "bg-accent-blue text-white",
    icon: ChefHat,
    label: "En préparation",
  },
  ready: {
    className: "bg-success text-white",
    icon: CheckCircle,
    label: "Prête",
  },
  completed: {
    className: "bg-muted text-white",
    icon: Utensils,
    label: "Terminée",
  },
  cancelled: {
    className: "bg-destructive text-destructive-foreground",
    icon: XCircle,
    label: "Annulée",
  },
}

export const statusFlow: Record<OrderStatus, OrderStatus[]> = {
  pending: ["confirmed", "cancelled"],
  confirmed: ["preparing", "cancelled"],
  preparing: ["ready", "cancelled"],
  ready: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
}
