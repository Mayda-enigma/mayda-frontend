import { BottomNavigation } from "@/components/bottom-navigation"
import { TopBar } from "@/components/top-bar"
import { ProfileSettings } from "@/components/profile-settings"

export default function ProfilePage() {
  return (
    <div className="min-h-dvh bg-background">
      <TopBar />
      <main className="pt-14 pb-20">
        <ProfileSettings />
      </main>
      <BottomNavigation />
    </div>
  )
}
