"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Coins, Award, Trash2, Cloud, Recycle, ArrowUpRight,
  TrendingUp, Gift, FileText, Loader2, ChevronRight,
} from "lucide-react"
import { useAuth } from "@/components/AuthProvider"

interface Stats {
  points: number; level: string; totalKg: number; co2Saved: number
  dropOffCount: number; redemptionsCount: number; certificatesCount: number
  memberSince: string; progress: { current: number; next: number; remaining: number; percent: number }
}

interface Transaction {
  id: string; type: string; amount: number; balanceAfter: number
  reference: string | null; note: string | null; createdAt: string
}

const statCards = [
  { key: "points", label: "Saldo de Puntos", icon: Coins, format: (v: unknown) => (v as number).toLocaleString(), suffix: "pts" },
  { key: "level", label: "Nivel Actual", icon: TrendingUp, format: (v: unknown) => { const levels: Record<string, string> = { bronce: "Bronce", plata: "Plata", oro: "Oro" }; const s = v as string; return levels[s] || s.charAt(0).toUpperCase() + s.slice(1) }, suffix: "" },
  { key: "totalKg", label: "Total Reciclado", icon: Recycle, format: (v: unknown) => (v as number).toFixed(1), suffix: "kg" },
  { key: "co2Saved", label: "CO₂ Evitado", icon: Cloud, format: (v: unknown) => (v as number).toFixed(1), suffix: "kg" },
  { key: "dropOffCount", label: "Entregas", icon: Trash2, format: (v: unknown) => (v as number).toString(), suffix: "" },
  { key: "redemptionsCount", label: "Canjeos", icon: Gift, format: (v: unknown) => (v as number).toString(), suffix: "" },
  { key: "certificatesCount", label: "Certificados", icon: FileText, format: (v: unknown) => (v as number).toString(), suffix: "" },
]

const typeLabels: Record<string, { label: string; color: string }> = {
  earn: { label: "Ganados", color: "text-accent" },
  spend: { label: "Canjeados", color: "text-red-400" },
}

export default function PerfilPage() {
  const { user, token, loading } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState<Stats | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (loading) return
    if (!token || !user) { router.push("/"); return }
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` }
        const [statsRes, txRes] = await Promise.all([
          fetch("/api/user/stats", { headers }),
          fetch("/api/points/history?limit=10", { headers }),
        ])
        if (statsRes.ok) setStats(await statsRes.json())
        if (txRes.ok) { const d = await txRes.json(); setTransactions(d.transactions) }
      } finally { setFetching(false) }
    }
    fetchData()
  }, [token, user, loading, router])

  if (loading || fetching) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </main>
    )
  }

  if (!stats) return null

  return (
    <main className="flex-1 pt-14">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-foreground">
            Hola, <span className="text-accent">{user?.name}</span>
          </h1>
          <p className="mt-1 text-sm text-muted">
            Miembro desde {new Date(stats.memberSince).toLocaleDateString("es-DO", { year: "numeric", month: "long" })}
          </p>
        </div>

        {/* Level Progress */}
        <div className="mb-8 rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-accent" />
              <span className="text-xs font-medium text-foreground">Progreso al siguiente nivel</span>
            </div>
            <span className="font-mono text-xs text-muted">
              {stats.progress.current.toLocaleString()} / {stats.progress.next.toLocaleString()}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-background">
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${Math.min(stats.progress.percent, 100)}%` }}
            />
          </div>
          <p className="mt-2 text-[10px] text-muted">
            {stats.progress.remaining > 0
              ? `Te faltan ${stats.progress.remaining.toLocaleString()} pts para subir de nivel`
              : "¡Nivel máximo alcanzado!"}
          </p>
        </div>

        {/* Stats grid */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {statCards.map(({ key, label, icon: Icon, format, suffix }) => (
            <div key={key} className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/30">
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-3 w-3 text-muted" />
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted">
                  {label}
                </span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-lg font-semibold text-foreground">
                  {format((stats as any)[key])}
                </span>
                {suffix && <span className="font-mono text-[10px] text-muted">{suffix}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="mb-8 flex flex-wrap gap-3">
          <a
            href="/recompensas"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-accent-hover"
          >
            <Gift className="h-3.5 w-3.5" />
            Canjear Puntos
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href="/certificados"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-surface"
          >
            <FileText className="h-3.5 w-3.5" />
            Ver Certificados
            <ArrowUpRight className="h-3 w-3" />
          </a>
          <a
            href="/solicitar"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-accent-hover"
          >
            <Recycle className="h-3.5 w-3.5" />
            Reciclar Ahora
            <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        {/* Recent transactions */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-foreground">Actividad Reciente</h2>
            {transactions.length > 0 && (
              <span className="text-[10px] text-muted">Últimas {transactions.length}</span>
            )}
          </div>
          <div className="space-y-1">
            {transactions.length === 0 ? (
              <div className="rounded-xl border border-border bg-surface p-6 text-center">
                <Coins className="mx-auto mb-2 h-5 w-5 text-muted" />
                <p className="text-xs text-muted">Aún no tienes actividad</p>
                <p className="mt-1 text-[10px] text-muted/60">Recicla dispositivos para ganar puntos</p>
              </div>
            ) : (
              transactions.map((tx) => {
                const info = typeLabels[tx.type] || { label: tx.type, color: "text-foreground" }
                return (
                  <div key={tx.id} className="flex items-center justify-between rounded-lg border border-border bg-surface/50 px-4 py-2.5">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-7 w-7 items-center justify-center rounded-md ${tx.type === "earn" ? "bg-accent/10" : "bg-red-500/10"}`}>
                        <Coins className={`h-3 w-3 ${tx.type === "earn" ? "text-accent" : "text-red-400"}`} />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-foreground">{tx.note || info.label}</p>
                        <p className="font-mono text-[10px] text-muted">
                          {new Date(tx.createdAt).toLocaleDateString("es-DO", { day: "numeric", month: "short" })}
                          {tx.reference && ` · Ref: ${tx.reference}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`font-mono text-sm font-semibold ${info.color}`}>
                        {tx.type === "earn" ? "+" : "-"}{tx.amount.toLocaleString()}
                      </span>
                      <p className="font-mono text-[10px] text-muted">saldo {tx.balanceAfter.toLocaleString()}</p>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
