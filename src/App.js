import React, { useState, useEffect } from 'react';
import TranslationForm from './components/TranslationForm';
import './App.css';

function App() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // Initialize speech synthesis voices when the app loads
    if ('speechSynthesis' in window) {
      // Load voices to ensure they are available when needed
      window.speechSynthesis.getVoices();
      
      // Handle dynamic voice loading for some browsers
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Language Translation Tool</h1>
        <h2>Translate text between 30+ languages with speech support</h2>
        <TranslationForm 
          sourceText={sourceText}
          setSourceText={setSourceText}
          translatedText={translatedText}
          setTranslatedText={setTranslatedText}
          sourceLanguage={sourceLanguage}
          setSourceLanguage={setSourceLanguage}
          targetLanguage={targetLanguage}
          setTargetLanguage={setTargetLanguage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          error={error}
          setError={setError}
        />
      </header>
    </div>
  );
}

export default App;