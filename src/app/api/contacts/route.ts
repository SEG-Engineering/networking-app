import { NextResponse } from 'next/server'
import { query } from '@/lib/db'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phoneNumber, jobTitle, company, industry, linkedinUrl } = body

    const result = await query(
      `INSERT INTO contacts (name, email, phone_number, job_title, company, industry, linkedin_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [name, email, phoneNumber, jobTitle, company, industry, linkedinUrl]
    )

    return NextResponse.json({ success: true, contact: result.rows[0] })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json({ success: false, error: 'Failed to create contact' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await query('SELECT * FROM contacts ORDER BY date_added DESC', [])
    return NextResponse.json({ success: true, contacts: result.rows })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch contacts' }, { status: 500 })
  }
}