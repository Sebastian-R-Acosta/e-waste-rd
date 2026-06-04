"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowDown, Terminal } from "lucide-react"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-16"
    >
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-glow" />
      <div className="absolute inset-0 bg-grid-dense opacity-30" />

      <div className="absolute top-24 left-8 hidden lg:block">
        <TerminalPanel />
      </div>

      <div className="absolute bottom-32 right-8 hidden lg:block">
        <StatusPanel />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5"
        >
          <span className="status-dot active" />
          <span className="font-mono text-xs text-muted">SISTEMA ACTIVO</span>
          <span className="ml-1 font-mono text-xs text-muted">v0.1.0</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <BatteryAnimation />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Reciclaje Electrónico{" "}
            <span className="bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
              Responsable
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-4 flex items-center gap-2 font-mono text-sm text-muted"
        >
          <span className="text-accent">$</span>
          <span className="typing-text">facilitamos acceso a puntos de recolección — RD</span>
          <span className="terminal-cursor" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-muted sm:text-lg"
        >
          Facilitamos el acceso a puntos de recolección y disposición adecuada de residuos
          electrónicos en República Dominicana. Comenzando desde la UNPHU.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Link
            href="/que-reciclamos"
            className="group relative rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20"
          >
            <span className="relative z-10">Explorar</span>
            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          <Link
            href="/mapa"
            className="rounded-xl border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-surface hover:border-accent/30"
          >
            Puntos de Recolección
          </Link>
        </motion.div>
      </div>

      <Link
        href="/quienes-somos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </Link>
    </section>
  )
}

function TerminalPanel() {
  const lines = [
    { prompt: "$", text: "init e-waste-rd --region=rd" },
    { prompt: ">", text: "loading puntos de recolección..." },
    { prompt: "✓", text: "1 punto activo (UNPHU)", accent: true },
    { prompt: ">", text: "conectando con centros de acopio..." },
    { prompt: "✓", text: "sistema operativo", accent: true },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="w-64 rounded-lg border border-border bg-surface/90 p-4 font-mono text-xs"
    >
      <div className="mb-2 flex items-center gap-2 border-b border-border pb-2">
        <Terminal className="h-3 w-3 text-accent" />
        <span className="text-muted">terminal — e-waste-rd</span>
      </div>
      <div className="space-y-1.5">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.3 }}
            className="flex items-start gap-1.5"
          >
            <span className={line.accent ? "text-accent" : "text-muted"}>{line.prompt}</span>
            <span className={line.accent ? "text-accent" : "text-muted-bright"}>{line.text}</span>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="flex items-center gap-1.5"
        >
          <span className="text-accent">$</span>
          <span className="terminal-cursor" />
        </motion.div>
      </div>
    </motion.div>
  )
}

function StatusPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className="w-56 rounded-lg border border-border bg-surface/90 p-4"
    >
      <div className="mb-3 flex items-center justify-between border-b border-border pb-2">
        <span className="font-mono text-xs text-muted">estado del sistema</span>
        <span className="status-dot active" />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted">Servidor</span>
          <span className="font-mono text-xs text-accent">Operativo</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted">Puntos</span>
          <span className="font-mono text-xs text-foreground">1 activo</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted">Cobertura</span>
          <span className="font-mono text-xs text-foreground">Santo Domingo</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-muted">Latencia</span>
          <span className="font-mono text-xs text-foreground">12ms</span>
        </div>
      </div>
    </motion.div>
  )
}

function BatteryAnimation() {
  return (
    <div className="relative flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="absolute"
      >
        <svg width="200" height="200" viewBox="0 0 200 200" className="opacity-20">
          {[0, 60, 120, 180, 240, 300].map((angle, i) => (
            <motion.circle
              key={i}
              cx="100"
              cy="100"
              r="85"
              fill="none"
              stroke="#22c55e"
              strokeWidth="0.5"
              strokeDasharray="4 8"
              transform={`rotate(${angle} 100 100)`}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        className="absolute"
      >
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full bg-accent"
            style={{
              transform: `rotate(${angle}deg) translateY(-70px)`,
              transformOrigin: "0 0",
            }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
          />
        ))}
      </motion.div>

      <svg width="120" height="180" viewBox="0 0 120 180" className="relative z-10 drop-shadow-lg">
        <defs>
          <linearGradient id="batteryFill" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        <motion.rect
          x="8"
          y="12"
          width="104"
          height="152"
          rx="12"
          className="stroke-border"
          fill="none"
          strokeWidth="2"
        />

        <clipPath id="batteryClip">
          <rect x="14" y="18" width="92" height="140" rx="6" />
        </clipPath>

        <motion.rect
          x="14"
          y="158"
          width="92"
          height="140"
          rx="6"
          fill="url(#batteryFill)"
          clipPath="url(#batteryClip)"
          animate={{ y: [158, 18, 158] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.rect
          x="14"
          y="158"
          width="92"
          height="140"
          rx="6"
          fill="url(#batteryFill)"
          clipPath="url(#batteryClip)"
          opacity="0.3"
          animate={{ y: [158, 18, 158] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        <rect x="40" y="0" width="40" height="10" rx="4" className="fill-accent" />

        <motion.text
          x="60"
          y="100"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-xs font-bold"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ♻
        </motion.text>
      </svg>
    </div>
  )
}
