import { useState } from 'react';
import InputForm from './components/inputForm.js';
import TopMenu from './components/topMenu.js';
import Settings from './components/settings.js';
import TextModal from './components/textModal.js';

function App() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openInstructions, setOpenInstructions] = useState(false);
  const [openDocumentations, setOpenDocumentations] = useState(false);

  return (
    <div className='h-screen bg-light-background dark:bg-dark-background duration-300'>
      <TopMenu setOpenSettings={setOpenSettings} setOpenInstructions={setOpenInstructions} setOpenDocumentations={setOpenDocumentations}/>
      <InputForm setOpenInstructions={setOpenInstructions} setOpenDocumentations={setOpenDocumentations}/>
      <TextModal openTextModal={openInstructions} setOpenTextModal={setOpenInstructions} markdownLink={"/instructions.md"} title={"Instructions"} />
      <TextModal openTextModal={openDocumentations} setOpenTextModal={setOpenDocumentations} title={"Documentations"} />
      <Settings setOpenSettings={setOpenSettings} openSettings={openSettings}/>
    </div>
  );
}

export default App;
