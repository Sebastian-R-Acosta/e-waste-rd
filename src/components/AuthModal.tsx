"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Recycle, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

interface AuthModalProps {
  open: boolean
  onClose: () => void
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-xl border border-border bg-surface"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-3.5">
              <div className="flex items-center gap-2">
                <Recycle className="h-4 w-4 text-accent" />
                <span className="text-sm font-semibold text-foreground">e-waste RD</span>
              </div>
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted transition-colors hover:bg-background hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="px-6 py-6">
              <div className="mb-6 text-center">
                <h2 className="text-lg font-semibold text-foreground">Bienvenido</h2>
                <p className="mt-1 text-sm text-muted max-w-xs mx-auto">
                  Accede para gestionar tus puntos de reciclaje y constancias
                </p>
              </div>

              <TabbedForm />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function TabbedForm() {
  const [tab, setTab] = useState<"login" | "register">("login")

  return (
    <div>
      <div className="mb-6 flex rounded-lg bg-background p-0.5 border border-border">
        <button
          onClick={() => setTab("login")}
          className={cn(
            "flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-all",
            tab === "login"
              ? "bg-accent text-black shadow-sm"
              : "text-muted hover:text-foreground"
          )}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => setTab("register")}
          className={cn(
            "flex-1 rounded-md px-3 py-2 text-xs font-semibold transition-all",
            tab === "register"
              ? "bg-accent text-black shadow-sm"
              : "text-muted hover:text-foreground"
          )}
        >
          Registrarse
        </button>
      </div>

      <AnimatePresence mode="wait">
        {tab === "login" ? <LoginForm key="login" /> : <RegisterForm key="register" />}
      </AnimatePresence>
    </div>
  )
}

function LoginForm() {
  return (
    <motion.form
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="mb-1.5 block text-xs font-medium text-foreground">Correo electrónico</label>
        <input
          type="email"
          placeholder="tucorreo@ejemplo.com"
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-foreground">Contraseña</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
        />
      </div>
      <button
        type="submit"
        className="mt-1 rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-accent-hover"
      >
        Iniciar Sesión
      </button>
      <p className="text-center text-xs text-muted">
        ¿Olvidaste tu contraseña?{" "}
        <button className="text-accent hover:underline">Recupérala aquí</button>
      </p>
    </motion.form>
  )
}

function RegisterForm() {
  return (
    <motion.form
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-4"
    >
      <div>
        <label className="mb-1.5 block text-xs font-medium text-foreground">Nombre completo</label>
        <input
          type="text"
          placeholder="Juan Pérez"
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-foreground">Correo electrónico</label>
        <input
          type="email"
          placeholder="tucorreo@ejemplo.com"
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs font-medium text-foreground">Contraseña</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted/50 focus:outline-none focus:ring-1 focus:ring-accent transition-all"
        />
      </div>
      <button
        type="submit"
        className="mt-1 rounded-lg bg-accent px-4 py-2.5 text-xs font-semibold text-black transition-colors hover:bg-accent-hover"
      >
        Crear Cuenta
      </button>
      <p className="text-center text-xs text-muted">
        Al registrarte aceptas nuestros{" "}
        <button className="text-accent hover:underline">Términos y Condiciones</button>
      </p>
    </motion.form>
  )
}
