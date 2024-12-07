from app.chatbot import process_user_input

def test_process_user_input():
    query = "How can I improve my postpartum mental health?"
    response, emotion = process_user_input(query)
    assert response is not None
    assert isinstance(response, str)
    print(f"Response: {response}")
    print(f"Detected Emotion: {emotion}")

if __name__ == "__main__":
    test_process_user_input()
