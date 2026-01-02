import nltk
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer

# Download required NLTK data if not already present
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

try:
    nltk.data.find('corpora/wordnet')
except LookupError:
    nltk.download('wordnet')

try:
    nltk.data.find('corpora/omw-1.4')
except LookupError:
    nltk.download('omw-1.4')

# Initialize the lemmatizer and get English stop words
lemmatizer = WordNetLemmatizer()
stop_words = set(stopwords.words('english'))

def preprocess_text(text):
    """
    Preprocess the input text by:
    1. Converting to lowercase
    2. Removing special characters and digits
    3. Tokenizing the text
    4. Removing stop words
    5. Lemmatizing the tokens
    """
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters and digits, keep only letters and spaces
    text = re.sub(r'[^a-zA-Z\s]', '', text)
    
    # Tokenize the text
    tokens = word_tokenize(text)
    
    # Remove stop words and lemmatize
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stop_words and token.strip() != '']
    
    # Join the tokens back into a string
    processed_text = ' '.join(tokens)
    
    return processed_text

def preprocess_faq_questions(faq_data):
    """
    Preprocess all FAQ questions in the dataset
    """
    processed_faqs = []
    for faq in faq_data:
        processed_question = preprocess_text(faq['question'])
        processed_faqs.append({
            'original_question': faq['question'],
            'processed_question': processed_question,
            'answer': faq['answer']
        })
    return processed_faqs