"use client"

import Link from "next/link"
import { Recycle, Mail, MapPin, Terminal } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="absolute inset-0 bg-grid-dense opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
                <Recycle className="h-4 w-4 text-accent" />
              </div>
              <span className="text-sm font-semibold text-foreground">e-waste RD</span>
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Plataforma para promover el reciclaje responsable de residuos electrónicos en República Dominicana.
            </p>
            <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-muted">
              <Terminal className="h-3 w-3" />
              <span>v0.1.0 — build 2026</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">Secciones</h4>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href="/" className="transition-colors hover:text-accent">Inicio</Link></li>
              <li><Link href="/quienes-somos" className="transition-colors hover:text-accent">Nosotros</Link></li>
              <li><Link href="/que-reciclamos" className="transition-colors hover:text-accent">Qué Reciclamos</Link></li>
              <li><Link href="/mapa" className="transition-colors hover:text-accent">Puntos de Recolección</Link></li>
              <li><Link href="/beneficios" className="transition-colors hover:text-accent">Beneficios</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">Contacto</h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs">info@ewaste-rd.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs">Santo Domingo, RD</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-foreground">Síguenos</h4>
            <div className="flex gap-2">
              <a
                href="https://github.com/Sebastian-R-Acosta/e-waste-rd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a
                href="https://twitter.com/ewaste_rd"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center">
          <p className="font-mono text-[10px] text-muted">
            &copy; {new Date().getFullYear()} e-waste RD — todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
