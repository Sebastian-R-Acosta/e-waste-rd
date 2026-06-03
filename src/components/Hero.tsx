"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-16"
    >
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-glow" />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
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
          <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Reciclaje Electrónico{" "}
            <span className="bg-gradient-to-r from-accent to-blue-500 bg-clip-text text-transparent">
              Responsable
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
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
          <a
            href="#que-reciclamos"
            className="rounded-xl bg-accent px-8 py-3.5 text-sm font-semibold text-black transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/20"
          >
            Explorar
          </a>
          <a
            href="#mapa"
            className="rounded-xl border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-surface"
          >
            Puntos de Recolección
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#que-reciclamos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-accent"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-6 w-6" />
        </motion.div>
      </motion.a>
    </section>
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

      <svg width="120" height="180" viewBox="0 0 120 180" className="relative z-10">
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
