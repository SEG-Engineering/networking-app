import { Pool } from 'pg'

// Encode special characters in password
const encodedPassword = encodeURIComponent('2DSb8He*htIxf5Mt3$s6&')
const connectionString = `postgres://admin_db:${encodedPassword}@networking-app-db.cveokqaoony7.us-east-1.rds.amazonaws.com:5432/networking_app`

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
})

// Log connection string for debugging (remove in production)
console.log('Attempting to connect with:', connectionString)

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