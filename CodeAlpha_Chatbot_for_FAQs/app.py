from flask import Flask, render_template, request, jsonify
import json
from preprocessing import preprocess_faq_questions
from similarity import get_answer

app = Flask(__name__)

# Load FAQ data
with open('faq_data.json', 'r', encoding='utf-8') as file:
    raw_faq_data = json.load(file)['faqs']

# Preprocess FAQ questions
processed_faq_data = preprocess_faq_questions(raw_faq_data)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json['message']
    
    # Get the answer using similarity matching
    answer, similarity = get_answer(user_message, processed_faq_data)
    
    # Format the response
    response = {
        'response': answer,
        'confidence': float(similarity)
    }
    
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)