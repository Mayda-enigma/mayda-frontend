"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Badge } from "@/shared/ui/badge"
import { Sheet, SheetContent } from "@/shared/ui/sheet"
import {
  BarChart3,
  Package,
  Calendar,
  Users,
  ChefHat,
  ShoppingCart,
  Bell,
  Search,
  Menu,
} from "lucide-react"
import { Sidebar, type NavItem } from "@/shared/ui/layout/sidebar"
import { cn } from "@/shared/utils"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation: NavItem[] = [
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "stock", name: "Stock", icon: Package },
  { id: "reservations", name: "Reservations", icon: Calendar },
  { id: "employees", name: "Employees", icon: Users },
  { id: "menu", name: "Menu", icon: ChefHat },
  { id: "orders", name: "Orders", icon: ShoppingCart },
  { id: "notifications", name: "Notifications", icon: Bell },
]

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* Desktop sidebar: transparent, blends into body */}
      <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col md:flex">
        <div className="flex h-full flex-col px-4 py-4">
          <Sidebar
            navigation={navigation}
            activeTab={activeTab}
            onTabChange={onTabChange}
          />
        </div>
      </aside>

      {/* Mobile drawer */}
      <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
        <SheetContent side="left" className="w-72 border-0 bg-background p-4">
          <Sidebar
            navigation={navigation}
            activeTab={activeTab}
            onTabChange={(tab) => {
              onTabChange(tab)
              setMobileNavOpen(false)
            }}
            onNavigate={() => setMobileNavOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Floating main panel area */}
      <div className="md:pl-72">
        <div className="md:p-4">
          {/* Mobile-only header with hamburger */}
          <div className="flex items-center gap-2 px-3 py-2 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation"
            >
              <Menu className="size-5" />
            </Button>
            <span className="text-sm font-semibold tracking-tight">Mayda Manager</span>
          </div>

          {/* Floating panel */}
          <main
            className={cn(
              "flex flex-col overflow-hidden bg-card text-card-foreground",
              "md:min-h-[calc(100dvh-2rem)] md:rounded-2xl md:border md:shadow-depth-card-lg",
            )}
          >
            {/* Subtle search bar */}
            <div className="hidden items-center gap-3 border-b px-6 py-3 md:flex">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search restaurants, orders, staff..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 border-0 bg-muted/50 pl-9 text-sm shadow-none focus-visible:ring-0"
                />
              </div>
              <Badge variant="secondary" className="shrink-0 rounded-md">
                Ctrl+K
              </Badge>
            </div>

            {/* Page content */}
            <div className="flex-1 p-6 md:p-8">{children}</div>
          </main>
        </div>
      </div>
    </div>
  )
}
