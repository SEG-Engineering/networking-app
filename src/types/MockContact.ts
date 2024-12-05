export interface MockContact {
  id: string;
  name: string;
  jobTitle: string | null;
  company: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
  phoneNumbers: { type: 'cell' | 'work'; number: string }[];
  socialProfiles: { platform: 'linkedin' | 'instagram'; url: string }[];
  relationships: any[];
  tracking: any | null;
}
