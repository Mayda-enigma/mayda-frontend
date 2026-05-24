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
    label: "Tableau de bord",
    icon: LayoutDashboard,
    items: [
      { label: "Vue d'ensemble", href: "/" },
      { label: "Revenus", href: "/revenue" },
      { label: "Plats populaires", href: "/popular-dishes" },
      { label: "Part par cuisine", href: "/cuisine-share" },
      { label: "Heures d'affluence", href: "/busy-hours" },
      { label: "Mensuel", href: "/monthly" },
    ],
  },
  {
    id: "reservations",
    label: "Réservations",
    icon: Calendar,
    items: [
      { label: "Toutes les réservations", href: "/reservations" },
      { label: "Confirmées", href: "/reservations/confirmed" },
      { label: "En attente", href: "/reservations/pending" },
      { label: "Annulées", href: "/reservations/cancelled" },
    ],
  },
  {
    id: "stock",
    label: "Stock",
    icon: Package,
    items: [
      { label: "Tous les articles", href: "/stock" },
      { label: "Critique", href: "/stock/critical" },
      { label: "Faible", href: "/stock/low" },
      { label: "Bon", href: "/stock/good" },
    ],
  },
  {
    id: "menu",
    label: "Menu",
    icon: ChefHat,
    items: [
      { label: "Tous les articles", href: "/menu" },
      { label: "Pizza", href: "/menu/pizza" },
      { label: "Pâtes", href: "/menu/pasta" },
      { label: "Salades", href: "/menu/salads" },
      { label: "Burgers", href: "/menu/burgers" },
    ],
  },
  {
    id: "employees",
    label: "Employés",
    icon: Users,
    items: [
      { label: "Tous le personnel", href: "/employees" },
      { label: "Cuisine", href: "/employees/kitchen" },
      { label: "Service", href: "/employees/service" },
      { label: "Direction", href: "/employees/management" },
    ],
  },
  {
    id: "orders",
    label: "Commandes",
    icon: ShoppingCart,
    items: [
      { label: "Toutes les commandes", href: "/orders" },
      { label: "En attente", href: "/orders/pending" },
      { label: "En préparation", href: "/orders/preparing" },
      { label: "Prêtes", href: "/orders/ready" },
      { label: "Terminées", href: "/orders/completed" },
    ],
  },
  {
    id: "settings",
    label: "Paramètres",
    icon: Settings,
    items: [
      { label: "Général", href: "/settings/general" },
      { label: "Sécurité", href: "/settings/security" },
      { label: "Notifications", href: "/settings/notifications" },
      { label: "Facturation", href: "/settings/billing" },
    ],
  },
]
