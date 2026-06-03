"use client"

import { motion } from "framer-motion"
import { Globe, Users, Building2, Award } from "lucide-react"

const stats = [
  { icon: Globe, value: "53.6M", label: "toneladas de e-waste al año (mundial)" },
  { icon: Users, value: "+2,000", label: "estudiantes UNPHU impactados" },
  { icon: Building2, value: "95%", label: "de los materiales son reciclables" },
  { icon: Award, value: "Constancias", label: "trazabilidad y certificación corporativa" },
]

const benefits = [
  {
    title: "Ambiental",
    desc: "Evitamos que metales pesados y químicos tóxicos contaminen el suelo y los mantos acuíferos.",
  },
  {
    title: "Social",
    desc: "Generamos conciencia ecológica en estudiantes, empresas y comunidades dominicanas.",
  },
  {
    title: "Económico",
    desc: "Recuperamos materiales valiosos como oro, cobre y platino para reintegrarlos a la cadena productiva.",
  },
]

export default function ParaQueSirve() {
  return (
    <section id="para-que-sirve" className="relative border-t border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            ¿Para Qué <span className="text-accent">Sirve</span>?
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            El reciclaje electrónico no solo protege el medio ambiente, también genera valor social y económico.
          </p>
        </motion.div>

        <div className="mb-20 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center rounded-xl border border-border bg-surface p-6 text-center"
            >
              <stat.icon className="mb-3 h-8 w-8 text-accent" />
              <span className="text-2xl font-bold text-foreground">{stat.value}</span>
              <span className="mt-1 text-xs text-muted">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="group rounded-xl border border-border bg-surface p-8 transition-all hover:border-accent/30"
            >
              <h3 className="mb-3 text-xl font-semibold text-foreground">{benefit.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
