import type React from "react"
import type { Metadata } from "next"
import { Outfit, Source_Code_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { NotificationProvider } from "@/components/notification-system"
import { I18nProvider } from "@/components/i18n-provider"
import { QueryProvider } from "@/shared/lib/query-provider"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
})

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-source-code",
})

export const metadata: Metadata = {
  title: "Mayda Chef - Kitchen Dashboard",
  description: "Real-time order and stock management for kitchen staff",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${outfit.variable} ${sourceCodePro.variable} antialiased`}>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
            <I18nProvider>
              <NotificationProvider>
                {children}
              </NotificationProvider>
            </I18nProvider>
          </ThemeProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}
