"use client"

import { useState } from "react"
import { useLogin } from "@/features/auth/api/mutations"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter, useSearchParams } from "next/navigation"

export function LoginForm() {
  const login = useLogin()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          const next = searchParams.get("next") ?? "/menu"
          router.push(next)
        },
      },
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {login.error && (
        <p className="text-sm text-destructive">{login.error.message}</p>
      )}
      <Button
        type="submit"
        className="w-full restaurant-gradient text-white"
        disabled={login.isPending}
      >
        {login.isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}
