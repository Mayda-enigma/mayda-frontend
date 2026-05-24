"use client"

import Image from "next/image"
import { Button } from "@/shared/ui/button"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { NotificationSystem } from "@/components/notification-system"

export function TopBar() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-2 py-1.5 sm:px-3 sm:py-2">
        <div className="flex items-center gap-1.5">
          <Image
            src="/LogoAdmin.svg"
            alt="Mayda"
            width={120}
            height={40}
            priority
          />
        </div>

        <div className="flex items-center gap-1">
          {/* Notifications */}
          <NotificationSystem />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-7 w-7 p-0 sm:h-8 sm:w-8"
          >
            <Sun className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Changer le thème</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
