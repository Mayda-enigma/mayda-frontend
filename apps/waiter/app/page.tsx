import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { TableOverview } from "@/components/table-overview"
import { TableStatusBar } from "@/components/table-status-bar"
import { mockTables } from "@/components/table-overview"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="py-28">
        <TableOverview />
      </main>
      <TableStatusBar tables={mockTables} />
      <BottomNavigation />
    </div>
  )
}
