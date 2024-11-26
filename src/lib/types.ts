// src/lib/types.ts

export type ContactSource = 'digital_card' | 'linkedin' | 'manual' | 'qr_code';

export interface BaseContactInfo {
  // Required fields
  name: string;
  source: ContactSource;
  dateAdded: Date;

  // Optional but important fields
  email?: string;
  phoneNumber?: string;
  company?: string;
  jobTitle?: string;
  
  // Additional fields
  industry?: string;
  location?: string;
  linkedinUrl?: string;
  notes?: string;
  
  // Source-specific metadata
  sourceData?: {
    digitalCardPlatform?: string;  // e.g., 'blinq', 'haystack'
    digitalCardId?: string;
    linkedinProfileId?: string;
    qrCodeData?: string;
  };
}