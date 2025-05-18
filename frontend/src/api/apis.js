export const fetchProductData = async (url, signal) => {
  const response = await fetch('http://localhost:4000/api/scrape', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
    signal,
  });
  if (!response.ok) throw new Error('Failed to scrape');
  return response.json();
};

export const generateCsv = async (scrapedData, instructions, signal) => {
  const res = await fetch("http://localhost:4000/api/generate-csv", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ scrapedData, instructions }),
    signal,
  });
  if (!res.ok) throw new Error("Failed to generate Csv");
  return res.json();
};