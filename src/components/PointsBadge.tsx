"use client"

import Link from "next/link"
import { Coins, TrendingUp } from "lucide-react"
import { useAuth } from "@/components/AuthProvider"

export default function PointsBadge() {
  const { user } = useAuth()
  if (!user) return null

  const points = user.points ?? 0

  return (
    <Link
      href="/perfil"
      className="flex items-center gap-2 rounded-lg border border-border bg-surface/50 px-3 py-1.5 transition-colors hover:bg-surface"
    >
      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-accent/10">
        <Coins className="h-3 w-3 text-accent" />
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-mono text-sm font-semibold text-accent">{points.toLocaleString()}</span>
        <span className="font-mono text-[10px] uppercase text-muted">pts</span>
      </div>
      <div className="flex h-5 items-center gap-1 rounded bg-accent/5 px-1.5">
        <TrendingUp className="h-2.5 w-2.5 text-accent" />
        <span className="font-mono text-[10px] font-medium capitalize text-accent">{user.level}</span>
      </div>
    </Link>
  )
}
