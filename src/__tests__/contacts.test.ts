import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/handlers';
import DatePicker from 'react-datepicker';


const server = setupServer(...handlers);
const API_URL = 'http://localhost:3000/api';

const testContact = {
  name: 'Test User',
  jobTitle: 'Developer',
  company: 'Test Corp',
  email: 'test@example.com',
  phoneNumbers: {
    cell: '123-456-7890',
    work: '098-765-4321',
  },
  socialProfiles: {
    linkedin: 'linkedin.com/test',
    instagram: 'instagram.com/test',
  },
};

const createContact = async () => {
  const response = await fetch(`${API_URL}/contacts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testContact),
  });
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`Failed to create contact: ${result.error}`);
  }

  return result.data;
};

describe('Contact API', () => {
  beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
  afterAll(() => server.close());
  beforeEach(() => server.resetHandlers());

  describe('POST /contacts', () => {
    it('should create a new contact with valid data', async () => {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testContact),
      });

      const result = await response.json();
      expect(response.status).toBe(201);
      expect(result.success).toBe(true);
      expect(result.data.name).toBe(testContact.name);
      expect(result.data.email).toBe(testContact.email);
    });

    it('should reject invalid contact data', async () => {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      });

      const result = await response.json();
      expect(response.status).toBe(400);
      expect(result.success).toBe(false);
    });
  });

  describe('GET /contacts', () => {
    it('should retrieve all contacts', async () => {
      await createContact();

      const response = await fetch(`${API_URL}/contacts`);
      const result = await response.json();
      expect(response.status).toBe(200);
      expect(result.success).toBe(true);
      expect(result.data.length).toBeGreaterThan(0);
    });
  });

  describe('PUT /contacts', () => {
    it('should update an existing contact', async () => {
      const createdContact = await createContact();

      const updatedContact = {
        ...createdContact,
        name: 'Updated Name',
        jobTitle: 'Senior Developer',
      };

      const response = await fetch(`${API_URL}/contacts`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedContact),
      });

      const result = await response.json();
      expect(response.status).toBe(200);
      expect(result.data.name).toBe('Updated Name');
      expect(result.data.jobTitle).toBe('Senior Developer');
    });
  });

  describe('DELETE /contacts', () => {
    it('should delete an existing contact', async () => {
      const createdContact = await createContact();

      const response = await fetch(`${API_URL}/contacts`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: createdContact.id }),
      });

      const result = await response.json();
      expect(response.status).toBe(200);
      expect(result.success).toBe(true);

      const getResponse = await fetch(`${API_URL}/contacts/${createdContact.id}`);
      expect(getResponse.status).toBe(404);
    });
  });
});
