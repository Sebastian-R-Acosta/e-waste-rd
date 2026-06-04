import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const defaultRewards = [
  {
    name: "10% OFF en Tienda G-Max",
    description: "Descuento del 10% en dispositivos electrónicos en Tienda G-Max.",
    type: "discount",
    cost: 100,
    partner: "G-Max",
    discountPercent: 10,
  },
  {
    name: "25% OFF en Servicio Técnico",
    description: "Descuento del 25% en reparación de equipos electrónicos.",
    type: "discount",
    cost: 250,
    partner: "FixTech RD",
    discountPercent: 25,
  },
  {
    name: "15% OFF en Recargas",
    description: "Descuento del 15% en accesorios y recargas de dispositivos.",
    type: "discount",
    cost: 150,
    partner: "DigitalLife",
    discountPercent: 15,
  },
  {
    name: "Planta un Árbol",
    description: "Contribuye a la reforestación de RD. Plantamos un árbol en tu nombre.",
    type: "donation",
    cost: 50,
    partner: "Reforestamos RD",
  },
  {
    name: "Limpieza de Playa",
    description: "Fondos destinados a la limpieza de 1km de costa en RD.",
    type: "donation",
    cost: 200,
    partner: "Océanos Limpios",
  },
  {
    name: "Kit Escolar Verde",
    description: "Dona un kit de materiales reciclados a escuelas rurales.",
    type: "donation",
    cost: 300,
    partner: "Educa Verde",
  },
  {
    name: "Certificado de Impacto Ambiental",
    description: "Certificado digital con tu historial de reciclaje y CO₂ evitado.",
    type: "certificate",
    cost: 0,
  },
  {
    name: "Certificado Corporativo",
    description: "Certificado de constancia corporativa con hash verificable para empresas.",
    type: "certificate",
    cost: 0,
  },
]

export async function POST() {
  try {
    const existing = await prisma.reward.count()
    if (existing > 0) {
      return NextResponse.json({ message: "Las recompensas ya existen", count: existing })
    }

    await prisma.reward.createMany({ data: defaultRewards })
    return NextResponse.json({ message: "Recompensas creadas", count: defaultRewards.length })
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
