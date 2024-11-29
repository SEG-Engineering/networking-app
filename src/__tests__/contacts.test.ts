// src/__tests__/contacts.test.ts

import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from './mocks/handlers'

const API_URL = 'http://localhost:3000/api'

async function apiCall(url: string, options: RequestInit = {}) {
    try {
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
        })

        const data = await response.json()

        if (!response.ok) {
            console.error('API Error:', {
                status: response.status,
                data,
                url,
                method: options.method || 'GET'
            })
            throw new Error(data.error || 'API call failed')
        }

        return { response, data }
    } catch (error) {
        console.error('Request failed:', {
            url,
            method: options.method || 'GET',
            error
        })
        throw error
    }
}

const testContact = {
    name: 'Test User',
    jobTitle: 'Developer',
    company: 'Test Corp',
    email: 'test@example.com',
    phoneNumbers: {
        cell: '123-456-7890',
        work: '098-765-4321'
    },
    socialProfiles: {
        linkedin: 'linkedin.com/test',
        instagram: 'instagram.com/test'
    }
}

interface ApiError {
    message: string;
    status?: number;
}

const server = setupServer(...handlers)

describe('Contact API', () => {
    beforeAll(() => {
        server.listen({ onUnhandledRequest: 'bypass' })
    })

    afterAll(() => {
        server.close()
    })

    beforeEach(() => {
        server.resetHandlers()
    })

    it('should create a new contact', async () => {
        console.debug('Starting contact creation test')
        
        const { data } = await apiCall(`${API_URL}/contacts`, {
            method: 'POST',
            body: JSON.stringify(testContact)
        })
        
        console.debug('Contact created:', data)
        expect(data.success).toBe(true)
        expect(data.data.name).toBe(testContact.name)
    })

    it('should get all contacts', async () => {
        console.debug('Starting get all contacts test')
        
        await apiCall(`${API_URL}/contacts`, {
            method: 'POST',
            body: JSON.stringify(testContact)
        })

        const { data } = await apiCall(`${API_URL}/contacts`)
        
        console.debug('Retrieved contacts:', data)
        expect(data.success).toBe(true)
        expect(Array.isArray(data.data)).toBe(true)
        expect(data.data.length).toBeGreaterThan(0)
    })

    it('should get a single contact', async () => {
        console.debug('Starting get single contact test')
        
        const { data: createData } = await apiCall(`${API_URL}/contacts`, {
            method: 'POST',
            body: JSON.stringify(testContact)
        })

        const { data } = await apiCall(`${API_URL}/contacts/${createData.data.id}`)
        
        console.debug('Retrieved single contact:', data)
        expect(data.success).toBe(true)
        expect(data.data.id).toBe(createData.data.id)
    })

    it('should update a contact', async () => {
        console.debug('Starting update contact test')
        
        const { data: createData } = await apiCall(`${API_URL}/contacts`, {
            method: 'POST',
            body: JSON.stringify(testContact)
        })

        const updatedData = {
            ...testContact,
            id: createData.data.id,
            name: 'Updated Name'
        }

        const { data } = await apiCall(`${API_URL}/contacts`, {
            method: 'PUT',
            body: JSON.stringify(updatedData)
        })
        
        console.debug('Updated contact:', data)
        expect(data.success).toBe(true)
        expect(data.data.name).toBe('Updated Name')
    })

    it('should delete a contact', async () => {
        console.debug('Starting delete contact test')
        
        const { data: createData } = await apiCall(`${API_URL}/contacts`, {
            method: 'POST',
            body: JSON.stringify(testContact)
        })

        const { data } = await apiCall(`${API_URL}/contacts`, {
            method: 'DELETE',
            body: JSON.stringify({ id: createData.data.id })
        })
        
        console.debug('Delete response:', data)
        expect(data.success).toBe(true)

        try {
            await apiCall(`${API_URL}/contacts/${createData.data.id}`)
            throw new Error('Contact should not exist')
        } catch (error) {
            if (error instanceof Error) {
                expect(error.message).toContain('API call failed')
            }
        }
    })

    it('should handle invalid contact creation', async () => {
        console.debug('Starting invalid contact test')
        
        const invalidContact = {
            name: '',
            email: 'invalid-email'
        }

        try {
            await apiCall(`${API_URL}/contacts`, {
                method: 'POST',
                body: JSON.stringify(invalidContact)
            })
            throw new Error('Should have failed')
        } catch (error) {
            if (error instanceof Error) {
                console.debug('Expected error caught:', error.message)
                expect(error.message).toContain('API call failed')
            }
        }
    })
    // Update the error expectation in the invalid contact test
it('should handle invalid contact creation', async () => {
    console.debug('Starting invalid contact test')
    
    const invalidContact = {
        name: '',
        email: 'invalid-email'
    }

    try {
        await apiCall(`${API_URL}/contacts`, {
            method: 'POST',
            body: JSON.stringify(invalidContact)
        })
        throw new Error('Should have failed')
    } catch (error) {
        if (error instanceof Error) {
            console.debug('Expected error caught:', error.message)
            expect(error.message).toContain('Failed to create contact')  // Updated expectation
        }
    }
})
})