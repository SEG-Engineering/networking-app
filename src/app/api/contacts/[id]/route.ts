import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const contact = await prisma.contact.findUnique({
            where: { id: params.id },
            include: {
                phoneNumbers: true,
                socialProfiles: true,
                relationships: true,
                tracking: true
            }
        })

        if (!contact) {
            return NextResponse.json(
                { success: false, error: 'Contact not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true,
            data: contact
        })
    } catch (error) {
        console.error('Error fetching contact:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch contact' },
            { status: 500 }
        )
    }
}