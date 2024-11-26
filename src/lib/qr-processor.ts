export type QRCodeType = 'blinq' | 'linkedin' | 'vcard' | 'url' | 'unknown';

export interface ProcessedContact {
  name?: string;
  email?: string;
  phoneNumber?: string;
  jobTitle?: string;
  company?: string;
  industry?: string;
  linkedinUrl?: string;
  source: QRCodeType;
  rawUrl: string;
}

export function identifyQRType(url: string): QRCodeType {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    if (hostname.includes('blinq.me')) return 'blinq';
    if (hostname.includes('linkedin.com')) return 'linkedin';
    if (url.startsWith('BEGIN:VCARD')) return 'vcard';
    return 'url';
  } catch {
    return 'unknown';
  }
}

export async function processQRCode(data: string): Promise<ProcessedContact> {
  const type = identifyQRType(data);

  switch (type) {
    case 'blinq':
      return processBlinqUrl(data);
    case 'linkedin':
      return processLinkedInUrl(data);
    case 'vcard':
      return processVCard(data);
    default:
      return {
        source: 'unknown',
        rawUrl: data
      };
  }
}

async function processBlinqUrl(url: string): Promise<ProcessedContact> {
  try {
    const response = await fetch('/api/scrape/blinq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });

    if (!response.ok) {
      throw new Error('Failed to process Blinq card');
    }

    const data = await response.json();
    return {
      ...data,
      source: 'blinq',
      rawUrl: url
    };
  } catch (error) {
    console.error('Blinq processing error:', error);
    throw error;
  }
}

async function processLinkedInUrl(url: string): Promise<ProcessedContact> {
  // LinkedIn processing will be implemented later
  return {
    linkedinUrl: url,
    source: 'linkedin',
    rawUrl: url
  };
}

function processVCard(data: string): ProcessedContact {
  // vCard processing will be implemented later
  return {
    source: 'vcard',
    rawUrl: data
  };
}