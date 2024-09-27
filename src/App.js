import React from 'react';
import CharacterSearch from './components/CharacterSearch';
import Footer from './components/Footer';
// import 'nes.css/css/nes.min.css';
import '../node_modules/nes.css/css/nes.css';

import './App.css';
import ImageCaptureComponent from './components/ImageCaptureComponent';

function App() {
  return (
    <div className="App">
      <CharacterSearch />
      <ImageCaptureComponent />
      <Footer />
    </div>
  );
}

export default App;
