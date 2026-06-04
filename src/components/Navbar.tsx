"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Recycle, Moon, Sun, LogOut, User } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/AuthProvider"
import PointsBadge from "@/components/PointsBadge"

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/quienes-somos" },
  { label: "Qué Reciclamos", href: "/que-reciclamos" },
  { label: "Puntos", href: "/mapa" },
  { label: "Reciclar", href: "/solicitar" },
  { label: "Beneficios", href: "/beneficios" },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const { user, setAuthOpen, logout } = useAuth()
  const pathname = usePathname()
  const resolvedTheme = theme ?? "dark"

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-2xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10">
            <Recycle className="h-4 w-4 text-accent" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-semibold tracking-tight text-foreground">
              e-waste RD
            </span>
            <span className="hidden rounded border border-border px-1 font-mono text-[10px] text-muted sm:inline-block">
              v0.1.0
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:bg-surface hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          {user ? (
            <>
              <PointsBadge />
              <div className="h-5 w-px bg-border" />
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  <User className="h-3.5 w-3.5" />
                </button>
                <AnimatePresence>
                  {userMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-surface p-1 shadow-lg"
                    >
                      <div className="border-b border-border px-3 py-2">
                        <p className="truncate text-xs font-medium text-foreground">{user.name}</p>
                        <p className="truncate text-[10px] text-muted">{user.email}</p>
                      </div>
                      <Link
                        href="/perfil"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-1.5 text-xs text-muted transition-colors hover:bg-background hover:text-foreground"
                      >
                        <User className="h-3 w-3" />
                        Mi Perfil
                      </Link>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false) }}
                        className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-xs text-muted transition-colors hover:bg-background hover:text-red-400"
                      >
                        <LogOut className="h-3 w-3" />
                        Cerrar Sesión
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setAuthOpen(true)}
                className="rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-black transition-colors hover:bg-accent-hover"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => setAuthOpen(true)}
                className="rounded-lg border border-border px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-surface"
              >
                Registrarse
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex items-center justify-center md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {navLinks.map((link) => {
                const isActive = pathname === link.href
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                      isActive
                        ? "bg-accent/10 text-accent"
                        : "text-muted hover:bg-surface hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                )
              })}
              <hr className="my-2 border-border" />
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-foreground"
                >
                  {resolvedTheme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                </button>
                <span className="font-mono text-xs text-muted">v0.1.0</span>
              </div>
              {user ? (
                <>
                  <Link
                    href="/perfil"
                    onClick={() => setMobileOpen(false)}
                    className="mt-2 flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
                  >
                    <User className="h-4 w-4" />
                    Mi Perfil — {user.points?.toLocaleString()} pts
                  </Link>
                  <button
                    onClick={() => { logout(); setMobileOpen(false) }}
                    className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-muted transition-colors hover:bg-surface hover:text-red-400"
                  >
                    <LogOut className="h-4 w-4" />
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { setAuthOpen(true); setMobileOpen(false) }}
                    className="mt-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent-hover"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => { setAuthOpen(true); setMobileOpen(false) }}
                    className="rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
                  >
                    Registrarse
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
