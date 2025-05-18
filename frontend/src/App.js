import { useState } from 'react';
import InputForm from './components/inputForm.js';
import TopMenu from './components/topMenu.js';
import Settings from './components/settings.js';

function App() {
  const [openSettings, setOpenSettings] = useState(false);

  return (
    <div className='h-screen bg-light-background'>
      <TopMenu setOpenSettings={setOpenSettings}/>
      <InputForm />
      <Settings setOpenSettings={setOpenSettings} openSettings={openSettings}/>
    </div>
  );
}

export default App;
