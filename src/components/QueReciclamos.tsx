"use client"

import { motion } from "framer-motion"
import { deviceTypes } from "@/lib/device-types"

const items = deviceTypes.map((dt) => ({
  icon: dt.icon,
  label: dt.label,
  desc: dt.description,
  count: idx(dt.id),
  href: `/que-reciclamos/${dt.id}`,
}))

function idx(id: string): string {
  const map: Record<string, string> = {
    baterias: "04", celulares: "12", monitores: "08",
    computadoras: "16", cables: "24", electrodomesticos: "06",
    impresoras: "07", tablets: "09", televisores: "05", consolas: "03",
  }
  return map[id] || "00"
}

export default function QueReciclamos() {
  return (
    <section id="que-reciclamos" className="relative border-t border-border bg-background py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid-dense opacity-20" />
      <div className="pointer-events-none absolute inset-0 bg-glow-accent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5">
            <span className="font-mono text-[10px] text-muted">CATÁLOGO</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            ¿Qué <span className="text-accent">Reciclamos</span>?
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            Aceptamos una amplia variedad de residuos electrónicos para su correcta disposición y reciclaje.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <a
                  href={item.href}
                  className="group relative block overflow-hidden rounded-lg border border-border bg-surface transition-all hover:border-accent/30 hover:bg-surface-hover"
                >
                  <div className="absolute top-0 right-0 p-3 font-mono text-[10px] text-muted">
                    [{item.count}]
                  </div>

                  <div className="p-5">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mb-1 text-base font-semibold text-foreground">{item.label}</h3>
                    <p className="text-sm text-muted">{item.desc}</p>
                  </div>

                  <div className="border-t border-border px-5 py-2">
                    <div className="flex items-center gap-2">
                      <span className="status-dot active" />
                      <span className="font-mono text-[10px] text-muted">aceptando</span>
                    </div>
                  </div>
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
