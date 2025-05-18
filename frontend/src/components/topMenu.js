import { useState } from "react";

function TopMenu({ setOpenSettings, setOpenInstructions, setOpenDocumentations }) {
    const [openMenu, setOpenMenu] = useState(true)

    return (
        <div id="topMenu" className={`absolute top-0 left-0 h-[5%] w-fit bg-light-primaryAccent dark:bg-dark-primaryAccent rounded-br-3xl
            shadow-md ${!openMenu ? '-translate-x-[83%]' : ''} duration-500 ease-in-out`}>
            <div className="w-full h-full flex pl-4 pr-4 gap-4">
                <div id="instructionsBtn" className="text-light-primaryText dark:text-dark-primaryText h-fit mt-auto mb-auto p-1.5 rounded-xl
                    hover:bg-light-surface hover:bg-opacity-20 hover:cursor-pointer duration-300"
                    onClick={() => {
                        setOpenInstructions(true);
                    }}>
                    Instructions
                </div>
                <div id="documentationsBtn" className="text-light-primaryText dark:text-dark-primaryText h-fit mt-auto mb-auto p-1.5 rounded-xl
                    hover:bg-light-surface hover:bg-opacity-20 hover:cursor-pointer duration-300"
                    onClick={() => {
                        setOpenDocumentations(true);
                    }}>
                    Documentations
                </div>
                <div id="settingsBtn" className="text-light-primaryText dark:text-dark-primaryText h-fit mt-auto mb-auto p-1.5 rounded-xl
                    hover:bg-light-surface hover:bg-opacity-20 hover:cursor-pointer duration-300"
                    onClick={() => {
                        setOpenSettings(true);
                    }}>
                    Settings
                </div>
                <div id="menuToggle" className="h-full aspect-square">
                    <div className="m-1.5 p-1.5 rounded-lg
                        hover:bg-light-surface hover:bg-opacity-20 hover:cursor-pointer duration-300"
                        onClick={() => {
                            setOpenMenu(!openMenu);
                        }}>
                        <svg className="fill-light-primaryText dark:fill-dark-primaryText duration-300" width="100%" height="100%" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> 
                                <path filRule="evenodd" d="M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z"></path> 
                            </g>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TopMenu;