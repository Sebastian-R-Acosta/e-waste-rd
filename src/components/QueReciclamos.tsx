"use client"

import { motion } from "framer-motion"
import { Battery, Smartphone, Monitor, Cpu, Cable, Tv } from "lucide-react"

const items = [
  { icon: Battery, label: "Baterías", desc: "Litio, níquel-cadmio y alcalinas" },
  { icon: Smartphone, label: "Celulares", desc: "Smartphones, tablets y PDAs" },
  { icon: Monitor, label: "Monitores", desc: "CRT, LCD, LED y pantallas" },
  { icon: Cpu, label: "Computadoras", desc: "PCs, laptops y servidores" },
  { icon: Cable, label: "Cables", desc: "Cargadores, USB y conectores" },
  { icon: Tv, label: "Electrodomésticos", desc: "TVs, microondas y pequeños electrodomésticos" },
]

export default function QueReciclamos() {
  return (
    <section id="que-reciclamos" className="relative border-t border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            ¿Qué <span className="text-accent">Reciclamos</span>?
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            Aceptamos una amplia variedad de residuos electrónicos para su correcta disposición y reciclaje.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:bg-surface-hover"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">{item.label}</h3>
              <p className="text-sm text-muted">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
