import { PrismaClient } from "@/generated/prisma"
import { createClient } from "@libsql/client"
import { PrismaLibSql } from "@prisma/adapter-libsql"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const dbPath = `file:///${process.cwd().replace(/\\/g, "/")}/prisma/dev.db`
const libsql = createClient({ url: dbPath })
const adapter = new PrismaLibSql(libsql)

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
