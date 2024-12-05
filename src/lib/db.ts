import { Pool } from 'pg'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Add this for debugging
})

export { prisma }


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