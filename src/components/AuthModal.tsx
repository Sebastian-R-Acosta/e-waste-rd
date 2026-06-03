"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Recycle } from "lucide-react"
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
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-6 flex flex-col items-center gap-2">
              <Recycle className="h-10 w-10 text-accent" />
              <h2 className="text-xl font-semibold text-foreground">Bienvenido a e-waste RD</h2>
              <p className="text-sm text-muted text-center">
                Accede para gestionar tus puntos de reciclaje y constancias
              </p>
            </div>

            <TabbedForm />
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
      <div className="mb-6 flex rounded-lg bg-background p-1">
        <button
          onClick={() => setTab("login")}
          className={cn(
            "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === "login"
              ? "bg-accent text-black"
              : "text-muted hover:text-foreground"
          )}
        >
          Iniciar Sesión
        </button>
        <button
          onClick={() => setTab("register")}
          className={cn(
            "flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            tab === "register"
              ? "bg-accent text-black"
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

import { useState } from "react"

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
        <label className="mb-1.5 block text-sm font-medium text-foreground">Correo electrónico</label>
        <input
          type="email"
          placeholder="tucorreo@ejemplo.com"
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Contraseña</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <button
        type="submit"
        className="mt-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent-hover"
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
        <label className="mb-1.5 block text-sm font-medium text-foreground">Nombre completo</label>
        <input
          type="text"
          placeholder="Juan Pérez"
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Correo electrónico</label>
        <input
          type="email"
          placeholder="tucorreo@ejemplo.com"
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-foreground">Contraseña</label>
        <input
          type="password"
          placeholder="••••••••"
          className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>
      <button
        type="submit"
        className="mt-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-black transition-colors hover:bg-accent-hover"
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
