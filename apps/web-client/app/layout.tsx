import type React from "react"
import type { Metadata } from "next"
import { Outfit, Source_Code_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { QueryProvider } from "@/shared/lib/query-provider"
import { CartSidebar } from "@/features/cart/components/cart-sidebar"
import { BottomNavigation } from "@/components/bottom-navigation"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
})

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-source-code-pro",
})

export const metadata: Metadata = {
  title: "Mayda - Premium Digital Dining",
  description: "Premium onsite digital restaurant experience with QR ordering",
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
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
          <CartSidebar />
          <BottomNavigation />
          <Analytics />
        </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
