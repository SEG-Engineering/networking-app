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