import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { ProfileSettings } from "@/components/profile-settings"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <main className="py-28">
        <ProfileSettings />
      </main>
      <BottomNavigation />
    </div>
  )
}
