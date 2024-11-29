import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
    try {
        const contacts = await prisma.contact.findMany({
            include: {
                phoneNumbers: true,
                socialProfiles: true,
                relationships: true,
                tracking: true
            }
        })

        return NextResponse.json({
            success: true,
            data: contacts
        })
    } catch (error) {
        console.error('Error fetching contacts:', error)
        return NextResponse.json(
            { success: false, error: 'Failed to fetch contacts' },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
  try {
    // Parse the JSON body
    const body = await request.json();

    // Validate the request body
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: "Empty request body" },
        { status: 400 }
      );
    }

    // Proceed with creating the contact
    const contact = await prisma.contact.create({
      data: {
        name: body.name,
        jobTitle: body.jobTitle,
        company: body.company,
        email: body.email,
        phoneNumbers: {
          create: [
            { type: 'cell', number: body.phoneNumbers.cell },
            { type: 'work', number: body.phoneNumbers.work }
          ]
        },
        socialProfiles: {
          create: [
            { platform: 'linkedin', url: body.socialProfiles.linkedin },
            { platform: 'instagram', url: body.socialProfiles.instagram }
          ]
        }
      },
      include: {
        phoneNumbers: true,
        socialProfiles: true,
        relationships: true,
        tracking: true
      }
    });

    return NextResponse.json(
      { success: true, data: contact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create contact" },
      { status: 500 }
    );
  }
}

// Add these to your existing route.ts file
export async function PUT(request: Request) {
  try {
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: "Empty request body" },
        { status: 400 }
      );
    }

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Contact ID is required" },
        { status: 400 }
      );
    }

    // Proceed with updating the contact
    const contact = await prisma.contact.update({
      where: { id: body.id },
      data: {
        name: body.name,
        jobTitle: body.jobTitle,
        company: body.company,
        email: body.email,
        phoneNumbers: {
          create: [
            { type: 'cell', number: body.phoneNumbers.cell },
            { type: 'work', number: body.phoneNumbers.work }
          ]
        },
        socialProfiles: {
          create: [
            { platform: 'linkedin', url: body.socialProfiles.linkedin },
            { platform: 'instagram', url: body.socialProfiles.instagram }
          ]
        }
      },
      include: {
        phoneNumbers: true,
        socialProfiles: true,
        relationships: true,
        tracking: true
      }
    });

    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update contact" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { success: false, error: "Empty request body" },
        { status: 400 }
      );
    }

    if (!body.id) {
      return NextResponse.json(
        { success: false, error: "Contact ID is required" },
        { status: 400 }
      );
    }

    // Proceed with deleting the contact
    await prisma.contact.delete({
      where: { id: body.id }
    });

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
