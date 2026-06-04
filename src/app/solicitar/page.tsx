"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Recycle, Coins, Loader2, Trash2, Award, Cloud, CheckCircle, ArrowRight, ChevronDown } from "lucide-react"
import { useAuth } from "@/components/AuthProvider"
import { deviceTypes } from "@/lib/device-types"
import { calculatePoints } from "@/lib/points"

export default function SolicitarPage() {
  const { user, token, loading, refreshUser } = useAuth()
  const router = useRouter()
  const [deviceType, setDeviceType] = useState("")
  const [weightKg, setWeightKg] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [dropOffCount, setDropOffCount] = useState(0)
  const [result, setResult] = useState<{
    pointsAwarded: number; totalPoints: number; level: string; co2Saved: number
  } | null>(null)
  const [error, setError] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    if (loading) return
    if (!token || !user) { router.push("/"); return }
    fetch("/api/user/stats", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.ok && r.json()).then((data) => {
      if (data) setDropOffCount(data.dropOffCount)
    })
  }, [token, user, loading, router])

  const estimatedPoints = useMemo(() => {
    if (!deviceType || !weightKg || parseFloat(weightKg) <= 0) return 0
    const count = dropOffCount + 1
    return calculatePoints(deviceType, parseFloat(weightKg), count)
  }, [deviceType, weightKg, dropOffCount])

  const selectedDevice = deviceTypes.find((d) => d.id === deviceType)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!token || !deviceType || !weightKg) return
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/drop-offs", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ deviceType, weightKg: parseFloat(weightKg) }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || "Error al registrar"); return }
      setResult(data)
      await refreshUser()
    } catch {
      setError("Error de conexión")
    } finally { setSubmitting(false) }
  }

  const levelColors: Record<string, string> = {
    bronce: "text-amber-600",
    plata: "text-gray-400",
    oro: "text-yellow-400",
  }

  if (loading) {
    return (
      <main className="flex flex-1 items-center justify-center pt-14">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </main>
    )
  }

  if (result) {
    return (
      <main className="flex-1 pt-14">
        <div className="mx-auto max-w-lg px-4 py-12 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl border border-accent/30 bg-accent/5 p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20"
            >
              <CheckCircle className="h-8 w-8 text-accent" />
            </motion.div>

            <h2 className="text-lg font-semibold text-foreground">¡Reciclaje Registrado!</h2>
            <p className="mt-1 text-sm text-muted">Gracias por contribuir al medio ambiente</p>

            <div className="mt-6 grid grid-cols-2 gap-3 rounded-lg border border-border bg-surface p-4">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Puntos Ganados</p>
                <p className="font-mono text-xl font-bold text-accent">+{result.pointsAwarded.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Total Acumulado</p>
                <p className="font-mono text-xl font-bold text-foreground">{result.totalPoints.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Nivel</p>
                <p className={`font-mono text-xl font-bold capitalize ${levelColors[result.level] || "text-foreground"}`}>
                  {result.level}
                </p>
              </div>
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-muted">CO₂ Evitado</p>
                <p className="font-mono text-xl font-bold text-blue-400">{result.co2Saved.toFixed(1)} kg</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setResult(null)}
                className="flex-1 rounded-lg border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:bg-surface"
              >
                Reciclar Otro
              </button>
              <a
                href="/perfil"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-accent-hover"
              >
                Ir a mi Perfil
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 pt-14">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
              <Recycle className="h-4 w-4 text-accent" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Solicitar Reciclaje</h1>
          </div>
          <p className="text-sm text-muted">
            Registra tus residuos electrónicos para reciclaje y acumula puntos
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Device type dropdown */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Tipo de Dispositivo</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex w-full items-center justify-between rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground transition-all focus:outline-none focus:ring-1 focus:ring-accent"
              >
                <div className="flex items-center gap-2">
                  {selectedDevice && <selectedDevice.icon className="h-4 w-4 text-accent" />}
                  <span className={deviceType ? "text-foreground" : "text-muted/50"}>
                    {selectedDevice?.label || "Selecciona un tipo"}
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-muted transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="absolute z-20 mt-1 w-full rounded-lg border border-border bg-surface p-1 shadow-lg max-h-60 overflow-y-auto"
                  >
                    {deviceTypes.map((dt) => {
                      const Icon = dt.icon
                      return (
                        <button
                          key={dt.id}
                          type="button"
                          onClick={() => { setDeviceType(dt.id); setDropdownOpen(false) }}
                          className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs transition-colors ${
                            deviceType === dt.id ? "bg-accent/10 text-accent" : "text-muted hover:bg-background hover:text-foreground"
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                          <span className="font-medium">{dt.label}</span>
                          <span className="ml-auto text-[10px] text-muted">{dt.description}</span>
                        </button>
                      )
                    })}
                    <button
                      type="button"
                      onClick={() => { setDeviceType("otro"); setDropdownOpen(false) }}
                      className={`flex w-full items-center gap-3 rounded-md px-3 py-2 text-xs transition-colors ${
                        deviceType === "otro" ? "bg-accent/10 text-accent" : "text-muted hover:bg-background hover:text-foreground"
                      }`}
                    >
                      <Recycle className="h-4 w-4" />
                      <span className="font-medium">Otro</span>
                      <span className="ml-auto text-[10px] text-muted">Dispositivo no listado</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Weight */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-foreground">Peso Aproximado</label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="0.0"
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
                required
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-muted">kg</span>
            </div>
          </div>

          {/* Points preview */}
          <div className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Coins className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium text-foreground">Puntos estimados</span>
              </div>
              <span className="font-mono text-lg font-bold text-accent">
                {estimatedPoints > 0 ? `+${estimatedPoints.toLocaleString()}` : "—"}
              </span>
            </div>
            {deviceType && weightKg && parseFloat(weightKg) > 0 && (
              <div className="mt-2 flex items-center gap-2 text-[10px] text-muted">
                <Trash2 className="h-3 w-3" />
                <span>{parseFloat(weightKg).toFixed(1)} kg de {selectedDevice?.label || deviceType}</span>
                <span className="ml-auto">
                  {dropOffCount + 1}ª entrega {(dropOffCount + 1) % 10 === 0 ? "×2" : (dropOffCount + 1) % 5 === 0 ? "×1.5" : ""}
                </span>
              </div>
            )}
          </div>

          {error && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !deviceType || !weightKg || parseFloat(weightKg) <= 0}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {submitting ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Recycle className="h-4 w-4" />
            )}
            {submitting ? "Registrando..." : "Registrar Reciclaje"}
          </button>
        </form>
      </div>
    </main>
  )
}
