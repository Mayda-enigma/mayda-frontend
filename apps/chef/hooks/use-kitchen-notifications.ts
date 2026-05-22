"use client"

import { useCallback } from "react"

export function useKitchenNotifications() {
  const notifyStockLow = useCallback((itemName: string, currentStock: number, threshold: number) => {
    // Simple notification - in a real app this might use a toast library
    console.log(`Low stock alert: ${itemName} - ${currentStock}/${threshold}`)

    // You could integrate with a toast library here
    if (typeof window !== "undefined" && "Notification" in window) {
      if (Notification.permission === "granted") {
        new Notification(`Low Stock: ${itemName}`, {
          body: `Only ${currentStock} ${itemName} remaining (threshold: ${threshold})`,
          icon: "/favicon.ico",
        })
      }
    }
  }, [])

  return { notifyStockLow }
}
