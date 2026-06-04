"use client"

import { motion } from "framer-motion"
import { Globe, Users, Building2, Award, TrendingUp, Activity } from "lucide-react"

const stats = [
  { icon: Globe, value: "53.6M", label: "toneladas de e-waste al año", change: "+12% vs 2024" },
  { icon: Users, value: "+2,000", label: "estudiantes UNPHU impactados", change: "+18% este semestre" },
  { icon: Building2, value: "95%", label: "materiales reciclables", change: "eficiencia activa" },
  { icon: Award, value: "Constancias", label: "trazabilidad corporativa", change: "certificación" },
]

const benefits = [
  {
    title: "Ambiental",
    desc: "Evitamos que metales pesados y químicos tóxicos contaminen el suelo y los mantos acuíferos.",
    metric: "2.4K",
    unit: "kg CO₂ evitados",
  },
  {
    title: "Social",
    desc: "Generamos conciencia ecológica en estudiantes, empresas y comunidades dominicanas.",
    metric: "5K+",
    unit: "personas alcanzadas",
  },
  {
    title: "Económico",
    desc: "Recuperamos materiales valiosos como oro, cobre y platino para reintegrarlos a la cadena productiva.",
    metric: "$12M",
    unit: "valor recuperable estimado",
  },
]

export default function ParaQueSirve() {
  return (
    <section id="para-que-sirve" className="relative border-t border-border bg-background py-24">
      <div className="absolute inset-0 bg-grid-dense opacity-20" />
      <div className="absolute inset-0 bg-glow-accent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5">
            <Activity className="h-3 w-3 text-accent" />
            <span className="font-mono text-[10px] text-muted">IMPACTO — Q3 2026</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            ¿Para Qué <span className="text-accent">Sirve</span>?
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            El reciclaje electrónico no solo protege el medio ambiente, también genera valor social y económico.
          </p>
        </motion.div>

        <div className="mb-20 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="metric-card p-5"
            >
              <div className="mb-4 flex items-center justify-between">
                <stat.icon className="h-4 w-4 text-accent" />
                <span className="font-mono text-[10px] text-muted">0{i + 1}</span>
              </div>
              <div className="metric-value text-2xl">{stat.value}</div>
              <div className="metric-label mt-1">{stat.label}</div>
              <div className="metric-trend">
                <TrendingUp className="h-3 w-3 text-accent" />
                <span className="text-accent">{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-lg border border-border bg-surface p-6 transition-all hover:border-accent/30"
            >
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
                <span className="font-mono text-[10px] text-muted">[{i + 1}.0{i + 1}]</span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-muted">{benefit.desc}</p>
              <div className="flex items-baseline gap-1.5 border-t border-border pt-4">
                <span className="font-mono text-xl font-bold text-accent">{benefit.metric}</span>
                <span className="font-mono text-[10px] text-muted">{benefit.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
