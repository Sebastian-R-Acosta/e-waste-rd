import type { Metadata } from "next"
import QueReciclamos from "@/components/QueReciclamos"

export const metadata: Metadata = {
  title: "Qué Reciclamos — e-waste RD",
  description:
    "Aceptamos baterías, celulares, monitores, computadoras, cables y electrodomésticos para su correcto reciclaje.",
}

export default function QueReciclamosPage() {
  return (
    <main className="flex-1 pt-14">
      <QueReciclamos />
    </main>
  )
}
