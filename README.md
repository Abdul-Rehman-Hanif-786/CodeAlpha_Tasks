# Language Translation Tool

A React-based language translation application that allows users to translate text between multiple languages with speech support.

## Features

- Translate text between 30+ languages
- User-friendly interface with source and target text areas
- Language selection dropdowns
- Copy translated text to clipboard
- Text-to-speech functionality for translated text
- Language swap feature
- Responsive design
- Professional UI with modern color scheme

## Technologies Used

- React.js
- MyMemory Translation API (free tier)
- Web Speech API for text-to-speech
- Clipboard API for copy functionality

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd language-translation-tool
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```

2. The application will open in your default browser at http://localhost:3000

## Usage

1. Enter text in the source text area
2. Select source and target languages from the dropdowns
3. Click the "🌐 Translate" button to translate the text
4. Use the "📋 Copy" button to copy the translated text to clipboard
5. Use the "🔊 Speak" button to hear the translated text
6. Click the ↕️ button to swap source and target languages

## API Information

This application uses the MyMemory Translation API, which is a free service that requires no API key for basic usage. The service supports translation between many language pairs with reasonable accuracy.

## Supported Languages

The application supports translation between 30+ languages including:
- English, Spanish, French, German, Italian, Portuguese
- Russian, Japanese, Korean, Chinese
- Arabic, Hindi, Urdu, Bengali, Punjabi
- And many more

## Text-to-Speech Support

The application includes enhanced text-to-speech functionality with proper language-specific voice selection and fallback mechanisms. Languages like Urdu, Hindi, Korean, and others are properly supported with appropriate voice selection.

## File Structure

```
src/
├── components/
│   └── TranslationForm.js
├── services/
│   └── translationService.js
├── utils/
│   └── helpers.js
├── App.js
├── App.css
├── index.js
└── index.css
```

## Components

- `TranslationForm.js`: Main form component with UI elements
- `translationService.js`: Handles API calls and supported languages
- `helpers.js`: Utility functions for copy and speech functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Limitations

- The free translation API has usage limits
- Translation quality may vary depending on language pair
- Text-to-speech functionality depends on browser support