# FAQ Chatbot

A smart chatbot that answers frequently asked questions using natural language processing and similarity matching.

## Features

- **Natural Language Processing**: Uses NLTK for text preprocessing including tokenization, stop word removal, and lemmatization
- **Similarity Matching**: Employs TF-IDF vectorization and cosine similarity to match user questions with FAQs
- **Web Interface**: Clean, responsive chat interface built with Flask
- **FAQ Discovery**: Users can ask for help to see all available FAQs
- **Confidence Scoring**: Provides similarity scores for responses

## Requirements

- Python 3.7+
- NLTK
- scikit-learn
- Flask
- NumPy

## Installation

1. Clone or download the repository
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

1. Run the application:
   ```bash
   python app.py
   ```

2. Open your browser and go to `http://127.0.0.1:5000`

3. Start chatting with the bot by asking questions related to the FAQs

## FAQ Discovery

To see all available FAQs, ask questions like:
- "help"
- "what can I ask"
- "list FAQs"
- "show me the questions"
- "what are the available questions"

## Project Structure

```
CodeAlpha_Task2/
│
├── app.py                 # Main Flask application
├── requirements.txt       # Project dependencies
├── faq_data.json          # FAQ dataset
├── preprocessing.py       # Text preprocessing functions
├── similarity.py          # Similarity matching algorithm
├── test_chatbot.py        # Test script
├── test_help_feature.py   # Help feature test
└── templates/
    └── index.html         # Chat interface
```

## How It Works

1. **Text Preprocessing**: Questions are cleaned, tokenized, and normalized using NLTK
2. **Vectorization**: TF-IDF converts text to numerical vectors
3. **Similarity Matching**: Cosine similarity finds the most similar FAQ to user input
4. **Response**: Returns the best matching answer or a default response if no good match is found

## Customization

To add your own FAQs:
1. Modify `faq_data.json` with your questions and answers
2. The chatbot will automatically process and match against the new FAQs

## Testing

Run the test scripts to verify functionality:
```bash
python test_chatbot.py
python test_help_feature.py
```

## Technologies Used

- **Backend**: Python, Flask
- **NLP**: NLTK
- **ML**: scikit-learn (TF-IDF, cosine similarity)
- **Frontend**: HTML, CSS, JavaScript