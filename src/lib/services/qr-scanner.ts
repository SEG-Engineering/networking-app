// src/lib/services/qr-scanner.ts

export type QRCodeType = 'blinq' | 'linkedin' | 'vcard' | 'url' | 'unknown';

export interface ScannedQRData {
  type: QRCodeType;
  rawData: string;
  url?: string;
}

export interface ContactData {
  name?: string;
  email?: string;
  phoneNumber?: string;
  jobTitle?: string;
  company?: string;
  industry?: string;
  linkedinUrl?: string;
  website?: string;
  source: QRCodeType;
  rawSource: string;
  sourceMetadata?: any;
}

export const identifyQRType = (qrData: string): QRCodeType => {
  // Check for Blinq
  if (qrData.includes('blinq.me')) {
    return 'blinq';
  }
  
  // Check for LinkedIn
  if (qrData.includes('linkedin.com')) {
    return 'linkedin';
  }
  
  // Check for vCard format
  if (qrData.startsWith('BEGIN:VCARD')) {
    return 'vcard';
  }
  
  // Check if it's a URL
  try {
    new URL(qrData);
    return 'url';
  } catch {
    return 'unknown';
  }
};

export const extractContactData = async (qrData: ScannedQRData): Promise<ContactData> => {
  switch (qrData.type) {
    case 'blinq':
      return await extractBlinqData(qrData.url!);
    case 'linkedin':
      return await extractLinkedInData(qrData.url!);
    case 'vcard':
      return extractVCardData(qrData.rawData);
    case 'url':
      return await extractWebsiteData(qrData.url!);
    default:
      throw new Error('Unsupported QR code type');
  }
};

const extractBlinqData = async (url: string): Promise<ContactData> => {
  // Here we would implement web scraping for Blinq
  // Using a library like puppeteer or cheerio
  try {
    // Simulated response for now
    return {
      name: "Example Name",
      email: "example@blinq.me",
      jobTitle: "Example Title",
      company: "Example Company",
      linkedinUrl: "https://linkedin.com/in/example",
      source: 'blinq',
      rawSource: url
    };
  } catch (error) {
    throw new Error('Failed to extract Blinq data');
  }
};

const extractLinkedInData = async (url: string): Promise<ContactData> => {
  // Here we would implement LinkedIn profile scraping
  try {
    return {
      name: "Example Name",
      linkedinUrl: url,
      source: 'linkedin',
      rawSource: url
    };
  } catch (error) {
    throw new Error('Failed to extract LinkedIn data');
  }
};

const extractVCardData = (vcardString: string): ContactData => {
  // Parse vCard format
  const lines = vcardString.split('\n');
  const data: ContactData = {
    source: 'vcard',
    rawSource: vcardString
  };

  lines.forEach(line => {
    if (line.startsWith('FN:')) data.name = line.substring(3);
    if (line.startsWith('EMAIL:')) data.email = line.substring(6);
    if (line.startsWith('TEL:')) data.phoneNumber = line.substring(4);
    if (line.startsWith('TITLE:')) data.jobTitle = line.substring(6);
    if (line.startsWith('ORG:')) data.company = line.substring(4);
  });

  return data;
};

const extractWebsiteData = async (url: string): Promise<ContactData> => {
  // Here we would implement general website metadata scraping
  return {
    website: url,
    source: 'url',
    rawSource: url
  };
};