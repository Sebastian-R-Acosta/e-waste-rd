"use client"

import { motion } from "framer-motion"
import { Target, Lightbulb, Shield, TreePine, ArrowRight } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Compromiso Ambiental",
    desc: "Nos dedicamos a reducir el impacto de los residuos electrónicos en República Dominicana mediante la correcta disposición y reciclaje.",
  },
  {
    icon: Lightbulb,
    title: "Educación y Conciencia",
    desc: "Promovemos la educación ecológica en estudiantes, empresas y comunidades para fomentar una cultura de reciclaje responsable.",
  },
  {
    icon: TreePine,
    title: "Futuro Sostenible",
    desc: "Trabajamos por un futuro más limpio, recuperando materiales valiosos y evitando la contaminación de nuestros suelos y aguas.",
  },
]

const objectives = [
  "Conectar a la ciudadanía con puntos de recolección accesibles",
  "Garantizar la disposición final adecuada de residuos electrónicos",
  "Generar trazabilidad y certificación corporativa",
  "Reducir la huella de carbono mediante el reciclaje responsable",
]

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="relative border-t border-border bg-background py-24">
      <div className="absolute inset-0 bg-grid-dense opacity-20" />
      <div className="absolute inset-0 bg-glow-accent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5">
              <Target className="h-3 w-3 text-accent" />
              <span className="font-mono text-[10px] text-muted">ACERCA DE</span>
            </div>

            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              ¿Quiénes <span className="text-accent">Somos</span>?
            </h2>

            <p className="mt-4 text-base leading-relaxed text-muted">
              Somos una plataforma dominicana dedicada a promover el reciclaje responsable de
              residuos electrónicos. Nacimos en la{" "}
              <span className="text-foreground">Universidad Nacional Pedro Henríquez Ureña</span>{" "}
              con la misión de conectar a las personas con puntos de recolección y disposición
              adecuada de e-waste en todo el país.
            </p>

            <p className="mt-4 text-base leading-relaxed text-muted">
              Creemos que la tecnología y el medio ambiente pueden coexistir. Cada dispositivo
              reciclado es un paso hacia un futuro más limpio y sostenible para República Dominicana.
            </p>

            <div className="mt-8 space-y-3">
              {values.map((v, i) => (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4 rounded-lg border border-border bg-surface p-4 transition-all hover:border-accent/30"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                    <v.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{v.title}</h3>
                    <p className="mt-0.5 text-sm text-muted">{v.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="data-panel overflow-hidden">
              <div className="data-panel-header">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-accent" />
                  <span className="font-mono text-xs font-semibold text-foreground">
                    Objetivos
                  </span>
                </div>
                <span className="font-mono text-[10px] text-muted">[04]</span>
              </div>

              <div className="divide-y divide-border">
                {objectives.map((obj, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-surface-hover"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-accent/10 font-mono text-[10px] text-accent">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm text-foreground">{obj}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border px-5 py-3">
                <div className="flex items-center gap-2 font-mono text-xs text-muted">
                  <span className="status-dot active" />
                  <span>4 objetivos activos</span>
                  <ArrowRight className="ml-auto h-3 w-3 text-accent" />
                </div>
              </div>
            </div>

            <div className="mt-3 data-panel overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                  <TreePine className="h-4 w-4 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted">Impacto estimado</p>
                  <p className="font-mono text-sm font-bold text-foreground">
                    +1,000 kg de e-waste procesados
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
