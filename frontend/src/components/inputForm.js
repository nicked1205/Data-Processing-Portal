import React, { useState, useEffect } from 'react';
import { fetchProductData, generateExcel } from '../api/excelGeneration';

function InputForm({ setOpenInstructions, setOpenDocumentations, setStage, setStatus, stage }) {
    const [urls, setUrls] = useState("");
    const [instruction, setInstruction] = useState("");
      
    const handleSubmit = async () => {
      let scrapedData = [];
      setStage(1);
      const urlList = urls.split('\n');
      const length = urlList.length;
      for (let index = 0; index < length; index++) {
        const url = urlList[index];
        try {
          console.log(`Fetching data for ${url}...`);
          setStatus(`Scraping data from URL... (${index + 1}/${length})`);
          const data = await fetchProductData(url.trim());
          console.log(data);
          scrapedData.push(data);
        } catch (error) {
          console.error(`Error fetching data for ${url}:`, error);
        }
      }
      setStage(2);
      setStatus(`Turning scraped data into Excel file...`);
      console.log('Turning the scraped data into Excel base64');
      const { base64Excel: base64 } = await generateExcel(
        scrapedData,
        instruction,
        'products.xlsx'
      );
      localStorage.setItem("excelFileBase64", base64);
    }

    useEffect(() => {
      const savedUrl = localStorage.getItem('urls');
      if (savedUrl) setUrls(savedUrl);
    }, []);

    useEffect(() => {
      localStorage.setItem('urls', urls);
    }, [urls]);

    useEffect(() => {
      const savedPrompt = localStorage.getItem('prompt');
      if (savedPrompt) setInstruction(savedPrompt);
    }, []);

    useEffect(() => {
      localStorage.setItem('prompt', instruction);
    }, [instruction]);

  return (
    <div className={`w-3/5 h-3/5 absolute-center
      flex flex-col items-center justify-center gap-3 rounded-3xl overflow-hidden
      bg-light-surface dark:bg-opacity-10 bg-opacity-30 duration-300 ${stage !== 0 ? 'h-0' : ''}`}>
        <div className='text-2xl text-center p-2'>
          <h2 className='text-light-primaryText dark:text-dark-primaryText font-bold duration-300'>
            Welcome to the Data Processing Portal
          </h2>
          <h3 className='text-light-primaryText dark:text-dark-primaryText text-[0.7em] duration-300'>
            We advise you to read{' '}
            <span
              className='cursor-pointer underline hover:text-light-primaryAccent dark:hover:text-dark-primaryAccent'
              onClick={() => {
                setOpenInstructions(true);
              }}
            >
              instructions
            </span>{' '}
            and{' '}
            <span
              className='cursor-pointer underline hover:text-light-primaryAccent dark:hover:text-dark-primaryAccent'
              onClick={() => {
                setOpenDocumentations(true);
              }}
            >
              documentations
            </span>{' '}
            for the best experience
          </h3>
        </div>
        <div className='relative h-1/5 w-3/4'>
          <textarea
            className='h-full w-full bg-light-surface dark:bg-dark-surface text-light-primaryText dark:text-dark-primaryText resize-none rounded-lg p-2 pr-12 
              focus:outline-light-divider dark:focus:outline-dark-divider placeholder:text-light-secondaryText dark:placeholder:text-dark-secondaryText duration-300 custom-scrollbar'
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            placeholder="Enter product URLs (one per line)"
          />
          { urls && (
          <div className='absolute top-0 right-0 w-12 h-full flex flex-col p-2 gap-2'>
            <span className='w-full aspect-square p-1.5 rounded-full 
              hover:bg-light-background dark:hover:bg-opacity-10 hover:bg-opacity-70 duration-300 hover:cursor-pointer'
              onClick={() => {
                setUrls('');
              }}>
              <svg class="fill-light-primaryText dark:fill-dark-primaryText duration-300" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 482.428 482.429">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier"> 
                  <g> 
                    <g> 
                      <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"></path>
                      <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"></path> 
                      <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"></path> 
                      <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"></path> 
                    </g> 
                  </g> 
                </g>
              </svg>
            </span>
          </div>
          )}
        </div>
        <div className='h-2/5 w-3/4 relative'>
          <textarea
            className='h-full w-full bg-light-surface dark:bg-dark-surface text-light-primaryText dark:text-dark-primaryText resize-none rounded-lg p-2 pr-10 
              ocus:outline-light-divider dark:focus:outline-dark-divider placeholder:text-light-secondaryText dark:placeholder:text-dark-secondaryText duration-300 custom-scrollbar'
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
            placeholder="Enter curation instructions"
          />
          { instruction && (
            <div className='absolute top-0 right-0 w-12 h-full flex flex-col p-2 gap-2'>
              <span className='w-full aspect-square p-1.5 rounded-full 
                hover:bg-light-background dark:hover:bg-opacity-10 hover:bg-opacity-70 duration-300 hover:cursor-pointer'
                onClick={() => {
                  setInstruction('');
                }}>
                <svg class="fill-light-primaryText dark:fill-dark-primaryText duration-300" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 482.428 482.429">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"> 
                    <g> 
                      <g> 
                        <path d="M381.163,57.799h-75.094C302.323,25.316,274.686,0,241.214,0c-33.471,0-61.104,25.315-64.85,57.799h-75.098 c-30.39,0-55.111,24.728-55.111,55.117v2.828c0,23.223,14.46,43.1,34.83,51.199v260.369c0,30.39,24.724,55.117,55.112,55.117 h210.236c30.389,0,55.111-24.729,55.111-55.117V166.944c20.369-8.1,34.83-27.977,34.83-51.199v-2.828 C436.274,82.527,411.551,57.799,381.163,57.799z M241.214,26.139c19.037,0,34.927,13.645,38.443,31.66h-76.879 C206.293,39.783,222.184,26.139,241.214,26.139z M375.305,427.312c0,15.978-13,28.979-28.973,28.979H136.096 c-15.973,0-28.973-13.002-28.973-28.979V170.861h268.182V427.312z M410.135,115.744c0,15.978-13,28.979-28.973,28.979H101.266 c-15.973,0-28.973-13.001-28.973-28.979v-2.828c0-15.978,13-28.979,28.973-28.979h279.897c15.973,0,28.973,13.001,28.973,28.979 V115.744z"></path>
                        <path d="M171.144,422.863c7.218,0,13.069-5.853,13.069-13.068V262.641c0-7.216-5.852-13.07-13.069-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C158.074,417.012,163.926,422.863,171.144,422.863z"></path> 
                        <path d="M241.214,422.863c7.218,0,13.07-5.853,13.07-13.068V262.641c0-7.216-5.854-13.07-13.07-13.07 c-7.217,0-13.069,5.854-13.069,13.07v147.154C228.145,417.012,233.996,422.863,241.214,422.863z"></path> 
                        <path d="M311.284,422.863c7.217,0,13.068-5.853,13.068-13.068V262.641c0-7.216-5.852-13.07-13.068-13.07 c-7.219,0-13.07,5.854-13.07,13.07v147.154C298.213,417.012,304.067,422.863,311.284,422.863z"></path> 
                      </g> 
                    </g> 
                  </g>
                </svg>
              </span>
            </div>
          )}
        </div>
        <button 
          className='bg-light-primaryAccent dark:bg-dark-primaryAccent pt-1 pb-1 pl-2 pr-2 rounded-xl text-light-primaryText dark:text-dark-primaryText 
            hover:bg-light-primaryAccentHover dark:hover:bg-dark-primaryAccentHover duration-200'
          onClick={handleSubmit}>Submit</button>
      </div>
  );
}

export default InputForm;