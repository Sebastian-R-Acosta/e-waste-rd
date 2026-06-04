"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"

const UNPHU_COORDS: [number, number] = [18.486, -69.949]

const markerIcon = L.divIcon({
  className: "",
  html: `<div style="background:#22c55e;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
})

export default function MapaSection() {
  return (
    <section id="mapa" className="relative border-t border-border bg-background py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            Puntos de <span className="text-accent">Recolección</span>
          </h2>
          <p className="mt-4 text-muted max-w-xl mx-auto">
            Nuestro primer punto de recolección está en la Universidad Nacional Pedro Henríquez Ureña (UNPHU).
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="h-[400px] w-full overflow-hidden rounded-xl border border-border sm:h-[500px]"
        >
          <MapContainer
            center={UNPHU_COORDS}
            zoom={16}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={UNPHU_COORDS} icon={markerIcon}>
              <Popup>
                <div className="text-sm">
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
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-2 text-sm text-muted"
        >
          <MapPin className="h-4 w-4 text-accent" />
          <span>
            <strong className="text-foreground">UNPHU</strong> — Av. Dr. Churchill, Santo Domingo, República Dominicana
          </span>
        </motion.div>
      </div>
    </section>
  )
}
