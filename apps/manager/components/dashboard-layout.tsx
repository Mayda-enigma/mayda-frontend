"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
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
  Sun,
  Moon,
  Globe,
} from "lucide-react"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab: string
  onTabChange: (tab: string) => void
}

const navigation = [
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "stock", name: "Stock", icon: Package },
  { id: "reservations", name: "Reservations", icon: Calendar },
  { id: "employees", name: "Employees", icon: Users },
  { id: "menu", name: "Menu", icon: ChefHat },
  { id: "orders", name: "Orders", icon: ShoppingCart },
  { id: "notifications", name: "Notifications", icon: Bell }, // Added notifications tab
]

const translations = {
  en: {
    analytics: "Analytics",
    stock: "Stock",
    reservations: "Reservations",
    employees: "Employees",
    menu: "Menu",
    orders: "Orders",
    notifications: "Notifications",
    search: "Search restaurants, orders, staff...",
    smartRestaurant: "SmartRestaurant",
  },
  ar: {
    analytics: "التحليلات",
    stock: "المخزون",
    reservations: "الحجوزات",
    employees: "الموظفون",
    menu: "القائمة",
    orders: "الطلبات",
    notifications: "الإشعارات",
    search: "البحث في المطاعم والطلبات والموظفين...",
    smartRestaurant: "مطعم ذكي",
  },
  fr: {
    analytics: "Analyses",
    stock: "Stock",
    reservations: "Réservations",
    employees: "Employés",
    menu: "Menu",
    orders: "Commandes",
    notifications: "Notifications",
    search: "Rechercher restaurants, commandes, personnel...",
    smartRestaurant: "Restaurant Intelligent",
  },
}

export function DashboardLayout({ children, activeTab, onTabChange }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [language, setLanguage] = useState("en")
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const t = translations[language as keyof typeof translations]

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      {/* Sidebar - Reduced width from w-64 to w-56 */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-56 bg-sidebar border-r border-sidebar-border transform transition-all duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 shadow-lg`}
      >
        <div className="flex h-24 items-center justify-between px-4 pr-8">
          <div className="flex items-center gap-2">
            <Image
              src="/LogoManager.svg"
              alt="SmartRestaurant Logo"
              width={200}
              height={200}
            />
          </div>
        </div>

        <nav className="mt-3 px-3">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:scale-105 ${
                  activeTab === item.id
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-md"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {t[item.id as keyof typeof t] || item.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main content - Updated left padding from lg:pl-64 to lg:pl-56 */}
      <div className="lg:pl-56 ">
        {/* Top bar */}
        <header className="sticky h-24 top-0 z-40 bg-background/95 backdrop-blur   supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex flex-row h-24 items-center justify-between px-4 lg:px-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-5 w-5" />
              </Button>

              <div className="relative w-full max-w-sm lg:max-w-md xl:max-w-lg">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={t.search}
                  className="pl-10 bg-muted/50 transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 lg:gap-4">
              {/* Notifications - Added notification button with enhanced styling */}
              <Button
                variant="ghost"
                size="sm"
                className="relative hover:bg-primary/10 transition-colors duration-200"
                onClick={() => onTabChange("notifications")}
              >
                <Bell className="h-5 w-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-destructive animate-bounce">
                  3
                </Badge>
              </Button>

              {/* Language Selector - Enhanced with better styling */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors duration-200">
                    <Globe className="h-5 w-5" />
                    <span className="ml-2 text-sm hidden sm:inline">{language.toUpperCase()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="animate-in slide-in-from-top-2">
                  <DropdownMenuItem onClick={() => setLanguage("en")} className="cursor-pointer">
                    🇺🇸 English
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("ar")} className="cursor-pointer">
                    🇸🇦 العربية
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("fr")} className="cursor-pointer">
                    🇫🇷 Français
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Theme Toggle - Enhanced with smooth transitions */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  className="hover:bg-primary/10 transition-all duration-200 hover:scale-110"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </Button>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6 animate-in fade-in-50 duration-300">{children}</main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
