// src/__tests__/mocks/handlers.ts
import { http, HttpResponse } from 'msw'
import type { PathParams } from 'msw'
import { prisma } from '@/lib/db'

// Define types directly in the file since './types' is missing
interface PhoneNumber {
    id: string;
    type: 'cell' | 'work';
    number: string;
    contactId: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

interface SocialProfile {
    id: string;
    platform: 'linkedin' | 'instagram';
    url: string;
    contactId: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}

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

interface MockContact {
  id: string;
  name: string;
  jobTitle: string | null;
  company: string | null;
  email: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  phoneNumbers: PhoneNumber[];
  socialProfiles: SocialProfile[];
  relationships: any[];
  tracking: null;
}

// Initialize mockContacts
let mockContacts: MockContact[] = []


// Update handlers to use new MSW v2 syntax
export const handlers = [
    http.get('/api/contacts', () => {
        return HttpResponse.json({
            success: true,
            data: mockContacts
        })
    }),

    http.get('/api/contacts/:id', ({ params }) => {
      const id = params.id
      const contact = mockContacts.find(c => c.id === id)
      
      if (!contact) {
          return HttpResponse.json(
              { success: false, error: 'Contact not found' },
              { status: 404 }
          )
      }

      return HttpResponse.json({
          success: true,
          data: contact
      })
  }),

]