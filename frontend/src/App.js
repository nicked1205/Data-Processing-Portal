import { useState } from 'react';
import InputForm from './components/inputForm.js';
import TopMenu from './components/topMenu.js';
import Settings from './components/settings.js';
import TextModal from './components/textModal.js';
import Loader from './components/loader.js';
import DownloadPanel from './components/downloadPanel.js';

function App() {
  const [openSettings, setOpenSettings] = useState(false);
  const [openInstructions, setOpenInstructions] = useState(false);
  const [openDocumentations, setOpenDocumentations] = useState(false);
  const [stage, setStage] = useState(0);
  const [status, setStatus] = useState("");
  const [controller, setController] = useState(null);

  return (
    <div className='h-screen bg-light-background dark:bg-dark-background duration-300'>
      <TopMenu setOpenSettings={setOpenSettings} setOpenInstructions={setOpenInstructions} setOpenDocumentations={setOpenDocumentations}
        stage={stage}/>
      <InputForm setOpenInstructions={setOpenInstructions} setOpenDocumentations={setOpenDocumentations}
         setStage={setStage} setStatus={setStatus} stage={stage} setController={setController} />
      <TextModal openTextModal={openInstructions} setOpenTextModal={setOpenInstructions} markdownLink={"/instructions.md"} title={"Instructions"} />
      <TextModal openTextModal={openDocumentations} setOpenTextModal={setOpenDocumentations} title={"Documentations"} />
      <Settings setOpenSettings={setOpenSettings} openSettings={openSettings}/>
      <Loader stage={stage} status={status} controller={controller} />
      <DownloadPanel stage={stage} setStage={setStage} />
    </div>
  );
}

export default App;
