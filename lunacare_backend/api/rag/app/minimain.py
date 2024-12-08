from chatbot import LunaCareBot
import os
from chatbot import LunaCareBot
from emotion import detect_emotion_from_text, detect_emotion_from_audio
from voice_handler import recognize_speech_from_audio, record_audio

class TerminalChat:
    def __init__(self):
        self.bot = LunaCareBot(use_nvidia=False)  # Change to False for OpenAI
        self.bot.initialize_vectorstore("../data/Features.pdf")
        self.voice_enabled = False
        self.should_exit = False

    def print_welcome(self):
        print("\nWelcome to LunaCare AI Terminal Chat")
        print("\nCommands:")
        print("'/voice' - Toggle voice mode")
        print("'/clear' - Clear screen")
        print("'/exit'  - Exit chat")
        print("Just type normally to chat\n")

    def clear_screen(self):
        os.system('cls' if os.name == 'nt' else 'clear')

    def print_bot_response(self, response, emotion=None):
        print(f"\n🤖 LunaCare AI: {response}")
        if emotion:
            print(f"Detected emotion: {emotion}")

    def handle_voice_input(self):
        """Handle voice input."""
        temp_audio = record_audio()
        transcription = recognize_speech_from_audio(temp_audio)
        emotion, confidence = detect_emotion_from_audio(temp_audio)
        return transcription, emotion, confidence

    def run(self):
        self.print_welcome()

        while not self.should_exit:
            try:
                user_input = None
                if self.voice_enabled:
                    print("Voice mode enabled. Speak into the microphone.")
                    user_input, emotion, confidence = self.handle_voice_input()
                    print(f"Transcription: {user_input} (Confidence: {confidence})")
                else:
                    user_input = input("\nYou: ").strip()

                if user_input.lower() == '/exit':
                    print("Goodbye!")
                    break
                elif user_input.lower() == '/clear':
                    self.clear_screen()
                    self.print_welcome()
                    continue
                elif user_input.lower() == '/voice':
                    self.voice_enabled = not self.voice_enabled
                    print(f"Voice mode {'enabled' if self.voice_enabled else 'disabled'}.")
                    continue

                # Detect emotion from text
                emotion, confidence = detect_emotion_from_text(user_input)

                # Generate chatbot response
                response = self.bot.generate_response(user_input)

                # Display bot response and emotion
                self.print_bot_response(response.content, emotion)

            except KeyboardInterrupt:
                print("Chat interrupted. Use '/exit' to quit properly.")
            except Exception as e:
                print(f"Error: {e}")

def main():
    os.makedirs("temp", exist_ok=True)
    chat = TerminalChat()
    chat.run()

if __name__ == "__main__":
    main()


