"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { useState } from "react"
import { ChefHat, Package, BarChart3, Menu } from "lucide-react"
import { Button } from "@/shared/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSelector } from "@/components/language-selector"
import { NotificationCenter } from "@/components/notification-center"
import { useI18n } from "@/components/i18n-provider"

export function ChefTopbar() {
  const pathname = usePathname()
  const { language, setLanguage, t } = useI18n()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { href: "/", label: t.dashboard, icon: ChefHat },
    { href: "/stock", label: t.stock, icon: Package },
    { href: "/analytics", label: t.analytics, icon: BarChart3 },
  ]

  const NavLinks = ({ onNavigate }: { onNavigate?: () => void }) => (
    <>
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        return (
          <Link key={item.href} href={item.href} onClick={onNavigate}>
            <Button
              variant={isActive ? "default" : "ghost"}
              size="sm"
              aria-current={isActive ? "page" : undefined}
            >
              <Icon />
              {item.label}
            </Button>
          </Link>
        )
      })}
    </>
  )

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-border bg-card px-4 md:px-6">
      {/* Mobile menu trigger */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 bg-sidebar">
          <div className="mt-6 flex flex-col gap-2">
            <NavLinks onNavigate={() => setMobileOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 font-semibold text-sm shrink-0">
        <Image
          src="/LogoChef.svg"
          alt="Mayda Chef"
          width={24}
          height={24}
          className="size-6"
        />
        <span className="hidden sm:inline">Mayda Chef</span>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1">
        <NavLinks />
      </nav>

      {/* Right cluster */}
      <div className="ml-auto flex items-center gap-2">
        <NotificationCenter />
        <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
        <ThemeToggle />
      </div>
    </header>
  )
}
