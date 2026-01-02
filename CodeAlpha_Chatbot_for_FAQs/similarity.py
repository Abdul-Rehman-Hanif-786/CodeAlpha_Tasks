from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def find_best_match(user_question, faq_data):
    """
    Find the best matching FAQ for the user's question using TF-IDF and cosine similarity
    """
    # Extract the processed questions from the FAQ data
    processed_questions = [faq['processed_question'] for faq in faq_data]
    
    # Add the user's question to the list for vectorization
    all_questions = processed_questions + [user_question]
    
    # Create TF-IDF vectors
    vectorizer = TfidfVectorizer()
    tfidf_matrix = vectorizer.fit_transform(all_questions)
    
    # Calculate cosine similarity between user question and all FAQ questions
    # The user question is the last one in the list (index -1)
    user_vector = tfidf_matrix[-1]
    faq_vectors = tfidf_matrix[:-1]
    
    # Calculate cosine similarities
    similarities = cosine_similarity(user_vector, faq_vectors).flatten()
    
    # Find the index of the highest similarity
    best_match_idx = np.argmax(similarities)
    best_similarity = similarities[best_match_idx]
    
    # Return the best matching FAQ and the similarity score
    return faq_data[best_match_idx], best_similarity

def get_answer(user_question, faq_data, threshold=0.3):
    """
    Get the answer to the user's question based on similarity matching
    """
    # Preprocess the user's question
    from preprocessing import preprocess_text
    processed_user_question = preprocess_text(user_question)
    
    # Check if user is asking for help or available FAQs
    if is_help_request(user_question):
        return get_faq_list(faq_data), 0.0
    
    # Find the best matching FAQ
    best_faq, similarity = find_best_match(processed_user_question, faq_data)
    
    # Check if the similarity is above the threshold
    if similarity > threshold:
        return best_faq['answer'], similarity
    else:
        return "I'm sorry, I couldn't find a matching FAQ for your question. Please try rephrasing or contact customer support for assistance.", similarity


def is_help_request(user_question):
    """
    Check if the user is asking for help or available FAQs
    """
    help_keywords = [
        "help", "available", "list", "faq", "faqs", "questions", 
        "what can i ask", "what can you do", "options", "features",
        "what are the questions", "what questions", "list questions",
        "show me questions", "show questions", "what do you know"
    ]
    
    user_question_lower = user_question.lower()
    return any(keyword in user_question_lower for keyword in help_keywords)


def get_faq_list(faq_data):
    """
    Get a formatted list of available FAQs
    """
    faq_list = "Here are the available FAQs you can ask about:\n\n"
    for i, faq in enumerate(faq_data, 1):
        faq_list += f"{i}. {faq['original_question']}\n"
    
    faq_list += "\nFeel free to ask about any of these topics!"
    return faq_list