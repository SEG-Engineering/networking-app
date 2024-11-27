import puppeteer from "puppeteer";

export async function scrapeBlinqCard(url: string) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle0" }); // Changed to networkidle0 for better loading
    
    // Wait for the card content to load
    await page.waitForSelector('#blinq-card', { timeout: 5000 });

    // Extract data with error handling for each field
    const extractField = async (selector: string, property: 'textContent' | 'href' = 'textContent') => {
      try {
        const element = await page.$(selector);
        if (!element) return null;
        
        if (property === 'href') {
          return await element.evaluate(el => el.getAttribute('href'));
        }
        return await element.evaluate(el => el.textContent?.trim());
      } catch {
        return null;
      }
    };

    // Selectors object for easier maintenance
    const selectors = {
      name: "#blinq-card .user-identity",
      jobTitle: "#blinq-card .user-job-title",
      company: "#blinq-card .user-company",
      email: "#blinq-card .links-and-notes a[href^='mailto:'] .detail-data-value",
      phoneCell: "#blinq-card .links-and-notes a[href^='tel:']:nth-of-type(1) .detail-data-value",
      phoneWork: "#blinq-card .links-and-notes a[href^='tel:']:nth-of-type(2) .detail-data-value",
      linkedin: "#blinq-card .links-and-notes a[href*='linkedin.com']",
      instagram: "#blinq-card .links-and-notes a[href*='instagram.com']",
    };

    // Extract all contact information
    const contactInfo = {
      name: await extractField(selectors.name),
      jobTitle: await extractField(selectors.jobTitle),
      company: await extractField(selectors.company),
      email: await extractField(selectors.email),
      phoneNumbers: {
        cell: await extractField(selectors.phoneCell),
        work: await extractField(selectors.phoneWork),
      },
      socialProfiles: {
        linkedin: await extractField(selectors.linkedin, 'href'),
        instagram: await extractField(selectors.instagram, 'href'),
      },
    };

    // Take a screenshot for debugging (optional)
    await page.screenshot({ path: 'debug-screenshot.png' });

    // Log the extracted data for debugging
    console.log('Extracted Data:', JSON.stringify(contactInfo, null, 2));

    return contactInfo;
  } catch (error) {
    console.error("Error scraping Blinq card:", error);
    throw error;
  } finally {
    await browser.close();
  }
}