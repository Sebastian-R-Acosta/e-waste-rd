import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getUserId } from "@/lib/auth"

export async function POST(req: Request) {
  try {
    const userId = await getUserId(req)
    if (!userId) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { rewardId } = await req.json()
    if (!rewardId) {
      return NextResponse.json({ error: "Falta rewardId" }, { status: 400 })
    }

    const [reward, user] = await Promise.all([
      prisma.reward.findUnique({ where: { id: rewardId } }),
      prisma.user.findUnique({ where: { id: userId } }),
    ])

    if (!reward) return NextResponse.json({ error: "Recompensa no encontrada" }, { status: 404 })
    if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })
    if (user.points < reward.cost) {
      return NextResponse.json({ error: "Puntos insuficientes" }, { status: 400 })
    }

    const newBalance = user.points - reward.cost

    const [redemption] = await prisma.$transaction([
      prisma.redemption.create({
        data: { userId, rewardId, pointsSpent: reward.cost, status: "completed" },
      }),
      prisma.pointsTransaction.create({
        data: {
          userId,
          type: "redeem",
          amount: -reward.cost,
          balanceAfter: newBalance,
          reference: `redeem-${rewardId}-${Date.now()}`,
          note: `Canje: ${reward.name}`,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: { points: newBalance },
      }),
    ])

    return NextResponse.json({ redemption, newBalance })
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
