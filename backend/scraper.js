import { launch } from 'puppeteer';
import { scrapeColes } from './scrapers/coles.js';
import { scrapeWoolworths } from './scrapers/woolworths.js';
import { scrapeBws } from './scrapers/bws.js';
import { scrapeKmart } from './scrapers/kmart.js';
import { scrapeTarget } from './scrapers/target.js';

const siteScrapers = {
  'coles.com.au': scrapeColes,
  'woolworths.com.au': scrapeWoolworths,
  'bws.com.au': scrapeBws,
  'kmart.com.au': scrapeKmart,
  'target.com.au': scrapeTarget,
};

async function safeGoto(page, url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await page.goto(url, { waitUntil: 'networkidle2' });
      return;
    } catch (e) {
      if (i === retries - 1) throw e;
      console.warn(`Navigation failed, retrying (${i + 1}/${retries})`);
    }
  }
}

export async function scrapeProduct(url) {
  const browser = await launch({ headless: true, ignoreHTTPSErrors: true });
  const page = await browser.newPage();

   await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36');

  try {
    await safeGoto(page, url);

    const domain = new URL(url).hostname.replace('www.', '');

    const scraper = siteScrapers[domain];
    const data = await scraper(page);

    await browser.close();
    return data;
  } catch (err) {
    console.error('Scrape error:', err);
    await browser.close();
    return null;
  }
}