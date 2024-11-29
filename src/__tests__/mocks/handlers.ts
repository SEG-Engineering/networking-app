import { http, HttpResponse } from 'msw'
import { prisma } from '@/lib/db'

interface ContactData {
    id?: string;
    name: string;
    jobTitle?: string;
    company?: string;
    email: string;
    phoneNumbers: {
        cell: string;
        work: string;
    };
    socialProfiles: {
        linkedin: string;
        instagram: string;
    };
}

interface MockContact extends ContactData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

let mockContacts: MockContact[] = []

export const handlers = [
    // GET all contacts
    http.get('/api/contacts', () => {
        return HttpResponse.json({
            success: true,
            data: mockContacts
        })
    }),

    // GET single contact
    http.get('/api/contacts/:id', ({ params }) => {
        const id = params.id as string
        const contact = mockContacts.find(c => c.id === id)
        
        if (!contact) {
            return HttpResponse.json(
                {
                    success: false,
                    error: 'Contact not found'
                },
                { status: 404 }
            )
        }

        return HttpResponse.json({
            success: true,
            data: contact
        })
    }),

    // POST new contact
    http.post('/api/contacts', async ({ request }) => {
        const contactData = await request.json() as ContactData
        
        if (!contactData) {
            return HttpResponse.json(
                {
                    success: false,
                    error: 'Invalid contact data'
                },
                { status: 400 }
            )
        }

        const newContact: MockContact = {
            ...contactData,
            id: `mock-${Date.now()}`,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        
        mockContacts.push(newContact)

        return HttpResponse.json(
            {
                success: true,
                data: newContact
            },
            { status: 201 }
        )
    }),

    // PUT update contact
    http.put('/api/contacts', async ({ request }) => {
        const contactData = await request.json() as ContactData & { id: string }
        
        if (!contactData || !contactData.id) {
            return HttpResponse.json(
                {
                    success: false,
                    error: 'Invalid contact data'
                },
                { status: 400 }
            )
        }

        const index = mockContacts.findIndex(c => c.id === contactData.id)
        
        if (index === -1) {
            return HttpResponse.json(
                {
                    success: false,
                    error: 'Contact not found'
                },
                { status: 404 }
            )
        }

        mockContacts[index] = {
            ...mockContacts[index],
            ...contactData,
            updatedAt: new Date()
        }

        return HttpResponse.json({
            success: true,
            data: mockContacts[index]
        })
    }),

    // DELETE contact
    http.delete('/api/contacts', async ({ request }) => {
        const data = await request.json() as { id: string }
        
        if (!data || !data.id) {
            return HttpResponse.json(
                {
                    success: false,
                    error: 'Invalid request'
                },
                { status: 400 }
            )
        }

        const index = mockContacts.findIndex(c => c.id === data.id)
        
        if (index === -1) {
            return HttpResponse.json(
                {
                    success: false,
                    error: 'Contact not found'
                },
                { status: 404 }
            )
        }

        mockContacts = mockContacts.filter(c => c.id !== data.id)

        return HttpResponse.json({
            success: true,
            message: 'Contact deleted successfully'
        })
    })
]