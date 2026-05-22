"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Globe, Moon, Sun, Sparkles } from "lucide-react"
import { NotificationSystem, type Notification } from "@/components/notification-system"
import { useLanguage } from "@/components/language-provider"

const languages = [
  { code: "en" as const, name: "English", flag: "🇺🇸" },
  { code: "fr" as const, name: "Français", flag: "🇫🇷" },
  { code: "ar" as const, name: "العربية", flag: "🇸🇦" },
]

export function TopBar() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [notifications, setNotifications] = useState<Notification[]>([])

  const currentLang = languages.find((lang) => lang.code === language) || languages[0]

  const handleNotificationUpdate = (updatedNotifications: Notification[]) => {
    setNotifications(updatedNotifications)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-2 py-1.5 sm:px-3 sm:py-2">
        <div className="flex items-center gap-1.5">
          <Image
            src="/LogoWaiter.svg"
            alt="WaiterApp Logo"
            width={200}
            height={200}
            style={{ filter: 'drop-shadow(2px 2px 4px rgba(255, 255, 255, 0.8))' }}
          />
        </div>

        <div className="flex items-center gap-1">
          {/* Notifications */}
          <NotificationSystem onNotificationUpdate={handleNotificationUpdate} />

          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1 h-7 px-1.5 sm:h-8 sm:px-2">
                <Globe className="h-3 w-3" />
                <span className="text-xs">{currentLang.flag}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-fade-in">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className="gap-2 text-xs py-1.5"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="h-7 w-7 p-0 sm:h-8 sm:w-8 hover-lift"
          >
            <Sun className="h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
