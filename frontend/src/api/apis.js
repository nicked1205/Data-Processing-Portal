export const fetchProductData = async (url) => {
    const response = await fetch('http://localhost:4000/api/scrape', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
    });
    if (!response.ok) throw new Error('Failed to scrape');
    const data = await response.json();
    return data;
}

export const generateCsv = async (scrapedData, instructions) => {
    const res = await fetch("http://localhost:4000/api/generate-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scrapedData, instructions }),
    });
    if (!res.ok) throw new Error("Failed to generate Csv");
    return res.json();
}