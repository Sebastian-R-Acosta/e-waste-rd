"use client"

import { motion } from "framer-motion"
import { MapPin, Crosshair, Navigation } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

const UNPHU_COORDS: [number, number] = [18.486, -69.949]

const markerIcon = L.divIcon({
  className: "",
  html: `<div style="background:#22c55e;width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 0 16px rgba(34,197,94,0.4);"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
})

export default function MapaSection() {
  return (
    <section id="mapa" className="relative border-t border-border bg-background py-24">
      <div className="absolute inset-0 bg-grid-dense opacity-20" />
      <div className="absolute inset-0 bg-glow-accent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-4 py-1.5">
            <Navigation className="h-3 w-3 text-accent" />
            <span className="font-mono text-[10px] text-muted">GEOLOCALIZACIÓN</span>
          </div>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Puntos de <span className="text-accent">Recolección</span>
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            Nuestro primer punto de recolección está en la Universidad Nacional Pedro Henríquez Ureña (UNPHU).
          </p>
        </motion.div>

        <div className="relative grid gap-4 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-lg border border-border lg:col-span-2 lg:h-[500px]"
          >
            <MapContainer
              center={UNPHU_COORDS}
              zoom={16}
              scrollWheelZoom={true}
              className="h-[400px] w-full lg:h-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={UNPHU_COORDS} icon={markerIcon}>
                <Popup>
                  <div className="text-sm font-sans">
                    <strong>UNPHU</strong>
                    <br />
                    Universidad Nacional Pedro Henríquez Ureña
                    <br />
                    <span className="text-green-600">Punto de recolección activo</span>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col gap-3"
          >
            <div className="data-panel p-5">
              <div className="mb-4 flex items-center gap-2 border-b border-border pb-3">
                <Crosshair className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs font-semibold text-foreground">Información del punto</span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="data-label">Nombre</div>
                  <div className="mt-0.5 font-mono text-sm text-foreground">UNPHU</div>
                </div>
                <div>
                  <div className="data-label">Ubicación</div>
                  <div className="mt-0.5 font-mono text-sm text-foreground">Santo Domingo, RD</div>
                </div>
                <div>
                  <div className="data-label">Coordenadas</div>
                  <div className="mt-0.5 font-mono text-sm text-accent">
                    {UNPHU_COORDS[0]}, {UNPHU_COORDS[1]}
                  </div>
                </div>
                <div>
                  <div className="data-label">Estado</div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <span className="status-dot active" />
                    <span className="font-mono text-sm text-accent">Activo</span>
                  </div>
                </div>
                <div>
                  <div className="data-label">Horario</div>
                  <div className="mt-0.5 font-mono text-sm text-foreground">Lun — Vie, 8:00 — 17:00</div>
                </div>
              </div>
            </div>

            <div className="data-panel p-5">
              <div className="flex items-center gap-2 border-b border-border pb-3">
                <MapPin className="h-4 w-4 text-accent" />
                <span className="font-mono text-xs font-semibold text-foreground">Dirección</span>
              </div>
              <p className="mt-3 font-mono text-xs text-muted">
                Av. Dr. Churchill, Santo Domingo
                <br />
                República Dominicana
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
