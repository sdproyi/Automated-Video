import puppeteer from "puppeteer";
// Or import puppeteer from 'puppeteer-core';
import { TextUtils } from "ai-text-processor";
/**
 * Scrapes the text content of a web page.
 *
 * @param {string} url - The URL of the web page to scrape.
 * @return {Promise<string>} A promise that resolves to the text content of the web page.
 */
async function scrapePageText(url: string): Promise<string> {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();

	await page.goto(url);
	await page.setViewport({ width: 1080, height: 1024 });

	const pageText = await page.evaluate(() => document.body.innerText);

	await browser.close();

	return pageText;
}

export { scrapePageText };

async function summarizedScarpedText(text: string) {
	const summarized = await scrapePageText(text);
	return TextUtils.shrinkText(summarized);
}
export { summarizedScarpedText };
