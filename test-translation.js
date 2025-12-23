// Test script to demonstrate translation functionality
const https = require('https');

// Function to translate text using MyMemory API
async function testTranslation() {
    const text = "Hello, how are you?";
    const sourceLang = "en";
    const targetLang = "es";
    
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    
    console.log(`Translating: "${text}" from ${sourceLang} to ${targetLang}`);
    console.log(`API URL: ${url}`);
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.responseStatus === 200) {
            console.log(`Translation: "${data.responseData.translatedText}"`);
            console.log("Translation successful!");
        } else {
            console.log(`Error: ${data.responseDetails}`);
        }
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

// Since fetch is not available in Node by default, let's use the built-in https module
function testTranslationWithHttps() {
    const text = "Hello, how are you?";
    const sourceLang = "en";
    const targetLang = "es";
    
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;
    
    console.log(`Translating: "${text}" from ${sourceLang} to ${targetLang}`);
    console.log(`API URL: ${url}`);
    
    https.get(url, (res) => {
        let data = '';
        
        res.on('data', (chunk) => {
            data += chunk;
        });
        
        res.on('end', () => {
            try {
                const jsonData = JSON.parse(data);
                if (jsonData.responseStatus === 200) {
                    console.log(`Translation: "${jsonData.responseData.translatedText}"`);
                    console.log("Translation successful!");
                } else {
                    console.log(`Error: ${jsonData.responseDetails}`);
                }
            } catch (error) {
                console.log(`JSON Parse Error: ${error.message}`);
                console.log(`Raw response: ${data}`);
            }
        });
    }).on('error', (error) => {
        console.log(`Request Error: ${error.message}`);
    });
}

// Run the test
console.log("Testing translation functionality...");
testTranslationWithHttps();