import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { OrdersManagement } from "@/components/orders-management"

export default function OrdersPage() {
  return (
    <div className="min-h-dvh bg-background">
      <TopBar />
      <main className="pt-14 pb-20">
        <OrdersManagement />
      </main>
      <BottomNavigation />
    </div>
  )
}
