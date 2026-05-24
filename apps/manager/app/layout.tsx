import type React from "react"
import type { Metadata } from "next"
import { Outfit, Source_Code_Pro } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { QueryProvider } from "@/shared/lib/query-provider"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
  display: "swap",
})

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-source-code",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mayda Manager",
  description:
    "Plateforme complète de gestion de restaurant avec analyses en temps réel, supervision du personnel et informations opérationnelles.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${outfit.variable} ${sourceCodePro.variable} bg-background text-foreground antialiased`}>
        <QueryProvider>
          <Suspense fallback={null}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem={false}
              disableTransitionOnChange={false}
            >
              {children}
            </ThemeProvider>
          </Suspense>
          <Analytics />
        </QueryProvider>
      </body>
    </html>
  )
}
