import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function GET() {
  try {
    const result = await query('SELECT NOW()', [])
    return NextResponse.json({ success: true, timestamp: result.rows[0].now })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}