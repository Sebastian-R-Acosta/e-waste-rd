import type { Metadata } from "next"
import QuienesSomos from "@/components/QuienesSomos"

export const metadata: Metadata = {
  title: "Nosotros — e-waste RD",
  description:
    "Conoce quiénes somos y cuál es nuestro objetivo: promover el reciclaje responsable de residuos electrónicos en República Dominicana.",
}

export default function QuienesSomosPage() {
  return (
    <main className="flex-1 pt-14">
      <QuienesSomos />
    </main>
  )
}
