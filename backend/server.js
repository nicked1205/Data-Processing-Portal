import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { scrapeProduct } from './scraper.js';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Scrape info
app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });

  try {
    const data = await scrapeProduct(url);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to scrape' });
  }
});

// Generate Excel from scraped data
app.post('/api/generate-csv', async (req, res) => {
  const { scrapedData, instructions } = req.body;
  if (!scrapedData) return res.status(400).json({ error: 'scrapedData required' });
  if (!instructions || typeof instructions !== 'string') return res.status(400).json({ error: 'instructions required' });

  try {
    const prompt = `
You are a helpful data assistant. You are given these JSON arrays, each containing one product's data:

${JSON.stringify(scrapedData)}

And these instructions for the spreadsheet:
${instructions}

Please follow these steps:

1) Carefully review the instructions to identify the exact product information needed, including required columns and formatting.

2) For each product (each JSON object), extract the requested information for each column based on the instructions.  
- Ignore any fields that are null in the JSON data.
- If data is a number, try to output it as the same form as the one found in the JSON object
- If information is missing or unclear, try to infer or combine details from the product data.
- If that doesn't work, try visiting the source url in each JSON object to find that information.
- If data still cannot be found, use "Information not found" for that column.

3) Generate a CSV-formatted text output with a header row and one row per product.  
- Make sure the CSV columns exactly match the instructions.  
- Use commas as separators and properly escape any commas or quotes inside fields.

4) Return only the CSV content as plain text, without any additional explanation, formatting, or code fences.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
    });

    const csv = completion.choices[0].message.content.trim().replace(/^```csv\s*/, '').replace(/^```plaintext\s*/, '').replace(/```$/, '').trim();

    res.json({ csv });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to generate Csv' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
