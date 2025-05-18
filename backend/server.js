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
app.post('/api/generate-excel', async (req, res) => {
  const { scrapedData, instructions, fileName = 'products.xlsx' } = req.body;
  if (!scrapedData) return res.status(400).json({ error: 'scrapedData required' });
  if (!instructions || typeof instructions !== 'string') return res.status(400).json({ error: 'instructions required' });

  try {
    const prompt = `
You are a helpful assistant. You are given these JSON arrays, each is ONE product's data:

${JSON.stringify(scrapedData)}

And these instructions:
${instructions}

Follow these steps:

1) Understand what product information is requested from the instructions

2) Generate an Excel file (.xlsx) as a base64-encoded string, with each column being each requested information and do any column, colour, font, ... customizations mentioned in the instructions.

3) For each JSON array, do:

- Based on the instruction, filter out or find the needed infomation, format it based onthe instructions (if exists) and then put it in the corresponding column.

- If an information is not found, try look through all of the JSON array of data to piece together the needed information yourself (might be in the long texts, or is within other information, or you need to combine different information to make that information).

- If this still doesn't work, put 'Information not found'.

- Each product will be one row in the Excel file, so if you finished your search for every requested information of a product, move down a row and move on to the next product's JSON array

End of steps.

Return only the base64 string of the Excel file. Do not include any extra explanation or formatting.
`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
    });

    const base64Excel = completion.choices[0].message.content.trim();

    res.json({ fileName, base64Excel });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Failed to generate Excel' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
