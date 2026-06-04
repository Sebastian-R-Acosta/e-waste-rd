import type { Metadata } from "next"
import ParaQueSirve from "@/components/ParaQueSirve"

export const metadata: Metadata = {
  title: "Beneficios — e-waste RD",
  description:
    "El reciclaje electrónico protege el medio ambiente, genera conciencia social y recupera materiales valiosos.",
}

export default function BeneficiosPage() {
  return (
    <main className="flex-1 pt-14">
      <ParaQueSirve />
    </main>
  )
}
