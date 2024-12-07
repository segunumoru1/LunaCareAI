from transformers import pipeline

def detect_emotion(text):
    """
    Detects the emotion of the input text using a specified Hugging Face model.
    """
    # Explicitly specify the model and revision
    emotion_analyzer = pipeline(
        "text-classification", 
        model="textattack/bert-base-uncased-SST-2",  # Alternative to distilbert
    )
    result = emotion_analyzer(text)
    emotion = result[0]['label']  # Typically "POSITIVE" or "NEGATIVE"
    score = result[0]['score']
    return emotion, score
