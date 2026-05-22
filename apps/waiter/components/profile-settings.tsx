"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import { User, Settings, Bell, Palette, Globe, Volume2, Vibrate } from "lucide-react"

export function ProfileSettings() {
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibrationEnabled, setVibrationEnabled] = useState(true)
  const [autoAcknowledge, setAutoAcknowledge] = useState(false)

  const languages = [
    { code: "en" as const, name: "English", flag: "🇺🇸" },
    { code: "fr" as const, name: "Français", flag: "🇫🇷" },
    { code: "ar" as const, name: "العربية", flag: "🇸🇦" },
  ]

  return (
    <div className="p-2 sm:p-3 space-y-3">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-full flex items-center justify-center">
          <User className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-heading text-foreground">{t("profile")}</h2>
          <p className="text-xs text-muted-foreground">Waiter #001 - John Doe</p>
        </div>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Palette className="h-4 w-4" />
            Theme Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Dark Mode</h4>
              <p className="text-xs text-muted-foreground">
                {theme === "dark" ? "Night service mode active" : "Bright restaurant mode active"}
              </p>
            </div>
            <Switch checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")} />
          </div>
          <div className="text-xs text-muted-foreground">
            Light mode is optimized for bright restaurant environments, while dark mode is perfect for night service.
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Globe className="h-4 w-4" />
            Language Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="grid gap-1.5">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "outline"}
                onClick={() => setLanguage(lang.code)}
                className="justify-start gap-2 h-9 text-sm"
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.name}</span>
                {language === lang.code && (
                  <Badge variant="secondary" className="text-xs">
                    Active
                  </Badge>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Bell className="h-4 w-4" />
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className="h-3 w-3" />
              <div>
                <h4 className="text-sm font-medium">Sound Alerts</h4>
                <p className="text-xs text-muted-foreground">Play sound for new notifications</p>
              </div>
            </div>
            <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Vibrate className="h-3 w-3" />
              <div>
                <h4 className="text-sm font-medium">Vibration</h4>
                <p className="text-xs text-muted-foreground">Vibrate device for urgent notifications</p>
              </div>
            </div>
            <Switch checked={vibrationEnabled} onCheckedChange={setVibrationEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="h-3 w-3" />
              <div>
                <h4 className="text-sm font-medium">Auto-acknowledge</h4>
                <p className="text-xs text-muted-foreground">Automatically mark notifications as read after 30s</p>
              </div>
            </div>
            <Switch checked={autoAcknowledge} onCheckedChange={setAutoAcknowledge} />
          </div>
        </CardContent>
      </Card>

      {/* App Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">App Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Version</span>
            <span>1.0.0</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Last Updated</span>
            <span>Today</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Restaurant</span>
            <span>Smart Restaurant Demo</span>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Button variant="outline" className="h-9 bg-transparent text-sm">
          Sync Data
        </Button>
        <Button variant="outline" className="h-9 bg-transparent text-sm">
          Help & Support
        </Button>
      </div>
    </div>
  )
}
