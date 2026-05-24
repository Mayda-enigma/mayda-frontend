import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { QRScanner } from "@/components/qr-scanner"

export default function ScannerPage() {
  return (
    <div className="min-h-dvh bg-background">
      <TopBar />
      <main className="pt-14 pb-20">
        <QRScanner />
      </main>
      <BottomNavigation />
    </div>
  )
}
