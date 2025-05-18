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
    <div className={`absolute-center p-6 rounded-xl bg-light-backgroundSecondary dark:bg-dark-backgroundSecondary ${stage >= 3 ? 'customVisible' : 'customHidden'}`}>
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
  );
}

export default DownloadPanel;