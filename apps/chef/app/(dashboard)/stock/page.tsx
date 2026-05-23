import { StockManagement } from "@/components/stock-management"

export default function StockPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-3 sm:p-4 md:p-6">
        <StockManagement />
      </div>
    </div>
  )
}
