import '../styles/loader.css'

function Loader({ stage, status, controller }) {

    return (
        <>
            <div className={`absolute-center w-1/3 aspect-square flex flex-col justify-center items-center gap-6 duration-300 delay-300 ${stage >= 1 && stage <= 2 ? 'customVisible' : 'customHidden'}`}>
                <h2 className='text-light-primaryText dark:text-dark-primaryText text-lg'>{status}</h2>
                <span className="loader"></span>
                <h3 className='opacity-0'>Error</h3>
            </div>
            <div className={`absolute top-[2%] right-[2%] h-[5%] aspect-square p-1.5 rounded-full 
                hover:bg-light-surface hover:bg-opacity-10 hover:cursor-pointer duration-300 ${stage >= 1 && stage <= 2 ? 'customVisible' : 'customHidden'}`}
                onClick={() => {controller.abort()}}>
                <svg className="fill-light-primaryText dark:fill-dark-primaryText" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"></path> 
                    </g>
                </svg>
            </div>
        </>
    )
}

export default Loader;