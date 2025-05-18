import { useState, useEffect } from "react";

function DownloadPanel({ stage, setStage }) {
  const [isReady, setIsReady] = useState(false);
  const [base64Excel, setBase64Excel] = useState(null);
  const [fileName, setFileName] = useState('products')

  useEffect(() => {
    if (stage === 3) {
      const storedBase64 = localStorage.getItem("excelFileBase64");
      if (storedBase64 && storedBase64.length > 0) {
        setBase64Excel(storedBase64);
        setIsReady(true);
      } else {
        setIsReady(false);
      }
    } else {
      setIsReady(false);
    }
  }, [stage]);

  const downloadExcel = (base64) => {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([bytes], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownload = () => {
    if (!isReady) return;
    downloadExcel(base64Excel);
  };

  return (
    <div className={`absolute-center p-6 rounded-xl bg-light-surface bg-opacity-70 dark:bg-opacity-10 ${stage >= 3 ? 'customVisible' : 'customHidden'}`}>
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
              className="flex-grow border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-light-divider focus:border-light-divider dark:focus:right-dark-divider dark:focus:border-dark-divider
                bg-light-surface dark:bg-dark-surface text-light-primaryText dark:text-dark-primaryText"
            />
            <span className="inline-flex items-center px-3 py-2 border border-l-0 border-light-divider dark:border-dark-divider rounded-r-mdselect-none
              bg-light-surface dark:bg-dark-surface text-light-primaryText dark:text-dark-primaryText rounded-r-lg">
              .xlsx
            </span>
          </div>
          <button 
            className='bg-light-primaryAccent dark:bg-dark-primaryAccent pt-1 pb-1 pl-2 pr-2 rounded-xl text-light-primaryText dark:text-dark-primaryText 
              hover:bg-light-primaryAccentHover dark:hover:bg-dark-primaryAccentHover duration-200'
            onClick={() => {
              setStage(4);
            }}>Submit</button>
        </div>
      )}
      { stage === 4 && (
        <button className="bg-light-primaryAccent dark:bg-dark-primaryAccent pt-1 pb-1 pl-2 pr-2 rounded-xl text-light-primaryText dark:text-dark-primaryText 
            hover:bg-light-primaryAccentHover dark:hover:bg-dark-primaryAccentHover duration-200"
            onClick={handleDownload} disabled={!isReady}>
          {isReady ? "Download Excel" : "Preparing file..."}
        </button>
      )}
    </div>
  );
}

export default DownloadPanel;