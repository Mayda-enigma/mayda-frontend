"use client"

import * as React from "react"
import Image from "next/image"
import {
  BarChart3,
  Bell,
  ChevronDown,
  ChevronsUpDown,
  type LucideIcon,
  LogOut,
  Moon,
  Settings,
  Sun,
} from "lucide-react"

import { cn } from "@/shared/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import { useTheme } from "@/shared/ui/theme-provider"

export interface NavItem {
  id: string
  name: string
  icon: typeof BarChart3
}

interface SidebarProps {
  navigation: NavItem[]
  activeTab: string
  onTabChange: (tab: string) => void
  className?: string
  onNavigate?: () => void
}

const settingsSubItems = [
  { id: "general", label: "General" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notifications" },
  { id: "billing", label: "Billing" },
]

export function Sidebar({
  navigation,
  activeTab,
  onTabChange,
  className,
  onNavigate,
}: SidebarProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted && (resolvedTheme ?? theme) === "dark"
  const isOnSettings = activeTab.startsWith("settings")

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className={cn("flex h-full w-full flex-col gap-4 text-foreground", className)}>
      {/* 1. Header */}
      <header className="flex h-9 items-center justify-between gap-2 px-2">
        <div className="flex items-center gap-2 rounded-md">
          <Image
            src="/LogoManager.svg"
            alt=""
            width={120}
            height={32}
            className="h-8 w-auto select-none"
            draggable={false}
          />
        </div>

        <div className="flex items-center gap-1">
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              suppressHydrationWarning
              className="grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {isDark ? (
                <Sun className="size-4" aria-hidden />
              ) : (
                <Moon className="size-4" aria-hidden />
              )}
            </button>
          )}
          <button
            type="button"
            aria-label="Notifications"
            className="relative grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <Bell className="size-4" aria-hidden />
            <span
              className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive ring-2 ring-sidebar"
              aria-hidden
            />
          </button>
        </div>
      </header>

      {/* 2. Account selector */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "flex h-10 w-full items-center gap-2 rounded-lg border bg-card px-2 text-left transition-colors",
            "shadow-depth-btn hover:bg-card/95",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          aria-label="Switch workspace"
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary/15 text-xs font-bold leading-none text-primary">
            M
          </span>
          <span className="min-w-0 flex-1 truncate text-sm font-medium leading-none">
            Main Restaurant
          </span>
          <span className="inline-flex h-5 shrink-0 items-center rounded-md border bg-background px-1.5 text-[10px] font-semibold uppercase leading-none tracking-wider text-muted-foreground">
            Free
          </span>
          <ChevronsUpDown
            className="size-3.5 shrink-0 text-muted-foreground"
            aria-hidden
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
        >
          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
            Workspaces wire up in AD-005.
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 3. Primary nav */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1">
          {navigation.map(({ id, name, icon: Icon }) => {
            const active = activeTab === id
            return (
              <li key={id}>
                <button
                  onClick={() => {
                    onTabChange(id)
                    onNavigate?.()
                  }}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex h-9 w-full items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border bg-card text-foreground shadow-depth-btn"
                      : "text-foreground/75 hover:bg-accent hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0",
                      active
                        ? "text-foreground"
                        : "text-foreground/55 group-hover:text-foreground",
                    )}
                    aria-hidden
                  />
                  <span className="truncate">{name}</span>
                </button>
              </li>
            )
          })}
        </ul>

        {/* 4. Account settings group */}
        <div className="mt-1">
          <div
            className={cn(
              "transition-colors",
              isOnSettings && "rounded-lg border bg-card shadow-depth-card p-1",
            )}
          >
            <button
              onClick={() => {
                onTabChange(isOnSettings ? activeTab : "settings/general")
                onNavigate?.()
              }}
              aria-current={isOnSettings ? "page" : undefined}
              className={cn(
                "group flex h-9 w-full items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                "outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isOnSettings
                  ? "text-foreground"
                  : "text-foreground/75 hover:bg-accent hover:text-foreground",
              )}
            >
              <Settings
                className={cn(
                  "size-4 shrink-0",
                  isOnSettings
                    ? "text-foreground"
                    : "text-foreground/55 group-hover:text-foreground",
                )}
                aria-hidden
              />
              <span className="flex-1 truncate text-left">Account settings</span>
              <ChevronDown
                className={cn(
                  "size-3.5 shrink-0 text-muted-foreground transition-transform",
                  isOnSettings ? "rotate-0" : "-rotate-90",
                )}
                aria-hidden
              />
            </button>

            {isOnSettings ? (
              <ul
                className="mt-1 ml-5 space-y-0.5 border-l border-border pl-4"
                aria-label="Account settings sections"
              >
                {settingsSubItems.map((item) => {
                  const active = activeTab === `settings/${item.id}`
                  return (
                    <li key={item.id} className="relative">
                      {active ? (
                        <span
                          className="absolute -left-[1.125rem] top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-foreground"
                          aria-hidden
                        />
                      ) : null}
                      <button
                        onClick={() => {
                          onTabChange(`settings/${item.id}`)
                          onNavigate?.()
                        }}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                          "flex h-7 w-full items-center rounded-md px-2 text-sm transition-colors",
                          "outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          active
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : null}
          </div>
        </div>
      </nav>

      {/* 5. Footer profile */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            "flex h-12 w-full items-center gap-3 rounded-lg p-2 text-left transition-colors",
            "hover:bg-accent",
            "outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
          aria-label="Open profile menu"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-purple text-sm font-semibold leading-none text-white">
            A
          </span>
          <span className="min-w-0 flex-1 leading-tight">
            <span className="block truncate text-sm font-medium">
              Admin User
            </span>
            <span className="block truncate text-xs text-muted-foreground">
              admin@mayda.app
            </span>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align="start"
          className="w-[--radix-dropdown-menu-trigger-width] min-w-56"
        >
          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
            Account actions land in AD-004 (auth).
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant="destructive" disabled>
            <LogOut className="size-4" aria-hidden />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
