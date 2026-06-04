"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { User } from "@/lib/types"

interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  authOpen: boolean
  authError: string | null
  authLoading: boolean
  setAuthOpen: (open: boolean) => void
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [authOpen, setAuthOpen] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [authLoading, setAuthLoading] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    if (stored) {
      setToken(stored)
      if (storedUser) {
        try { setUser(JSON.parse(storedUser)) } catch { /* ignore */ }
      }
      fetch("/api/user/stats", {
        headers: { Authorization: `Bearer ${stored}` },
      })
        .then((r) => {
          if (!r.ok) throw new Error()
          return r.json()
        })
        .then((data: { points: number; level: number; memberSince: string }) => {
          setUser((prev) =>
            prev
              ? { ...prev, points: data.points, level: data.level.toString() }
              : prev,
          )
        })
        .catch(() => {
          localStorage.removeItem("token")
          localStorage.removeItem("user")
          setToken(null)
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const refreshUser = useCallback(async () => {
    if (!token) return
    try {
      const res = await fetch("/api/user/stats", {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error()
      const data = await res.json()
      setUser((prev) =>
        prev
          ? { ...prev, points: data.points, level: data.level.toString() }
          : prev,
      )
    } catch {
      // ignore
    }
  }, [token])

  const login = useCallback(async (email: string, password: string) => {
    setAuthLoading(true)
    setAuthError(null)
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al iniciar sesión")
      setToken(data.token)
      setUser(data.user)
      localStorage.setItem("token", data.token)
      localStorage.setItem("user", JSON.stringify(data.user))
      setAuthOpen(false)
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : "Error desconocido")
    } finally {
      setAuthLoading(false)
    }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    setAuthLoading(true)
    setAuthError(null)
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Error al registrarse")
      await login(email, password)
    } catch (e) {
      setAuthError(e instanceof Error ? e.message : "Error desconocido")
    } finally {
      setAuthLoading(false)
    }
  }, [login])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, token, loading, authOpen, authError, authLoading, setAuthOpen, login, register, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}
