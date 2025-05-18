import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { scrapeProduct } from './scraper.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL required' });

  try {
    const data = await scrapeProduct(url);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Failed to scrape' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Key: ${process.env.OPENAI_API_KEY}`)
  console.log(`Backend server running on port ${PORT}`);
});