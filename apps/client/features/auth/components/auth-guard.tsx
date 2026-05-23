"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCurrentUser } from "@/features/auth/api/queries"

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useCurrentUser()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  if (isLoading) return null
  if (!user) return null

  return <>{children}</>
}
