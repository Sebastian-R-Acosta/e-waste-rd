import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserId } from "@/lib/auth"
import { nextLevelProgress, calculateCo2Saved } from "@/lib/points"

export async function GET(req: Request) {
  try {
    const userId = await getUserId(req)
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { points: true, level: true, totalKg: true, createdAt: true },
    })
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    const [dropOffCount, redemptionsCount, certificatesCount] = await Promise.all([
      prisma.dropOff.count({ where: { userId } }),
      prisma.redemption.count({ where: { userId } }),
      prisma.certificate.count({ where: { userId } }),
    ])

    return NextResponse.json({
      points: user.points,
      level: user.level,
      totalKg: user.totalKg,
      co2Saved: calculateCo2Saved(user.totalKg),
      dropOffCount,
      redemptionsCount,
      certificatesCount,
      memberSince: user.createdAt,
      progress: nextLevelProgress(user.points),
    })
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
