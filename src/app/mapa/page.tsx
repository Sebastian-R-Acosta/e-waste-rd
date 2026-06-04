"use client"

import dynamic from "next/dynamic"

const MapaSection = dynamic(() => import("@/components/MapaSection"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center rounded-xl border border-border bg-surface">
      <p className="text-sm text-muted">Cargando mapa...</p>
    </div>
  ),
})

export default function MapaPage() {
  return (
    <main className="flex-1 pt-14">
      <MapaSection />
    </main>
  )
}
