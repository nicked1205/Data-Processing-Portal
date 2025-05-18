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

export const generateExcel = async (scrapedData, instructions, fileName) => {
    const res = await fetch("/api/generate-excel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scrapedData, instructions, fileName }),
    });
    if (!res.ok) throw new Error("Failed to generate Excel");
    return res.json();
}