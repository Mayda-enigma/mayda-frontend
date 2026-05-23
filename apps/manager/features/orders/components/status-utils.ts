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
    label: "Pending",
  },
  confirmed: {
    className: "bg-accent-blue text-white",
    icon: CheckCircle,
    label: "Confirmed",
  },
  preparing: {
    className: "bg-accent-blue text-white",
    icon: ChefHat,
    label: "Preparing",
  },
  ready: {
    className: "bg-success text-white",
    icon: CheckCircle,
    label: "Ready",
  },
  completed: {
    className: "bg-muted text-white",
    icon: Utensils,
    label: "Completed",
  },
  cancelled: {
    className: "bg-destructive text-destructive-foreground",
    icon: XCircle,
    label: "Cancelled",
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
