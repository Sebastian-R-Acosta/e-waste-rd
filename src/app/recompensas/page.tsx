"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Gift, Coins, Building2, Percent, Loader2, X, CheckCircle,
  ShoppingBag, Heart, Award,
} from "lucide-react"
import { useAuth } from "@/components/AuthProvider"
import type { Reward } from "@/lib/types"

const typeConfig: Record<string, { icon: typeof Gift; label: string; color: string }> = {
  discount: { icon: Percent, label: "Descuento", color: "text-blue-400" },
  donation: { icon: Heart, label: "Donación", color: "text-pink-400" },
  certificate: { icon: Award, label: "Certificado", color: "text-amber-400" },
}

export default function RecompensasPage() {
  const { user, token, loading } = useAuth()
  const router = useRouter()
  const [rewards, setRewards] = useState<Reward[]>([])
  const [fetching, setFetching] = useState(true)
  const [redeeming, setRedeeming] = useState<string | null>(null)
  const [selected, setSelected] = useState<Reward | null>(null)
  const [result, setResult] = useState<{ ok: boolean; msg: string } | null>(null)

  useEffect(() => {
    if (loading) return
    const fetchRewards = async () => {
      try {
        const headers: Record<string, string> = {}
        if (token) headers["Authorization"] = `Bearer ${token}`
        const res = await fetch("/api/rewards", { headers })
        if (res.ok) setRewards(await res.json())
      } finally { setFetching(false) }
    }
    fetchRewards()
  }, [token, loading])

  const handleRedeem = async () => {
    if (!selected || !token) return
    setRedeeming(selected.id)
    setResult(null)
    try {
      const res = await fetch("/api/rewards/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ rewardId: selected.id }),
      })
      const data = await res.json()
      if (res.ok) {
        setResult({ ok: true, msg: `¡Canjeaste "${selected.name}"! Revisa tu perfil para ver los detalles.` })
        setSelected(null)
      } else {
        setResult({ ok: false, msg: data.error || "Error al canjear" })
      }
    } catch {
      setResult({ ok: false, msg: "Error de conexión" })
    } finally { setRedeeming(null) }
  }

  if (loading || fetching) {
    return (
      <main className="flex flex-1 items-center justify-center pt-14">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </main>
    )
  }

  return (
    <main className="flex-1 pt-14">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-foreground">Recompensas</h1>
          <p className="mt-1 text-sm text-muted">
            Canjea tus puntos por descuentos, donaciones y certificados
          </p>
        </div>

        {rewards.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-10 text-center">
            <Gift className="mx-auto mb-3 h-8 w-8 text-muted" />
            <p className="text-sm text-muted">No hay recompensas disponibles actualmente</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rewards.map((reward) => {
              const cfg = typeConfig[reward.type] || { icon: Gift, label: reward.type, color: "text-muted" }
              const Icon = cfg.icon
              const canRedeem = token && (user?.points ?? 0) >= reward.cost
              return (
                <div
                  key={reward.id}
                  className="group rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent/30 hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${cfg.color.replace("text", "bg")}/10`}>
                      <Icon className={`h-4 w-4 ${cfg.color}`} />
                    </div>
                    <span className="rounded bg-background px-2 py-0.5 font-mono text-[10px] text-muted">
                      {cfg.label}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{reward.name}</h3>
                  <p className="mt-1 text-xs text-muted line-clamp-2">{reward.description}</p>
                  {reward.partner && (
                    <div className="mt-2 flex items-center gap-1">
                      <Building2 className="h-3 w-3 text-muted" />
                      <span className="font-mono text-[10px] text-muted">{reward.partner}</span>
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Coins className="h-3.5 w-3.5 text-accent" />
                      <span className="font-mono text-sm font-semibold text-accent">{reward.cost.toLocaleString()}</span>
                      <span className="font-mono text-[10px] text-muted">pts</span>
                    </div>
                    {token ? (
                      <button
                        onClick={() => {
                          if (reward.cost === 0) { setSelected(reward); return }
                          if (!canRedeem) return
                          setSelected(reward)
                        }}
                        disabled={reward.cost > 0 && !canRedeem}
                        className={`rounded-lg px-3 py-1.5 text-[10px] font-semibold transition-all ${
                          canRedeem || reward.cost === 0
                            ? "bg-accent text-black hover:bg-accent-hover"
                            : "cursor-not-allowed bg-background text-muted"
                        }`}
                      >
                        {reward.cost === 0 ? "Obtener" : canRedeem ? "Canjear" : `${(reward.cost - (user?.points ?? 0)).toLocaleString()} pts restantes`}
                      </button>
                    ) : (
                      <span className="text-[10px] text-muted">Inicia sesión para canjear</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Redeem confirmation modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm rounded-xl border border-border bg-surface p-6"
            >
              <button
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-md text-muted hover:bg-background hover:text-foreground"
              >
                <X className="h-3 w-3" />
              </button>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Gift className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">Confirmar Canje</h3>
              <p className="mt-1 text-xs text-muted">
                ¿Canjear <span className="font-medium text-foreground">{selected.name}</span> por{" "}
                <span className="font-mono font-semibold text-accent">{selected.cost.toLocaleString()} pts</span>?
              </p>
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setSelected(null)}
                  className="flex-1 rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-background"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleRedeem}
                  disabled={redeeming === selected.id}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-60"
                >
                  {redeeming === selected.id && <Loader2 className="h-3 w-3 animate-spin" />}
                  {redeeming === selected.id ? "Canjeando..." : "Confirmar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result toast */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2"
          >
            <div className={`flex items-center gap-3 rounded-xl border px-5 py-3 shadow-lg ${
              result.ok
                ? "border-accent/30 bg-accent/10"
                : "border-red-500/30 bg-red-500/10"
            }`}>
              <CheckCircle className={`h-4 w-4 ${result.ok ? "text-accent" : "text-red-400"}`} />
              <span className={`text-xs font-medium ${result.ok ? "text-accent" : "text-red-400"}`}>
                {result.msg}
              </span>
              <button onClick={() => setResult(null)} className="ml-2 text-muted hover:text-foreground">
                <X className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
