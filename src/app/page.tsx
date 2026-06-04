"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import QuienesSomos from "@/components/QuienesSomos"
import QueReciclamos from "@/components/QueReciclamos"
import ParaQueSirve from "@/components/ParaQueSirve"
import Footer from "@/components/Footer"
import AuthModal from "@/components/AuthModal"

const MapaSection = dynamic(() => import("@/components/MapaSection"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center rounded-xl border border-border bg-surface">
      <p className="text-sm text-muted">Cargando mapa...</p>
    </div>
  ),
})

export default function Home() {
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <>
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <main className="flex-1">
        <Hero />
        <QuienesSomos />
        <QueReciclamos />
        <MapaSection />
        <ParaQueSirve />
      </main>
      <Footer />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
