import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    console.log('Processing URL:', url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch Blinq page');
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Helper function to clean text
    const cleanText = (text: string) => text.replace(/\s+/g, ' ').trim();

    // Extract phone numbers
    const phoneNumbers = $('.links-and-notes a[href^="tel:"]')
      .map((_, el) => {
        const number = $(el).find('.detail-data-value').text();
        const label = $(el).find('.detail-data-label').text();
        return {
          number: cleanText(number),
          type: cleanText(label)
        };
      })
      .get();

    // Extract and format the contact information
    const contact = {
      name: cleanText($('.user-identity').text()),
      jobTitle: cleanText($('.user-job-title').text()),
      company: cleanText($('.user-company').text()),
      email: cleanText($('a[href^="mailto:"] .detail-data-value').text()),
      phoneNumbers: phoneNumbers.reduce((acc, { number, type }) => {
        if (type.toLowerCase().includes('cell')) {
          acc.cell = number;
        } else if (type.toLowerCase().includes('work')) {
          acc.work = number;
        }
        return acc;
      }, { cell: '', work: '' }),
      socialProfiles: {
        linkedin: $('a[href*="linkedin.com"]').attr('href') || '',
        instagram: $('a[href*="instagram.com"]').attr('href') || ''
      }
    };

    console.log('Extracted Contact:', contact);

    return NextResponse.json({
      success: true,
      contact,
      debug: {
        url,
        htmlLength: html.length,
        foundSelectors: {
          hasName: Boolean(contact.name),
          hasJobTitle: Boolean(contact.jobTitle),
          hasCompany: Boolean(contact.company),
          hasEmail: Boolean(contact.email),
          hasPhone: Boolean(contact.phoneNumbers.cell || contact.phoneNumbers.work),
          hasLinkedIn: Boolean(contact.socialProfiles.linkedin)
        }
      }
    });
  } catch (error) {
    console.error('Blinq scraping error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process Blinq card',
        details: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}