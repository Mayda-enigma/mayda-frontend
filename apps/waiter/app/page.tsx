import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { TableOverview } from "@/components/table-overview"

export default function HomePage() {
  return (
    <div className="min-h-dvh bg-background">
      <TopBar />
      <main className="pt-14 pb-20">
        <TableOverview />
      </main>
      <BottomNavigation />
    </div>
  )
}
