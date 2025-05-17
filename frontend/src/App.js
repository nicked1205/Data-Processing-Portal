import './App.css';
import React, { useState } from 'react';

function App() {
  const [urls, setUrls] = useState("");
  const [instruction, setInstruction] = useState("");

  const fetchProductData = async (url) =>{
    const response = await fetch('http://localhost:4000/api/scrape', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    });
    if (!response.ok) throw new Error('Failed to scrape');
    const data = await response.json();
    return data;
  }
  
  const handleSubmit = async () => {
    for (const url of urls.split('\n')) {
      try {
        console.log(`Fetching data for ${url}...`);
        const data = await fetchProductData(url.trim());
        console.log(data);
      } catch (error) {
        console.error(`Error fetching data for ${url}:`, error);
      }
    }
  }

  return (
    <div className='grid grid-cols-2 h-screen'>
      <div className='col-span-1 flex flex-col items-center justify-center gap-3'>
        <textarea
          className='w-3/4'
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="Enter product URLs (one per line)"
        />
        <textarea
          className='w-3/4'
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Enter curation instructions"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className='col-span-1 flex flex-col items-center justify-center'>
        <h2>Instructions</h2>
        <p>1. Enter product URLs (one per line).</p>
        <p>2. Enter curation instructions.</p>
        <p>3. Click "Submit" to process the URLs.</p>
      </div>
    </div>
  );
}

export default App;
