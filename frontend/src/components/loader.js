import '../styles/loader.css'

function Loader({ stage, status }) {

    return (
        <div className={`absolute-center w-1/3 aspect-square flex flex-col justify-center items-center gap-6 duration-300 delay-300 ${stage >= 1 && stage <= 2 ? 'customVisible' : 'customHidden'}`}>
            <h2 className='text-light-primaryText dark:text-dark-primaryText text-lg'>{status}</h2>
            <span class="loader"></span>
            <h3 className='opacity-0'>Error</h3>
        </div>
    )
}

export default Loader;