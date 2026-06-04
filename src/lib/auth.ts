import { jwtVerify } from "jose"
import { prisma } from "./prisma"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "fallback-secret")

export async function getUserFromToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    const user = await prisma.user.findUnique({
      where: { id: payload.sub as string },
      select: { id: true, email: true, name: true, points: true, level: true, totalKg: true },
    })
    return user
  } catch {
    return null
  }
}

export async function getUserId(req: Request): Promise<string | null> {
  const auth = req.headers.get("authorization")
  if (!auth?.startsWith("Bearer ")) return null

  const token = auth.slice(7)
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload.sub as string
  } catch {
    return null
  }
}
