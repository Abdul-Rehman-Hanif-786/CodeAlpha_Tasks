import json
from preprocessing import preprocess_faq_questions, preprocess_text
from similarity import get_answer

def test_chatbot():
    # Load FAQ data
    with open('faq_data.json', 'r', encoding='utf-8') as file:
        raw_faq_data = json.load(file)['faqs']

    # Preprocess FAQ questions
    processed_faq_data = preprocess_faq_questions(raw_faq_data)
    
    print("FAQ Chatbot Test")
    print("="*50)
    
    # Test questions
    test_questions = [
        "What is your return policy?",
        "How long does shipping take?",
        "How can I track my order?",
        "Do you offer international shipping?",
        "What payment methods do you accept?",
        "How do I contact customer support?",
        "What are your business hours?",
        "How can I reset my password?",
        "Do you have a physical store?",
        "Can I change my order after placing it?",
        "Are your products eco-friendly?",
        "Do you offer discounts for bulk orders?",
        "What is the weather today?",  # This should not match any FAQ
        "How do I cancel my subscription?"  # This should not match any FAQ
    ]
    
    for question in test_questions:
        answer, similarity = get_answer(question, processed_faq_data)
        print(f"Question: {question}")
        print(f"Answer: {answer}")
        print(f"Similarity: {similarity:.3f}")
        print("-" * 50)

if __name__ == "__main__":
    test_chatbot()