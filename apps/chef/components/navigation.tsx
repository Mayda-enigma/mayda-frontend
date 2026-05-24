"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Button } from "@/shared/ui/button"
import { ChefHat, Package, BarChart3 } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

export function Navigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Tableau de bord", icon: ChefHat },
    { href: "/stock", label: "Stock", icon: Package },
    { href: "/analytics", label: "Analyses", icon: BarChart3 },
  ]

  return (
    <nav className="flex flex-row justify-between bg-card border-b border-border p-4 mb-8">
      <div className="flex items-center gap-2">
        <Image
          src="/LogoAdmin.svg"
          alt="Mayda Chef"
          width={200}
          height={200}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex gap-2 ml-auto items-center">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={
                    isActive
                      ? "bg-primary hover:bg-primary/90"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            )
          })}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  )
}
