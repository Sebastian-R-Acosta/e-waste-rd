import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserId } from "@/lib/auth"
import { calculatePoints, calculateLevel, calculateCo2Saved } from "@/lib/points"

export async function POST(req: Request) {
  try {
    const userId = await getUserId(req)
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { deviceType, weightKg } = await req.json()
    if (!deviceType || !weightKg) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const user = await prisma.user.findUnique({ where: { id: userId } })
    if (!user) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    }

    const dropOffCount = await prisma.dropOff.count({ where: { userId } })
    const pointsAwarded = calculatePoints(deviceType, weightKg, dropOffCount + 1)
    const newPoints = user.points + pointsAwarded
    const newLevel = calculateLevel(newPoints)

    const [dropOff] = await prisma.$transaction([
      prisma.dropOff.create({
        data: {
          userId,
          deviceType,
          weightKg,
          pointsAwarded,
          status: "completed",
        },
      }),
      prisma.pointsTransaction.create({
        data: {
          userId,
          type: "earn",
          amount: pointsAwarded,
          balanceAfter: newPoints,
          reference: `dropoff-${Date.now()}`,
          note: `${weightKg}kg de ${deviceType}`,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          points: newPoints,
          level: newLevel,
          totalKg: user.totalKg + weightKg,
        },
      }),
    ])

    const co2Saved = calculateCo2Saved(user.totalKg + weightKg)

    return NextResponse.json({
      dropOff,
      pointsAwarded,
      totalPoints: newPoints,
      level: newLevel,
      co2Saved,
    })
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const userId = await getUserId(req)
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const dropOffs = await prisma.dropOff.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ dropOffs })
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
