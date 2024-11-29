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

export interface ContactResponse extends ContactFormData {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
