import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"

const db = new PrismaClient().$extends(withAccelerate())

export const prisma = db

/* export const db = prisma

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
 */