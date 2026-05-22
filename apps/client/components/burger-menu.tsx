"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, UtensilsCrossed, ShoppingBag, Clock, X } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/components/cart-context"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"

interface BurgerMenuProps {
  currentPage?: string
}

export function BurgerMenu({ currentPage }: BurgerMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { state } = useCart()

  const menuItems = [
    { href: "/", icon: Home, label: "Home", id: "home" },
    { href: "/menu", icon: UtensilsCrossed, label: "Menu", id: "menu" },
    { href: "/orders", icon: Clock, label: "Orders", id: "orders" },
    { href: "/cart", icon: ShoppingBag, label: "Cart", id: "cart" },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-1.5 h-8 hover:scale-110 transition-transform duration-200"
        >
          <Menu className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-24 px-4 border-b">
            <div className="flex items-center gap-2">
              <Image
                src="/LogoOnSite.svg"
                alt="Bella Vista Logo"
                width={200}
                height={200}
              />
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon
                const isActive = currentPage === item.id
                return (
                  <Link key={item.id} href={item.href} onClick={() => setIsOpen(false)}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 h-12 text-base hover:scale-105 transition-all duration-200 ${
                        isActive ? "restaurant-gradient text-white" : "hover:bg-accent"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                      {item.id === "cart" && currentPage === "cart" && state.items.length > 0 && (
                        <Badge className="ml-auto bg-primary text-white">{state.items.length}</Badge>
                      )}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4  mb-40 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
