import {
  LayoutDashboard,
  Calendar,
  Package,
  ChefHat,
  Users,
  ShoppingCart,
  Settings,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  label: string
  href: string
}

export interface NavSection {
  id: string
  label: string
  icon: LucideIcon
  href?: string
  items?: NavItem[]
}

export const navigation: NavSection[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    items: [
      { label: "Overview", href: "/" },
      { label: "Revenue", href: "/revenue" },
      { label: "Popular Dishes", href: "/popular-dishes" },
      { label: "Cuisine Share", href: "/cuisine-share" },
      { label: "Busy Hours", href: "/busy-hours" },
      { label: "Monthly", href: "/monthly" },
    ],
  },
  {
    id: "reservations",
    label: "Reservations",
    icon: Calendar,
    items: [
      { label: "All Reservations", href: "/reservations" },
      { label: "Confirmed", href: "/reservations/confirmed" },
      { label: "Pending", href: "/reservations/pending" },
      { label: "Cancelled", href: "/reservations/cancelled" },
    ],
  },
  {
    id: "stock",
    label: "Stock",
    icon: Package,
    items: [
      { label: "All Items", href: "/stock" },
      { label: "Critical", href: "/stock/critical" },
      { label: "Low", href: "/stock/low" },
      { label: "Good", href: "/stock/good" },
    ],
  },
  {
    id: "menu",
    label: "Menu",
    icon: ChefHat,
    items: [
      { label: "All Items", href: "/menu" },
      { label: "Pizza", href: "/menu/pizza" },
      { label: "Pasta", href: "/menu/pasta" },
      { label: "Salads", href: "/menu/salads" },
      { label: "Burgers", href: "/menu/burgers" },
    ],
  },
  {
    id: "employees",
    label: "Employees",
    icon: Users,
    items: [
      { label: "All Staff", href: "/employees" },
      { label: "Kitchen", href: "/employees/kitchen" },
      { label: "Service", href: "/employees/service" },
      { label: "Management", href: "/employees/management" },
    ],
  },
  {
    id: "orders",
    label: "Orders",
    icon: ShoppingCart,
    items: [
      { label: "All Orders", href: "/orders" },
      { label: "Pending", href: "/orders/pending" },
      { label: "Preparing", href: "/orders/preparing" },
      { label: "Ready", href: "/orders/ready" },
      { label: "Completed", href: "/orders/completed" },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    items: [
      { label: "General", href: "/settings/general" },
      { label: "Security", href: "/settings/security" },
      { label: "Notifications", href: "/settings/notifications" },
      { label: "Billing", href: "/settings/billing" },
    ],
  },
]
