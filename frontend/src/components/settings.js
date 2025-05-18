import { useEffect, useState } from "react";
import Dimmer from "./dimmer";

function Settings({ setOpenSettings, openSettings }) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <>
      <div
        id="settings"
        className={`z-50 absolute-center w-1/3 h-1/2 bg-light-surface dark:bg-dark-surface rounded-2xl ${
          openSettings ? "customVisible" : "customHidden"
        } duration-300`}
      >

        {/* Header with close button */}
        <div className="relative top-0 left-0 h-[10%] bg-light-primaryAccent dark:bg-dark-primaryAccent rounded-t-xl flex items-center justify-between px-4">
          <h2 className="text-light-primaryText dark:text-dark-primaryText font-bold">Settings</h2>
          <div
            className="aspect-square p-1.5 rounded-full hover:bg-light-surface  
                      hover:bg-opacity-20 hover:cursor-pointer duration-300"
            onClick={() => setOpenSettings(false)}
          >
            <svg
                className="fill-light-primaryText dark:fill-dark-primaryText duration-300"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
              ></path>
            </svg>
          </div>
        </div>
        
        {/* Dark Mode Toggle */}
        <div className="flex flex-col h-[90%] p-6 space-y-6">
          <div
            className="flex items-center justify-between select-none pr-4 pl-4"
          >
            <span className="text-light-primaryText dark:text-dark-primaryText font-semibold text-lg">
              Dark Mode
            </span>
            <input
              id="darkModeToggle"
              type="checkbox"
              className="w-12 h-6 rounded-full appearance-none bg-gray-300 dark:bg-gray-600 relative
                         checked:bg-light-primaryAccent dark:checked:bg-dark-primaryAccent
                         transition-colors duration-300 hover:cursor-pointer
                         before:absolute before:top-0.5 before:left-0.5 before:bg-white before:rounded-full before:h-5 before:w-5 before:shadow-md before:transform checked:before:translate-x-6 before:transition-transform"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>
      </div>

      {/* Setting's Dimmer */}
      <Dimmer setOpen={setOpenSettings} open={openSettings} />
    </>
  );
}

export default Settings;