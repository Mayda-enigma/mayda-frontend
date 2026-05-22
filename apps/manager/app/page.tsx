"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { StockManagement } from "@/components/stock-management"
import { ReservationManagement } from "@/components/reservation-management"
import { EmployeeManagement } from "@/components/employee-management"
import { MenuManagement } from "@/components/menu-management"
import { OrdersNotifications } from "@/components/orders-notifications"
import { NotificationsPage } from "@/components/notifications-page" // Added notifications page import

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("analytics")

  const renderContent = () => {
    switch (activeTab) {
      case "analytics":
        return <AnalyticsDashboard />
      case "stock":
        return <StockManagement />
      case "reservations":
        return <ReservationManagement />
      case "employees":
        return <EmployeeManagement />
      case "menu":
        return <MenuManagement />
      case "orders":
        return <OrdersNotifications />
      case "notifications": // Added notifications case
        return <NotificationsPage />
      default:
        return <AnalyticsDashboard />
    }
  }

  return (
    <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  )
}
