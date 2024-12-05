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
    console.log('Starting POST request...');
    
    // Parse the JSON body
    const body = await request.json();
    console.log("Request body:", body);
    console.log('Received body:', body);

     // Check if a contact with the same email already exists
     const existingContact = await prisma.contact.findUnique({
      where: { email: body.email },
    });

    if (existingContact) {
      return NextResponse.json(
        { success: false, error: "A contact with this email already exists." },
        { status: 400 }
      );
    }

    // Validate the request body
    if (!body || Object.keys(body).length === 0) {
      console.log('Empty request body detected');
      return NextResponse.json(
        { success: false, error: "Empty request body" },
        { status: 400 }
      );
    }

    console.log('Attempting to create contact in database...');
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
    console.log('Contact created successfully:', contact);

    return NextResponse.json(
      { success: true, data: contact },
      { status: 201 }
    );


  } 
  
  catch (error) {
    console.error("Error creating contact:", error);
    // Log more details about the error
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack
      });
    }
    return NextResponse.json(
      { success: false, error: "Failed to create contact", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // Validate the request body
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

    // Use a transaction to delete existing related records and update the contact
    const updatedContact = await prisma.$transaction(async (prisma) => {
      // Delete existing phone numbers and social profiles
      await prisma.phoneNumber.deleteMany({ where: { contactId: body.id } });
      await prisma.socialProfile.deleteMany({ where: { contactId: body.id } });

      // Update the contact and add new related records
      return prisma.contact.update({
        where: { id: body.id },
        data: {
          name: body.name,
          jobTitle: body.jobTitle,
          company: body.company,
          email: body.email,
          phoneNumbers: {
            create: [
              { type: "cell", number: body.phoneNumbers.cell },
              { type: "work", number: body.phoneNumbers.work },
            ],
          },
          socialProfiles: {
            create: [
              { platform: "linkedin", url: body.socialProfiles.linkedin },
              { platform: "instagram", url: body.socialProfiles.instagram },
            ],
          },
        },
        include: {
          phoneNumbers: true,
          socialProfiles: true,
          relationships: true,
          tracking: true,
        },
      });
    });

    return NextResponse.json({ success: true, data: updatedContact });
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
    let body;

    // Safely parse the JSON body
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { success: false, error: "Malformed JSON body" },
        { status: 400 }
      );
    }

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

    // Check if the contact exists
    const existingContact = await prisma.contact.findUnique({
      where: { id: body.id },
    });

    if (!existingContact) {
      return NextResponse.json(
        { success: false, error: "Contact not found" },
        { status: 404 }
      );
    }

    // Proceed with deleting the contact
    await prisma.contact.delete({
      where: { id: body.id },
    });

    return NextResponse.json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete contact" },
      { status: 500 }
    );
  }
}
