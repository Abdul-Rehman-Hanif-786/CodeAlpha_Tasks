// Supported languages for the translation service
export const getSupportedLanguages = () => {
  return [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ar', name: 'Arabic' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'jv', name: 'Javanese' },
    { code: 'mr', name: 'Marathi' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'ur', name: 'Urdu' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'th', name: 'Thai' },
    { code: 'tr', name: 'Turkish' },
    { code: 'pl', name: 'Polish' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'ro', name: 'Romanian' },
    { code: 'nl', name: 'Dutch' },
    { code: 'sv', name: 'Swedish' },
    { code: 'da', name: 'Danish' },
    { code: 'fi', name: 'Finnish' },
    { code: 'no', name: 'Norwegian' },
  ];
};

// Function to translate using MyMemory Translation API (free option)
export const translateText = async (text, sourceLang, targetLang) => {
  // MyMemory Translation API is free with no API key required for basic usage
  // Encode the text to handle special characters in different languages
  const encodedText = encodeURIComponent(text);
  const url = `https://api.mymemory.translated.net/get?q=${encodedText}&langpair=${sourceLang}|${targetLang}`;
  
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Translation API error: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.responseStatus !== 200) {
      throw new Error(data.responseDetails || 'Translation failed');
    }
    
    return data.responseData.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    throw error;
  }
};

// Helper function to get language name by code
const getLanguageName = (code) => {
  const languages = getSupportedLanguages();
  const lang = languages.find(l => l.code === code);
  return lang ? lang.name : code;
};

// Function to translate using Google Translate API (uncomment when API key is available)
/*
export const translateTextWithGoogle = async (text, sourceLang, targetLang) => {
  const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY; // Store API key in environment variable
  
  if (!API_KEY) {
    throw new Error('Google Translate API key not found. Please set REACT_APP_GOOGLE_TRANSLATE_API_KEY environment variable.');
  }
  
  const response = await fetch(`https://translation.googleapis.com/language/translate/v2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      source: sourceLang,
      target: targetLang,
      format: 'text'
    }),
    // Include API key in URL or use Authorization header depending on Google's requirements
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Translation failed');
  }
  
  const data = await response.json();
  return data.data.translations[0].translatedText;
};
*/