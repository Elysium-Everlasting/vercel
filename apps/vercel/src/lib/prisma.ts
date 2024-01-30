import { PrismaClient } from '@prisma/client'

import { DATABASE_URL } from '$env/static/private'

export const prisma = new PrismaClient({
  datasourceUrl: DATABASE_URL,
})
