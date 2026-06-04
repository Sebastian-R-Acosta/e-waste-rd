import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserId } from "@/lib/auth"
import { nextLevelProgress } from "@/lib/points"

export async function GET(req: Request) {
  try {
    const userId = await getUserId(req)
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true, level: true, totalKg: true },
    })
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    const dropOffCount = await prisma.dropOff.count({ where: { userId } })
    const progress = nextLevelProgress(user.points)

    return NextResponse.json({
      points: user.points,
      level: user.level,
      totalKg: user.totalKg,
      dropOffCount,
      progress,
    })
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
