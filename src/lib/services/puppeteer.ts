import puppeteer from "puppeteer";

export async function scrapeBlinqCard(url: string) {
  const browser = await puppeteer.launch({
    headless: true, // Change to `false` if you want to see the browser while debugging
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // Puppeteer best practices
  });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle2" });

    // Extracting data using precise selectors
    const name = await page.$eval(
      "#blinq-card > div.user-details > div.user-identity > div",
      (el) => el.textContent?.trim() || ""
    );

    const jobTitle = await page.$eval(
      "#blinq-card > div.user-details > div.user-job-title",
      (el) => el.textContent?.trim() || ""
    );

    const company = await page.$eval(
      "#blinq-card > div.user-details > div.user-company",
      (el) => el.textContent?.trim() || ""
    );

    const email = await page.$eval(
      "#blinq-card > div.links-and-notes > ul > li:nth-child(1) > a > div.detail-data > div",
      (el) => el.textContent?.trim() || ""
    );

    const phoneNumberWorkCell = await page.$eval(
      "#blinq-card > div.links-and-notes > ul > li:nth-child(2) > a > div.detail-data > div.detail-data-value span",
      (el) => el.textContent?.trim() || ""
    );

    const phoneNumberWork = await page.$eval(
      "#blinq-card > div.links-and-notes > ul > li:nth-child(3) > a > div.detail-data > div.detail-data-value span",
      (el) => el.textContent?.trim() || ""
    );

    const linkedinUrl = await page.$eval(
      "#blinq-card > div.links-and-notes > ul > li:nth-child(5) > a",
      (el) => el.getAttribute("href") || ""
    );

    const instagramUrl = await page.$eval(
      "#blinq-card > div.links-and-notes > ul > li:nth-child(6) > a",
      (el) => el.getAttribute("href") || ""
    );

    // Consolidate the data into an object
    const scrapedData = {
      name,
      jobTitle,
      company,
      email,
      phoneNumbers: {
        workCell: phoneNumberWorkCell,
        work: phoneNumberWork,
      },
      socialLinks: {
        linkedin: linkedinUrl,
        instagram: instagramUrl,
      },
    };

    console.log("Scraped Data:", scrapedData);
    return scrapedData;
  } catch (error) {
    console.error("Error scraping Blinq card:", error);
    throw new Error("Failed to scrape Blinq card");
  } finally {
    await browser.close();
  }
}
