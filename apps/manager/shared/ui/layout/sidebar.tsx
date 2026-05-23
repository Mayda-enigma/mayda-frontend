"use client"

import * as React from "react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  ChevronRight,
  ChevronsUpDown,
  LogOut,
  Moon,
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
import type { NavSection } from "./navigation-config"

interface SidebarProps {
  navigation: NavSection[]
  className?: string
  onNavigate?: () => void
}

export function Sidebar({ navigation, className, onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(
    new Set(),
  )

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const toExpand = new Set(expandedSections)
    let changed = false
    for (const section of navigation) {
      if (section.items) {
        const anyChildActive = section.items.some(
          (item) => pathname === item.href || pathname.startsWith(item.href + "/"),
        )
        if (anyChildActive) {
          toExpand.add(section.id)
          changed = true
        }
      }
    }
    if (changed) setExpandedSections(toExpand)
  }, [pathname, navigation])

  const isDark = mounted && (resolvedTheme ?? theme) === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  const handleSectionClick = (section: NavSection) => {
    if (section.items && section.items.length > 0) {
      setExpandedSections((prev) => {
        const next = new Set(prev)
        if (next.has(section.id)) {
          next.delete(section.id)
        } else {
          next.add(section.id)
        }
        return next
      })
    } else if (section.href) {
      router.push(section.href)
      onNavigate?.()
    }
  }

  const isExactActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname === href
  }

  const isChildActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  const isSectionActive = (section: NavSection) => {
    if (section.href && isExactActive(section.href)) return true
    if (section.items?.some((item) => isExactActive(item.href))) return true
    return false
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

      {/* 3. Navigation */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-0.5">
          {navigation.map((section) => {
            const active = isSectionActive(section)
            const expanded = expandedSections.has(section.id)
            const hasItems = section.items && section.items.length > 0

            return (
              <li key={section.id}>
                <button
                  type="button"
                  onClick={() => handleSectionClick(section)}
                  aria-current={active ? "page" : undefined}
                  aria-expanded={hasItems ? expanded : undefined}
                  className={cn(
                    "group flex h-9 w-full items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
                    "outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    active
                      ? "border bg-card text-foreground shadow-depth-btn"
                      : "text-foreground/75 hover:bg-accent hover:text-foreground",
                  )}
                >
                  <section.icon
                    className={cn(
                      "size-4 shrink-0",
                      active
                        ? "text-foreground"
                        : "text-foreground/55 group-hover:text-foreground",
                    )}
                    aria-hidden
                  />
                  <span className="flex-1 truncate text-left">{section.label}</span>
                  {hasItems && (
                    <ChevronRight
                      className={cn(
                        "size-3.5 shrink-0 text-muted-foreground transition-transform duration-fast ease-out",
                        expanded && "rotate-90",
                      )}
                      aria-hidden
                    />
                  )}
                </button>

                {hasItems && expanded && (
                  <ul className="mt-0.5 ml-5 space-y-0.5 border-l border-border pl-4" aria-label={`${section.label} sub-navigation`}>
                    {section.items!.map((item) => {
                      const itemActive = isChildActive(item.href)
                      return (
                        <li key={item.href} className="relative">
                          {itemActive && (
                            <span
                              className="absolute -left-[1.125rem] top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-foreground"
                              aria-hidden
                            />
                          )}
                          <button
                            type="button"
                            onClick={() => {
                              router.push(item.href)
                              onNavigate?.()
                            }}
                            aria-current={itemActive ? "page" : undefined}
                            className={cn(
                              "flex h-7 w-full items-center rounded-md px-2 text-sm transition-colors",
                              "outline-none focus-visible:ring-2 focus-visible:ring-ring",
                              itemActive
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
                )}
              </li>
            )
          })}
        </ul>
      </nav>

      {/* 4. Footer profile */}
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
