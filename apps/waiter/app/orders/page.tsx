import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { OrdersManagement } from "@/components/orders-management"

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="py-28">
        <OrdersManagement />
      </main>
      <BottomNavigation />
    </div>
  )
}
