import Dimmer from "./dimmer";

function Settings({ setOpenSettings, openSettings }) {

    return (
        <>
            <div 
                id="settings"
                className={`z-50 absolute-center w-1/3 h-1/2 bg-light-surface rounded-2xl ${openSettings ? 'customVisible' : 'customHidden'}`}
            >  
                <div className="relative top-0 left-0 h-[10%] bg-light-primaryAccent rounded-t-xl">
                    <div className="absolute right-0 top-0 h-full aspect-square p-1.5">
                        <div className="aspect-square p-1.5 rounded-full hover:bg-light-surface 
                            hover:bg-opacity-20 hover:cursor-pointer duration-300"
                            onClick={() => {
                                setOpenSettings(false);
                            }}>
                            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#1E3A8A"></path> 
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>

            </div>
            <Dimmer setOpen={setOpenSettings} open={openSettings}/>
        </>
    )
}

export default Settings;