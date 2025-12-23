import React, { useState } from 'react';
import { translateText, getSupportedLanguages } from '../services/translationService';
import { copyToClipboard, speakText } from '../utils/helpers';

const TranslationForm = ({
  sourceText,
  setSourceText,
  translatedText,
  setTranslatedText,
  sourceLanguage,
  setSourceLanguage,
  targetLanguage,
  setTargetLanguage,
  isLoading,
  setIsLoading,
  error,
  setError
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const supportedLanguages = getSupportedLanguages();

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const result = await translateText(sourceText, sourceLanguage, targetLanguage);
      setTranslatedText(result);
    } catch (err) {
      setError(err.message || 'Translation failed. Please try again.');
      console.error('Translation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSourceText(translatedText);
    setTranslatedText(sourceText);
  };

  const handleCopy = () => {
    copyToClipboard(translatedText);
  };

  const handleSpeak = async () => {
    if (translatedText) {
      setIsSpeaking(true);
      speakText(translatedText, targetLanguage);
      
      // Wait a bit then reset speaking state after speech is done
      setTimeout(() => setIsSpeaking(false), 3000); // Reset speaking state after 3 sec
    }
  };

  const handleClear = () => {
    setSourceText('');
    setTranslatedText('');
    setError('');
  };

  return (
    <div className="container">
      <div className="language-selectors">
        <div className="language-selector">
          <label htmlFor="sourceLanguage">From</label>
          <select
            id="sourceLanguage"
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        
        <button className="btn swap-btn" onClick={handleSwapLanguages} title="Swap languages">
          ↕️
        </button>
        
        <div className="language-selector">
          <label htmlFor="targetLanguage">To</label>
          <select
            id="targetLanguage"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {supportedLanguages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-row">
        <div className="form-col">
          <div className="form-group">
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter text to translate..."
              disabled={isLoading}
            />
          </div>
          <div className="form-row">
            <button 
              className="btn btn-translate" 
              onClick={handleTranslate} 
              disabled={isLoading || !sourceText.trim()}
            >
              {isLoading ? '🔄 Translating...' : '🌐 Translate'}
            </button>
            <button 
              className="btn btn-secondary" 
              onClick={handleClear}
              disabled={isLoading}
            >
              🗑️ Clear
            </button>
          </div>
        </div>
        
        <div className="form-col">
          <div className="form-group">
            <div className="translation-output">
              {translatedText || (isLoading ? 'Translating...' : 'Translation will appear here')}
            </div>
          </div>
          <div className="form-row">
            <button 
              className="btn btn-copy" 
              onClick={handleCopy}
              disabled={!translatedText}
              title="Copy to clipboard"
            >
              📋 Copy
            </button>
            <button 
              className="btn btn-tts" 
              onClick={handleSpeak}
              disabled={!translatedText || isSpeaking}
              title="Text to speech"
            >
              {isSpeaking ? '🔊 Speaking...' : '🔊 Speak'}
            </button>
          </div>
        </div>
      </div>

      {error && <div className="error">{error}</div>}
      
      {isLoading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Translating...</p>
        </div>
      )}
    </div>
  );
};

export default TranslationForm;