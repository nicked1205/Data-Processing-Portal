import './App.css';
import React, { useState } from 'react';

function App() {
  const [urls, setUrls] = useState("");
  const [instruction, setInstruction] = useState("");
  
  const handleSubmit = () => {
    console.log(urls)
    console.log(instruction)
  }

  return (
    <div className='grid grid-cols-2 h-screen'>
      <div className='col-span-1 flex flex-col items-center justify-center gap-3'>
        <textarea
          className='w-1/2'
          value={urls}
          onChange={(e) => setUrls(e.target.value)}
          placeholder="Enter product URLs (one per line)"
        />
        <textarea
          className='w-1/2'
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
