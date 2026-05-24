import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { TableOverview } from "@/components/table-overview"
import { TableStatusBar } from "@/components/table-status-bar"
import { mockTables } from "@/features/tables"

export default function HomePage() {
 return (
 <div className="min-h-dvh bg-background">
 <TopBar />
 <main className="pt-14 pb-20">
 <TableOverview />
 </main>
 <TableStatusBar tables={mockTables} />
 <BottomNavigation />
 </div>
 )
}
