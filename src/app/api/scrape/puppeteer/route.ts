import { NextResponse } from "next/server";
import { scrapeBlinqCard } from "@/lib/services/blinq";

export async function POST(req: Request) {
    try {
        const { url } = await req.json();
        const data = await scrapeBlinqCard(url);

        return NextResponse.json({
            success: true,
            data,
        });
    } catch (error) {
        console.error("Error in Puppeteer scraping:", error);
      
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      
        return NextResponse.json(
          {
            success: false,
            error: errorMessage || "Failed to scrape Blinq card",
          },
          { status: 500 }
        );
      }
      
}
