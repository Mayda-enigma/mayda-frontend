import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { CartProvider } from "@/components/cart-context"
import { CartSidebar } from "@/components/cart-sidebar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Restaurant Experience - Premium Digital Dining",
  description: "Premium onsite digital restaurant experience with QR ordering",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${poppins.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange={false}>
          <CartProvider>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <CartSidebar />
            <BottomNavigation />
            <Analytics />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
