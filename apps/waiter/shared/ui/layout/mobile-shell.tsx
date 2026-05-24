"use client"

import * as React from "react"

import { TopBar } from "@/components/top-bar"
import { BottomNavigation } from "@/components/bottom-navigation"

interface MobileShellProps {
  children: React.ReactNode
}

export function MobileShell({ children }: MobileShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <TopBar />
      <main className="pt-14 pb-20">{children}</main>
      <BottomNavigation />
    </div>
  )
}
