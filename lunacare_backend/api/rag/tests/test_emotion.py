from app.emotion import detect_emotion
text = "I feel overwhelmed and tired."
emotion, score = detect_emotion(text)
print(f"Detected Emotion: {emotion}, Score: {score}")
