import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const rewards = await prisma.reward.findMany({
      where: { active: true },
      orderBy: { cost: "asc" },
    })
    return NextResponse.json({ rewards })
  } catch {
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
