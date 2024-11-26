import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, phoneNumber } = body;

    // Check for existing contacts
    const result = await query(
      'SELECT * FROM contacts WHERE email = $1 OR phone_number = $2',
      [email, phoneNumber]
    );

    if (result.rows.length > 0) {
      // Contact exists
      return NextResponse.json({
        success: false,
        error: 'Contact already exists',
        existingContact: result.rows[0]
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Validation error:', error);
    return NextResponse.json(
      { success: false, error: 'Validation failed' },
      { status: 500 }
    );
  }
}