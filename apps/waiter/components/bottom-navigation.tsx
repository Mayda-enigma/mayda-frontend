"use client"

import { Home, QrCode, ClipboardList } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"

const navItems = [
  { id: "tables", icon: Home, href: "/" },
  { id: "scanner", icon: QrCode, href: "/scanner" },
  { id: "orders", icon: ClipboardList, href: "/orders" },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const getActiveTab = () => {
    if (pathname === "/") return "tables"
    if (pathname === "/scanner") return "scanner"
    if (pathname === "/orders") return "orders"
    return "tables"
  }

  const activeTab = getActiveTab()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/60 z-50 safe-area-pb">
      <div className="flex items-center justify-around py-1 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <Link 
              key={item.id} 
              href={item.href}
              className="flex-1 max-w-[80px]"
            >
              <div
                className={cn(
                  "relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-300 ease-in-out group",
                  "hover:bg-primary/5 hover:scale-105",
                  "active:scale-95 active:bg-primary/10",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
                  isActive && [
                    "bg-primary/10 text-primary",
                    "shadow-sm",
                    "before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-6 before:h-0.5 before:bg-primary before:rounded-full",
                    "after:absolute after:inset-0 after:rounded-xl after:bg-gradient-to-b after:from-primary/5 after:to-transparent after:pointer-events-none"
                  ],
                  !isActive && "text-muted-foreground hover:text-foreground"
                )}
              >
                {/* Icon Container with enhanced active state */}
                <div className={cn(
                  "relative flex items-center justify-center w-8 h-8 transition-all duration-300",
                  isActive && "transform"
                )}>
                  <Icon className={cn(
                    "transition-all duration-300",
                    isActive ? "w-6 h-6" : "w-5 h-5",
                    "group-hover:scale-110"
                  )} />
                </div>

                {/* Label with improved typography */}
                <span className={cn(
                  "text-[10px] font-medium mt-1 transition-all duration-300 leading-none",
                  isActive ? "font-semibold" : "font-normal",
                  "group-hover:font-medium"
                )}>
                  {t(item.id)}
                </span>

                
              </div>
            </Link>
          )
        })}
      </div>

      {/* Enhanced gradient overlay for better visual hierarchy */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </nav>
  )
}
