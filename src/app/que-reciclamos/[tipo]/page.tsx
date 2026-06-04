"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowLeft, Recycle, Coins, Cloud, Zap, Cpu, ChevronRight,
} from "lucide-react"
import { deviceTypes, getDeviceType, type DeviceType } from "@/lib/device-types"

function DeviceIcon({ device, className }: { device: DeviceType; className?: string }) {
  const Icon = device.icon
  return <Icon className={className} />
}

const processIcons = ["📦", "⚙️", "🧲", "🔥", "♻️"]

export default function DeviceTypePage() {
  const params = useParams()
  const tipo = params.tipo as string
  const device = getDeviceType(tipo)

  if (!device) {
    return (
      <main className="flex flex-1 items-center justify-center pt-14">
        <div className="text-center">
          <p className="text-sm text-muted">Tipo de dispositivo no encontrado</p>
          <Link href="/que-reciclamos" className="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:underline">
            <ArrowLeft className="h-3 w-3" /> Volver
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 pt-14">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-background py-16">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-glow-accent" />
        <div className="absolute inset-0 bg-grid-dense opacity-20" />

        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/que-reciclamos"
            className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft className="h-3 w-3" />
            Volver a Qué Reciclamos
          </Link>

          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-6"
            >
              <DeviceAnimation device={device} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5"
            >
              <span className="status-dot active" />
              <span className="font-mono text-[10px] text-muted uppercase">{device.label}</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              {device.label}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-3 max-w-xl text-sm text-muted"
            >
              {device.longDescription}
            </motion.p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8 space-y-12">
        {/* Materials */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10">
              <Cpu className="h-3.5 w-3.5 text-accent" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Materiales Recuperables</h2>
          </div>
          <div className="grid gap-2">
            {device.materials.map((mat, i) => (
              <motion.div
                key={mat.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="rounded-lg border border-border bg-surface px-4 py-3"
              >
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-xs font-medium text-foreground">{mat.name}</span>
                  <span className="font-mono text-xs text-accent">{mat.percent}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-background">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${mat.percent}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ background: mat.color }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Products */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10">
              <Recycle className="h-3.5 w-3.5 text-accent" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Se Transforma En</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {device.products.map((prod, i) => (
              <motion.div
                key={prod.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group rounded-xl border border-border bg-surface p-5 transition-all hover:border-accent/30 hover:bg-surface-hover"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-foreground">{prod.name}</h3>
                <p className="mt-1 text-xs text-muted">{prod.description}</p>
                <div className="mt-3 flex items-center gap-1">
                  <span className="font-mono text-[10px] text-accent">{prod.material}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Impact */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10">
              <Zap className="h-3.5 w-3.5 text-accent" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Impacto Ambiental</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="metric-card px-4 py-4">
              <div className="flex items-center gap-1.5 mb-1">
                <Cloud className="h-3 w-3 text-blue-400" />
                <span className="data-label text-[10px]">CO₂ Evitado</span>
              </div>
              <p className="font-mono text-2xl font-bold text-foreground">{device.impact.co2PerKg}</p>
              <p className="font-mono text-[10px] text-muted">kg por kg reciclado</p>
            </div>
            <div className="metric-card px-4 py-4">
              <div className="flex items-center gap-1.5 mb-1">
                <Recycle className="h-3 w-3 text-accent" />
                <span className="data-label text-[10px]">Tasa Recup.</span>
              </div>
              <p className="font-mono text-2xl font-bold text-foreground">{device.impact.recoveryRate}%</p>
              <p className="font-mono text-[10px] text-muted">material recuperable</p>
            </div>
            <div className="metric-card px-4 py-4">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap className="h-3 w-3 text-amber-400" />
                <span className="data-label text-[10px]">Energía Ahorrada</span>
              </div>
              <p className="font-mono text-2xl font-bold text-foreground">{device.impact.energySavedKwhPerKg}</p>
              <p className="font-mono text-[10px] text-muted">kWh por kg reciclado</p>
            </div>
          </div>
        </motion.section>

        {/* Process Flow */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/10">
              <ChevronRight className="h-3.5 w-3.5 text-accent" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Proceso de Reciclaje</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[15px] top-0 bottom-0 w-px bg-border" />
            <div className="space-y-1">
              {device.process.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.1 }}
                  className="relative flex gap-4 rounded-lg border border-border bg-surface/50 px-5 py-3.5"
                >
                  <div className="relative z-10 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent/10">
                    <span className="text-xs">{processIcons[i]}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-foreground">{step.step}</p>
                    <p className="text-[11px] text-muted">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Fun Fact */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="rounded-xl border border-accent/20 bg-accent/5 p-6">
            <div className="mb-3 flex items-center gap-2 rounded-full bg-background px-3 py-1 w-fit border border-border">
              <span className="status-dot active" />
              <span className="font-mono text-[10px] text-muted uppercase">Dato Curioso</span>
            </div>
            <p className="text-sm text-foreground leading-relaxed">
              {device.funFact}
            </p>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-3 pb-10"
        >
          <Link
            href="/solicitar"
            className="inline-flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent-hover"
          >
            <Recycle className="h-4 w-4" />
            Reciclar {device.label}
          </Link>
          <Link
            href="/que-reciclamos"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            <ArrowLeft className="h-4 w-4" />
            Otros Dispositivos
          </Link>
        </motion.div>
      </div>
    </main>
  )
}

function DeviceAnimation({ device }: { device: DeviceType }) {
  const Icon = device.icon
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute"
      >
        <svg width="160" height="160" viewBox="0 0 160 160">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.circle
              key={`outer-${i}`}
              cx="80"
              cy="80"
              r="72"
              fill="none"
              stroke="#22c55e"
              strokeWidth="0.4"
              strokeDasharray="3 6"
              transform={`rotate(${angle} 80 80)`}
              animate={{ opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 2.5, delay: i * 0.3, repeat: Infinity }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="absolute"
      >
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.div
            key={`dot-${i}`}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-accent"
            style={{
              transform: `rotate(${angle}deg) translateY(-56px)`,
              transformOrigin: "0 0",
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          />
        ))}
      </motion.div>

      <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-surface/80">
        <Icon className="h-9 w-9 text-accent" />
      </div>
    </div>
  )
}
