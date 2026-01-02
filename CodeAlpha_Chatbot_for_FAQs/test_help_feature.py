import json
from preprocessing import preprocess_faq_questions
from similarity import get_answer

def test_help_feature():
    # Load FAQ data
    with open('faq_data.json', 'r', encoding='utf-8') as file:
        raw_faq_data = json.load(file)['faqs']

    # Preprocess FAQ questions
    processed_faq_data = preprocess_faq_questions(raw_faq_data)
    
    print("FAQ Chatbot Help Feature Test")
    print("="*50)
    
    # Test help-related questions
    help_questions = [
        "help",
        "what can I ask",
        "list FAQs",
        "show me the questions",
        "what are the available questions",
        "what can you help me with"
    ]
    
    for question in help_questions:
        answer, similarity = get_answer(question, processed_faq_data)
        print(f"Question: {question}")
        print(f"Answer: {answer}")
        print(f"Similarity: {similarity:.3f}")
        print("-" * 50)

if __name__ == "__main__":
    test_help_feature()