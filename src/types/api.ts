// Existing interfaces
export interface ContactFormData {
    name: string;
    jobTitle: string;
    company: string;
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

export interface ScrapedContact {
    name: string | null;
    jobTitle: string | null;
    company: string | null;
    email: string | null;
    phoneNumbers: {
      cell: string | null;
      work: string | null;
    };
    socialProfiles: {
      linkedin: string | null;
      instagram: string | null;
    };
}

// API Response wrapper
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

// Extended contact response that includes database fields
export interface ContactResponse extends ContactFormData {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

// Create contact request matches your form data
export type CreateContactRequest = ContactFormData;