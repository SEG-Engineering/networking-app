// src/app/api/setup-db/route.ts

import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    // Create updated contacts table
    await query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        phone_number VARCHAR(50),
        job_title VARCHAR(255),
        company VARCHAR(255),
        industry VARCHAR(255),
        location VARCHAR(255),
        linkedin_url VARCHAR(255),
        notes TEXT,
        source VARCHAR(50) NOT NULL,
        source_data JSONB,
        date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completeness_score INTEGER,
        needs_review BOOLEAN DEFAULT false
      )
    `, [])

    // Create contact updates table
    await query(`
      CREATE TABLE IF NOT EXISTS contact_updates (
        id SERIAL PRIMARY KEY,
        contact_id INTEGER REFERENCES contacts(id),
        field_name VARCHAR(255),
        old_value TEXT,
        new_value TEXT,
        update_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        update_source VARCHAR(50)
      )
    `, [])

    return NextResponse.json({ 
      success: true, 
      message: 'Database tables created successfully' 
    })
  } catch (error) {
    console.error('Error setting up database:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to set up database' 
    }, { status: 500 })
  }
}