import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    console.log('Processing URL:', url);

    // Validate URL
    if (!url || !url.startsWith('https://blinq.me/')) {
      return NextResponse.json(
        { success: false, error: 'Invalid or missing Blinq URL.' },
        { status: 400 }
      );
    }

    const response = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36' }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch Blinq page, status: ${response.status}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract data using selectors
    const contact = {
      name: $('[data-testid="profile-name"]').text().trim() || $('h1').first().text().trim(),
      jobTitle: $('[data-testid="job-title"]').text().trim() || $('.job-title').text().trim(),
      company: $('[data-testid="company"]').text().trim() || $('.company').text().trim(),
      email: $('[data-testid="email"]').text().trim() || $('a[href^="mailto:"]').text().trim(),
      phoneNumber: $('[data-testid="phone"]').text().trim() || $('a[href^="tel:"]').text().trim(),
      linkedinUrl: $('a[href*="linkedin.com"]').attr('href') || '',
    };
    const phoneNumber = $('[data-testid="phone"]').text().replace(/\s+/g, ' ').replace(/Work Cell/g, '').trim();
    const phoneNumbers = $('[data-testid="phone"]').text()
        .split(/\n/)
        .map(num => num.trim())
        .filter(num => num); // Remove empty strings


    // Debug extracted fields
    console.log('Extracted Contact:', contact);
    console.log('Full HTML Content:', html);
    console.log('Full HTML:', html);
    console.log('Title:', $('title').text());
    console.log('Testing Name Selector:', $('[data-testid="profile-name"]').html());
    console.log('Testing Job Title Selector:', $('[data-testid="job-title"]').html());
    console.log('Testing Company Selector:', $('[data-testid="company"]').html());
    console.log('Selectors for Name:', $('[data-testid="profile-name"]').text().trim());
    console.log('Selectors for Job Title:', $('[data-testid="job-title"]').text().trim());
    console.log('Selectors for Company:', $('[data-testid="company"]').text().trim());

    return NextResponse.json({
      success: true,
      contact,
      debug: {
        url,
        htmlLength: html.length,
        foundSelectors: {
          hasName: !!contact.name,
          hasJobTitle: !!contact.jobTitle,
          hasCompany: !!contact.company,
          hasEmail: !!contact.email,
          hasPhone: !!contact.phoneNumber,
          hasLinkedIn: !!contact.linkedinUrl,
        },
      },
    });
  } catch (error) {
    console.error('Blinq scraping error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process Blinq card',
        details: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
