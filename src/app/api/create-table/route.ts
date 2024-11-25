import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone_number VARCHAR(50),
        job_title VARCHAR(255),
        company VARCHAR(255),
        industry VARCHAR(255),
        linkedin_url VARCHAR(255),
        date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, [])
    
    return NextResponse.json({ success: true, message: 'Table created successfully' })
  } catch (error) {
    console.error('Error creating table:', error)
    return NextResponse.json({ success: false, error: 'Failed to create table' }, { status: 500 })
  }
}