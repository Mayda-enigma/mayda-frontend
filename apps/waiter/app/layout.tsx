import type React from "react"
import type { Metadata } from "next"
import { Poppins, Source_Code_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { QueryProvider } from "@/shared/lib/query-provider"
import "./globals.css"

const poppins = Poppins({
 subsets: ["latin"],
 weight: ["300", "400", "500", "600", "700"],
 variable: "--font-sans",
})

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-code",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Waiter - Mayda",
  description: "Application mobile de service pour la gestion intelligente des restaurants",
 generator: "v0.app",
}

export default function RootLayout({
 children,
}: Readonly<{
 children: React.ReactNode
}>) {
 return (
    <html lang="fr" suppressHydrationWarning>
 <body className={`${poppins.variable} ${sourceCodePro.variable} bg-background text-foreground antialiased`}>
 <QueryProvider>
 <Suspense fallback={null}>
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
  {children}
  </ThemeProvider>
 <Analytics />
 </Suspense>
 </QueryProvider>
 </body>
 </html>
 )
}
