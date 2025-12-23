// Copy text to clipboard
export const copyToClipboard = async (text) => {
  if (!text) return;
  
  try {
    await navigator.clipboard.writeText(text);
    // Optional: Show a success message to the user
    console.log('Text copied to clipboard');
  } catch (err) {
    console.error('Failed to copy text: ', err);
    // Fallback method for older browsers
    fallbackCopyTextToClipboard(text);
  }
};

// Fallback method for older browsers
const fallbackCopyTextToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  
  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      console.log('Text copied to clipboard');
    } else {
      console.error('Failed to copy text');
    }
  } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
  }
  
  document.body.removeChild(textArea);
};

// Text-to-speech functionality
export const speakText = (text, language = 'en') => {
  if (!text) return;
  
  // Check if the browser supports the Web Speech API
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Map language codes to more specific language codes for better TTS support
    const languageMap = {
      'zh': 'zh-CN', // Chinese (Simplified)
      'ja': 'ja-JP', // Japanese
      'ko': 'ko-KR', // Korean
      'hi': 'hi-IN', // Hindi
      'ur': 'ur-PK', // Urdu
      'ar': 'ar-SA', // Arabic
      'bn': 'bn-IN', // Bengali
      'ta': 'ta-IN', // Tamil
      'te': 'te-IN', // Telugu
      'mr': 'mr-IN', // Marathi
      'pa': 'pa-IN', // Punjabi
      'th': 'th-TH', // Thai
      'vi': 'vi-VN', // Vietnamese
      'es': 'es-ES', // Spanish
      'fr': 'fr-FR', // French
      'de': 'de-DE', // German
      'it': 'it-IT', // Italian
      'pt': 'pt-PT', // Portuguese
      'ru': 'ru-RU', // Russian
    };
    
    // Extended language families for better fallback support
    const languageFamilies = {
      'ur': ['ur-PK', 'hi-IN', 'bn-IN'], // Urdu speakers can understand Hindi/Bengali accent
      'hi': ['hi-IN', 'ur-PK', 'bn-IN'], // Hindi speakers can understand Urdu/Bengali accent
      'ar': ['ar-SA', 'ar-EG', 'ar-MA'], // Arabic variants
      'zh': ['zh-CN', 'zh-TW', 'zh-HK'], // Chinese variants
      'fa': ['fa-IR', 'ar-SA'], // Persian speakers can understand Arabic accent
      'ps': ['ps-AF', 'fa-IR', 'ur-PK'], // Pashto speakers can understand Persian/Urdu accent
    };
    
    // Create the utterance
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Use mapped language code if available, otherwise use the original
    utterance.lang = languageMap[language] || language;
    
    // Set speech rate and pitch (optional)
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    // Function to set voice after voices are loaded
    const setVoice = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      
      // Try to find a voice that matches the target language
      let matchingVoice = availableVoices.find(voice => 
        voice.lang.startsWith(utterance.lang) || 
        voice.lang.startsWith(language)
      );
      
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      } else {
        // If no direct match, try language family variants
        const familyVariants = languageFamilies[language];
        if (familyVariants) {
          for (const variant of familyVariants) {
            matchingVoice = availableVoices.find(voice => 
              voice.lang.startsWith(variant)
            );
            if (matchingVoice) {
              utterance.voice = matchingVoice;
              break;
            }
          }
        }
        
        // If still no match, try the language code alone
        if (!matchingVoice) {
          const languageFamily = utterance.lang.split('-')[0];
          matchingVoice = availableVoices.find(voice => 
            voice.lang.startsWith(languageFamily)
          );
          
          if (matchingVoice) {
            utterance.voice = matchingVoice;
          } else {
            // If no language-specific voice is found, use the first available voice
            if (availableVoices.length > 0) {
              utterance.voice = availableVoices[0];
            }
          }
        }
      }
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
      
      // Log for debugging purposes
      console.log(`Speaking with voice: ${utterance.voice ? utterance.voice.name : 'default'} for language: ${utterance.lang}`);
    };
    
    // Check if voices are already loaded
    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
      setVoice();
    } else {
      // If voices are not loaded yet, wait for them
      window.speechSynthesis.onvoiceschanged = setVoice;
    }
  } else {
    console.warn('Text-to-speech not supported in this browser');
    alert('Text-to-speech is not supported in your browser');
  }
};

// Function to stop speech
export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

// Function to get available voices (useful for debugging)
export const getAvailableVoices = () => {
  if ('speechSynthesis' in window) {
    // Voices are loaded asynchronously, so we need to wait a bit
    return new Promise((resolve) => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        resolve(voices);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          resolve(window.speechSynthesis.getVoices());
        };
      }
    });
  }
  return Promise.resolve([]);
};