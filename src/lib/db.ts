import { Pool } from 'pg'
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

const pool = new Pool({
  user: 'admin_db',
  password: 'broaddaylight',
  host: 'localhost',  // Connect through SSH tunnel
  port: 5432,
  database: 'networking_app',
  ssl: {
    rejectUnauthorized: false
  }
})

export async function query(text: string, params: any[]) {
  try {
    const result = await pool.query(text, params)
    return result
  } catch (error) {
    console.error('Database query error:', error)
    throw error
  }
}

export default pool