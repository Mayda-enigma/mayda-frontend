"use client"

import { Button } from "@/components/ui/button"

export default function MenuError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold">Failed to load menu</h2>
        <p className="text-muted-foreground text-sm">{error.message}</p>
        <Button onClick={reset} className="restaurant-gradient text-white">
          Try again
        </Button>
      </div>
    </div>
  )
}
