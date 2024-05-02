import { PrismaClient } from "@prisma/client"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

let prismaClient: PrismaClient
if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prismaClient = global.cachedPrisma
}

export const prisma = prismaClient
