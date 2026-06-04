import { NextResponse } from "next/server"
import { createHash } from "crypto"
import { prisma } from "@/lib/prisma"
import { getUserId } from "@/lib/auth"
import { calculateCo2Saved } from "@/lib/points"

export async function POST(req: Request) {
  try {
    const userId = await getUserId(req)
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { type } = await req.json()
    if (!type) {
      return NextResponse.json({ error: "Falta tipo de certificado" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    const co2Saved = calculateCo2Saved(user.totalKg)
    const hash = createHash("sha256")
      .update(`${userId}-${user.totalKg}-${user.points}-${Date.now()}`)
      .digest("hex")
      .slice(0, 16)

    const certificate = await prisma.certificate.create({
      data: {
        userId,
        totalPoints: user.points,
        totalKg: user.totalKg,
        co2Saved,
        hash,
        type,
      },
    })

    return NextResponse.json({ certificate }, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
