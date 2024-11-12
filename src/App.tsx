import React, { useState } from 'react';
import AuthScreen from './components/auth';
import ImageUploader from './components/imageuploader';

function App() {
  const [appScreen, setAppScreen] = useState(false)

  return (
    <div className="App">
      <header className="App-header">
        {
          !appScreen ? <ImageUploader /> : <AuthScreen setAppScreen={setAppScreen} />
        }
      </header>
    </div>
  );
}

export default App;
