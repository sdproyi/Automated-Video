import ssl
import json
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
import numpy as np

# Bypass SSL certificate verification
try:
    _create_unverified_https_context = ssl._create_unverified_context
except AttributeError:
    pass
else:
    ssl._create_default_https_context = _create_unverified_https_context

# Download necessary NLTK data
nltk.download('punkt', download_dir='/home/sdpro/nltk_data')
nltk.download('stopwords', download_dir='/home/sdpro/nltk_data')
nltk.data.path.append('/home/sdpro/nltk_data')

def get_most_important_word(text):
    # Tokenize the text
    words = word_tokenize(text.lower())
    
    # Remove punctuation
    words = [word for word in words if word.isalnum()]
    
    # Remove stop words
    stop_words = set(stopwords.words('english'))
    filtered_words = [word for word in words if word not in stop_words]
    
    if not filtered_words:
        return None
    
    # Use TF-IDF Vectorizer
    vectorizer = TfidfVectorizer(vocabulary=set(filtered_words))  # Use set to remove duplicates
    tfidf_matrix = vectorizer.fit_transform([text])
    
    # Get the TF-IDF scores for each word
    tfidf_scores = tfidf_matrix.toarray()[0]
    
    # Get the word corresponding to the highest TF-IDF score
    max_score_index = np.argmax(tfidf_scores)
    most_important_word = vectorizer.get_feature_names_out()[max_score_index]
    
    return most_important_word

# Load JSON file
json_file_path = 'transcription.json'  # Replace with your actual JSON file path

with open(json_file_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

# Loop through segments and find the most important word
for segment in data["segments"]:
    segment_text = segment["text"]
    most_important_word = get_most_important_word(segment_text)
    print(f"Segment ID: {segment['id']}, Most Important Word: {most_important_word}")
