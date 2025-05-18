import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';

function DownloadPanel({ stage, setStage }) {
  const [isReady, setIsReady] = useState(false);
  const [csvString, setCsvString] = useState(null);
  const [fileName, setFileName] = useState('products');
  const [error, setError] = useState('');

  useEffect(() => {
    if (stage === 3) {
      const storedCsvString = localStorage.getItem("csvString");
      if (storedCsvString && storedCsvString.length > 0) {
        setCsvString(storedCsvString);
        setIsReady(true);
      } else {
        setIsReady(false);
      }
      setError('');
    }
  }, [stage]);

  const validateFileName = (name) => {
    if (!name || !name.trim()) {
      return "Filename cannot be empty.";
    }
    // Disallow characters: \ / : * ? " < > |
    const invalidChars = /[\\/:*?"<>|]/;
    if (invalidChars.test(name)) {
      return 'Filename contains invalid characters: \\ / : * ? " < > |';
    }
    return '';
  };

  const onSubmitFileName = () => {
    const validationError = validateFileName(fileName);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setStage(4);
  };

// Create downloadable CSV file
  const downloadCsv = () => {
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'products.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadExcel = () => {
    // Parse CSV string into a workbook
    const workbook = XLSX.read(csvString, { type: 'string' });
    
    // Create a new workbook and append worksheet
    const newWorkbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(newWorkbook, workbook.Sheets[workbook.SheetNames[0]], 'Sheet1');

    // Write workbook to binary array
    const wbout = XLSX.write(newWorkbook, { bookType: 'xlsx', type: 'array' });

    // Create Blob and trigger download
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'products.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadExcel = () => {
    if (!isReady) return;
    downloadExcel();
  };

  const handleDownloadCsv = () => {
    if (!isReady) return;
    downloadCsv();
  };

  return (
    <>
      <div className={`absolute-center p-6 rounded-xl bg-light-backgroundSecondary dark:bg-dark-backgroundSecondary ${stage >= 3 ? 'customVisible' : 'customHidden'} duration-300`}>
        { stage === 3 && (
          <div className="mb-4 max-w-md flex flex-col items-center gap-4">
            <label htmlFor="filename-input" className="p-1 font-md text-light-primaryText dark:text-dark-primaryText">
              You are almost there, just need to know the filename:
            </label>
            <div className="flex items-center w-full p-2">
              <input
                id="filename-input"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter filename"
                className={`flex-grow border rounded-l-lg px-3 py-2 focus:outline-none
                  ${error ? 'border-red-600 dark:border-red-400' : 'border-gray-300'} 
                  focus:ring-1 ${error ? 'focus:ring-red-600 dark:focus:ring-red-400' : 'focus:ring-light-divider'}
                  focus:border-light-divider dark:focus:border-dark-divider
                  bg-light-surface dark:bg-dark-surface text-light-primaryText dark:text-dark-primaryText`}
              />
              <span className="inline-flex items-center px-3 py-2 border border-l-0 border-light-divider dark:border-dark-divider
                bg-light-surface dark:bg-dark-surface text-light-primaryText dark:text-dark-primaryText rounded-r-lg">
                .xlsx
              </span>
            </div>
            {/* Display validation error */}
            {error && (
              <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
            )}
            <button
              className='bg-light-primaryAccent dark:bg-dark-primaryAccent pt-1 pb-1 pl-2 pr-2 rounded-xl text-light-primaryText dark:text-dark-primaryText 
                hover:bg-light-primaryAccentHover dark:hover:bg-dark-primaryAccentHover duration-200 mt-2'
              onClick={onSubmitFileName}
            >
              Submit
            </button>
          </div>
        )}
        { stage === 4 && (
          <div className="flex flex-row gap-4">
            <button
              className="bg-light-primaryAccent dark:bg-dark-primaryAccent pt-1 pb-1 pl-2 pr-2 rounded-xl text-light-primaryText dark:text-dark-primaryText 
                hover:bg-light-primaryAccentHover dark:hover:bg-dark-primaryAccentHover duration-200"
              onClick={handleDownloadExcel} disabled={!isReady}
            >
              {isReady ? "Download Excel" : "Preparing file..."}
            </button>
            <button
              className="bg-light-primaryAccent dark:bg-dark-primaryAccent pt-1 pb-1 pl-2 pr-2 rounded-xl text-light-primaryText dark:text-dark-primaryText 
                hover:bg-light-primaryAccentHover dark:hover:bg-dark-primaryAccentHover duration-200"
              onClick={handleDownloadCsv} disabled={!isReady}
            >
              {isReady ? "Download Csv" : "Preparing file..."}
            </button>
          </div>
        )}
      </div>
      <div className={`absolute top-[2%] right-[2%] h-[5%] aspect-square p-2 rounded-full 
                hover:bg-light-surface hover:bg-opacity-10 hover:cursor-pointer duration-300 ${stage >= 3 ? 'customVisible' : 'customHidden'}`}
            onClick={() => {
              localStorage.removeItem('csvString');
              setStage(0);
            }}>
        <svg className="fill-light-primaryText dark:fill-dark-primaryText" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 420.144 420.144" transform="matrix(-1, 0, 0, -1, 0, 0)">
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier"> 
            <g> 
              <path d="M384.714,303.021c0,1.839-0.856,3.559-2.305,4.67L237.731,418.926c-1.064,0.821-2.317,1.218-3.594,1.218 c-1.253,0-2.494-0.385-3.559-1.183c-2.116-1.596-2.908-4.409-1.927-6.892l29.093-73.637v-3.127 c-1.336,0.148-2.666,0.237-4.043,0.237v-0.272h-60.904c-86.782,0-157.368-70.586-157.368-157.365v-20.537 C35.43,70.593,106.016,0,192.798,0h157.238v72.632H192.798c-46.733,0-84.737,38.012-84.737,84.736v20.537 c0,46.728,38.003,84.734,84.737,84.734h62.985l-27.131-68.678c-0.981-2.462-0.189-5.284,1.927-6.88 c2.11-1.599,5.048-1.587,7.152,0.035l144.672,111.224C383.857,299.476,384.714,301.184,384.714,303.021z"></path> 
            </g> 
          </g>
        </svg>
      </div>
    </>
  );
}

export default DownloadPanel;