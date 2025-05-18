import Dimmer from "./dimmer";
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function TextModal({ openTextModal, setOpenTextModal, markdownLink, title }) {
    const [markdown, setMarkdown] = useState('');

    useEffect(() => {
        fetch(markdownLink)
        .then((res) => res.text())
        .then((text) => setMarkdown(text));
    }, [markdownLink]);

    return (
        <>
            <div 
                id="settings"
                className={`z-50 absolute-center w-1/2 h-3/4 bg-light-surface dark:bg-dark-surface rounded-2xl ${openTextModal ? 'customVisible' : 'customHidden'} duration-300`}
            >  
                <div className="relative top-0 left-0 h-12 bg-light-primaryAccent dark:bg-dark-primaryAccent rounded-t-xl flex items-center justify-between px-4">
                    <h2 className="text-light-primaryText dark:text-dark-primaryText font-bold">{title}</h2>
                    <div className="absolute right-0 top-0 h-full aspect-square p-1.5">
                        <div className="aspect-square p-1.5 rounded-full hover:bg-light-surface  
                            hover:bg-opacity-20 hover:cursor-pointer duration-300"
                            onClick={() => {
                                setOpenTextModal(false);
                            }}>
                            <svg className="fill-light-primaryText dark:fill-dark-primaryText" width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier"> 
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"></path> 
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="prose max-w-none mt-1 mb-1 p-6 text-light-primaryText dark:text-dark-primaryText max-h-[calc(100%-4rem)] overflow-auto custom-scrollbar">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
                </div>             
            </div>
            <Dimmer setOpen={setOpenTextModal} open={openTextModal}/>
        </>
    )
}

export default TextModal;