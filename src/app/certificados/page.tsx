"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, Award, Loader2, Hash, Download, Sparkles, Cloud, Recycle, ExternalLink } from "lucide-react"
import { useAuth } from "@/components/AuthProvider"
import type { Certificate } from "@/lib/types"

export default function CertificadosPage() {
  const { user, token, loading } = useAuth()
  const router = useRouter()
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [fetching, setFetching] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState<Certificate | null>(null)

  const fetchCerts = async () => {
    if (!token) return
    try {
      const res = await fetch("/api/certificates", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) setCertificates(await res.json())
    } finally { setFetching(false) }
  }

  useEffect(() => {
    if (loading) return
    if (!token || !user) { router.push("/"); return }
    fetchCerts()
  }, [token, user, loading, router])

  const handleGenerate = async () => {
    if (!token) return
    setGenerating(true)
    try {
      const res = await fetch("/api/certificates/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ type: "impact" }),
      })
      if (res.ok) {
        const cert = await res.json()
        setGenerated(cert)
        setCertificates((prev) => [cert, ...prev])
      }
    } finally { setGenerating(false) }
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
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Certificados</h1>
            <p className="mt-1 text-sm text-muted">
              Constancias digitales verificables de tu impacto ambiental
            </p>
          </div>
          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-accent-hover disabled:opacity-60"
          >
            {generating ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5" />
            )}
            {generating ? "Generando..." : "Generar Certificado"}
          </button>
        </div>

        {certificates.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-10 text-center">
            <Award className="mx-auto mb-3 h-8 w-8 text-muted" />
            <p className="text-sm text-muted">Aún no tienes certificados</p>
            <p className="mt-1 text-xs text-muted/60">
              Genera tu primer certificado de impacto ambiental
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="group rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent/30"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10">
                    <Award className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="rounded bg-background px-2 py-0.5 font-mono text-[10px] text-muted uppercase">
                    {cert.type}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-foreground">
                  Certificado de Impacto Ambiental
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Verificado digitalmente con hash único
                </p>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-3 gap-3 rounded-lg bg-background p-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Recycle className="h-3 w-3 text-accent" />
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {cert.totalKg.toFixed(1)}
                      </span>
                    </div>
                    <p className="font-mono text-[9px] text-muted">kg reciclados</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Cloud className="h-3 w-3 text-blue-400" />
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {cert.co2Saved.toFixed(1)}
                      </span>
                    </div>
                    <p className="font-mono text-[9px] text-muted">kg CO₂ evitado</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Sparkles className="h-3 w-3 text-amber-400" />
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {cert.totalPoints.toLocaleString()}
                      </span>
                    </div>
                    <p className="font-mono text-[9px] text-muted">puntos totales</p>
                  </div>
                </div>

                {/* Hash */}
                <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-background/50 px-3 py-2">
                  <Hash className="h-3 w-3 text-muted flex-shrink-0" />
                  <span className="font-mono text-[10px] text-muted truncate">{cert.hash}</span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-muted">
                    {new Date(cert.createdAt).toLocaleDateString("es-DO", {
                      day: "numeric", month: "long", year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] text-accent">
                    <ExternalLink className="h-3 w-3" />
                    Verificar
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Generated toast */}
      <AnimatePresence>
        {generated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2"
          >
            <div className="flex items-center gap-3 rounded-xl border border-accent/30 bg-accent/10 px-5 py-3 shadow-lg">
              <Award className="h-4 w-4 text-accent" />
              <span className="text-xs font-medium text-accent">
                ¡Certificado generado exitosamente!
              </span>
              <button onClick={() => setGenerated(null)} className="ml-2 text-muted hover:text-foreground">
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
